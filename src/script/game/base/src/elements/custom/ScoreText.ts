import Text from "core/elements/Text";
import BoardTextElement from "core/engine/BoardTextElement";
import HelloWorldTextBoardApplier from "../../boardAppliers/custom/HelloWorldTextBoardApplier";
import Identifier from "core/structure/Identifier";
import BoardElement from "core/engine/BoardElement";
import BaseLoader from "../../BaseLoader";
import ScoreTextBoardApplier from "../../boardAppliers/custom/ScoreTextBoardApplier";

export default class ScoreText extends BoardTextElement {
    constructor() {
        super();
        this.apply(ScoreTextBoardApplier);
    }

    protected onAddedAsChild(parent: BoardElement<HTMLElement>): void {
        super.onAddedAsChild(parent);
        BaseLoader.LOGGER.info("ScoreText added to board.");
    }
    
    protected onLoop(): void {
        this.text = Text.literal(BaseLoader.SESSION.get("score"));
    }
}