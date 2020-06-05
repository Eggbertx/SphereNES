# SphereNES

A not-yet-operational NES/65xx emulator in the miniSphere game engine with a set of modules for retargetable [6502](https://en.wikipedia.org/wiki/MOS_Technology_6502)-based processor emulation, with an initial focus on the NES ( with the Ricoh 2A03 CPU)

## Building
SphereNES requires TypeScript to be installed in the project directory in order to build it. To install it, run `npm install typescript`. An explicit node project is unnecessary in this directory (at least for the time being), since initial focus will be on the miniSphere game engine, and all miniSphere project transpilation is handled by the supplied `cell` utility.



To build SphereNES itself, run `cell`

## Credits
The `lib/hello.nes` ROM is used for testing SphereNES and was compiled from the [cc65](https://github.com/cc65/cc65) hello.c sample. It and the rest of the cc65 codebase are under the terms of the zlib license.
`roms/alive` comes from http://6502asm.com. I'm not sure what the license is there.