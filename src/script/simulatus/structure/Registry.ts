import Identifier from "./Identifier";
import Registries from "./Registries";

export default class Registry {
    public static registries: Map<Registries, Map<Identifier, any>> = new Map();
    public static register<T>(registry: Registries, id: Identifier, value: T): void {
        if (!this.registries.has(registry)) {
            this.registries.set(registry, new Map());
        }
        const reg = this.registries.get(registry)!;
        reg.set(id, value);
    }


    public static get<T>(registry: Registries, id: Identifier): T | undefined
    public static get<T>(registry: Registries): Map<Identifier, T> | undefined

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