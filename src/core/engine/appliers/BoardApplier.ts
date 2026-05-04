/**
 * BoardApplier.ts
 *
 * Auto-generated documentation comment for core/engine/appliers/BoardApplier.ts.
 */

import BoardElement from "../BoardElement";

/**
 * BoardApplier
 *
 * Interface for the engine.
 */
export default interface BoardApplier {
    applyToBoardElement(element: BoardElement): void;
}