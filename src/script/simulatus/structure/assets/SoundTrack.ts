import SoundAsset from "./SoundAsset";

export abstract class Track {
    public volume: number;
    public muted: boolean;

    constructor(volume: number = 1) {
        this.volume = Math.max(0, Math.min(1, volume));
        this.muted = false;
    }

    public mute(): void {
        this.muted = true;
        this.applyVolume();
    }

    public unmute(): void {
        this.muted = false;
        this.applyVolume();
    }

    public setVolume(value: number): void {
        this.volume = Math.max(0, Math.min(1, value));
        this.applyVolume();
    }

    public abstract restartCurrentSound(): void;
    public abstract stopCurrentSound(): void;
    public abstract playSound(sound: SoundAsset): Promise<void>;
    public abstract getCurrentSoundTimestamp(): number;
    protected abstract applyVolume(): void;
}

export class SoundTrack extends Track {
    protected currentAudio: HTMLAudioElement | null = null;
    protected currentSound: SoundAsset | null = null;

    public async playSound(sound: SoundAsset): Promise<void> {
        this.stopCurrentSound();
        this.currentSound = sound;
        this.currentAudio = sound.createAudio();
        this.applyVolume();
        try {
            await this.currentAudio.play();
        } catch (error) {
            console.warn(`Unable to play sound '${sound.id}':`, error);
        }
    }

    public stopCurrentSound(): void {
        if (!this.currentAudio) {
            return;
        }
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
        this.currentAudio = null;
        this.currentSound = null;
    }

    public restartCurrentSound(): void {
        if (!this.currentAudio) {
            return;
        }
        this.currentAudio.currentTime = 0;
        this.currentAudio.play().catch(() => undefined);
    }

    public getCurrentSoundTimestamp(): number {
        return this.currentAudio?.currentTime ?? 0;
    }

    protected applyVolume(): void {
        if (!this.currentAudio) {
            return;
        }
        this.currentAudio.volume = this.muted ? 0 : this.volume;
    }
}

export class PlaylistSoundTrack extends SoundTrack {
    private playlist: SoundAsset[] = [];
    private currentIndex: number = 0;

    public addSound(sound: SoundAsset): void {
        this.playlist.push(sound);
    }

    public async playCurrentTrack(): Promise<void> {
        if (this.playlist.length === 0) {
            return;
        }
        const sound = this.playlist[this.currentIndex];
        await this.playSound(sound);
    }

    public async playNext(): Promise<void> {
        if (this.playlist.length === 0) {
            return;
        }
        this.currentIndex = (this.currentIndex + 1) % this.playlist.length;
        await this.playCurrentTrack();
    }

    public async playPrevious(): Promise<void> {
        if (this.playlist.length === 0) {
            return;
        }
        this.currentIndex = (this.currentIndex - 1 + this.playlist.length) % this.playlist.length;
        await this.playCurrentTrack();
    }
}

export class SoundEffectsSoundTrack extends SoundTrack {
    private activeSounds: HTMLAudioElement[] = [];

    public async playSound(sound: SoundAsset): Promise<void> {
        const audio = sound.createAudio();
        audio.volume = this.muted ? 0 : this.volume;
        audio.onended = () => {
            this.activeSounds = this.activeSounds.filter((item) => item !== audio);
        };
        this.activeSounds.push(audio);
        try {
            await audio.play();
        } catch (error) {
            console.warn(`Unable to play effect '${sound.id}':`, error);
        }
    }

    public stopCurrentSound(): void {
        this.activeSounds.forEach((audio) => {
            audio.pause();
            audio.currentTime = 0;
        });
        this.activeSounds = [];
    }

    public restartCurrentSound(): void {
        const last = this.activeSounds[this.activeSounds.length - 1];
        if (!last) {
            return;
        }
        last.currentTime = 0;
        last.play().catch(() => undefined);
    }

    public getCurrentSoundTimestamp(): number {
        const last = this.activeSounds[this.activeSounds.length - 1];
        return last?.currentTime ?? 0;
    }

    protected applyVolume(): void {
        this.activeSounds.forEach((audio) => {
            audio.volume = this.muted ? 0 : this.volume;
        });
    }
}
