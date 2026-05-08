import Rect from "corex/element/custom/ui/Rect.js";
import CorexApplicationLoader from "../../CorexApplicationLoader.js";

export default class ExampleRectElement extends Rect {
    constructor() {
        super();
        CorexApplicationLoader.LOGGER.info("ExampleRectElement created");
        this.backgroundColor = "red";
        this.setSize(100, 100);
        this.setPosition(200, 300);
    }
}