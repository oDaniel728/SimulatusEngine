/**
 * Registry.ts
 *
 * Auto-generated documentation comment for core/structure/Registry.ts.
 */

import Identifier from "./Identifier";
import Registries from "./Registries";
import Asset from "./assets/Asset";

export type registryMap = {
    [Registries.LANGUAGE]: Map<string, Map<Identifier, string>>;
    [Registries.ASSET]: Map<Identifier, Asset>;
}

/**
 * Registry
 *
 * Class for the engine.
 */
export default class Registry {
    protected static registries: Map<keyof registryMap, any> = new Map();

    public static get languageRegistry(): Map<Identifier, string> {
        return this.registries.get(Registries.LANGUAGE) as Map<Identifier, string> || new Map();
    }

    public static init(): void {
        if (!this.registries.has(Registries.LANGUAGE)) {
            this.registries.set(Registries.LANGUAGE, new Map());
        }
        if (!this.registries.has(Registries.ASSET)) {
            this.registries.set(Registries.ASSET, new Map());
        }
    }
    
    public static register<K extends keyof registryMap, V extends registryMap[K]>(registry: K, id: Identifier, value: V): void {
        if (!this.registries.has(registry)) {
            this.registries.set(registry, new Map());
        }
        const reg = this.registries.get(registry)!;
        reg.set(id, value);
    }


    public static get<K extends keyof registryMap>(registry: K, id: Identifier): registryMap[K]
    public static get<K extends keyof registryMap>(registry: K): registryMap[K]

    public static get<T>(registry: Registries, id?: Identifier): T | Map<Identifier, T>{
        console.log(`Getting registry '${registry}'${id ? ` with id '${id}'` : ""}...`);
        let reg = this.registries.get(registry);
        if (!reg) {
            reg = new Map();
            this.registries.set(registry, reg);
        }
        if (id) {
            let value = reg.get(id);
            if (value === undefined) {
                const searchKey = id.toString();
                for (const existingKey of (reg as Map<Identifier, unknown>).keys()) {
                    if (existingKey.toString() === searchKey) {
                        value = (reg as Map<Identifier, unknown>).get(existingKey);
                        break;
                    }
                }
            }
            if (value === undefined) {
                console.warn(`Identifier '${id}' not found in registry '${registry}'.`);
                return undefined as unknown as T;
            }
            return value as unknown as T;
        }
        return reg as unknown as Map<Identifier, T>;
    }
}