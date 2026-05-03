import { Properties } from "csstype";
import Applier from "./Applier";
import Color3 from "../utils/Color3";

export default class BackgroundColorApplier implements Applier {
    private _backgroundColor: Properties["backgroundColor"] = "transparent";

    public get backgroundColor(): Properties["backgroundColor"] {
        return this._backgroundColor;
    }

    public set backgroundColor(value: Properties["backgroundColor"] | Color3) {
        this._backgroundColor = value?.toString();
    }

    constructor(backgroundColor: Properties["backgroundColor"] | Color3 = "transparent") {
        this.backgroundColor = backgroundColor;
    }

    public applyToElement(element: { style: Properties }): void {
        element.style.backgroundColor = this._backgroundColor;
    }
}
