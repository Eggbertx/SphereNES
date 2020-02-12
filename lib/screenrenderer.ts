import { Thread } from "sphere-runtime";

/** A class meant for optimizing pixel rendering, especially with image scaling */
export default class ScreneRenderer extends Thread {
	target:Surface;
	scale:number;
	width:number;
	height:number;
	pixels:Uint8Array;
	private pixelsTransform:Transform;
	private pixelsShape:Shape;
	constructor(target:Surface, width:number, height:number, scale = 1) {
		super();
		this.target = target;
		this.scale = scale;
		this.width = width / this.scale;
		this.height = height / this.scale;
		this.pixels = new Uint8Array(this.width * this.height * 4); // Pixels are stored as 1x1 pixels and drawn scaled to this.scale
		this.pixels.fill(0);
		for(let i = 0; i < this.pixels.length; i += 4) {
			this.pixels[i] = 0;
			this.pixels[i+1] = 0;
			this.pixels[i+2] = 0;
			this.pixels[i+3] = 255;
		}
		
		this.pixelsTransform = new Transform();
		this.pixelsShape = new Shape(ShapeType.TriStrip, null, new VertexList([
			{ x: 0,				y: 0,			u: 0, v: 1 },
			{ x: this.scale,	y: 0,			u: 1, v: 1 },
			{ x: 0, 			y: this.scale,	u: 0, v: 0 },
			{ x: this.scale,	y: this.scale,	u: 1, v: 0 }
		]));
		this.pixelsShape.texture = new Texture(this.width, this.height, this.pixels);
		this.pixelsTransform.identity().scale(this.width, this.width);
	}

	getPixel(x:number, y:number) {
		let index = x + this.width * y;
		if(index+2 >= this.pixels.length)
			throw new RangeError(`${x},${y} coordinates our out of bounds of the selected target`);
		return new Color(
			this.pixels[index] / 255,
			this.pixels[index+1] / 255,
			this.pixels[index+2] / 255,
			this.pixels[index+3] / 255
		);
	}

	setPixel(x:number, y:number, color:Color) {
		for(let i = 0; i < this.width * this.height; i++) {
			let offset = i * 4;
			let pX = (i % this.width) | 0;
			let pY = ((i - x) / this.height) | 0;
			
			if(pX == x && pY == y) {
				this.pixels[offset] = color.r * 255;
				this.pixels[offset+1] = color.g * 255;
				this.pixels[offset+2] = color.b * 255;
			}
		}
	}

	on_render() {
		if(this.pixelsShape.texture != null)
			this.pixelsShape.texture.upload(this.pixels);
		this.pixelsShape.draw(this.target, this.pixelsTransform);
	}
}
