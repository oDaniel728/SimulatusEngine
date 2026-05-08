import BoardElement from "core/engine/BoardElement.js";
import Area2 from "core/engine/game/Area2.js";
import Vector2 from "core/engine/game/Vector2.js";
import Color3 from "core/engine/utils/Color3.js";
import Color3Gradient from "core/engine/utils/Color3Gradient.js";

export default class Rect extends BoardElement<HTMLDivElement> {
    private area: Area2 = new Area2();

    public get backgroundColor(): string {
        return this.getStyleProperty("backgroundColor") || "transparent";
    }

    public set backgroundColor(value: string | Color3 | Color3Gradient) {
        if (value instanceof Color3Gradient || value instanceof Color3) {
            value.applyToElement(this);
            return;
        }
        this.setStyleProperty("backgroundColor", value.toString());
    }

    public get left(): number {
        return this.area.left;
    }

    public get top(): number {
        return this.area.top;
    }

    public get width(): number {
        return this.area.w;
    }

    public get height(): number {
        return this.area.h;
    }

    public getPosition(): Vector2 {
        return new Vector2(this.area.x, this.area.y);
    }

    public setPosition(position: Vector2): void
    public setPosition(x: number, y: number): void
    public setPosition(x: number | Vector2, y?: number): void {
        if (x instanceof Vector2) {
            this.area.x = x.x;
            this.area.y = x.y;
        } else {
            this.area.x = x;
            this.area.y = y ?? 0;
        }
        this.update()
    }

    public setSize(size: Vector2): void
    public setSize(width: number, height: number): void
    public setSize(width: number | Vector2, height?: number): void {
        if (width instanceof Vector2) {
            this.area.size = width;
        } else {
            this.area.size = new Vector2(width, height ?? 0);
        }
        this.update();
    }

    constructor(initialArea?: Area2) {
        super(document.createElement("div"));
        this.getElement().style.position = "absolute";
        
        if (initialArea) {
            this.area = initialArea;
        }
        this.update();
    }

    public update(): void {
        this.updateElementSize();
        this.updateElementPosition();
    }
    public updateElementSize(): void {
        const element = this.getElement();
        element.style.width = `${this.area.w}px`;
        element.style.height = `${this.area.h}px`;
    }
    public updateElementPosition(): void {
        const element = this.getElement();
        element.style.left = `${this.area.left}px`;
        element.style.top = `${this.area.top}px`;
    }

}