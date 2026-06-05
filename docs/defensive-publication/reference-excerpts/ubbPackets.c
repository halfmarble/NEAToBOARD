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

#include "ubbPackets.h"
#include "crc.h"
#include "utilities.h"

#define BIT_STUFFING_MAX_ONES     (6)
#define MAX_FRAME_NR              (2047)

#define UBB_USB_SYNC_BITS         (0b00000001)
#define UBB_USB_PID_SOF_BITS      (0b10100101)
#define UBB_USB_PID_ACK_BITS      (0b01001011)
#define UBB_USB_PID_NAK_BITS      (0b00000000)
#define UBB_USB_PID_SETUP_BITS    (0b10110100)
#define UBB_USB_PID_SETUP_IN_BITS (0b10010110)
#define UBB_USB_PID_DATA0_BITS    (0b11000011)
#define UBB_USB_PID_DATA1_BITS    (0b11010010)

typedef enum ubb_usb_request_code_t
{
  GET_STATUS = 0,
  CLEAR_FEATURE = 1,
  SET_FEATURE = 3,
  SET_ADDRESS = 5,
  GET_DESCRIPTOR = 6,
  SET_DESCRIPTOR = 7,
  GET_CONFIGURATION = 8,
  SET_CONFIGURATION = 9,
  GET_INTERFACE = 10,
  SET_INTERFACE = 11,
  SYNCH_FRAME = 12,
} ubb_usb_request_code_t;

typedef enum ubb_usb_address_t
{
  DATA_TRANSFER_DIRECTION_HOST_TO_DEVICE = 0,
  DATA_TRANSFER_DIRECTION_DEVICE_TO_HOST = 1,

  TYPE_STANDARD = 0,
  TYPE_CLASS = 1,
  TYPE_VENDOR = 2,

  RECIPIENT_DEVICE = 0,
  RECIPIENT_INTERFACE = 1,
  RECIPIENT_ENDPOINT = 2,
  RECIPIENT_OTHER = 3,
}
ubb_usb_state_machine_t;

static uint8_t _get_data_id(void)
{
  static uint8_t _data_id = UBB_USB_PID_DATA0_BITS;
  uint8_t data = _data_id;
  if (_data_id == UBB_USB_PID_DATA0_BITS)
  {
    _data_id = UBB_USB_PID_DATA1_BITS;
  }
  else
  {
    _data_id = UBB_USB_PID_DATA0_BITS;
  }
  return data;
}

#define AVAILABLE_BITS (SOC_SPI_MAXIMUM_BUFFER_SIZE * 8)

void ubb_usb_sof_packet(ubb_usb_sof_packet_t* p)
{
  static uint16_t _frame_number = 0;

  memset(p, 0, sizeof(ubb_usb_sof_packet_t));
  p->bSync = UBB_USB_SYNC_BITS;
  p->bPID = UBB_USB_PID_SOF_BITS;
  p->bmData_bit.frame_number = _frame_number;
  p->bmData_bit.crc = crc5(p->bmData_bit.frame_number, 11);
  p->bmData = swap2bytes(p->bmData);

  _frame_number++;
  if (_frame_number == MAX_FRAME_NR)
  {
      _frame_number = 0;
  }
}

void ubb_usb_setup_address_packet(ubb_usb_token_packet_t* p, uint8_t addr, uint8_t endp)
{
  memset(p, 0, sizeof(ubb_usb_token_packet_t));
  p->bSync = UBB_USB_SYNC_BITS;
  p->bPID = UBB_USB_PID_SETUP_BITS;
  p->bmData_bit.addr = addr;
  p->bmData_bit.endp = endp;
  p->bmData_bit.crc = crc5(p->bmData, 11);
  p->bmData = swap2bytes(p->bmData);
}

