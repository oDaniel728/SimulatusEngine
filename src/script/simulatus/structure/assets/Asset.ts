import Identifier from "../Identifier";

export default abstract class Asset {
    public readonly id: Identifier;
    public readonly url: string;

    constructor(id: Identifier, url: string) {
        this.id = id;
        this.url = url;
    }

    public abstract getType(): string;
}
