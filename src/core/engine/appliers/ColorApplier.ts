import { Properties } from "csstype";
import Applier from "./Applier";
import Color3 from "../utils/Color3";

export default class ColorApplier implements Applier {
    private _color: Properties["color"] = "inherit";

    public get color(): Properties["color"] {
        return this._color;
    }

    public set color(value: Properties["color"] | Color3) {
        this._color = value?.toString();
    }

    constructor(color: Properties["color"] | Color3 = "inherit") {
        this.color = color;
    }

    public applyToElement(element: { style: Properties }): void {
        element.style.color = this._color;
    }
}
