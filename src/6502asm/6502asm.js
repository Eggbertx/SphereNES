import { M6502, M6502Opcode, M6502Version, OpcodeError } from '6502/M6502';

let display = new Array(0x400);
const palette = [
	Color.of("#000000"), Color.of("#ffffff"), Color.of("#880000"), Color.of("#aaffee"),
	Color.of("#cc44cc"), Color.of("#00cc55"), Color.of("#0000aa"), Color.of("#eeee77"),
	Color.of("#dd8855"), Color.of("#664400"), Color.of("#ff7777"), Color.of("#333333"),
	Color.of("#777777"), Color.of("#aaff66"), Color.of("#0088ff"), Color.of("#bbbbbb")
];

// An implementation of the 6502 emulator at 6502asm.com, completely from scratch
export class M6502ASM extends M6502 {
	constructor(filename) {
		super(60, 0x100, M6502Version.M6502);
	}
}