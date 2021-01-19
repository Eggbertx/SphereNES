import DataStream from "data-stream";

export interface Sphere6502Emulator {
	stream:DataStream;
	updateToken:JobToken;
	renderToken:JobToken;
	update():void;
	render():void;
}