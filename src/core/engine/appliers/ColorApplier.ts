/**
 * ColorApplier.ts
 *
 * Auto-generated documentation comment for core/engine/appliers/ColorApplier.ts.
 */

import { Properties } from "csstype";
import Applier from "./Applier";
import Color3 from "../utils/Color3";
import Color3Gradient from "../utils/Color3Gradient";

/**
 * ColorApplier
 *
 * Class for the engine.
 */
export default class ColorApplier implements Applier {
    private _color: Properties["color"] = "inherit";
    private _gradient: Color3Gradient | null = null;

    public get color(): Properties["color"] {
        return this._color;
    }

    public set color(value: Properties["color"] | Color3 | Color3Gradient) {
        if (value instanceof Color3Gradient) {
            this._gradient = value;
            this._color = "transparent";
            return;
        }

        this._gradient = null;
        this._color = value?.toString();
    }

    constructor(color: Properties["color"] | Color3 | Color3Gradient = "inherit") {
        this.color = color;
    }

    public applyToElement(element: { style: Properties }): void {
        if (this._gradient) {
            element.style.background = this._gradient.toString();
            element.style.backgroundClip = "text";
            element.style.WebkitBackgroundClip = "text";
            element.style.color = "transparent";
            return;
        }

        element.style.color = this._color;
    }
}