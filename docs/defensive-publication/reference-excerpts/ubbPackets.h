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

#include <stdint.h>
#include <stddef.h>

#include "sdkconfig.h"
#include "esp_attr.h"

#include "bitbangSPI.h"

#ifdef __cplusplus
extern "C"
{
#endif

#define UBB_USB_ATTR_PACKED __attribute__((packed))

  typedef enum ubb_usb_bit_desc_t
  {
    USB_SIGNAL_LL = 1,
    USB_SIGNAL_LH = 2,
    USB_SIGNAL_HL = 3,
    USB_SIGNAL_HH = 4,
    USB_SIGNAL_IDLE = USB_SIGNAL_LH,
    USB_SIGNAL_ILLEGAL = USB_SIGNAL_HH,
  }
  ubb_usb_bit_desc_t;

  // https://www.usbmadesimple.co.uk/ums_7.htm#sof_pkt
  typedef struct UBB_USB_ATTR_PACKED ubb_usb_sof_packet_t
  {
    uint8_t bSync;
    uint8_t bPID;
    union
    {
      struct UBB_USB_ATTR_PACKED
      {
#if __BYTE_ORDER__ == __ORDER_LITTLE_ENDIAN__
        uint16_t crc : 5;
        uint16_t frame_number : 11;
#else
      uint16_t frame_number : 11;
      uint16_t crc : 5;
#endif
      } bmData_bit;
      uint16_t bmData;
    };
    // 3bit EOP [00J] + 5bit filler of IDLE
  } ubb_usb_sof_packet_t;

  // https://www.usbmadesimple.co.uk/ums_7.htm#token_pkt
  typedef struct UBB_USB_ATTR_PACKED ubb_usb_token_packet_t
  {
    uint8_t bSync;
    uint8_t bPID;
    union
    {
      struct UBB_USB_ATTR_PACKED
      {
#if __BYTE_ORDER__ == __ORDER_LITTLE_ENDIAN__
        uint16_t crc : 5;
        uint16_t endp : 4;
        uint16_t addr : 7;
#else
      uint16_t addr : 7;
      uint16_t endp : 4;
      uint16_t crc : 5;
#endif
      } bmData_bit;
      uint16_t bmData;
    };
    // 3bit EOP [00J] + 5bit filler of IDLE
  } ubb_usb_token_packet_t;

  // https://www.usbmadesimple.co.uk/ums_7.htm#data_pkt
  typedef struct UBB_USB_ATTR_PACKED ubb_usb_device_request_packet_t
  {
    uint8_t bSync;
    uint8_t bPID;
    union
    {
      struct UBB_USB_ATTR_PACKED
      {
#if __BYTE_ORDER__ == __ORDER_LITTLE_ENDIAN__
        uint8_t recipient : 5;
        uint8_t type : 2;
        uint8_t data_transfer_direction : 1;
#else
        uint8_t data_transfer_direction : 1;
        uint8_t type : 2;
        uint8_t recipient : 5;
#endif
      } bmRequestType_bit;
      uint8_t bmRequestType;
    };
    uint8_t bRequest;
    uint16_t wValue;
    uint16_t wIndex;
    uint16_t wLength;
    uint16_t wCRC16;
    // 3bit EOP [00J] + 5bit filler of IDLE
  } ubb_usb_device_request_packet_t;

  // https://www.usbmadesimple.co.uk/ums_7.htm#handshake_pkt
  typedef struct UBB_USB_ATTR_PACKED ubb_usb_handshake_packet_t
  {
    uint8_t bSync;
    uint8_t bPID;
    // 3bit EOP [00J] + 5bit filler of IDLE
  } ubb_usb_handshake_packet_t;

  typedef struct UBB_USB_ATTR_PACKED ubb_usb_empty_data_packet_t
  {
    uint8_t bSync;
    uint8_t bPID;
    uint16_t wCRC16;
    // 3bit EOP [00J] + 5bit filler of IDLE
  } ubb_usb_empty_data_packet_t;

void ubb_usb_sof_packet(ubb_usb_sof_packet_t* p);

void ubb_usb_setup_address_packet(ubb_usb_token_packet_t* p, uint8_t addr, uint8_t endp);
void ubb_usb_setup_in_address_packet(ubb_usb_token_packet_t* p, uint8_t addr, uint8_t endp);

void ubb_usb_setup_address_data_packet(ubb_usb_device_request_packet_t* p, uint16_t wValue, uint16_t wIndex, uint16_t wLength);
void ubb_usb_setup_empty_data_packet(ubb_usb_empty_data_packet_t* p);

ubb_usb_handshake_packet_t ubb_usb_get_ack_packet(void);
ubb_usb_handshake_packet_t ubb_usb_get_nak_packet(void);

// adds bytes from packets to buffers
void ubb_usb_add_data(bitbang_buffer_t* d_minus, bitbang_buffer_t* d_plus, uint8_t* data, size_t length);

// nice square signal for debugging
void ubb_usb_fill_square_wave(bitbang_buffer_t* d_minus, bitbang_buffer_t* d_plus);

#ifdef __cplusplus
}
#endif
