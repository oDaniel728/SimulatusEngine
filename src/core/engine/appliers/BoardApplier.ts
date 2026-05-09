/**
 * BoardApplier.ts
 *
 * Auto-generated documentation comment for core/engine/appliers/BoardApplier.ts.
 */

import BoardElement from "../BoardElement";

/**
 * BoardApplier
 *
 * Interface para aplicar comportamentos a BoardElements.
 * 
 * @example
 * class ContentApplier implements BoardApplier {
 *     content: string;
 * 
 *     constructor(content: string) {
 *         this.content = content;
 *     }
 *  
 *     applyToBoardElement(element: BoardElement): void {
 *         element.style.content = this.content;
 *     }
 * }
 * // --- // --- //
 * boardElement.apply(new ContentApplier("Olá, mundo!"));
 */
export default interface BoardApplier {
    applyToBoardElement(element: BoardElement): void;
}