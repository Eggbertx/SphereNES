import { ROMReader } from "../romreader";
import { NESVideoSystem } from "./ppu"

export abstract class NSFReader extends ROMReader {
	path:string;
	header:NSFHeader;
	abstract prgLength:number;
	abstract prgData:Uint8Array;
	constructor(path:string, loggingFunction?:(msg:string)=>any) {
		super(path, loggingFunction);
		this.path = path;
		this.header = new NSFHeader();
	}
	validate() {
		if(this.header.signature !== NSFHeader.magicString)
			throw new NSFFormatError(this.path, "Invalid NSF header");
		if(this.header.version > 2)
			throw new NSFFormatError(this.path,
				`Invalid version (expected 1 or 2, got ${this.header.version})`);
		if(!validAddressRange(this.header.loadAddr, 0x8000, 0xFFFF))
			throw new NSFFormatError(this.path, 
				`Invalid load address (expected $8000-$FFFF, got $${this.header.loadAddr.toString(16)})`);
		if(!validAddressRange(this.header.initAddr, 0x8000, 0xFFFF))
			throw new NSFFormatError(this.path, 
				`Invalid init address (expected $8000-$FFFF, got $${this.header.loadAddr.toString(16)})`);
		if(!validAddressRange(this.header.playAddr, 0x8000, 0xFFFF))
			throw new NSFFormatError(this.path, 
				`Invalid play address (expected $8000-$FFFF, got $${this.header.loadAddr.toString(16)})`);
		if((this.header.videoSystem & 0b11111100) > 0)
			throw new NSFFormatError(this.path, `Invalid NTSC/PAL flag, bits 2-7 must be 0`);
		if((this.header.mapperSupport & 0b11000000) > 0)
			throw new NSFFormatError(this.path, `Invalid mapper flag, bits 6-7 must be 0`)
	}
}

function validAddressRange(check:number, min:number, max:number):boolean {
	return check >= min && check <= max;
}

export enum NESMapper {
	None,
	VRC6,
	VRC7 = 1 << 1,
	FDS = 1 << 2,
	MMC5 = 1 << 3,
	Namco163 = 1 << 4,
	Sunsoft5B = 1 << 5,
	Reserved1 = 1 << 6,
	Reserved2 = 1 << 7
}

export class NSFHeader {
	static get magicString():string {
		return "NESM\x1A";
	}
	signature:string;
	version:number;
	numSongs:number;
	startingSong:number;
	loadAddr:number;
	initAddr:number;
	playAddr:number;

	name:string;
	artist:string;
	copyrightHolder:string;

	playSpeedNTSC:number;
	bankswitchInitValues:Uint8Array;
	playSpeedPAL:number;
	videoSystem:NESVideoSystem;
	mapperSupport:number;
	nsf2Byte:number;
	
	constructor() {
		this.signature = "";
		this.version = 0;
		this.numSongs = 0;
		this.startingSong = 0;
		this.loadAddr = 0;
		this.initAddr = 0;
		this.playAddr = 0;

		this.name = "";
		this.artist = "";
		this.copyrightHolder = "";

		this.playSpeedNTSC = 0;
		this.bankswitchInitValues = new Uint8Array;
		this.playSpeedPAL = 0;
		this.videoSystem = 0;
		this.mapperSupport = 0;
		this.nsf2Byte = 0;
	}
}

export class NSFFormatError extends Error {
	path:string;
	constructor(path:string, text:string) {
		super(text);
		this.path = path;
	}
}