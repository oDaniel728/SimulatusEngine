export default class Identifier {
    public constructor(
        public namespace: string, 
        public name: string
    ) {}
    public toString(): string {
        return `${this.namespace}:${this.name}`;
    }
}