import CorexApplicationLoader from "./CorexApplicationLoader.js";
import DOMLoader from "core/structure/DOMLoader";
import ExamplePlayerElement from "./elements/custom/ExamplePlayerRect.js";

export default class CorexApplicationDOMLoader extends DOMLoader {
    public static async main(): Promise<void> {
        CorexApplicationLoader.LOGGER.info("Loading Document");
        CorexApplicationLoader.appendChild(new ExamplePlayerElement());
    }
}
