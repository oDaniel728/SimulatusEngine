/**
 * ImageAsset.ts
 *
 * Auto-generated documentation comment for core/structure/assets/ImageAsset.ts.
 */

import Asset from "./Asset";
import Identifier from "../Identifier";

/**
 * ImageAsset
 *
 * Class for the engine.
 */
export default class ImageAsset extends Asset {
    public readonly element: HTMLImageElement;

    constructor(id: Identifier, url: string) {
        super(id, url);
        this.element = new Image();
        this.element.src = url;
    }

    public async load(): Promise<HTMLImageElement> {
        if (this.element.complete && this.element.naturalWidth > 0) {
            return this.element;
        }
        return new Promise<HTMLImageElement>((resolve, reject) => {
            this.element.onload = () => resolve(this.element);
            this.element.onerror = () => reject(new Error(`Failed to load image asset '${this.id}'`));
        });
    }

    public getType(): string {
        return "image";
    }
}