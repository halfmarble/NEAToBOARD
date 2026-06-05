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

#pragma once

#include "hal/spi_hal.h"
#include "driver/spi_master.h"

#ifdef __cplusplus
extern "C" {
#endif

typedef struct 
{
    uint8_t* buffer;
    size_t length;
}
bitbang_buffer_t;

typedef struct 
{
    bitbang_buffer_t write;
    bitbang_buffer_t read;
}
bitbang_buffers_t;

typedef struct 
{
    bitbang_buffers_t buffers;
    spi_hal_context_t* hal;
    spi_hal_dev_config_t* hal_dev;
}
bitbang_t;

esp_err_t bitbang_init(bitbang_t* bitbang, bitbang_buffers_t buffers, spi_host_device_t host_device, int8_t mosi, bool delay);
IRAM_ATTR uint64_t bitbang_write(bitbang_t* bb1, bitbang_t* bb2, bool block);
IRAM_ATTR void bitbang_read(bitbang_t* bb1, bitbang_t* bb2, bool block);

#ifdef __cplusplus
}
#endif
