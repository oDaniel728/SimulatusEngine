import Asset from "./Asset";
import Identifier from "../Identifier";

export default class SoundAsset extends Asset {
    constructor(id: Identifier, url: string) {
        super(id, url);
    }

    public createAudio(): HTMLAudioElement {
        const audio = new Audio(this.url);
        audio.preload = "auto";
        return audio;
    }

    public getType(): string {
        return "sound";
    }
}
