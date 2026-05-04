/**
 * VideoAsset.ts
 *
 * Auto-generated documentation comment for core/structure/assets/VideoAsset.ts.
 */

import Asset from "./Asset";
import Identifier from "../Identifier";

/**
 * VideoAsset
 *
 * Class for the engine.
 */
export default class VideoAsset extends Asset {
    public readonly element: HTMLVideoElement;

    constructor(id: Identifier, url: string) {
        super(id, url);
        this.element = document.createElement("video");
        this.element.src = url;
        this.element.preload = "auto";
        this.element.controls = false;
    }

    public async load(): Promise<HTMLVideoElement> {
        return new Promise<HTMLVideoElement>((resolve, reject) => {
            const onLoaded = () => {
                cleanup();
                resolve(this.element);
            };
            const onError = () => {
                cleanup();
                reject(new Error(`Failed to load video asset '${this.id}'`));
            };
            const cleanup = () => {
                this.element.onloadeddata = null;
                this.element.onerror = null;
            };
            this.element.onloadeddata = onLoaded;
            this.element.onerror = onError;
        });
    }

    public getType(): string {
        return "video";
    }
}