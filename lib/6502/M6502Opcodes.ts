/*
 Opcode addressing mode key:
 (no addressing mode in name): Implied, ex: TXA
 ABS: Absolute, ex: LDA $0123
 ABSX: Absolute indexed - X, ex: LDA $0123,X
 ABSY: Absolute indexed - Y, ex: LDA $0123,Y
 IMM: Immediate, ex: LDA #$01
 IND: Indirect, ex: JMP ($1234)
 INDX: Indexed indirect, ex: LDA ($00, X)
 INDY: Indirect indexed, ex: LDA ($00), Y
 ZP: $Zero-page
 ZPX: $Zero-page, X
 ZPY: $Zero-page, Y
 */


/**
 * All M6502Opcode variables represent 6502 instructions, with the opcode on
 * the left of the underscore and the addressing mode (if there is more than one)
 * on the right
 * 
 * Addressing modes:
 * - Implied (1 byte): Doesn't take any parameters (CLC, TXA, DEX, etc)
 * - Immediate (2 bytes): Uses an 8-bit constant as the value, ex: LDA #$02
 * - Absolute (2 bytes): 1 byte for the opcode and 2 for the address
 * - Zero-Page (2 bytes): 1 byte for the opcode and 1 byte for the address.
 *   Zero page is often used as 256 extra registers
 * - Relative (2 bytes): 1 byte for a jump instruction and 1 byte for the displacement
 * - Indirect (3 bytes): Only used by JMP, like absolute but new address is taken from the value at $nn,$nn +1
 * - Indexed Indirect: like indirect, but new address = ($nn + x, $nn + x + 1)
 * - Indirect Indexed: like indirect, but new address = (value at $nn, $nn + 1) + y
 * - Absolute Indexed: like absolute, but new address = $nnnn + X/Y
 */
