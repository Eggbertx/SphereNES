# SphereNES

A not-yet-operational NES emulator in the miniSphere game engine with a retargetable [6502](https://en.wikipedia.org/wiki/MOS_Technology_6502) module

As with my [gameoflife-miniSphere](https://github.com/Eggbertx/gameoflife-minisphere) project, I'm including the cell and types directories for transpiling from TypeScript to JavaScript until they're officially added to the next miniSphere release.


The `lib/hello.nes` ROM is used for testing SphereNES and was compiled from the [cc65](https://github.com/cc65/cc65) hello.c sample. It and the rest of the cc65 codebase are under the terms of the zlib license.