import Text from "core/elements/Text";
import BoardElement from "core/engine/BoardElement";
import Area2 from "core/engine/game/Area2";
import Vector2 from "core/engine/game/Vector2";
import BaseSession from "../../BaseSession";
import BaseLoader from "../../BaseLoader";
import BackgroundColorApplier from "core/engine/appliers/BackgroundColorApplier";
import Color3 from "core/engine/utils/Color3";
import ColorApplier from "core/engine/appliers/ColorApplier";
import StyleBuilder from "core/engine/appliers/StyleBuilder";
import BoardTextElement from "core/engine/BoardTextElement";
import Identifier from "core/structure/Identifier";
import Mouse from "core/engine/utils/Mouse";

export default class ScoreIncrementButton extends BoardTextElement {
    private area = new Area2(new Vector2(20, 60), new Vector2(200, 40), new Vector2(0, -1));
    private bg = new BackgroundColorApplier(Color3.RED)
    private color = new ColorApplier(Color3.WHITE);
    private bgcolor: Color3 = Color3.RED;
    private mouse_entered = false;
    private _style = new StyleBuilder()
        .buildFont(g => 
            g.family("Arial")
             .textAlign("center")
             .size("20px")
             .weight("bold")
        )
        .buildAlignment(g =>
            g.horizontal("center")
             .vertical("center")
        );
    
    protected onClick() {
        BaseLoader.SESSION.incrementScore(1);
        this.bgcolor = Color3.BLUE;
        setTimeout(() => this.onMouseEnter(), 50);
    }

    protected onMouseEnter(): void {
        this.bgcolor = Color3.RED.sum(new Color3(50, 50, 50));
    }

    protected onMouseLeave(): void {
        this.bgcolor = Color3.RED;
    }

    protected onLoop(): void {
        this.bg = new BackgroundColorApplier(this.bgcolor);
        this.apply(this.bg);
    }

    protected onAddedAsChild(parent: BoardElement<HTMLElement>): void {
        this.apply(this.area);
        this.apply(this.color);
        this.apply(this._style);
        this.text = Text.translatable(Identifier.of(BaseLoader.ID, "increment_score_button"));
        BaseLoader.LOGGER.info("ScoreIncrementButton added to board.");
        parent.getElement().addEventListener("mousedown", () => {
            if (Mouse.Util.isInsideOfBoardElement(this)) {
                this.onClick();
                BaseLoader.LOGGER.info("ScoreIncrementButton clicked.");
            }
        });

        parent.events.onMouseMove((ev) => {
            const isInside = Mouse.Util.isInsideOfBoardElement(this)
            if (isInside && !this.mouse_entered) {
                this.mouse_entered = true;
                this.onMouseEnter();
            }
            if (!isInside && this.mouse_entered) {
                this.mouse_entered = false;
                this.onMouseLeave();
            }
        })
    }

}