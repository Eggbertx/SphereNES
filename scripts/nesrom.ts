import { DataStream } from 'sphere-runtime';
import { ROMReader, ROMFormatError } from 'romreader';

const headerStruct = {
	signature: { type: 'fstring', length: 4 },
	prgSize: { type: 'uint8' },
	chrSize: { type: 'uint8' },
	flags6: { type: 'uint8' },
	flags7: { type: 'uint8' },
	flags8: { type: 'uint8' },
	flags9: { type: 'uint8' },
	flags10: { type: 'uint8' },
	padding: { type: 'raw', size: 5 }
};

const emptyHeader = {
	signature:"", prgSize: 0, chrSize: 0, flags6: 0, flags7: 0, flags8:0, flags9:0,flags10:0,padding:""
};

export interface ROMHeader {
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

export enum Mirroring {
	Horizontal, Vertical
};

export enum CartridgeType {
	NTSC, PAL
};

export enum MapperType {
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

export class NESROM extends ROMReader {
	header:ROMHeader;
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
	get mapperType():MapperType {
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

	constructor(path:string) {
		super(path);
		this.header = emptyHeader;
		this.prgData = new Uint8Array();
		this.chrData = new Uint8Array();
	}

	read() {
		this.stream.position = 0;
		this.header = this.stream.readStruct(headerStruct);
		if(this.header.signature != "NES\x1A")
			throw new ROMFormatError(this.path,
				`Invalid ROM header signature (should be NES\\x1A, got ${this.header?.signature}`);

		if(MapperType[this.mapperType] === undefined)
			throw new ROMFormatError(this.path,
				`Unrecognized ROM mapper: ${this.mapperType}`);

		if((this.header.flags7 & 0b00001110) != 0)
			throw new ROMFormatError(this.path,
				`Invalid ROM header data (header.flags7 & 0b00001110 != 0)`);

		if((this.header.flags9 & 0b11111110) != 0)
			throw new ROMFormatError(this.path,
				`Invalid ROM header data (header.flags9 & 0b11111110 != 0)`);

		if(this.hasTrainer) this.stream.position += 512;
		this.prgData = <Uint8Array>this.stream.read(this.prgSize * 16);
		this.chrData = <Uint8Array>this.stream.read(this.chrSize * 8);
	}

	logROMinfo() {
		SSj.log(`ROM path: ${this.path}`);
		SSj.log(`PRG size: ${this.prgSize} 16 KB PRG ROM banks (${this.prgSize * 16}KB)`);
		SSj.log(`CHR size: ${this.chrSize} 8 KB CHR VROM banks (${this.chrSize * 8}KB)`);
		SSj.log(`Mirroring: ${Mirroring[this.mirroring]}`);
		SSj.log(`Battery (for save data): ${this.batteryRAM}`);
		SSj.log(`ROM has 512 byte trainer: ${this.hasTrainer}`);
		SSj.log(`ROM has 4-screen VRAM layout: ${this.fourScreenVRAM}`);
		SSj.log(`ROM mapper type: ${MapperType[this.mapperType]}`);
		SSj.log(`Number of 8 KB RAM banks: ${this.numRAMBanks}`);
		SSj.log(`Cartridge type: ${CartridgeType[this.cartridgeType]}`);
	}
}
