import { Thread } from 'sphere-runtime';
import { M6502, M6502Version } from "6502/M6502";
import { M6502asmROM } from './6502asm';
import ScreenRenderer from "screenrenderer";
import { ROMReader } from "romreader";
import { CPU_HZ } from "./consts";
import { SphereNES } from './spherenes';
import { SphereNSF } from "./spherensf";
import { initConsole, console } from "./util";

const kb = Keyboard.Default;
const screen = Surface.Screen;

const font = new Font("fonts/emulogic-12pt.rfn");

enum romType {
	NES, NSF, M6502asm, Sim6502
}

export default class Sphere6502Emulator extends Thread {
	romPath:string;
	renderer:ScreenRenderer;
	cpu:M6502;
	constructor() {
		super();
		initConsole();
		Sphere.frameRate = 150;
		this.romPath = "";
		this.cpu = new M6502(CPU_HZ, 0x600, M6502Version.M6502, console.log);
		// this.renderer = new ScreenRenderer(screen, NES_W, NES_H, PIXEL_SCALE);
		this.renderer = new ScreenRenderer(screen, screen.width, screen.height, screen.width/32);
		this.renderer.start();
	}
	async start() {
		return super.start().then(() => {
			if(arguments.length == 0) {
				Sphere.abort("Usage: minisphere|spherun <rompath>");
			}
			this.romPath = arguments[0];
			let lowerPath = this.romPath.toLowerCase();
			if(lowerPath.endsWith(".nes"))
				this.loadROM(romType.NES);
			else if(lowerPath.endsWith(".nsf"))
				this.loadROM(romType.NSF);
			else
				this.loadROM(romType.M6502asm);
		});
	}

	loadROM(type:romType) {
		let rom:ROMReader|undefined;
		switch(type) {
		case romType.M6502asm:
			Sphere.setResolution(512,512);
			rom = new M6502asmROM(this.romPath);
			break;
		case romType.NES:
			rom = new SphereNES(this.romPath);
			break;
		case romType.NSF:
			rom = new SphereNSF(this.romPath);
			break;
		case romType.Sim6502:
			break;
		}
		if(rom === undefined)
			throw new Error("Invalid romType");
		rom.read(this.cpu);
		rom.logROMinfo();
	}

	on_update() {
		if(kb.isPressed(Key.Escape)) Sphere.shutDown();
	}
	on_render() {

	}
}