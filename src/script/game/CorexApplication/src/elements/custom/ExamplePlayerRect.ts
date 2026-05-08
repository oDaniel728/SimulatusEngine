import Rect from "corex/element/custom/ui/Rect.js";
import CorexApplicationLoader from "../../CorexApplicationLoader.js";
import Vector2 from "core/engine/game/Vector2.js";

export default class ExamplePlayerElement extends Rect {
    public speed: number = 7;
    constructor() {
        super();
        CorexApplicationLoader.LOGGER.info("ExamplePlayerElement created");
        this.backgroundColor = "red";
        this.setSize(100, 100);
        this.setPosition(200, 300);
    }

    protected onLoop(): void {
        if (this.keyboardHandler.isPressing("ArrowUp", "KeyW"))
            this.setPosition(this.getPosition().add(0, -this.speed));
        
        if (this.keyboardHandler.isPressing("ArrowDown", "KeyS"))
            this.setPosition(this.getPosition().add(0, this.speed));
        
        if (this.keyboardHandler.isPressing("ArrowLeft", "KeyA"))
            this.setPosition(this.getPosition().add(-this.speed, 0));
        
        if (this.keyboardHandler.isPressing("ArrowRight", "KeyD"))
            this.setPosition(this.getPosition().add(this.speed, 0));

        this.update();
    }
}