// Copyright 2021 Halfmarble LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

#include <math.h>
#include "driver/gpio.h"
#include "driver/periph_ctrl.h"
#include "esp_rom_gpio.h"
#include "hal/gpio_hal.h"
#include "hal/gpio_types.h"

#include "bitbangSPI.h"
#include "utilities.h"

#define WANT_FLAGS (SPI_DEVICE_NO_DUMMY | SPI_DEVICE_3WIRE | SPI_DEVICE_HALFDUPLEX)
#define WANT_CLOCK_HZ (12000000) // want 12MHz, USB full speed (83.3333ns bits)
#define WANT_DUTY_CYCLE (128)    // 50% duty cycle

#define DUMMY_DELAY 0
#define MOSI_DELAY_MODE 0
#define MOSI_DELAY_NUM 4

static inline int setup_clock(int fapb, int hz, int duty_cycle, spi_ll_clock_val_t *out_reg)
{
    int best_n = 0;
    int best_pre = 0;
    uint32_t best_err = 0xFFFFFFFF;
    int best_hz = 0;

    for (int n = 0b000001; n <= 0b111111; n++)
    {
        for (int pre = 0b0000000000001; pre <= 0b1111111111111; pre++)
        {
            int eff_hz = spi_ll_freq_for_pre_n(fapb, pre, n);
            uint32_t errval = abs(eff_hz - hz);
            if (errval <= best_err)
            {
                best_err = errval;

                best_n = n;
                best_pre = pre;
                best_hz = eff_hz;

                //printf("BEST SO FAR CLK %12d:%10d:%10d [%10d:%10d]\n", best_hz, hz, (eff_hz - hz), best_n, best_pre);
            }
        }
    }
    //printf("BEST CLK %12d:%10d [%10d:%10d]\n", best_hz, best_err, best_n, best_pre);

    typeof(SPI1.clock) reg;
    reg.clkcnt_n = best_n - 1;
    reg.clkdiv_pre = best_pre - 1;
    reg.clkcnt_h = floor(best_n / 2 - 1);
    reg.clk_equ_sysclk = 0;

    *(uint32_t *)out_reg = reg.val;

    return best_hz;
}

