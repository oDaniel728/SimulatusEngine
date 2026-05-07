/**
 * Cube.ts
 *
 * Auto-generated documentation comment for script/game/base/src/elements/custom/Cube.ts.
 */

import BoardElement from "core/engine/BoardElement.js";
import BaseLoader from "../../BaseLoader.js";
import Area2 from "core/engine/game/Area2.js";
import Vector2 from "core/engine/game/Vector2.js";
import Mouse from "core/engine/utils/Mouse.js";
import Color3 from "core/engine/utils/Color3.js";
import CubeBoardApplier from "../../boardAppliers/custom/CubeBoardApplier.js";

/**
 * Cube
 *
 * Class for the engine.
 */
export default class Cube extends BoardElement {
    public area: Area2 = new Area2(
        new Vector2(0, 0), 
        new Vector2(20, 20),
        new Vector2(0.5, 0.5)
    );

    public color: Color3 = Color3.WHITE.applyAlpha(0.2);
    private baseColor: Color3 = this.color;
    
    constructor() {
        super();
        this.apply(new CubeBoardApplier);
        Mouse.hideCursor(BaseLoader.BOARD);
        Mouse.whenButton1Pressed.addEventListener(() => {
            this.color = new Color3("red");
        });
        Mouse.whenButton2Pressed.addEventListener(() => {
            this.color = new Color3("green");
        });
        Mouse.whenButton3Pressed.addEventListener(() => {
            this.color = new Color3("yellow");
        });
        Mouse.whenButtonReleased.addEventListener(b => {
            this.color = this.baseColor;
        });
    }
    protected deconstructor(): void {
        Mouse.showCursor(BaseLoader.BOARD);
        Mouse.clearEventsOfElement(BaseLoader.BOARD);
    }

    protected onAddedAsChild(parent: BoardElement<HTMLElement>): void {
        BaseLoader.LOGGER.info(`Cube added to ${parent.toString()}`);
    }

    private changeStyle() {
        this.apply(this.color);
        this.apply(this.area);
    };

    protected onLoop(): void {
        this.changeStyle();

        const mousePosition = Mouse.getMousePosition(BaseLoader.BOARD?.getElement());
        this.area.position.x = mousePosition.x;
        this.area.position.y = mousePosition.y;
    }
}