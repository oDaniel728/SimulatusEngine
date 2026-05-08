import Session from "core/engine/utils/Session";
import Identifier from "core/structure/Identifier";
import CorexApplicationLoader from "./CorexApplicationLoader";

const initialCorexApplicationSessionData = {}

export type CorexApplicationSessionData = typeof initialCorexApplicationSessionData;

/**
 * CorexApplicationSession
 *
 * Default session implementation.
 */
export default class CorexApplicationSession extends Session<CorexApplicationSessionData> {
    constructor() {
        super(Identifier.of("corex-application", "session"), initialCorexApplicationSessionData);
    }
}
