import Text from "@simulatus/elements/Text";
import BoardTextElement from "@simulatus/engine/BoardTextElement";
import HelloWorldTextBoardApplier from "../../boardAppliers/custom/HelloWorldTextBoardApplier";
import Identifier from "@simulatus/structure/Identifier";
import BoardElement from "@simulatus/engine/BoardElement";
import BaseLoader from "../../BaseLoader";

export default class HelloWorldText extends BoardTextElement {
    constructor() {
        super();
        this.apply(HelloWorldTextBoardApplier);
    }

    protected onAddedAsChild(parent: BoardElement<HTMLElement>): void {
        super.onAddedAsChild(parent);
        BaseLoader.LOGGER.info("HelloWorldText added to board.");
        this.text = Text.translatable(Identifier.of("base", "title"));
    }
}