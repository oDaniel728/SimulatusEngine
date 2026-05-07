/**
 * Identifier.ts
 *
 * Auto-generated documentation comment for core/structure/Identifier.ts.
 */

/**
 * Identifier
 *
 * Class for the engine.
 */
export default class Identifier {
    public constructor(
        public namespace: string, 
        public name: string
    ) {}
    public capitalizeNamespace(): string {
        return this.namespace.split("-").map(part => part.charAt(0).toUpperCase() + part.slice(1)).join("-");
    }
    public static capitalizeName(name: string): string {
        return name.split("-").map(part => part.charAt(0).toUpperCase() + part.slice(1)).join("-").replace("\-", "");
    }
    public getRoot(): string {
        return `./script/game/${this.capitalizeNamespace()}/`
    }
    public toString(): string {
        return `${this.namespace}:${this.name}`;
    }
    public static fromString(str: string): Identifier {
        const [namespace, name] = str.split(":");
        return new Identifier(namespace, name);
    }

    public static of(namespace: string, name: string): Identifier {
        return new Identifier(namespace, name);
    }
}