esp_err_t bitbang_init(bitbang_t *bitbang, bitbang_buffers_t buffers, spi_host_device_t host_device, int8_t mosi, bool delay)
{
    memset(bitbang, 0, sizeof(bitbang_t));

    bitbang->hal = heap_caps_malloc(sizeof(spi_hal_context_t), MALLOC_CAP_INTERNAL | MALLOC_CAP_8BIT);
    if (bitbang->hal == NULL)
    {
        return ESP_ERR_NO_MEM;
    }
    memset(bitbang->hal, 0, sizeof(spi_hal_context_t));

    bitbang->hal_dev = heap_caps_malloc(sizeof(spi_hal_dev_config_t), MALLOC_CAP_INTERNAL | MALLOC_CAP_8BIT);
    if (bitbang->hal_dev == NULL)
    {
        return ESP_ERR_NO_MEM;
    }
    memset(bitbang->hal_dev, 0, sizeof(spi_hal_dev_config_t));

    bitbang->buffers.write.buffer = buffers.write.buffer;
    bitbang->buffers.write.length = 0;

    bitbang->buffers.read.buffer = buffers.read.buffer;
    bitbang->buffers.read.length = 0;

    bitbang->hal->hw = SPI_LL_GET_HW(host_device);
    bitbang->hal->dma_enabled = 0;

    static spi_ll_clock_val_t clock_reg = 0;
    if (clock_reg == 0)
    {
        setup_clock(SPI_LL_PERIPH_CLK_FREQ, WANT_CLOCK_HZ, WANT_DUTY_CYCLE, &clock_reg);
    }

    periph_module_enable(spi_periph_signal[host_device].module);

    // invert the D+ line to keep it HIGH when idle
    // the D+ is the 2nd line, i.e. the one that starts
    // transmitting later aka not the one that needs the delayed start
    bool invert = !delay;
    esp_rom_gpio_connect_out_signal(mosi, spi_periph_signal[host_device].spid_out, invert, false);
    esp_rom_gpio_connect_in_signal(mosi, spi_periph_signal[host_device].spid_in, invert);
    gpio_hal_iomux_func_sel(GPIO_PIN_MUX_REG[mosi], PIN_FUNC_GPIO);

    // make it easy for a device to overpower the host D-/D+ lines
    gpio_set_drive_capability(mosi, GPIO_DRIVE_CAP_0); // weakest
    esp_rom_gpio_pad_set_drv(mosi, 0); // 5mA

    spi_dev_t *hw = bitbang->hal->hw;
    spi_ll_master_init(hw);
    spi_ll_master_set_mode(hw, 0);
    spi_ll_master_set_io_mode(hw, SPI_LL_IO_MODE_NORMAL);
    spi_ll_master_set_clock_by_reg(hw, &clock_reg);
    spi_ll_disable_int(hw);
    spi_ll_clear_int_stat(hw);
    spi_ll_set_rx_lsbfirst(hw, 0);
    spi_ll_set_tx_lsbfirst(hw, 0);
    spi_ll_set_sio_mode(hw, (WANT_FLAGS & SPI_DEVICE_3WIRE ? 1 : 0));
    spi_ll_set_half_duplex(hw, (WANT_FLAGS & SPI_DEVICE_HALFDUPLEX ? 1 : 0));
    spi_ll_set_addr_bitlen(hw, 0);
    spi_ll_set_command_bitlen(hw, 0);
    spi_ll_set_address(hw, 0, 0, 0);
    spi_ll_set_command(hw, 0, 0, 0);
    spi_ll_enable_mosi(hw, 1); // enable MOSI phase only

    if (delay)
    {
        // delay this SPI MOSI line to sync up with the other one
        spi_ll_set_dummy(bitbang->hal->hw, DUMMY_DELAY);                          // in full clocks (1/2 period)
        spi_ll_set_mosi_delay(bitbang->hal->hw, MOSI_DELAY_MODE, MOSI_DELAY_NUM); // in 1/8th of the period
    }

    return ESP_OK;
}

inline static void bitbang_write_setup(spi_dev_t *hw, uint8_t *buffer, size_t length)
{
    spi_ll_set_mosi_bitlen(hw, length);
    spi_ll_write_buffer(hw, buffer, length);
}

// only 19th bit set
IRAM_ATTR static const uint32_t ONE = 0b00000000000001000000000000000000;

// synchronized write of 2 SPIs units
IRAM_ATTR void bitbang_write_impl(bitbang_t *bb1, bitbang_t *bb2, bool block)
{
    register spi_dev_t *spi1 = bb1->hal->hw;
    register spi_dev_t *spi2 = bb2->hal->hw;

    __asm__ __volatile__("excw;");                            // wait until all prior instructions are either exception free or any exceptions have been taken
    __asm__ __volatile__("isync;dsync;esync;");               // wait till all kind of syncs are done
    __asm__ __volatile__("nop;nop;nop;nop;nop;nop;nop;nop;"); // quiet down the CPU

    // start both SPIs at hopefully the same time
    // spi1 will be delayed const time wrt spi2, since it starts 1st
    spi1->cmd.val = ONE; //spi1->cmd.usr = 1;
    spi2->cmd.val = ONE; //spi2->cmd.usr = 1;

    if (block)
    {
        while (spi1->cmd.usr || spi2->cmd.usr)
        {
            // busy spin loop waiting for the data transmission to end
            NOP();
        }
    }
}

IRAM_ATTR uint64_t bitbang_write(bitbang_t *bb1, bitbang_t *bb2, bool block)
{
    bitbang_write_setup(bb1->hal->hw, bb1->buffers.write.buffer, bb1->buffers.write.length);
    bitbang_write_setup(bb2->hal->hw, bb2->buffers.write.buffer, bb2->buffers.write.length);
    
    uint64_t stamp = esp_timer_get_time();
    bitbang_write_impl(bb1, bb2, block);
    
    return stamp;
}

IRAM_ATTR void bitbang_read(bitbang_t *bb1, bitbang_t *bb2, bool block)
{
    // TODO
}
