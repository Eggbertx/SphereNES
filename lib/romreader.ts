import { DataStream, Console } from 'sphere-runtime'
import { M6502 } from "6502/M6502";

export abstract class ROMReader {
	path:string;
	log:(msg:string)=>any;
	constructor(path:string, loggingFunction?:(msg:string)=>any) {
		this.path = path;
		if(!loggingFunction)
			loggingFunction = (msg:string)=>{};
		this.log = loggingFunction;
	}
	abstract read(cpu?:M6502):void;
	abstract logROMinfo():void;
}

export class ROMFormatError extends Error {
	path:string;
	constructor(path:string, text:string) {
		super(text);
		this.path = path;
	}
}