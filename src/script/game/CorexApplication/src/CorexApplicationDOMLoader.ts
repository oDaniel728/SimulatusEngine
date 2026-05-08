import CorexApplicationLoader from "./CorexApplicationLoader.js";
import DOMLoader from "core/structure/DOMLoader";
import ExampleRectElement from "./elements/custom/ExampleRectElement.js";

export default class CorexApplicationDOMLoader extends DOMLoader {
    public static async main(): Promise<void> {
        CorexApplicationLoader.LOGGER.info("Loading Document");
        CorexApplicationLoader.appendChild(new ExampleRectElement());
    }
}
