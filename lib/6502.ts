export class M6502 {
	version:M6502Version;
	memSize:number;
	memory:Uint8Array;
	/** Program Counter */
	PC	= 0;
	/** Stack Pointer */
	SP	= 0;
	/** Accumulator */
	A	= 0;
	/** X index register */
	X	= 0;
	/** Y index register */
	Y	= 0;
	statusRegister = 0;
	state:M6502State;
	clockSpeed:number;

	constructor(clockSpeed:number, memSize:number, version:M6502Version = M6502Version.M6502) {
		this.version = version;
		this.state = M6502State.Stopped;
		this.memSize = memSize;
		this.memory = new Uint8Array(this.memSize);
		this.clockSpeed = clockSpeed;
		this.reset();
	}

	reset(state?:M6502State) {
		if(state !== undefined) this.state = state;
		this.PC = 0;
		this.SP = 0;
		this.A = 0;
		this.X = 0;
		this.Y = 0;
		this.statusRegister = 0;
	}

	readData(data:ArrayBuffer|ArrayBufferLike|string, readSize?:number) {
		let arr:Uint8Array;
		if(typeof data === "string") {
			arr = new Uint8Array(data.split('').map((char) => char.charCodeAt(0)));
		} else {
			arr = new Uint8Array(data);
		}
		if(readSize === undefined) readSize = arr.length;
	}

	popByte():number {
		return this.memory[this.PC++];
	}

	execute() {
		if(this.state == M6502State.Stopped)
			return this.reset();
		if(this.state == M6502State.Paused)
			return;

		let opcode = this.popByte();
		switch(opcode) {
			case M6502Opcode.ADC_ABS:
				
				break;
			
			
			default:
				throw new OpcodeError(opcode, this.PC);
				break;
		}
	}
}

/**
 * All M6502Opcode variables represent 6502 instructions, with the opcode on
 * the left of the underscore and the addressing mode (if there is more than one)
 * on the right
 */
export enum M6502Opcode {
	/** Add with carry - Absolute */
	ADC_ABS = 0x6D,
	/** Add with carry - Zero-Page */
	ADC_ZP = 0x65,
	/** Add with carry - Immediate */
	ADC_IMM = 0x69,
	/** Add with carry - Absolute, X */
	ADC_ABSX = 0x7D,
	/** Add with carry - Absolute, Y */
	ADC_ABSY = 0x79,
	/** Add with carry - (Indirect, X) */
	ADC_INDX = 0x61,
	/** Add with carry - (Indirect), Y */
	ADC_INDY = 0x71,
	/** Add with carry - Zero-Page, X */
	ADC_ZPX = 0x75,
	/** Logical AND - Absolute */
	AND_ABS = 0x2D,
	/** Logical AND - Zero-Page */
	AND_ZP = 0x25,
	/** Logical AND - Immediate */
	AND_IMM = 0x29,
	/** Logical AND - Absolute, X */
	AND_ABSX = 0x3D,
	/** Logical AND - Absolute, Y */
	AND_ABSY = 0x39,
	/** Logical AND - (Indirect, X) */
	AND_INDX = 0x21,
	/** Logical AND - (Indirect), Y */
	AND_INDY = 0x31,
	/** Logical AND - Zero-Page, X */
	AND_ZPX = 0x35,
	/** Arithmetic shift left - Accumulator */
	ASL_ACC = 0x0A,
	/** Arithmetic shift left - Absolute */
	ASL_ABS = 0x0E,
	/** Arithmetic shift left - Zero-Page */
	ASL_ZP = 0x06,
	/** Arithmetic shift left - Absolute, X */
	ASL_ABSX = 0x1e,
	/** Arithmetic shift left - Zero-Page, X */
	ASL_ZPX = 0x16,
	/** Branch on carry clear */
	BCC = 0x90,
	/** Branch on carry set */
	BCS = 0xB0,
	/** Branch if equal to zero */
	BEQ = 0xF0,
	/** Compare memory bits with accumulator - Absolute */
	BIT_ABS = 0x2C,
	/** Compare memory bits with accumulator - Zero-Page */
	BIT_ZP = 0x24,
	/** Branch on minus */
	BMI = 0x30,
	/** Branch on not equal to zero */
	BNE = 0xD0,
	/** Branch on plus */
	BPL = 0x10,
	/** Break */
	BRK = 0x00,
	/** Break on overflow clear */
	BYC = 0x50,
	/** Branch on overflow set */
	BVS = 0x70,
	/** Clear carry */
	CLC = 0x18,
	/** Clear decimal flag */
	CLD = 0xD8,
	/** Clear interrupt mask */
	CLI = 0x58,
	/** Clear overflow flag */
	CLV = 0xB8,
	/** Compare to accumulator - Absolute */
	CMP_ABS = 0xCD,
	/** Compare to accumulator - Zero-Page */
	CMP_ZP = 0xC5,
	/** Compare to accumulator - Immediate */
	CMP_IMM = 0xC9,
	/** Compare to accumulator - Absolute, X */
	CMP_ABSX = 0xD0,
	/** Compare to accumulator - Absolute, Y */
	CMP_ABSY = 0xD9,
	/** Compare to accumulator - (Indirect, X) */
	CMP_INDX = 0xC1,
	/** Compare to accumulator - (Indirect), Y */
	CMP_INDY = 0xD1,
	/** Compare to accumulator - Zero-Page, X */
	CMP_ZPX = 0xD5,
	/** Compare to X - Absolute */
	CPX_ABS = 0xEC,
	/** Compare to X - Zero-Page */
	CPX_ZP = 0xE4,
	/** Compare to X - Immediate */
	CPX_IMM = 0xE0,
	/** Compare to Y - Absolute */
	CPY_ABS = 0xCC,
	/** Compare to Y - Zero-Page */
	CPY_ZP = 0xC4,
	/** Compare to Y - Immediate */
	CPY_IMM = 0xC0,
	/** Decrement specified address - Absolute */
	DEC_ABS = 0xCE,
	/** Decrement specified address - Zero-Page */
	DEC_ZP = 0xC6,
	/** Decrement specified address - Absolute, X */
	DEC_ABSX = 0xDE,
	/** Decrement specified address - Zero-Page, X */
	DEC_ZPX = 0xDC,
	/** Decrement X */
	DEX = 0xCA,
	/** Decrement Y */
	DEY = 0x88,
}

export class OpcodeError extends Error {
	opcode:M6502Opcode;
	PC?:number;
	constructor(opcode:M6502Opcode, programCounter?:number, text?:string) {
		super(text)
		this.opcode = opcode;
		this.PC = programCounter;
	}
}

export enum M6502State {
	Stopped	= 0,
	Running	= 1 << 0,
	Paused	= 1 << 1,
	Debug	= 1 << 2
}

export enum M6502StatusFlag {
	Carry			= 0,
	/** set if the last operation = 0 */
	Zero			= 1 << 0,
	/** disables all interrupts except NMI */
	InterruptDisbl	= 1 << 1,
	/** not used by Ricoh 2A03 */
	Decimal			= 1 << 2,
	/** both this and Always1 are unused */
	Breakpoint		= 1 << 3,
	/** never used, always set to 1 */
	Always1			= 1 << 4,
	/** sometimes referred to as V */
	Overflow		= 1 << 5,
	/** set if the last operation < 0 */
	Negative		= 1 << 6
}

export enum M6502Version {
	/** MOS 6502 */
	M6502,
	/** Ricoh 2A03, used in the NES */
	R2A03,
	/** WDC 65C02 */
	W65C02
}