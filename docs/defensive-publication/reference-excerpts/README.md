# Reference-implementation excerpts

These files are **excerpts** from the author's private *ubbUSB* project (an Espressif
ESP-IDF / PlatformIO firmware experiment), included to make the accompanying defensive
publication — [`../DEFENSIVE_PUBLICATION.md`](../DEFENSIVE_PUBLICATION.md),
DOI [10.5281/zenodo.20558155](https://doi.org/10.5281/zenodo.20558155) — *enabling* on its
core claims.

They are provided **as-is, under the Apache License 2.0** (see the header in each file),
and are **not a standalone-buildable project**: the full ubbUSB project additionally
contains the transmit task, the top-level USB state machine, utility headers, and the
PlatformIO/ESP-IDF build files, which are not reproduced here.

| File | Role in the disclosed technique |
|------|---------------------------------|
| `bitbangSPI.c` / `bitbangSPI.h` | Dual independent SPI-controller init (`bitbang_init`); fixed compensating MOSI delay (`delay` branch); brute-force clock search (`setup_clock`); **fenced back-to-back synchronized start** (`bitbang_write_impl`). |
| `ubbPackets.c` / `ubbPackets.h` | NRZI + bit-stuffing + EOP/framing encoder; splitting per-bit D−/D+ line-state pairs into the two per-line serializer buffers (`ubb_usb_add_data`, `_ubb_usb_add_description`). |
| `crc.c` / `crc.h` | USB CRC5 (token) and CRC16 (data) per the USB specification. |

The synchronized-start core is in `bitbangSPI.c`, function `bitbang_write_impl`: a
`excw; isync; dsync; esync;` fence and NOP padding immediately precede the two back-to-back
writes of the SPI "user start" bit to each controller's command register, after which the
fixed MOSI delay configured in `bitbang_init` cancels the resulting one-instruction skew.
