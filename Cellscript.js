import { NES_W, NES_H } from './src/consts';

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

install('@/scripts',	files('src/*.js', true));
install('@/lib',		files('lib/*.js', true));
install('@/roms',		files('roms/*.nes'));
install('@/',			files('icon.png'));
