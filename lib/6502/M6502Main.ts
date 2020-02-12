import { M6502Opcode, OpcodeError } from "./M6502Opcodes";

export class M6502 {
	state:number;
	memSize:number;
	memory:Uint8Array;
	clockSpeed:number;
	startPC:number;
	PC:number = 0x600;
	SP:number = 0;
	A:number = 0;
	X:number = 0;
	Y:number = 0;
	statusRegister:number = 0;
	romData?:Uint8Array;
	constructor(clockSpeed:number, memSize = 0x600, version = M6502Version.M6502) {
		Object.defineProperty(this, "version", {
			get: () => version
		});
		this.state = M6502State.Stopped;
		this.memSize = memSize;
		this.memory = new Uint8Array(this.memSize);
		this.clockSpeed = clockSpeed;
		this.startPC = 0x600;
		this.PC = this.startPC;
		// this.SP = 0;
		this.reset(M6502State.Running);
	}

	reset(state?:number) {
		if(state !== undefined) this.state = state;
		/** Program Counter */
		this.PC = this.startPC;
		/** Stack Pointer */
		this.SP = 0;
		/** Accumulator */
		this.A = 0;
		/** X index register */
		this.X	= 0;
		/** Y index register */
		this.Y	= 0;
		this.statusRegister = 0;
		this.memory.fill(0x0);
	}


	readData(data:any, readSize?:number, readStart = 0) {
		let arr:Uint8Array
		if(typeof data === "string") {
			arr = new Uint8Array(data.split('').map(char => char.charCodeAt(0)));
		} else {
			arr = new Uint8Array(data);
		}

		if(readSize === undefined) readSize = arr.length;
		this.romData = new Uint8Array(readSize);
		let ri = 0;
		for(let d = 0; d < readSize; d++) {
			this.romData[ri++] = arr[d];
		}
	}

	popByte() {
		return (this.memory[this.PC++] & 0xFF);
	}

	executeInstruction(newPC = this.PC) {
		if(this.state == M6502State.Stopped || this.state == M6502State.Paused)
			return;
		this.PC = newPC;
		let opcode = this.popByte();
		switch(opcode) {
			case M6502Opcode.BRK:
				this.reset(M6502State.Stopped);
				break;
			default:
				throw new OpcodeError(opcode, this.PC);
		}
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

export enum M6502State {
	Stopped	= 0,
	Running	= 1,
	Paused	= 2,
	Debug	= 4
}

export enum M6502StatusFlag {
	/** set if the last operation caused a carry */
	Carry			= 0,
	/** set if the last operation = 0 */
	Zero			= 1,
	/** disables all interrupts except NMI */
	InterruptDisbl	= 2,
	/** not used by Ricoh 2A03 */
	Decimal			= 4,
	/** both this and Always1 are unused */
	Breakpoint		= 8,
	/** never used, always set to 1 */
	Always1			= 16,
	/** sometimes referred to as V */
	Overflow		= 32,
	/** set if the last operation < 0 */
	Negative		= 64
}

export const M6502Version = {
	/** MOS 6502 */
	M6502: 1,
	/** Ricoh 2A03, used in the NES */
	R2A03: 2,
	/** WDC 65C02 */
	W65C02: 4
};