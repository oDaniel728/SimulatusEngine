/**
 * BoardImageElement.ts
 *
 * Auto-generated documentation comment for core/engine/BoardImageElement.ts.
 */

import ImageAsset from "core/structure/assets/ImageAsset";
import BoardElement from "./BoardElement";
import Vector2 from "./game/Vector2";
import Color3 from "./utils/Color3";

/**
 * BoardImageElement
 *
 * Class for the engine.
 */
export default class BoardImageElement extends BoardElement<HTMLDivElement> {
    private _texture!: ImageAsset;
    private _textureOffset!: Vector2;
    private _repeats: Vector2 = new Vector2(1, 1);
    private _tint: Color3 = new Color3(255, 255, 255);
    
    public get tint(): Color3 {
        return this._tint;
    }
    public set tint(value: Color3) {
        this._tint = value;
        this.getElement().style.filter = `brightness(${this._tint.r / 255}) saturate(${this._tint.g / 255}) contrast(${this._tint.b / 255})`;
    }
    
    public get repeats(): Vector2 {
        return this._repeats;
    }

    public set repeats(value: Vector2) {
        this._repeats = value;
        this.getElement().style.backgroundRepeat = `${this._repeats.x === 1 ? "no-repeat" : "repeat-x"} ${this._repeats.y === 1 ? "no-repeat" : "repeat-y"}`;
    }

    public get textureOffset(): Vector2 {
        return this._textureOffset;
    }

    public set textureOffset(value: Vector2) {
        this._textureOffset = value;
        this.getElement().style.backgroundPosition = `${-this._textureOffset.x}px ${-this._textureOffset.y}px`;
    }

    public get texture(): ImageAsset {
        return this._texture;
    }

    public set texture(value: ImageAsset) {
        this._texture = value;
        this.getElement().style.backgroundImage = `url(${this._texture.url})`;
    }

    private update() {
        this.texture = this._texture;
        this.textureOffset = this._textureOffset;
        this.repeats = this._repeats;
        this.tint = this._tint;
    }

    constructor(imageAsset: ImageAsset) {
        super();
        this.texture = imageAsset;
        this.textureOffset = new Vector2(0, 0, () => this.update());
    }


}