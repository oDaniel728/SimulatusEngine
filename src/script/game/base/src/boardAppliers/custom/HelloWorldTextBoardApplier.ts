import BoardElement from "@simulatus/engine/BoardElement";
import BoardApplier from "@simulatus/engine/appliers/BoardApplier";
import StyleBuilder from "@simulatus/engine/appliers/StyleBuilder";

export default class HelloWorldTextBoardApplier implements BoardApplier {

    private style = new StyleBuilder()
        .buildFont(g => g.family("Arial").size("20px").weight("bold"))
        .buildColor(g => g.color("white"))
        .buildPosition(g => g.position("relative").top("20px").left("20px"));

    applyToBoardElement(element: BoardElement): void {
        element.apply(this.style);
    }
}