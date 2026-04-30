export default class Identifier {
    public constructor(
        public namespace: string, 
        public name: string
    ) {}
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