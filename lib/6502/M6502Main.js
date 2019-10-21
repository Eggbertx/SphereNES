export class M6502 {
	constructor(clockSpeed, memSize, version = M6502Version.M6502) {
		Object.defineProperties(this, "version", {
			get: () => version
		});
		this.state = M6502State.Stopped;
		this.memSize = memSize;
		this.memory = new Uint8Array(this.memSize);
		this.clockSpeed = clockSpeed;
		this.reset();
	}

	reset(state) {
		if(state !== undefined) this.state = state;
		/** Program Counter */
		this.PC = 0;
		/** Stack Pointer */
		this.SP = 0;
		/** Accumulator */
		this.A = 0;
		/** X index register */
		this.X	= 0;
		/** Y index register */
		this.Y	= 0;
		this.statusRegister = 0;
	}

	readData(data, readSize) {
		let arr;
		if(typeof data === "string") {
			arr = new Uint8Array(data.split('').map((char) => char.charCodeAt(0)));
		} else {
			arr = new Uint8Array(data);
		}
		if(readSize === undefined) readSize = arr.length;
	}

	popByte() {
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


export class M6502State {
	Stopped	= 0;
	Running	= 1 << 0;
	Paused	= 1 << 1;
	Debug	= 1 << 2;
}

export const M6502StatusFlag = {
	/** set if the last operation caused a carry */
	Carry:			0,
	/** set if the last operation = 0 */
	Zero:			1 << 0,
	/** disables all interrupts except NMI */
	InterruptDisbl:	1 << 1,
	/** not used by Ricoh 2A03 */
	Decimal:		1 << 2,
	/** both this and Always1 are unused */
	Breakpoint:		1 << 3,
	/** never used, always set to 1 */
	Always1:		1 << 4,
	/** sometimes referred to as V */
	Overflow:		1 << 5,
	/** set if the last operation < 0 */
	Negative:		1 << 6
}

export const M6502Version = {
	/** MOS 6502 */
	M6502: 1,
	/** Ricoh 2A03, used in the NES */
	R2A03: 2,
	/** WDC 65C02 */
	W65C02: 4
};