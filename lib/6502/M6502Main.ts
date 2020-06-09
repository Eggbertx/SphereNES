import { M6502Opcode, OpcodeError } from "./M6502Opcodes";

export class M6502 {
	state:number;
	memSize:number;
	memory:Uint8Array;
	clockSpeed:number;
	/** Initial program counter */
	startPC:number;
	/** Program counter */
	PC:number = 0x600;
	/** Stack pointer */
	SP:number = 0;
	/** Accumulator */
	A:number = 0;
	/** X index register */
	X:number = 0;
	/** Y index register */
	Y:number = 0;
	statusRegister:number = 0;
	romData?:Uint8Array;
	log:(msg:string)=>any;
	protected _version:M6502Version;
	public get version():M6502Version {
		return this._version;
	}
	constructor(clockSpeed:number, memSize = 0x800, version = M6502Version.M6502, loggingFunction?:(msg:string)=>any) {
		this._version = version;
		this.state = M6502State.Stopped;
		this.memSize = memSize;
		this.memory = new Uint8Array(this.memSize);
		this.clockSpeed = clockSpeed;
		this.startPC = 0x600;
		this.PC = this.startPC;
		if(!loggingFunction)
			loggingFunction = (msg:string)=>{};
		this.log = loggingFunction;
		this.reset(M6502State.Stopped);
	}

	reset(state?:number) {
		if(state !== undefined) this.state = state;
		this.PC = this.startPC;
		this.SP = 0;
		this.A = 0;
		this.X	= 0;
		this.Y	= 0;
		this.statusRegister = 0;
		this.memory.fill(0x0);
	}

	readData(data:ArrayLike<any>, readSize?:number, readStart = 0) {
		let arr:Uint8Array
		if(typeof data === "string") {
			arr = new Uint8Array(data.split('').map(char => char.charCodeAt(0)));
		} else {
			arr = new Uint8Array(data);
		}

		if(readSize === undefined) readSize = arr.length;
		if(this.romData === undefined)
			this.romData = new Uint8Array(readSize);
		let ri = 0;
		for(let d = 0; d < readSize; d++) {
			this.romData[ri++] = arr[d];
			this.memory
		}
	}

	popByte():number {
		return (this.memory[this.PC++] & 0xFF);
	}

	pushByte(byte:number) {
		this.memory[this.PC++] = byte & 0xFF;
	}

	popWord():number {
		return this.popByte() + (this.popByte() << 8);
	}

	pushWord(byte:number) {
		this.pushByte(byte & 0xFF);
		this.pushByte((byte >> 8) & 0xFF);
	}

	executeAt(newPC:number) {
		if(this.state == M6502State.Stopped || this.state == M6502State.Paused)
			return;
		this.PC = newPC;
		this.execute();
	}

	execute() {
		if(this.state == M6502State.Stopped)
			return this.reset();
		if(this.state == M6502State.Paused)
			return;

		let opcode = this.popByte();
		this.log(`Opcode: ${opcode}`);
		switch(opcode) {
			case M6502Opcode.ADC_ABS:
				
				break;
			
			
			default:
				throw new OpcodeError(opcode, this.PC);
		}
	}
	run() {
		while(this.state == M6502State.Running) {
			this.execute();
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
	Carry			= 1,
	/** set if the last operation = 0 */
	Zero			= 2,
	/** disables all interrupts except NMI */
	InterruptDisbl	= 4,
	/** not used by Ricoh 2A03 */
	Decimal			= 8,
	/** both this and Always1 are unused */
	Breakpoint		= 16,
	/** never used, always set to 1 */
	Always1			= 32,
	/** sometimes referred to as V */
	Overflow		= 64,
	/** set if the last operation < 0 */
	Negative		= 128
}

export enum M6502Version {
	/** MOS 6502 */
	M6502 = 1,
	/** Ricoh 2A03, used in the NES */
	R2A03 = 2,
	/** WDC 65C02 */
	W65C02 = 4
};