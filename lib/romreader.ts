import { DataStream, Console } from 'sphere-runtime'
import { M6502 } from "6502/M6502";

export abstract class ROMReader {
	stream:DataStream;
	path:string;
	constructor(path:string) {
		this.path = path;
		this.stream = new DataStream(path, FileOp.Read);
	}
	abstract read(cpu?:M6502):void;
	abstract logROMinfo():void;
}


// rewriting this as a test of the main 6502 emulator
export class M6502asmROMReader extends ROMReader {
	bytes:Uint8Array;
	constructor(path:string) {
		super(path);
		this.bytes = new Uint8Array();
	}
	read(cpu:M6502) {
		this.bytes = <Uint8Array>this.stream.read(this.stream.fileSize);
		cpu.romData = this.bytes;
	}
	validate():boolean {
		return true;
	}
	logROMinfo() {

	}
}

export class ROMFormatError extends Error {
	path:string;
	constructor(path:string, text:string) {
		super(text);
		this.path = path;
	}
}