export default class EventList<F extends (...args: any[]) => void> {
    private events: F[];

    constructor() {
        this.events = [];
    }

    public add(event: F): void {
        this.events.push(event);
    }
    public once(event: F): void {
        const wrapper: F = ((...args: Parameters<F>) => {
            event(...args);
            this.remove(wrapper);
        }) as F;
        this.add(wrapper);
    }
    public async wait(): Promise<Parameters<F>> {
        return new Promise<Parameters<F>>((resolve) => {
            const wrapper: F = ((...args: Parameters<F>) => {
                resolve(args);
                this.remove(wrapper);
            }) as F;
            this.add(wrapper);
        });
    }

    public remove(event: F): void {
        this.events = this.events.filter(e => e !== event);
    }

    public trigger(...args: Parameters<F>): void {
        for (const event of this.events) {
            event(...args);
        }
    }
}