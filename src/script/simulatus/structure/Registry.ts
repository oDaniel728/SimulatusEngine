import Identifier from "./Identifier";
import LanguageProvider from "./providers/LanguageProvider";
import Registries from "./Registries";

type registryMap = {
    [Registries.LANGUAGE]: string;
}

export default class Registry {
    protected static registries: Map<keyof registryMap, Map<Identifier, any>> = new Map();

    public static get languageRegistry(): Map<Identifier, string> {
        return this.registries.get(Registries.LANGUAGE) as Map<Identifier, string> || new Map();
    }
    
    public static register<K extends keyof registryMap, V extends registryMap[K]>(registry: K, id: Identifier, value: V): void {

        if (!this.registries.has(registry)) {
            this.registries.set(registry, new Map());
        }
        const reg = this.registries.get(registry)!;
        reg.set(id, value);
    }


    public static get<K extends keyof registryMap>(registry: K, id: Identifier): registryMap[K] | undefined
    public static get<K extends keyof registryMap>(registry: K): Map<Identifier, registryMap[K]> | undefined

    public static get<T>(registry: Registries, id?: Identifier): T | Map<Identifier, T> | undefined {
        const reg = this.registries.get(registry);
        if (!reg) return undefined;
        if (id) {
            return reg.get(id);
        } else {
            return reg as Map<Identifier, T>;
        }
    }
}