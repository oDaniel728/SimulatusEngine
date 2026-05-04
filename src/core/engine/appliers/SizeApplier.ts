/**
 * SizeApplier.ts
 *
 * Auto-generated documentation comment for core/engine/appliers/SizeApplier.ts.
 */

import { Properties } from "csstype";
import Applier from "./Applier";

/**
 * SizeApplier
 *
 * Class for the engine.
 */
export default class SizeApplier implements Applier {
    private _width: Properties["width"] = "auto";
    private _height: Properties["height"] = "auto";

    public get width(): Properties["width"] {
        return this._width;
    }

    public set width(value: Properties["width"]) {
        this._width = value;
    }

    public get height(): Properties["height"] {
        return this._height;
    }

    public set height(value: Properties["height"]) {
        this._height = value;
    }

    constructor(width: Properties["width"] = "auto", height: Properties["height"] = "auto") {
        this._width = width;
        this._height = height;
    }

    public applyToElement(element: { style: Properties }): void {
        element.style.width = this._width;
        element.style.height = this._height;
    }
}