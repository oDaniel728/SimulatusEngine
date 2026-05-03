import Session from "@simulatus/engine/utils/Session";
import Identifier from "@simulatus/structure/Identifier";
import BaseLoader from "./BaseLoader";

export type BaseSessionData = {
    score: number;
}

export default class BaseSession extends Session<BaseSessionData> {
    constructor() {
        super(Identifier.of("base", "base_session"), { score: 0 });
    }

    public incrementScore(amount: number): void {
        this.set("score", this.get("score") + amount);
    }
}