import { Properties } from "csstype";
import Applier from "../appliers/Applier.js";
import Color3 from "./Color3.js";

type Direction = "top" | "bottom" | "left" | "right" | "top left" | "top right" | "bottom left" | "bottom right";

export default class Color3Gradient implements Applier {
    private colors: Color3[] = [];
    private angle: number = 0;

    constructor();
    constructor(colors: Color3[]);
    constructor(colors: Color3[], angle: number);
    constructor(colors: Color3[], angle: Direction);
    constructor(colors: Color3[] = [], angle: number | Direction = 0) {
        this.colors = colors;
        this.setAngle(angle);
    }
    
    public append(color: Color3): this {
        this.colors.push(color);
        return this;
    }

    public setAngle(angle: number | Direction): this {
        switch (angle) {
            case "top":
                this.angle = 0;
                break;
            case "right":
                this.angle = 90;
                break;
            case "bottom":
                this.angle = 180;
                break;
            case "left":
                this.angle = 270;
                break;
            case "top left":
                this.angle = 315;
                break;
            case "top right":
                this.angle = 45;
                break;
            case "bottom left":
                this.angle = 225;
                break;
            case "bottom right":
                this.angle = 135;
                break;
            default:
                this.angle = typeof angle === "number" ? angle : 0;
        }
        return this;
    }

    public getColors(): Color3[] {
        return this.colors;
    }

    public getAngle(): number {
        return this.angle;
    }

    public toString(): string {
        const colorStrings = this.colors.map(color => color.toString());
        return `linear-gradient(${this.angle}deg, ${colorStrings.join(", ")})`;
    }

    public applyBrightness(factor: number): Color3Gradient {
        this.colors = this.colors.map(color => color.applyBrightness(factor));
        return this;
    }
    public applyDarkness(factor: number): Color3Gradient {
        this.colors = this.colors.map(color => color.applyDarkness(factor));
        return this;
    }
    public applySaturation(factor: number): Color3Gradient {
        this.colors = this.colors.map(color => color.applySaturation(factor));
        return this;
    }
    public applyAlpha(factor: number): Color3Gradient {
        this.colors = this.colors.map(color => color.applyAlpha(factor));
        return this;
    }
    public applyContrast(factor: number): Color3Gradient {
        this.colors = this.colors.map(color => color.applyContrast(factor));
        return this;
    }
    public applyGrayscale(): Color3Gradient {
        this.colors = this.colors.map(color => color.applyGrayscale());
        return this;
    }
    public applySepia(): Color3Gradient {
        this.colors = this.colors.map(color => color.applySepia());
        return this;
    }

    public apply(element: { style: Properties }): void {
        this.applyToElement(element);
    }

    public applyToElement(element: { style: Properties; }): void {
        element.style.background = this.toString();
    }
}