void ubb_usb_setup_in_address_packet(ubb_usb_token_packet_t* p, uint8_t addr, uint8_t endp)
{
  memset(p, 0, sizeof(ubb_usb_token_packet_t));
  p->bSync = UBB_USB_SYNC_BITS;
  p->bPID = UBB_USB_PID_SETUP_IN_BITS;
  p->bmData_bit.addr = addr;
  p->bmData_bit.endp = endp;
  p->bmData_bit.crc = crc5(p->bmData, 11);
  p->bmData = swap2bytes(p->bmData);
}

void ubb_usb_setup_address_data_packet(ubb_usb_device_request_packet_t* p, uint16_t wValue, uint16_t wIndex, uint16_t wLength)
{
  memset(p, 0, sizeof(ubb_usb_device_request_packet_t));
  p->bSync = UBB_USB_SYNC_BITS;
  p->bPID = _get_data_id();
  p->bmRequestType_bit.data_transfer_direction = DATA_TRANSFER_DIRECTION_HOST_TO_DEVICE;
  p->bmRequestType_bit.type = TYPE_STANDARD;
  p->bmRequestType_bit.recipient = RECIPIENT_DEVICE;
  p->bmRequestType = swap2bytes(p->bmRequestType);
  p->bRequest = invert8bits(SET_ADDRESS);
  p->wValue = invert8bits(wValue);
  p->wIndex = invert8bits(wIndex);
  p->wLength = invert8bits(wLength);
  p->wCRC16 = crc16(&(p->bmRequestType), 8);
  p->wCRC16 = swap2bytes(p->wCRC16);
}

void ubb_usb_setup_empty_data_packet(ubb_usb_empty_data_packet_t* p)
{
  memset(p, 0, sizeof(ubb_usb_empty_data_packet_t));
  p->bSync = UBB_USB_SYNC_BITS;
  p->bPID = _get_data_id();
  p->wCRC16 = 0x0000;
}

ubb_usb_handshake_packet_t ubb_usb_get_ack_packet(void)
{
  static ubb_usb_handshake_packet_t p = { UBB_USB_SYNC_BITS, UBB_USB_PID_ACK_BITS };
  return p;
}

ubb_usb_handshake_packet_t ubb_usb_get_nak_packet(void)
{
  static ubb_usb_handshake_packet_t p = { UBB_USB_SYNC_BITS, UBB_USB_PID_NAK_BITS };
  return p;
}


// adds bits from data to buffers
static void _ubb_usb_add_description(bitbang_buffer_t* d_minus, bitbang_buffer_t* d_plus, ubb_usb_bit_desc_t *desc, size_t length)
{
  size_t total_bits = length;
  assert(total_bits < AVAILABLE_BITS);
  assert((total_bits % 8) == 0);
  assert(d_minus->length + total_bits < AVAILABLE_BITS);
  assert(d_plus->length + total_bits < AVAILABLE_BITS);

  assert((d_minus->length % 8) == 0);
  assert((d_plus->length % 8) == 0);
  uint8_t *ptr_d_minus = &(d_minus->buffer[d_minus->length / 8]);
  uint8_t *ptr_d_plus = &(d_plus->buffer[d_plus->length / 8]);

  size_t msg_bytes = length / 8;
  size_t remain_bits = length;
  size_t j = 0;
  for (int i = 0; i < msg_bytes; i++)
  {
    uint8_t byte_d_minus = 0;
    uint8_t byte_d_plus = 0;
    uint8_t bits = 8;
    if (remain_bits < 8)
    {
      bits = remain_bits;
    }
    for (uint8_t b = 0; b < bits; b++)
    {
      switch (desc[j++])
      {
      case USB_SIGNAL_LL:
        byte_d_minus = (byte_d_minus << 1) | 0;
        byte_d_plus = (byte_d_plus << 1) | 0;
        break;
      case USB_SIGNAL_LH:
        byte_d_minus = (byte_d_minus << 1) | 0;
        byte_d_plus = (byte_d_plus << 1) | 1;
        break;
      case USB_SIGNAL_HL:
        byte_d_minus = (byte_d_minus << 1) | 1;
        byte_d_plus = (byte_d_plus << 1) | 0;
        break;
      case USB_SIGNAL_HH:
        byte_d_minus = (byte_d_minus << 1) | 1;
        byte_d_plus = (byte_d_plus << 1) | 1;
        break;
      }
      remain_bits--;
    }
    ptr_d_minus[i] = byte_d_minus;
    ptr_d_plus[i] = ~byte_d_plus; // invert data (to undo SPI line invertion)
  }

  assert(remain_bits == 0);

  d_minus->length += total_bits;
  d_plus->length += total_bits;

  //printf("d_minus->length: %u\n", d_minus->length);
  //print_bits(d_minus->buffer, d_minus->length/8);

  //printf("d_plus->length: %u\n", d_plus->length);
  //print_bits(d_plus->buffer, d_plus->length/8);
}

