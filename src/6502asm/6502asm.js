import { M6502, M6502Opcode, M6502Version, OpcodeError } from '6502/M6502';


// An implementation of the 6502 emulator at 6502asm.com
export class M6502ASM extends M6502 {
	constructor(filename) {
		super(60, 0x100, M6502Version.M6502);
	}
}