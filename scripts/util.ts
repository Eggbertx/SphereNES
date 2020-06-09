import { Console } from "sphere-runtime";

export let console:Console;


export function initConsole() {
	if(console != null) {
		console.log("Console already initialized, skipping");
		return;
	}
	console = new Console({ logFileName: "~/console.log" });
}

export function logWrapper(msg:string) {
	console.log(msg);
}