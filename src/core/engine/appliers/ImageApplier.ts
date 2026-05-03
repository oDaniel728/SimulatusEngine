import { Properties } from "csstype";
import BoardApplier from "./BoardApplier";
import BoardElement from "../BoardElement";

export default class ImageApplier implements BoardApplier {

    private _url: string;
    public get url(): string {
        return this._url;
    }
    public set url(value: string) {
        this._url = value;
    }

    public get imagePath(): string {
        return `./script/game/${this.url}`
    }

    constructor(url: string) {
        this._url = url;
    }

    applyToBoardElement(element: BoardElement): void {
        element.setStyleProperty("backgroundImage", `url(${this._url})`);
        element.setStyleProperty("backgroundSize", "cover");
        element.setStyleProperty("backgroundPosition", "center");
    }

    
}