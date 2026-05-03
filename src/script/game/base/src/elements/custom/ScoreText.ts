import Text from "@simulatus/elements/Text";
import BoardTextElement from "@simulatus/engine/BoardTextElement";
import HelloWorldTextBoardApplier from "../../boardAppliers/custom/HelloWorldTextBoardApplier";
import Identifier from "@simulatus/structure/Identifier";
import BoardElement from "@simulatus/engine/BoardElement";
import BaseLoader from "../../BaseLoader";
import ScoreTextBoardApplier from "../../boardAppliers/custom/ScoreTextBoardApplier";

export default class ScoreText extends BoardTextElement {
    constructor() {
        super();
        this.apply(ScoreTextBoardApplier);
    }

    protected onAddedAsChild(parent: BoardElement<HTMLElement>): void {
        super.onAddedAsChild(parent);
        this.text = Text.literal(10);
        BaseLoader.LOGGER.info("ScoreText added to board.");
    }
}