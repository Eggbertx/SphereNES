// import { compile } from '$/cell/ts-tool';
import { tsc } from './cell/ts-tool';

import { NES_W, NES_H, PIXEL_SCALE } from './scripts/consts';

Object.assign(Sphere.Game, {
	version: 2,
	apiLevel: 2,

	name: "SphereNES",
	author: "Eggbertx",
	summary: "An attempt at a NES emulator",
	resolution: `${NES_W*PIXEL_SCALE}x${NES_H*PIXEL_SCALE}`,
	main: "@/scripts/main.js",
	saveID: "Eggbertx.SphereNES"
});

tsc('@/', '$/tsconfig.json');
install('@/fonts',	files('fonts/*.rfn'));
install('@/roms',	files('roms/*'));
install('@/',		files('icon.png'));

