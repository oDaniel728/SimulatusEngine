import { Properties } from "csstype";
import Applier from "./Applier";
import FontAsset from "core/structure/assets/FontAsset";

export default class FontApplier implements Applier {

    constructor(public readonly fontAsset: FontAsset) {
        
    }

    applyToElement(element: { style: Properties; }): void {

    }

}