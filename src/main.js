import { Thread } from 'sphere-runtime';
import { M6502 } from "6502/M6502Main";


let cpu;


let display = new Array(0x400);
const palette = [
	Color.of("#000000"), Color.of("#ffffff"), Color.of("#880000"), Color.of("#aaffee"),
	Color.of("#cc44cc"), Color.of("#00cc55"), Color.of("#0000aa"), Color.of("#eeee77"),
	Color.of("#dd8855"), Color.of("#664400"), Color.of("#ff7777"), Color.of("#333333"),
	Color.of("#777777"), Color.of("#aaff66"), Color.of("#0088ff"), Color.of("#bbbbbb")
];

export default class MyGame extends Thread {
	constructor() {
		super();
		cpu = new M6502(60, 0x600);
	}

	on_update() {
		if(Keyboard.Default.isPressed(Key.Escape)) Sphere.shutDown();
	}

	on_render() {
		
	}
}
