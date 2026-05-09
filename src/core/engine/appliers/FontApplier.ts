import { Properties } from "csstype";
import Applier from "./Applier";
import FontAsset from "core/structure/assets/FontAsset";

/**
 * FontApplier
 *
 * Aplica uma fonte ao texto de um elemento HTML.
 */
export default class FontApplier implements Applier {

    /**
     * Cria uma instância de FontApplier.
     *
     * @constructor
     * @param {FontAsset} fontAsset - O FontAsset a ser aplicado.
      * @example
      * const fontAsset = new FontAsset("MyFont", "path/to/font.woff");
      * const applier = new FontApplier(fontAsset);
      * boardElement.apply(applier);
      */
    constructor(public readonly fontAsset: FontAsset) {
        
    }

    applyToElement(element: { style: Properties; }): void {

    }

}