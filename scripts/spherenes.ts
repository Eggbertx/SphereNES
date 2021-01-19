import { DataStream } from 'sphere-runtime';
import { NESCartridgeType, NESMapperType, NESMirroring , NESROM } from 'NES/rom';
import { logWrapper } from "./util"

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

export class SphereNES extends NESROM {
	stream:DataStream;
	private updateToken:JobToken;
	private renderToken:JobToken;
	constructor(path:string) {
		super(path, logWrapper);
		this.stream = new DataStream(path, FileOp.Read);
		this.updateToken = Dispatch.onUpdate(this.update);
		this.renderToken = Dispatch.onRender(this.render);
	}

	private update() {

	}

	private render() {

	}

	halt() {

	}

	read() {
		this.stream.position = 0;
		this.header = this.stream.readStruct(headerStruct);
		this.validate();
		if(this.hasTrainer) this.stream.position += 512;
		this.prgData = <Uint8Array>this.stream.read(this.prgSize * 16);
		this.chrData = <Uint8Array>this.stream.read(this.chrSize * 8);
	}

	logROMinfo() {
		this.log(`ROM path: ${this.path}`);
		this.log(`PRG size: ${this.prgSize} 16 KB PRG ROM banks (${this.prgSize * 16}KB)`);
		this.log(`CHR size: ${this.chrSize} 8 KB CHR VROM banks (${this.chrSize * 8}KB)`);
		this.log(`Mirroring: ${NESMirroring[this.mirroring]}`);
		this.log(`Battery (for save data): ${this.batteryRAM}`);
		this.log(`ROM has 512 byte trainer: ${this.hasTrainer}`);
		this.log(`ROM has 4-screen VRAM layout: ${this.fourScreenVRAM}`);
		this.log(`ROM mapper type: ${NESMapperType[this.mapperType]}`);
		this.log(`Number of 8 KB RAM banks: ${this.numRAMBanks}`);
		this.log(`Cartridge type: ${NESCartridgeType[this.cartridgeType]}`);
	}
}
