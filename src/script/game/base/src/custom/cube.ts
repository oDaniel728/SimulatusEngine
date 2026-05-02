import BoardElement from "@simulatus/engine/BoardElement";
import BaseLoader from "../BaseLoader";
import Area2 from "@simulatus/engine/game/Area2";
import Vector2 from "@simulatus/engine/game/Vector2";
import { Key } from "ts-key-enum";
import Mouse from "@simulatus/engine/utils/Mouse";

export default class Cube extends BoardElement {
    public area = new Area2(new Vector2(0, 0), new Vector2(100, 100));
    constructor() {
        super();
        Mouse.hideCursor(BaseLoader.BOARD?.getElement());
    }

    protected onAddedAsChild(parent: BoardElement<HTMLElement>): void {
        BaseLoader.LOGGER.info(`Cube added to ${parent.toString()}`);
    }

    private changeStyle() {
        this.style.backgroundColor = "blue";

        this.style.width = `${this.area.size.x}px`;
        this.style.height = `${this.area.size.y}px`;

        this.style.left = `${this.area.position.x - this.area.size.x / 2}px`;
        this.style.top = `${this.area.position.y - this.area.size.y / 2}px`;
    };

    protected onLoop(): void {
        this.changeStyle();

        // if (this.keyboardHandler.isPressing("KeyW")) {
        //     this.area.position.y -= 10;
        // }
        // if (this.keyboardHandler.isPressing("KeyA")) {
        //     this.area.position.x -= 10;
        // }
        // if (this.keyboardHandler.isPressing("KeyS")) {
        //     this.area.position.y += 10;
        // }
        // if (this.keyboardHandler.isPressing("KeyD")) {
        //     this.area.position.x += 10;
        // }
        const mousePosition = Mouse.getMousePosition(BaseLoader.BOARD?.getElement());
        this.area.position.x = mousePosition.x;
        this.area.position.y = mousePosition.y;
    }
}