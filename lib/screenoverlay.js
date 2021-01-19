import { Thread } from 'sphere-runtime';
import { InputEventEmitter } from "inputevents";

const screen = Surface.Screen;
const font = Font.Default;
let registeredKeys = [];

function updateShape(overlay) {
	overlay.surfaceShape = new Shape(ShapeType.TriStrip, new VertexList([
		{x: 0, y: 0, color: overlay.bgColor},
		{x: screen.width, y: 0, color: overlay.bgColor},
		{x:0, y: screen.height, color: overlay.bgColor},
		{x: screen.width, y: screen.height, color: overlay.bgColor}
	]));
}

/**
 * A little bit like the Console class in sphere-runtime, but only used for displaying information
 */
export default class ScreenOverlay extends Thread {
	constructor(toggleKey = Key.Tilde, bgColor = Color.Black, alpha = 0.8, textColor = Color.Goldenrod) {
		super({priority: Infinity});
		this.start();
		this.text = "";
		this.visible = false;
		this.bgColor = bgColor.fadeTo(alpha);
		this.textColor = textColor;
		this.xMargin = 5;
		this.yMargin = 5;
		const ie = new InputEventEmitter();

		if(registeredKeys[toggleKey]) {
			SSj.log(`Warning: ${Keyboard.Default.charOf(toggleKey)} is already being used for another overlay`);
		} else {
			registeredKeys[toggleKey] = 0;
		}
		registeredKeys[toggleKey]++;
		ie.setButtonEvent(Keyboard.Default, toggleKey, () => {
			this.visible = !this.visible;
		});
		/**
		 * @protected
		 */
		this.surfaceShape = null;
		updateShape(this);
	}

	setBackground(color, alpha = 0.8) {
		this.bgColor = color.fadeTo(alpha);
		updateShape(this);
	}

	on_render() {
		if(!this.visible || !this.surfaceShape)
			return;
		this.surfaceShape.draw();

		let wrapped = font.wordWrap(this.text, screen.width-this.xMargin*2);
		for(const l in wrapped) {
			if(l * font.height+this.yMargin*2 > screen.height-this.yMargin)
				break;
			font.drawText(screen,
				this.xMargin, l*font.height+this.yMargin,
				wrapped[l],
				Color.Goldenrod, screen.width
			);
		}
	}
}