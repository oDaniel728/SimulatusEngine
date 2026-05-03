import Identifier from "@simulatus/structure/Identifier";

export default class Session<T extends Record<string, any>> {
    private data: T;
    public readonly id: Identifier;

    constructor(id: Identifier, data: T) {
        this.data = data;
        this.id = id;
    }

    public getData(): T {
        return this.data;
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
}