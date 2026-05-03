import { Properties } from "csstype";
import Applier from "./Applier";

export default class PositionApplier implements Applier {
    private _position: Properties["position"] = "absolute";
    private _top: Properties["top"] = "0px";
    private _left: Properties["left"] = "0px";
    private _right?: Properties["right"];
    private _bottom?: Properties["bottom"];
    private _zIndex?: Properties["zIndex"];

    public get position(): Properties["position"] {
        return this._position;
    }

    public set position(value: Properties["position"]) {
        this._position = value;
    }

    public get top(): Properties["top"] {
        return this._top;
    }

    public set top(value: Properties["top"]) {
        this._top = value;
    }

    public get left(): Properties["left"] {
        return this._left;
    }

    public set left(value: Properties["left"]) {
        this._left = value;
    }

    public get right(): Properties["right"] | undefined {
        return this._right;
    }

    public set right(value: Properties["right"] | undefined) {
        this._right = value;
    }

    public get bottom(): Properties["bottom"] | undefined {
        return this._bottom;
    }

    public set bottom(value: Properties["bottom"] | undefined) {
        this._bottom = value;
    }

    public get zIndex(): Properties["zIndex"] | undefined {
        return this._zIndex;
    }

    public set zIndex(value: Properties["zIndex"] | undefined) {
        this._zIndex = value;
    }

    constructor(options: Partial<{
        position: Properties["position"];
        top: Properties["top"];
        left: Properties["left"];
        right: Properties["right"];
        bottom: Properties["bottom"];
        zIndex: Properties["zIndex"];
    }> = {}) {
        if (options.position !== undefined) this._position = options.position;
        if (options.top !== undefined) this._top = options.top;
        if (options.left !== undefined) this._left = options.left;
        this._right = options.right;
        this._bottom = options.bottom;
        this._zIndex = options.zIndex;
    }

    public applyToElement(element: { style: Properties }): void {
        element.style.position = this._position;
        element.style.top = this._top;
        element.style.left = this._left;
        if (this._right !== undefined) {
            element.style.right = this._right;
        }
        if (this._bottom !== undefined) {
            element.style.bottom = this._bottom;
        }
        if (this._zIndex !== undefined) {
            element.style.zIndex = this._zIndex;
        }
    }
}
