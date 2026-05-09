/**
 * Applier.ts
 *
 * Auto-generated documentation comment for core/engine/appliers/Applier.ts.
 */

import * as CSS from "csstype";

type StylableHTMLElement = { style: CSS.Properties };

/**
 * Applier
 *
 * Interface para aplicar estilos a elementos HTML.
 * 
 * @example
 * class ContentApplier implements Applier {
 *     content: string;
 * 
 *     constructor(content: string) {
 *         this.content = content;
 *     }
 *  
 *     applyToElement(element: StylableHTMLElement): void {
 *         element.style.content = this.content;
 *     }
 * }
 * // --- // --- //
 * boardElement.apply(new ContentApplier("Olá, mundo!"));
 */
export interface Applier {

    /**
     * Aplica os estilos ao elemento HTML fornecido.
     *
     * @param {StylableHTMLElement} element - O BoardElement ou HTML Element a ser estilizado.
     */
    applyToElement(element: StylableHTMLElement): void;
}
export default Applier;