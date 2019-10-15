import { Music, Prim, Thread } from 'sphere-runtime';

export default class MyGame extends Thread {
	constructor() {
		super();
	}

	on_update() {
		if(Keyboard.Default.isPressed(Key.Escape)) Sphere.shutDown();
	}

	on_render() {
		
	}
}
