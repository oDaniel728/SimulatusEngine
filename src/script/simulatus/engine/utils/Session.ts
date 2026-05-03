import Identifier from "@simulatus/structure/Identifier";
import SessionManager from "./SessionManager";

export default class Session<T extends Record<string, any>> {
    private data: T;
    private readonly initialData: T;
    public readonly id: Identifier;

    constructor(id: Identifier, data: T) {
        this.data = data;
        this.initialData = Session.cloneData(data);
        this.id = id;
    }

    private static cloneData<T>(data: T): T {
        if (typeof structuredClone === "function") {
            return structuredClone(data);
        }
        return JSON.parse(JSON.stringify(data));
    }

    public getData(): T {
        return this.data;
    }

    public getDefault(): T;
    public getDefault<K extends keyof T>(key: K): T[K];
    public getDefault<K extends keyof T>(key?: K): T | T[K] {
        if (key === undefined) {
            return Session.cloneData(this.initialData);
        }
        return this.initialData[key];
    }

    public setData(data: T): void {
        this.data = data;
    }

    public set(key: keyof T, value: T[keyof T]): void {
        this.data[key] = value;
    }

    public get<K extends keyof T>(key: K): T[K] {
        return this.data[key];
    }

    public reset(): void;
    public reset<K extends keyof T>(key: K): void;
    public reset<K extends keyof T>(key?: K): void {
        if (key === undefined) {
            this.data = Session.cloneData(this.initialData);
            return;
        }
        this.data[key] = this.initialData[key];
    }

    public save(): void {
        SessionManager.saveSession(this);
    }

    public load(): void {
        const loaded = SessionManager.loadSession(this.id, this.getData());
        if (loaded) {
            this.setData(loaded.getData());
        }
    }
}