import Identifier from "./Identifier";
import LanguageProvider from "./providers/LanguageProvider";
import Registries from "./Registries";

export type registryMap = {
    [Registries.LANGUAGE]: Map<string, Map<Identifier, string>>;
}

export default class Registry {
    protected static registries: Map<keyof registryMap, any> = new Map();

    public static get languageRegistry(): Map<Identifier, string> {
        return this.registries.get(Registries.LANGUAGE) as Map<Identifier, string> || new Map();
    }

    public static init(): void {
        this.registries.set(Registries.LANGUAGE, new Map());
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
        const reg = this.registries.get(registry);
        if (!reg) {
            console.warn(`Registry '${registry}' not found.`);
            return id ? undefined as unknown as T : new Map() as unknown as Map<Identifier, T>;
        }
        if (id) {
            const value = reg.get(id);
            if (value === undefined) {
                console.warn(`Identifier '${id}' not found in registry '${registry}'.`);
                return undefined as unknown as T;
            }
            return value as unknown as T;
        }
        return reg as unknown as Map<Identifier, T>;
    }
}