import { Thread } from 'sphere-runtime';
import { M6502 } from "6502/M6502Main";
import ScreenRenderer from "screenrenderer"

const screen = Surface.Screen;
const kb = Keyboard.Default;
let cpu;
let renderer;

export default class MyGame extends Thread {
	constructor() {
		super();
		cpu = new M6502(60, 0x600);
		renderer = new ScreenRenderer(screen, screen.width, screen.height, 32);
		renderer.start();
	}

	on_update() {
		if(kb.isPressed(Key.Escape)) Sphere.shutDown();
	}

	on_render() {

	}
}
