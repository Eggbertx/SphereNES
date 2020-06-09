import { ROMReader, ROMFormatError } from "../romreader"

export interface NESHeader {
	signature: string;
	prgSize: number;
	chrSize: number;
	flags6: number,
	flags7: number,
	flags8: number,
	flags9: number,
	flags10: number,
	padding: string
};

const emptyHeader = {
	signature:"", prgSize: 0, chrSize: 0, flags6: 0, flags7: 0, flags8:0, flags9:0,flags10:0,padding:""
};

export enum NESMirroring {
	Horizontal, Vertical
};

export enum NESCartridgeType {
	NTSC, PAL
};

export enum NESMapperType {
	NoMapper,
	MMC1,
	CNROMswitch,
	UNROMswitch,
	MMC3,
	MMC5,
	FFE_F4xxx,
	AOROMswitch,
	FFE_F3xxx,
	MMC2,
	MMC4,
	ColorDreams,
	FFE_F6xxx,
	CPROMswitch,
};

export abstract class NESROM extends ROMReader {
	header:NESHeader;
	prgData:Uint8Array;
	chrData:Uint8Array;
	get prgSize():number {
		return this.header.prgSize;
	}
	get chrSize():number {
		return this.header.chrSize;
	}
	get mirroring():number {
		return this.header.flags6 & 1;
	}
	get batteryRAM():boolean {
		return (this.header.flags6 & 2) == 1;
	}
	get hasTrainer():boolean {
		return (this.header.flags6 & 4) == 1;
	}
	get fourScreenVRAM():boolean {
		return (this.header.flags6 & 8) == 1;
	}
	get mapperType():NESMapperType {
		return ((this.header.flags6 & 0xF0) >> 4) | ((this.header.flags7 & 0xF0));
	}
	get isVSSystem():boolean {
		return (this.header.flags7 & 1) == 1;
	}
	get numRAMBanks():number {
		return this.header.flags8;
	}
	get cartridgeType():number {
		return this.header.flags9 & 1;
	}
	constructor(path:string, loggingFunction?:(msg:string)=>any) {
		super(path, loggingFunction);
		this.header = emptyHeader;
		this.prgData = new Uint8Array();
		this.chrData = new Uint8Array();
	}
	validate() {
		if(this.header.signature != "NES\x1A")
			throw new ROMFormatError(this.path,
				`Invalid ROM header signature (should be NES\\x1A, got ${this.header?.signature}`);

		if(NESMapperType[this.mapperType] === undefined)
			throw new ROMFormatError(this.path,
				`Unrecognized ROM mapper: ${this.mapperType}`);

		if((this.header.flags7 & 0b00001110) != 0)
			throw new ROMFormatError(this.path,
				`Invalid ROM header data (header.flags7 & 0b00001110 != 0)`);

		if((this.header.flags9 & 0b11111110) != 0)
			throw new ROMFormatError(this.path,
				`Invalid ROM header data (header.flags9 & 0b11111110 != 0)`);
	}
}