// adds bytes from packets to buffers
void ubb_usb_add_data(bitbang_buffer_t* d_minus, bitbang_buffer_t* d_plus, uint8_t* data, size_t length)
{
  static ubb_usb_bit_desc_t BUFFER[SOC_SPI_MAXIMUM_BUFFER_SIZE * 8];

  size_t available_stuffed = 5; // available bits for bit stuffing

  size_t total_bits = length * 8;
  total_bits += (3+available_stuffed); // (3bit EOP + 5bits filler == 8bits)
  
  assert(total_bits <= AVAILABLE_BITS);
  assert((total_bits % 8) == 0);
  assert(d_minus->length + total_bits < AVAILABLE_BITS);
  assert(d_plus->length + total_bits < AVAILABLE_BITS);

  size_t filled = 0;
  size_t repeated_ones = 0;
  ubb_usb_bit_desc_t last = USB_SIGNAL_IDLE;
  for (size_t i=0; i<length; i++)
  {
    uint8_t b = data[i];
    for (int8_t j=7; 0<=j; j--)
    {
      uint8_t bit = (b & (1<<j));
      if (bit == 0)
      {
        repeated_ones = 0;
        if (last == USB_SIGNAL_LH)
        {
          last = USB_SIGNAL_HL;
        }
        else
        {
          last = USB_SIGNAL_LH;
        }
        BUFFER[filled++] = last;
      }
      else
      {
        repeated_ones++;
        BUFFER[filled++] = last;
        if (repeated_ones == BIT_STUFFING_MAX_ONES)
        {
          repeated_ones = 0;
          available_stuffed--;
          assert(available_stuffed > 0);
          
          if (last == USB_SIGNAL_LH)
          {
            last = USB_SIGNAL_HL;
          }
          else
          {
            last = USB_SIGNAL_LH;
          }
          BUFFER[filled++] = last;
        }
      }
      assert(filled + 8 <= AVAILABLE_BITS);
    }
  }

  // EOP
  {
    // EOP (3 bits)
    BUFFER[filled++] = USB_SIGNAL_LL;
    BUFFER[filled++] = USB_SIGNAL_LL;
    BUFFER[filled++] = USB_SIGNAL_LH;

    // fill out additional bits to finish full byte
    for (int i=0; i<available_stuffed; i++)
    {
      BUFFER[filled++] = USB_SIGNAL_LH;
    }
  }

  assert((filled % 8) == 0);
  assert(filled < AVAILABLE_BITS);
  _ubb_usb_add_description(d_minus, d_plus, &BUFFER[0], filled);
}

// nice square signal for debugging
void ubb_usb_fill_square_wave(bitbang_buffer_t* d_minus, bitbang_buffer_t* d_plus)
{
  uint8_t *ptr_d_minus = d_minus->buffer;
  uint8_t *ptr_d_plus = d_plus->buffer;
  assert(ptr_d_minus != ptr_d_plus);

  size_t length = SOC_SPI_MAXIMUM_BUFFER_SIZE;
  for (size_t i=0; i<length; i++)
  {
    ptr_d_minus[i] = 0b10101010;
    ptr_d_plus[i] = 0b10101010;
  }
  d_minus->length = length*8;
  d_plus->length = length*8;
}
