/**
 * BaseSession.ts
 *
 * Auto-generated documentation comment for script/game/base/src/BaseSession.ts.
 */

import Session from "core/engine/utils/Session";
import Identifier from "core/structure/Identifier";
import BaseLoader from "./BaseLoader";

export type BaseSessionData = {
    score: number;
}

/**
 * BaseSession
 *
 * Class for the engine.
 */
export default class BaseSession extends Session<BaseSessionData> {
    constructor() {
        super(Identifier.of("base", "base_session"), { score: 0 });
    }

    public incrementScore(amount: number): void {
        this.set("score", this.get("score") + amount);
    }
}