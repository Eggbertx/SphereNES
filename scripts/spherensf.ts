import { DataStream } from "sphere-runtime";

import { NSFReader, NESMapper } from "NES/nsfreader";
import { NESVideoSystem } from "NES/ppu"
import { logWrapper } from "./util";
import { M6502 } from "6502/M6502";

const headerDesc = {
	signature: { type: "fstring", length: 5 },
	version: { type: "uint8" },
	numSongs: { type: "uint8" },
	startingSong: { type: "uint8" },
	loadAddr: { type: "uint16le" },
	initAddr: { type: "uint16le" },
	playAddr: { type: "uint16le" },

	name: { type: "fstring", length: 32 },
	artist: { type: "fstring", length: 32 },
	copyrightHolder: { type: "fstring", length: 32 },

	playSpeedNTSC: { type: "uint16le" },
	bankswitchInitValues: { type: 'raw', size: 8 },
	playSpeedPAL: { type: "uint16le" },
	videoSystem: { type: "uint8" },
	mapperSupport: { type: "uint8" },
	nsf2Byte: { type: "uint8" }
}

export class SphereNSF extends NSFReader {
	dataStream:DataStream;
	prgLength:number;
	prgData:Uint8Array;
	constructor(path:string) {
		super(path, logWrapper);
		this.dataStream = new DataStream(path, FileOp.Read);
		this.prgLength = 0;
		this.prgData = new Uint8Array();
	}
	read(cpu?:M6502) {
		this.dataStream.position = 0;
		let headerStruct = this.dataStream.readStruct(headerDesc);
		this.header = headerStruct;
		this.header.bankswitchInitValues = new Uint8Array(
			this.header.bankswitchInitValues
		); // since headerStruct.bankswitchInitValues is an ArrayBuffer
		this.validate();
		this.prgLength = 
			(this.dataStream.readUint8())
		|| (this.dataStream.readUint8() << 8)
		|| (this.dataStream.readUint8() << 16);

		if(this.prgLength == 0) {
			this.prgLength = this.dataStream.fileSize - this.dataStream.position;
		}
		
		this.prgData = new Uint8Array(this.dataStream.read(this.prgLength));
	}
	logROMinfo() {
		this.log(`NSF Version: ${this.header.version}`);
		this.log(`NSF Total songs: ${this.header.numSongs}`);
		this.log(`Starting song: ${this.header.startingSong}`);
		this.log(`Load address: $${this.header.loadAddr.toString(16)}`);
		this.log(`Init address: $${this.header.initAddr.toString(16)}`);
		this.log(`Play address: $${this.header.playAddr.toString(16)}`);

		this.log(`Song name: ${this.header.name}`);
		this.log(`Artist: ${this.header.artist}`);
		this.log(`Copyright: ${this.header.copyrightHolder}`);
		this.log(`Video system: ${NESVideoSystem[this.header.videoSystem]}`);
		this.log(`Mapper: ${NESMapper[this.header.mapperSupport]}`);

		this.log(`NSF PRG size: ${this.prgLength} bytes`);
	}
}
