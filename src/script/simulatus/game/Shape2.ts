import * as CSS from "csstype";
import BoardElement from "../BoardElement";
import Vector2Controller from "../utils/Vector2Controller";
import Area2 from "./Area2";
import Vector2 from "./Vector2";
import AnimatedElement from "../AnimatedElement";

type CSSColor = CSS.Properties["backgroundColor"];

export default class Shape2 extends AnimatedElement {
    public area: Area2;
    public pos: Vector2Controller;
    protected _color: CSSColor = "transparent";
    
    constructor() {
        super();
        this.events.onLoop(() => this.onLoop());

        this.area = new Area2(new Vector2(0, 0), new Vector2(100, 100));
        this.area._callback = () => this.onAreaChanged();

        this.pos = new Vector2Controller(this.area.position);
        this.pos._callback = () => this.onAreaChanged();
    }

    public get color(): CSSColor {
        return this._color;
    }

    public set color(value: CSSColor) {
        this._color = value;
        this.onAreaChanged();
    }

    protected onAreaChanged(): void {
        this.overrideStyle({
            left: `${this.area.position.x}px`,
            top: `${this.area.position.y}px`,
            width: `${this.area.size.x}px`,
            height: `${this.area.size.y}px`,
            backgroundColor: this._color,
        });
    }
}