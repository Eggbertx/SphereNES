import { compile } from "$/cell/ts-tool";

import { NES_W, NES_H } from '$/src/consts';

Object.assign(Sphere.Game, {
	version: 2,
	apiLevel: 1,

	name: "SphereNES",
	author: "Eggbertx",
	summary: "An attempt at a NES emulator",
	resolution: `${NES_W*2}x${NES_H*2}`,
	main: "@/scripts/main.js",
	saveID: "SphereNES"
});

compile('@/scripts',	files('src/*.ts'));
install('@/scripts',	files('src/*.js'));
compile('@/lib',		files('lib/*.ts'));
install('@/roms',		files('roms/*.nes'));
install('@/',			files('icon.png'));
