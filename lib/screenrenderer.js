import { Thread } from "sphere-runtime";

// I wrote most of this one by myself, but ScreenRender#drawEllipse and drawShape 
// were written by Fat Cerberus for miniSphere

/** A class meant for optimizing pixel rendering, especially with image scaling */
export default class ScreneRenderer extends Thread {
	constructor(target, width, height, scale = 1) {
		super();
		this.target = target;
		this.scale = scale;
		this.width = this.target.width / this.scale;
		this.height = this.target.height / this.scale;
		this.pixels = new Uint8Array(this.width * this.height * 4); // Pixels are stored as 1x1 pixels and drawn scaled to this.scale
		// this.pixels.fill(0);
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

	getPixel(x, y) {
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

	setPixel(x, y, color) {
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

	drawEllipse(x, y, rx, ry, color) {
		let numSegments = Math.ceil(10 * Math.sqrt((rx + ry) / 2.0));
		let vertices = [];
		let tau = 2 * Math.PI;
		let cos = Math.cos;
		let sin = Math.sin;
		for (let i = 0; i < numSegments - 1; ++i) {
			let phi = tau * i / numSegments;
			let c = cos(phi);
			let s = sin(phi);
			vertices.push({
				x: (x + c * rx)*this.scale,
				y: (y - s * ry)*this.scale,
				color: color,
			});
		}
		drawShape(this.target, ShapeType.LineLoop, vertices);
	}

	on_render() {
		if(this.pixelsShape.texture != null)
			this.pixelsShape.texture.upload(this.pixels);
		this.pixelsShape.draw(this.target, this.pixelsTransform);
	}
}

function drawShape(surface, type, vertices) {
	if (Sphere.APILevel >= 2) {
		Shape.drawImmediate(surface, type, vertices);
	} else {
		let vertexList = new VertexList(vertices);
		let shape = new Shape(type, vertexList);
		
		shape.draw(surface);
	}
}