/**
 * BackgroundColorApplier.ts
 *
 * Auto-generated documentation comment for core/engine/appliers/BackgroundColorApplier.ts.
 */

import { Properties } from "csstype";
import Applier from "./Applier";
import Color3 from "../utils/Color3";
import Color3Gradient from "../utils/Color3Gradient.js";

/**
 * BackgroundColorApplier
 *
 * Class for the engine.
 */
export default class BackgroundColorApplier implements Applier {
    private _backgroundColor: Properties["backgroundColor"] = "transparent";
    private _background: Color3Gradient | null = null;

    public get backgroundColor(): Properties["backgroundColor"] {
        return this._backgroundColor;
    }

    public set backgroundColor(value: Properties["backgroundColor"] | Color3 | Color3Gradient) {
        if (value instanceof Color3) {
            this._backgroundColor = value.toString();
            return;
        } else if (value instanceof Color3Gradient) {
            this._background = value;
            return;
        }
        this._backgroundColor = value?.toString();
    }

    constructor(backgroundColor: Properties["backgroundColor"] | Color3 | Color3Gradient = "transparent") {
        this.backgroundColor = backgroundColor;
    }

    public applyToElement(element: { style: Properties }): void {
        if (this._background) 
            element.style.background = this._background.toString();
        element.style.backgroundColor = this._backgroundColor;
    }
}