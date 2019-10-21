/**
 * All M6502Opcode variables represent 6502 instructions, with the opcode on
 * the left of the underscore and the addressing mode (if there is more than one)
 * on the right
 */
export class M6502Opcode {
	/** Add with carry - Absolute */
	ADC_ABS = 0x6D;
	/** Add with carry - Zero-Page */
	ADC_ZP = 0x65;
	/** Add with carry - Immediate */
	ADC_IMM = 0x69;
	/** Add with carry - Absolute, X */
	ADC_ABSX = 0x7D;
	/** Add with carry - Absolute, Y */
	ADC_ABSY = 0x79;
	/** Add with carry - (Indirect, X) */
	ADC_INDX = 0x61
	/** Add with carry - (Indirect), Y */
	ADC_INDY = 0x71
	/** Add with carry - Zero-Page, X */
	ADC_ZPX = 0x75
	/** Logical AND - Absolute */
	AND_ABS = 0x2D
	/** Logical AND - Zero-Page */
	AND_ZP = 0x25
	/** Logical AND - Immediate */
	AND_IMM = 0x29;
	/** Logical AND - Absolute, X */
	AND_ABSX = 0x3D;
	/** Logical AND - Absolute, Y */
	AND_ABSY = 0x39;
	/** Logical AND - (Indirect, X) */
	AND_INDX = 0x21;
	/** Logical AND - (Indirect), Y */
	AND_INDY = 0x31;
	/** Logical AND - Zero-Page, X */
	AND_ZPX = 0x35;
	/** Arithmetic shift left - Accumulator */
	ASL_ACC = 0x0A;
	/** Arithmetic shift left - Absolute */
	ASL_ABS = 0x0E;
	/** Arithmetic shift left - Zero-Page */
	ASL_ZP = 0x06;
	/** Arithmetic shift left - Absolute, X */
	ASL_ABSX = 0x1e;
	/** Arithmetic shift left - Zero-Page, X */
	ASL_ZPX = 0x16;
	/** Branch on carry clear */
	BCC = 0x90;
	/** Branch on carry set */
	BCS = 0xB0;
	/** Branch if equal to zero */
	BEQ = 0xF0;
	/** Compare memory bits with accumulator - Absolute */
	BIT_ABS = 0x2C;
	/** Compare memory bits with accumulator - Zero-Page */
	BIT_ZP = 0x24;
	/** Branch on minus */
	BMI = 0x30;
	/** Branch on not equal to zero */
	BNE = 0xD0;
	/** Branch on plus */
	BPL = 0x10;
	/** Break */
	BRK = 0x00;
	/** Break on overflow clear */
	BVC = 0x50;
	/** Branch on overflow set */
	BVS = 0x70;
	/** Clear carry */
	CLC = 0x18;
	/** Clear decimal flag */
	CLD = 0xD8;
	/** Clear interrupt mask */
	CLI = 0x58;
	/** Clear overflow flag */
	CLV = 0xB8;
	/** Compare to accumulator - Absolute */
	CMP_ABS = 0xCD;
	/** Compare to accumulator - Zero-Page */
	CMP_ZP = 0xC5;
	/** Compare to accumulator - Immediate */
	CMP_IMM = 0xC9;
	/** Compare to accumulator - Absolute, X */
	CMP_ABSX = 0xD0;
	/** Compare to accumulator - Absolute, Y */
	CMP_ABSY = 0xD9;
	/** Compare to accumulator - (Indirect, X) */
	CMP_INDX = 0xC1;
	/** Compare to accumulator - (Indirect), Y */
	CMP_INDY = 0xD1;
	/** Compare to accumulator - Zero-Page, X */
	CMP_ZPX = 0xD5;
	/** Compare to X - Absolute */
	CPX_ABS = 0xEC;
	/** Compare to X - Zero-Page */
	CPX_ZP = 0xE4;
	/** Compare to X - Immediate */
	CPX_IMM = 0xE0;
	/** Compare to Y - Absolute */
	CPY_ABS = 0xCC;
	/** Compare to Y - Zero-Page */
	CPY_ZP = 0xC4;
	/** Compare to Y - Immediate */
	CPY_IMM = 0xC0;
	/** Decrement specified address - Absolute */
	DEC_ABS = 0xCE;
	/** Decrement specified address - Zero-Page */
	DEC_ZP = 0xC6;
	/** Decrement specified address - Absolute, X */
	DEC_ABSX = 0xDE;
	/** Decrement specified address - Zero-Page, X */
	DEC_ZPX = 0xDC;
	/** Decrement X */
	DEX = 0xCA;
	/** Decrement Y */
	DEY = 0x88;
	/** Exclusive OR with accumulator - Absolute */
	EOR_ABS = 0x4D;
	/** Exclusive OR with accumulator - Zero-Page */
	EOR_ZP= 0x45;
	/** Exclusive OR with accumulator - Immediate */
	EOR_IMM = 0x49;
	/** Exclusive OR with accumulator - Absolute, X */
	EOR_ABSX = 0x5D;
	/** Exclusive OR with accumulator - Absolute, Y */
	EOR_ABSY = 0x59;
	/** Exclusive OR with accumulator - (Indirect, X) */
	EOR_INDX = 0x41;
	/** Exclusive OR with accumulator - (Indirect), Y */
	EOR_INDY = 0x51;
	/** Exclusive OR with accumulator - Zero-Page, X */
	EOR_ZPX = 0x55;
	/** Increment memory - Absolute */
	INC_ABS = 0xEE;
	/** Increment memory - Zero-Page */
	INC_ZP = 0xE6;
	/** Increment memory - Absolute, X */
	INC_ABSX = 0xFE;
	/** Increment memory - Zero-Page, X */
	INC_ZPX = 0xF6;
	/** Increment X */
	INX = 0xE8;
	/** Increment Y */
	INY = 0xC8;
	/** Jump to address - Absolute */
	JMP = 0x4C;
	/** Jump to address - Indirect */
	JMP_IND = 0x6C;
	/** Jump to subroutine */
	JSR = 0x20;
	/** Load accumulator - Absolute */
	LDA_ABS = 0xAD;
	/** Load accumulator - Zero-Page */
	LDA_ZP = 0xA5;
	/** Load accumulator - Immediate */
	LDA_IMM = 0xA9;
	/** Load accumulator - Absolute, X */
	LDA_ABSX = 0xBD;
	/** Load accumulator - Absolute, Y */
	LDA_ABSY = 0xB9;
	/** Load accumulator - (Indirect, X) */
	LDA_INDX = 0xA1;
	/** Load accumulator - (Indirect), Y */
	LDA_INDY = 0xB1;
	/** Load accumulator - Zero-Page, X */
	LDA_ZPX = 0xB5;
	/** Load X - Absolute */
	LDX_ABS = 0xAE;
	/** Load X - Zero-Page */
	LDX_ZP = 0xA6;
	/** Load X - Immediate */
	LDX_IMM = 0xA2;
	/** Load X - Absolute, Y */
	LDX_ABSY = 0xBE;
	/** Load X - Zero-Page, Y */
	LDX_ZPY = 0xB6;
	/** Load Y - Absolute */
	LDY_ABS = 0xAC;
	/** Load Y - Zero-Page */
	LDY_ZP = 0xA4;
	/** Load Y - Immediate */
	LDY_IMM = 0xA0;
	/** Load Y - Absolute, X */
	LDY_ABSX = 0xBC;
	/** Load Y - Zero-Page, X */
	LDY_ZPX = 0xB4;
	/** Logical shift right - Accumulator */
	LSR_ACC = 0x4A;
	/** Logical shift right - Absolute */
	LSR_ABS = 0x4E;
	/** Logical shift right - Zero-Page */
	LSR_ZP = 0x46;
	/** Logical shift right - Absolute, X */
	LSR_ABSX = 0x5E;
	/** Logical shift right - Zero-Page, X */
	LSR_ZPX = 0x56;
	/** No operation */
	NOP = 0xEA;
	/** Inclusive OR with accumulator - Absolute */
	ORA_ABS = 0x0D;
	/** Inclusive OR with accumulator - Zero-Page */
	ORA_ZP = 0x05;
	/** Inclusive OR with accumulator - Immediate */
	ORA_IMM = 0x09;
	/** Inclusive OR with accumulator - Absolute, X */
	ORA_ABSX = 0x1D;
	/** Inclusive OR with accumulator - Absolute, Y */
	ORA_ABSY = 0x19;
	/** Inclusive OR with accumulator - (Indirect, X) */
	ORA_INDX = 0x01;
	/** Inclusive OR with accumulator - (Indirect), Y */
	ORA_INDY = 0x11;
	/** Inclusive OR with accumulator - Zero-Page, X */
	ORA_ZPX = 0x15;
	/** Push accumulator onto stack */
	PHA = 0x48;
	/** Push processor status onto stack */
	PHP = 0x08;
	/** Pull accumulator into accumulator */
	PLA = 0x68;
	/** Pull processor status from stack */
	PLP = 0x28;
	/** Rotate left one bit - Accumulator */
	ROL_ACC = 0x2A;
	/** Rotate left one bit - Absolute */
	ROL_ABS = 0x2E;
	/** Rotate left one bit - Zero-Page */
	ROL_ZP = 0x26;
	/** Rotate left one bit - Absolute, X */
	ROL_ABSX = 0x3E;
	/** Rotate left one bit - Zero-Page, X */
	ROL_ZPX = 0x36;
	/** Rotate right one bit - Accumulator */
	ROR_ACC = 0x6A;
	/** Rotate right one bit - Absolute */
	ROR_ABS = 0x6E;
	/** Rotate right one bit - Zero-Page */
	ROR_ZP = 0x66;
	/** Rotate right one bit - Absolute, X */
	ROR_ABSX = 0x7E;
	/** Rotate right one bit - Zero-Page, X */
	ROR_ZPX = 0x76;
	/** Return from interrupt */
	RTI = 0x40;
	/** Return from subroutine */
	RTS = 0x60;
	/** Subtract with carry - Absolute */
	SBC_ABS = 0xED;
	/** Subtract with carry - Zero-Page */
	SBC_ZP = 0xE5;
	/** Subtract with carry - Immediate */
	SBC_IMM = 0xE9;
	/** Subtract with carry - Absolute, X */
	SBC_ABSX = 0xFD;
	/** Subtract with carry - Absolute, Y */
	SBC_ABSY = 0xF9;
	/** Subtract with carry - (Indirect, X) */
	SBC_INDX = 0xE1;
	/** Subtract with carry - (Indirect), Y */
	SBC_INDY = 0xF1;
	/** Subtract with carry - Zero-Page, X */
	SBC_ZPX = 0xF5;
	/** Set carry flag */
	SEC = 0x38;
	/** Set decimal flag */
	SED = 0xF8;
	/** Set interrupt disable flag */
	SEI = 0x78;
	/** Store accumulator in memory - Absolute */
	STA_ABS = 0x8D;
	/** Store accumulator in memory - Zero-Page */
	STA_ZP = 0x85;
	/** Store accumulator in memory - Absolute, X */
	STA_ABSX = 0x9D;
	/** Store accumulator in memory - Absolute, Y */
	STA_ABSY = 0x99;
	/** Store accumulator in memory - (Indirect, X) */
	STA_INDX = 0x81;
	/** Store accumulator in memory - (Indirect), Y */
	STA_INDY = 0x91;
	/** Store accumulator in memory - Zero-Page, X */
	STA_ZPX = 0x95;
	/** Store X in memory - Absolute */
	STX_ABS = 0xBE;
	/** Store X in memory - Zero-Page */
	STX_ZP = 0x86;
	/** Store X in memory - Zero-Page, Y */
	STX_ZPY = 0x96;
	/** Store Y in memory - Absolute */
	STY_ABS = 0x8C;
	/** Store Y in memory - Zero-Page */
	STY_ZP = 0x84;
	/** Store Y in memory - Zero-Page, X */
	STY_ZPX = 0x94;
	/** Transfer accumulator into X */
	TAX = 0xAA;
	/** Transfer accumulator into Y */
	TAY = 0xA8;
	/** Transfer stack pointer into X */
	TSX = 0xBA;
	/** Transfer X into accumulator */
	TXA = 0x8A;
	/** Transfer X into stack pointer */
	TXS = 0x9A;
	/** Transfer Y into accumulator */
	TYA = 0x98;
}


/** Thrown when the emulator tries to run an unrecognized opcode */
export class OpcodeError extends Error {
	constructor(opcode , programCounter = 0, text = "") {
		super(text)
		this.opcode = opcode;
		this.PC = programCounter;
	}
}