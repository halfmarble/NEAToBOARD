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

#include "crc.h"

// direct implementation of https://www.usb.org/sites/default/files/crcdes.pdf
// (ported C code from USB perl examples)

uint8_t crc5(uint16_t data, uint8_t bits)
{
  const uint8_t polynomial = 0b00101;
  uint8_t shift_register = 0b11111;
  for (uint8_t b=0; b<bits; b++)
  {
    uint8_t next_data_bit = (data >> (bits-b-1)) & 0b1;
    uint8_t next_shift_register_bit = (shift_register >> 4) & 0b1;
    shift_register = shift_register << 1;
    if (next_data_bit != next_shift_register_bit)
    {
        shift_register = (shift_register ^ polynomial);
    }
  }
  return (~shift_register & 0b11111);
}

uint16_t crc16(uint8_t* data, uint8_t bytes)
{
  const uint16_t polynomial = 0b1000000000000101;
	uint16_t shift_register = 0b1111111111111111;
	for (uint8_t b=0; b<bytes; b++)
   {
      uint8_t byteOfData = data[b];
      for (uint8_t bit=0; bit<8; bit++)
      {
         uint8_t next_data_bit = (byteOfData >> 7) & 0b1;
         uint8_t next_shift_register_bit = (shift_register >> 15) & 0b1;
         shift_register = (shift_register << 1);
         if (next_shift_register_bit != next_data_bit)
         {
            shift_register = (shift_register ^ polynomial);
         }
         byteOfData = (byteOfData << 1);
      }
	}
	return (~shift_register);
}