export enum M6502Opcode {
	/** 0x6D: Add with carry - Absolute */
	ADC_ABS = 0x6D,
	/** 0x65: Add with carry - Zero-Page */
	ADC_ZP = 0x65,
	/** 0x69: Add with carry - Immediate */
	ADC_IMM = 0x69,
	/** 0x7D: Add with carry - AbsoluteIndexed, X */
	ADC_ABSX = 0x7D,
	/** 0x79: Add with carry - AbsoluteIndexed, Y */
	ADC_ABSY = 0x79,
	/** 0x61: Add with carry - (Indirect, X) */
	ADC_INDX = 0x61,
	/** 0x71: Add with carry - (Indirect), Y */
	ADC_INDY = 0x71,
	/** 0x75: Add with carry - Zero-Page, X */
	ADC_ZPX = 0x75,
	/** 0x2D: Logical AND - Absolute */
	AND_ABS = 0x2D,
	/** 0x25: Logical AND - Zero-Page */
	AND_ZP = 0x25,
	/** 0x29: Logical AND - Immediate */
	AND_IMM = 0x29,
	/** 0x3D: Logical AND - AbsoluteIndexed, X */
	AND_ABSX = 0x3D,
	/** 0x39: Logical AND - AbsoluteIndexed, Y */
	AND_ABSY = 0x39,
	/** 0x21: Logical AND - (Indirect, X) */
	AND_INDX = 0x21,
	/** 0x31: Logical AND - (Indirect), Y */
	AND_INDY = 0x31,
	/** 0x35: Logical AND - Zero-Page, X */
	AND_ZPX = 0x35,
	/** 0x0A: Arithmetic shift left - Accumulator */
	ASL_ACC = 0x0A,
	/** 0x0E: Arithmetic shift left - Absolute */
	ASL_ABS = 0x0E,
	/** 0x06: Arithmetic shift left - Zero-Page */
	ASL_ZP = 0x06,
	/** 0x1E: Arithmetic shift left - AbsoluteIndexed, X */
	ASL_ABSX = 0x1E,
	/** 0x16: Arithmetic shift left - Zero-Page, X */
	ASL_ZPX = 0x16,
	/** 0x90: Branch on carry clear */
	BCC = 0x90,
	/** 0xB0: Branch on carry set */
	BCS = 0xB0,
	/** 0xF0: Branch if equal to zero, Relative */
	BEQ = 0xF0,
	/** 0x2C: Compare memory bits with accumulator - Absolute */
	BIT_ABS = 0x2C,
	/** 0x24: Compare memory bits with accumulator - Zero-Page */
	BIT_ZP = 0x24,
	/** 0x30: Branch on minus */
	BMI = 0x30,
	/** 0xD0: Branch on not equal to zero */
	BNE = 0xD0,
	/** 0x10: Branch on plus */
	BPL = 0x10,
	/** 0x00: Break */
	BRK = 0x00,
	/** 0x50: Break on overflow clear */
	BVC = 0x50,
	/** 0x70: Branch on overflow set */
	BVS = 0x70,
	/** 0x18: Clear carry */
	CLC = 0x18,
	/** 0xD8: Clear decimal flag */
	CLD = 0xD8,
	/** 0x58: Clear interrupt mask */
	CLI = 0x58,
	/** 0xB8: Clear overflow flag */
	CLV = 0xB8,
	/** 0xCD: Compare to accumulator - Absolute */
	CMP_ABS = 0xCD,
	/** 0xC5: Compare to accumulator - Zero-Page */
	CMP_ZP = 0xC5,
	/** 0xC9: Compare to accumulator - Immediate */
	CMP_IMM = 0xC9,
	/** 0xD0: Compare to accumulator - AbsoluteIndexed, X */
	CMP_ABSX = 0xD0,
	/** 0xD9: Compare to accumulator - AbsoluteIndexed, Y */
	CMP_ABSY = 0xD9,
	/** 0xC1: Compare to accumulator - (Indirect, X) */
	CMP_INDX = 0xC1,
	/** 0xD1: Compare to accumulator - (Indirect), Y */
	CMP_INDY = 0xD1,
	/** 0xD5: Compare to accumulator - Zero-Page, X */
	CMP_ZPX = 0xD5,
	/** 0xEC: Compare to X - Absolute */
	CPX_ABS = 0xEC,
	/** 0xE4: Compare to X - Zero-Page */
	CPX_ZP = 0xE4,
	/** 0xE0: Compare to X - Immediate */
	CPX_IMM = 0xE0,
	/** 0xCC: Compare to Y - Absolute */
	CPY_ABS = 0xCC,
	/** 0xC4: Compare to Y - Zero-Page */
	CPY_ZP = 0xC4,
	/** 0xC0: Compare to Y - Immediate */
	CPY_IMM = 0xC0,
	/** 0xCE: Decrement specified address - Absolute */
	DEC_ABS = 0xCE,
	/** 0xC6: Decrement specified address - Zero-Page */
	DEC_ZP = 0xC6,
	/** 0xDE: Decrement specified address - AbsoluteIndexed, X */
	DEC_ABSX = 0xDE,
	/** 0xDC: Decrement specified address - Zero-Page, X */
	DEC_ZPX = 0xDC,
	/** 0xCA: Decrement X */
	DEX = 0xCA,
	/** 0x88: Decrement Y */
	DEY = 0x88,
	/** 0x4D: Exclusive OR with accumulator - Absolute */
	EOR_ABS = 0x4D,
	/** 0x45: Exclusive OR with accumulator - Zero-Page */
	EOR_ZP = 0x45,
	/** 0x49: Exclusive OR with accumulator - Immediate */
	EOR_IMM = 0x49,
	/** 0x5D: Exclusive OR with accumulator - AbsoluteIndexed, X */
	EOR_ABSX = 0x5D,
	/** 0x59: Exclusive OR with accumulator - AbsoluteIndexed, Y */
	EOR_ABSY = 0x59,
	/** 0x41: Exclusive OR with accumulator - (Indirect, X) */
	EOR_INDX = 0x41,
	/** 0x51: Exclusive OR with accumulator - (Indirect), Y */
	EOR_INDY = 0x51,
	/** 0x55: Exclusive OR with accumulator - Zero-Page, X */
	EOR_ZPX = 0x55,
	/** 0xEE: Increment memory - Absolute */
	INC_ABS = 0xEE,
	/** 0xE6: Increment memory - Zero-Page */
	INC_ZP = 0xE6,
	/** 0xFE: Increment memory - AbsoluteIndexed, X */
	INC_ABSX = 0xFE,
	/** 0xF6: Increment memory - Zero-Page, X */
	INC_ZPX = 0xF6,
	/** 0xE8: Increment X */
	INX = 0xE8,
	/** 0xC8: Increment Y */
	INY = 0xC8,
	/** 0x4C: Jump to address - Absolute */
	JMP = 0x4C,
	/** 0x6C: Jump to address - Indirect */
	JMP_IND = 0x6C,
	/** 0x20: Jump to subroutine */
	JSR = 0x20,
	/** 0xAD: Load accumulator - Absolute */
	LDA_ABS = 0xAD,
	/** 0xA5: Load accumulator - Zero-Page */
	LDA_ZP = 0xA5,
	/** 0xA9: Load accumulator - Immediate */
	LDA_IMM = 0xA9,
	/** 0xBD: Load accumulator - AbsoluteIndexed, X */
	LDA_ABSX = 0xBD,
	/** 0xB9: Load accumulator - AbsoluteIndexed, Y */
	LDA_ABSY = 0xB9,
	/** 0xA1: Load accumulator - (Indirect, X) */
	LDA_INDX = 0xA1,
	/** 0xB1: Load accumulator - (Indirect), Y */
	LDA_INDY = 0xB1,
	/** 0xB5: Load accumulator - Zero-Page, X */
	LDA_ZPX = 0xB5,
	/** 0xAE: Load X - Absolute */
	LDX_ABS = 0xAE,
	/** 0xA6: Load X - Zero-Page */
	LDX_ZP = 0xA6,
	/** 0xA2: Load X - Immediate */
	LDX_IMM = 0xA2,
	/** 0xBE: Load X - AbsoluteIndexed, Y */
	LDX_ABSY = 0xBE,
	/** 0xB6: Load X - Zero-Page, Y */
	LDX_ZPY = 0xB6,
	/** 0xAC: Load Y - Absolute */
	LDY_ABS = 0xAC,
	/** 0xA4: Load Y - Zero-Page */
	LDY_ZP = 0xA4,
	/** 0xA0: Load Y - Immediate */
	LDY_IMM = 0xA0,
	/** 0xBC: Load Y - AbsoluteIndexed, X */
	LDY_ABSX = 0xBC,
	/** 0xB4: Load Y - Zero-Page, X */
	LDY_ZPX = 0xB4,
	/** 0x4A: Logical shift right - Accumulator */
	LSR_ACC = 0x4A,
	/** 0x4E: Logical shift right - Absolute */
	LSR_ABS = 0x4E,
	/** 0x46: Logical shift right - Zero-Page */
	LSR_ZP = 0x46,
	/** 0x5E: Logical shift right - AbsoluteIndexed, X */
	LSR_ABSX = 0x5E,
	/** 0x56: Logical shift right - Zero-Page, X */
	LSR_ZPX = 0x56,
	/** 0xEA: No operation */
	NOP = 0xEA,
	/** 0x0D: Inclusive OR with accumulator - Absolute */
	ORA_ABS = 0x0D,
	/** 0x05: Inclusive OR with accumulator - Zero-Page */
	ORA_ZP = 0x05,
	/** 0x09: Inclusive OR with accumulator - Immediate */
	ORA_IMM = 0x09,
	/** 0x1D: Inclusive OR with accumulator - AbsoluteIndexed, X */
	ORA_ABSX = 0x1D,
	/** 0x19: Inclusive OR with accumulator - AbsoluteIndexed, Y */
	ORA_ABSY = 0x19,
	/** 0x01: Inclusive OR with accumulator - (Indirect, X) */
	ORA_INDX = 0x01,
	/** 0x11: Inclusive OR with accumulator - (Indirect), Y */
	ORA_INDY = 0x11,
	/** 0x15: Inclusive OR with accumulator - Zero-Page, X */
	ORA_ZPX = 0x15,
	/** 0x48: Push accumulator onto stack */
	PHA = 0x48,
	/** 0x08: Push processor status onto stack */
	PHP = 0x08,
	/** 0x68: Pull accumulator into accumulator */
	PLA = 0x68,
	/** 0x28: Pull processor status from stack */
	PLP = 0x28,
	/** 0x2A: Rotate left one bit - Accumulator */
	ROL_ACC = 0x2A,
	/** 0x2E: Rotate left one bit - Absolute */
	ROL_ABS = 0x2E,
	/** 0x26: Rotate left one bit - Zero-Page */
	ROL_ZP = 0x26,
	/** 0x3E: Rotate left one bit - AbsoluteIndexed, X */
	ROL_ABSX = 0x3E,
	/** 0x36: Rotate left one bit - Zero-Page, X */
	ROL_ZPX = 0x36,
	/** 0x6A: Rotate right one bit - Accumulator */
	ROR_ACC = 0x6A,
	/** 0x6E: Rotate right one bit - Absolute */
	ROR_ABS = 0x6E,
	/** 0x66: Rotate right one bit - Zero-Page */
	ROR_ZP = 0x66,
	/** 0x7E: Rotate right one bit - AbsoluteIndexed, X */
	ROR_ABSX = 0x7E,
	/** 0x76: Rotate right one bit - Zero-Page, X */
	ROR_ZPX = 0x76,
	/** 0x40: Return from interrupt */
	RTI = 0x40,
	/** 0x60: Return from subroutine */
	RTS = 0x60,
	/** 0xED: Subtract with carry - Absolute */
	SBC_ABS = 0xED,
	/** 0xE5: Subtract with carry - Zero-Page */
	SBC_ZP = 0xE5,
	/** 0xE9: Subtract with carry - Immediate */
	SBC_IMM = 0xE9,
	/** 0xFD: Subtract with carry - AbsoluteIndexed, X */
	SBC_ABSX = 0xFD,
	/** 0xF9: Subtract with carry - AbsoluteIndexed, Y */
	SBC_ABSY = 0xF9,
	/** 0xE1: Subtract with carry - (Indirect, X) */
	SBC_INDX = 0xE1,
	/** 0xF1: Subtract with carry - (Indirect), Y */
	SBC_INDY = 0xF1,
	/** 0xF5: Subtract with carry - Zero-Page, X */
	SBC_ZPX = 0xF5,
	/** 0x38: Set carry flag */
	SEC = 0x38,
	/** 0xF8: Set decimal flag */
	SED = 0xF8,
	/** 0x78: Set interrupt disable flag */
	SEI = 0x78,
	/** 0x8D: Store accumulator in memory - Absolute */
	STA_ABS = 0x8D,
	/** 0x85: Store accumulator in memory - Zero-Page */
	STA_ZP = 0x85,
	/** 0x9D: Store accumulator in memory - AbsoluteIndexed, X */
	STA_ABSX = 0x9D,
	/** 0x99: Store accumulator in memory - AbsoluteIndexed, Y */
	STA_ABSY = 0x99,
	/** 0x81: Store accumulator in memory - (Indirect, X) */
	STA_INDX = 0x81,
	/** 0x91: Store accumulator in memory - (Indirect), Y */
	STA_INDY = 0x91,
	/** 0x95: Store accumulator in memory - Zero-Page, X */
	STA_ZPX = 0x95,
	/** 0xBE: Store X in memory - Absolute */
	STX_ABS = 0xBE,
	/** 0x86: Store X in memory - Zero-Page */
	STX_ZP = 0x86,
	/** 0x96: Store X in memory - Zero-Page, Y */
	STX_ZPY = 0x96,
	/** 0x8C: Store Y in memory - Absolute */
	STY_ABS = 0x8C,
	/** 0x84: Store Y in memory - Zero-Page */
	STY_ZP = 0x84,
	/** 0x94: Store Y in memory - Zero-Page, X */
	STY_ZPX = 0x94,
	/** 0xAA: Transfer accumulator into X */
	TAX = 0xAA,
	/** 0xA8: Transfer accumulator into Y */
	TAY = 0xA8,
	/** 0xBA: Transfer stack pointer into X */
	TSX = 0xBA,
	/** 0x8A: Transfer X into accumulator */
	TXA = 0x8A,
	/** 0x9A: Transfer X into stack pointer */
	TXS = 0x9A,
	/** 0x98: Transfer Y into accumulator */
	TYA = 0x98
}

/** Thrown when the emulator tries to run an unrecognized opcode */
export class OpcodeError extends Error {
	opcode:number;
	PC:number;
	constructor(opcode:number, programCounter = 0, text = `Invalid opcode at $${programCounter.toString(16)}: $${opcode.toString(16)}`) {
		super(text);
		this.opcode = opcode;
		this.PC = programCounter;
	}
}