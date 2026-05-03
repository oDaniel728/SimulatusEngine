import BoardApplier from "./BoardApplier";
import BoardElement from "../BoardElement";
import ImageAsset from "../../structure/assets/ImageAsset";

export default class TextureApplier implements BoardApplier {
    private _texture: ImageAsset;
    private _repeat: string = "no-repeat";
    private _size: string = "cover";
    private _position: string = "center";

    public get texture(): ImageAsset {
        return this._texture;
    }

    public set texture(value: ImageAsset) {
        this._texture = value;
    }

    public get repeat(): string {
        return this._repeat;
    }

    public set repeat(value: string) {
        this._repeat = value;
    }

    public get size(): string {
        return this._size;
    }

    public set size(value: string) {
        this._size = value;
    }

    public get position(): string {
        return this._position;
    }

    public set position(value: string) {
        this._position = value;
    }

    constructor(texture: ImageAsset) {
        this._texture = texture;
    }

    public applyToBoardElement(element: BoardElement): void {
        element.setStyleProperty("backgroundImage", `url(${this._texture.url})`);
        element.setStyleProperty("backgroundSize", this._size);
        element.setStyleProperty("backgroundPosition", this._position);
        element.setStyleProperty("backgroundRepeat", this._repeat);
    }
}
