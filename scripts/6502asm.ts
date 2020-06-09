import { DataStream } from 'sphere-runtime';
import { M6502 } from "6502/M6502";
import { ROMReader } from 'romreader';
import { logWrapper } from "./util"

export const M6502asmPalette = [
	Color.of("#000000"), Color.of("#ffffff"), Color.of("#880000"), Color.of("#aaffee"),
	Color.of("#cc44cc"), Color.of("#00cc55"), Color.of("#0000aa"), Color.of("#eeee77"),
	Color.of("#dd8855"), Color.of("#664400"), Color.of("#ff7777"), Color.of("#333333"),
	Color.of("#777777"), Color.of("#aaff66"), Color.of("#0088ff"), Color.of("#bbbbbb")
];

export class M6502asmROM extends ROMReader {
	bytes:Uint8Array;
	stream:DataStream;
	constructor(path:string) {
		super(path, logWrapper);
		this.bytes = new Uint8Array();
		this.stream = new DataStream(path, FileOp.Read);
	}

	read(cpu:M6502) {
		this.bytes = <Uint8Array>this.stream.read(this.stream.fileSize);
		cpu.romData = this.bytes;
	}

	logROMinfo() {
		this.log(`ROM path: ${this.path}`);
		this.log(`ROM size: ${this.bytes.byteLength} bytes`);
	}
}