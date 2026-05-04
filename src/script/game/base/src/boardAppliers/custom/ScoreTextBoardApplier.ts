/**
 * ScoreTextBoardApplier.ts
 *
 * Auto-generated documentation comment for script/game/base/src/boardAppliers/custom/ScoreTextBoardApplier.ts.
 */

import BoardElement from "core/engine/BoardElement";
import BoardApplier from "core/engine/appliers/BoardApplier";
import StyleBuilder from "core/engine/appliers/StyleBuilder";

/**
 * ScoreTextBoardApplier
 *
 * Class for the engine.
 */
export default class ScoreTextBoardApplier implements BoardApplier {

    private style = new StyleBuilder()
        .buildFont(g => g.family("Arial").size("20px").weight("bold"))
        .buildColor(g => g.color("white"))
        .buildPosition(g => g.position("relative").top("40px").left("20px"));

    applyToBoardElement(element: BoardElement): void {
        element.apply(this.style);
    }
}