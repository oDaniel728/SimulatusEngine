import { Properties } from "csstype";
import Applier from "./Applier";
import Color3 from "../utils/Color3";
import Color3Gradient from "../utils/Color3Gradient";

/**
 * BorderApplier
 *
 * Applier para bordas com todas as propriedades de estilo de borda.
 */
export default class BorderApplier implements Applier {
    private _style = {} as Properties;

    public get border(): Properties["border"] {
        return this._style.border;
    }

    public set border(value: Properties["border"]) {
        this._style.border = value;
    }

    public get borderWidth(): Properties["borderWidth"] {
        return this._style.borderWidth;
    }

    public set borderWidth(value: Properties["borderWidth"]) {
        this._style.borderWidth = value;
    }

    public get borderStyle(): Properties["borderStyle"] {
        return this._style.borderStyle;
    }

    public set borderStyle(value: Properties["borderStyle"]) {
        this._style.borderStyle = value;
    }

    public get borderColor(): Properties["borderColor"] {
        return this._style.borderColor;
    }

    public set borderColor(value: Properties["borderColor"] | Color3) {
        this._style.borderColor = value?.toString();
    }

    public get borderRadius(): Properties["borderRadius"] {
        return this._style.borderRadius;
    }

    public set borderRadius(value: Properties["borderRadius"]) {
        this._style.borderRadius = value;
    }

    public get borderTopWidth(): Properties["borderTopWidth"] {
        return this._style.borderTopWidth;
    }

    public set borderTopWidth(value: Properties["borderTopWidth"]) {
        this._style.borderTopWidth = value;
    }

    public get borderRightWidth(): Properties["borderRightWidth"] {
        return this._style.borderRightWidth;
    }

    public set borderRightWidth(value: Properties["borderRightWidth"]) {
        this._style.borderRightWidth = value;
    }

    public get borderBottomWidth(): Properties["borderBottomWidth"] {
        return this._style.borderBottomWidth;
    }

    public set borderBottomWidth(value: Properties["borderBottomWidth"]) {
        this._style.borderBottomWidth = value;
    }

    public get borderLeftWidth(): Properties["borderLeftWidth"] {
        return this._style.borderLeftWidth;
    }

    public set borderLeftWidth(value: Properties["borderLeftWidth"]) {
        this._style.borderLeftWidth = value;
    }

    public get borderTopStyle(): Properties["borderTopStyle"] {
        return this._style.borderTopStyle;
    }

    public set borderTopStyle(value: Properties["borderTopStyle"]) {
        this._style.borderTopStyle = value;
    }

    public get borderRightStyle(): Properties["borderRightStyle"] {
        return this._style.borderRightStyle;
    }

    public set borderRightStyle(value: Properties["borderRightStyle"]) {
        this._style.borderRightStyle = value;
    }

    public get borderBottomStyle(): Properties["borderBottomStyle"] {
        return this._style.borderBottomStyle;
    }

    public set borderBottomStyle(value: Properties["borderBottomStyle"]) {
        this._style.borderBottomStyle = value;
    }

    public get borderLeftStyle(): Properties["borderLeftStyle"] {
        return this._style.borderLeftStyle;
    }

    public set borderLeftStyle(value: Properties["borderLeftStyle"]) {
        this._style.borderLeftStyle = value;
    }

    public get borderTopColor(): Properties["borderTopColor"] {
        return this._style.borderTopColor;
    }

    public set borderTopColor(value: Properties["borderTopColor"] | Color3) {
        this._style.borderTopColor = value?.toString();
    }

    public get borderRightColor(): Properties["borderRightColor"] {
        return this._style.borderRightColor;
    }

    public set borderRightColor(value: Properties["borderRightColor"] | Color3) {
        this._style.borderRightColor = value?.toString();
    }

    public get borderBottomColor(): Properties["borderBottomColor"] {
        return this._style.borderBottomColor;
    }

    public set borderBottomColor(value: Properties["borderBottomColor"] | Color3) {
        this._style.borderBottomColor = value?.toString();
    }

    public get borderLeftColor(): Properties["borderLeftColor"] {
        return this._style.borderLeftColor;
    }

    public set borderLeftColor(value: Properties["borderLeftColor"] | Color3) {
        this._style.borderLeftColor = value?.toString();
    }

    public get borderImage(): Properties["borderImage"] {
        return this._style.borderImage;
    }

    public set borderImage(value: Properties["borderImage"] | Color3Gradient) {
        this._style.borderImage = value instanceof Color3Gradient ? value.toString() : value;
    }

    public get borderImageSource(): Properties["borderImageSource"] {
        return this._style.borderImageSource;
    }

    public set borderImageSource(value: Properties["borderImageSource"] | Color3Gradient) {
        this._style.borderImageSource = value instanceof Color3Gradient ? value.toString() : value;
    }

    public get borderImageSlice(): Properties["borderImageSlice"] {
        return this._style.borderImageSlice;
    }

    public set borderImageSlice(value: Properties["borderImageSlice"]) {
        this._style.borderImageSlice = value;
    }

    public get borderImageWidth(): Properties["borderImageWidth"] {
        return this._style.borderImageWidth;
    }

    public set borderImageWidth(value: Properties["borderImageWidth"]) {
        this._style.borderImageWidth = value;
    }

    public get borderImageOutset(): Properties["borderImageOutset"] {
        return this._style.borderImageOutset;
    }

    public set borderImageOutset(value: Properties["borderImageOutset"]) {
        this._style.borderImageOutset = value;
    }

    public get borderImageRepeat(): Properties["borderImageRepeat"] {
        return this._style.borderImageRepeat;
    }

    public set borderImageRepeat(value: Properties["borderImageRepeat"]) {
        this._style.borderImageRepeat = value;
    }

    public applyToElement(element: { style: Properties }): void {
        Object.assign(element.style, this._style);
    }
}
