import { Thread, Console } from 'sphere-runtime';
import { M6502, M6502Version } from "6502/M6502";
import { M6502asmROMReader } from 'romreader';
import ScreenRenderer from "screenrenderer";
import { NES_W, NES_H, PIXEL_SCALE, PPU_HZ } from "./consts";

const kb = Keyboard.Default;
const screen = Surface.Screen;

const font = new Font("fonts/emulogic-12pt.rfn");
const console = new Console({ logFileName: "~/console.log" });

export const palette = [
	Color.of("#000000"), Color.of("#ffffff"), Color.of("#880000"), Color.of("#aaffee"),
	Color.of("#cc44cc"), Color.of("#00cc55"), Color.of("#0000aa"), Color.of("#eeee77"),
	Color.of("#dd8855"), Color.of("#664400"), Color.of("#ff7777"), Color.of("#333333"),
	Color.of("#777777"), Color.of("#aaff66"), Color.of("#0088ff"), Color.of("#bbbbbb")
];

function message(...str:any) {
	console.log(`Fatal error: ${str.join(",")}`);
	console.visible = true;
}

export default class SphereNES extends Thread {
	romPath:string;
	renderer:ScreenRenderer;
	cpu:M6502;
	constructor() {
		super();
		Sphere.frameRate = 150;
		this.romPath = "";
		this.cpu = new M6502(PPU_HZ, 0x600, M6502Version.M6502);
		this.renderer = new ScreenRenderer(screen, NES_W, NES_H, PIXEL_SCALE);
		this.renderer.start();
	}
	start() {
		this.romPath = (arguments.length > 0)?arguments[0]:"";
		let rr = new M6502asmROMReader(this.romPath);
		rr.read(this.cpu);
		return super.start();
	}
	on_update() {
		if(kb.isPressed(Key.Escape)) Sphere.shutDown();
	}
	on_render() {

	}
}