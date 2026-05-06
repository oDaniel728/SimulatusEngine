/**
 * EventList.ts
 *
 * Auto-generated documentation comment for core/engine/utils/EventList.ts.
 */

type EventListenerProps = {
    once?: boolean;
}

/**
 * EventList
 *
 * Class for the engine.
 */
export default class EventList<F extends (...args: any[]) => void> {
    private events: F[];

    constructor() {
        this.events = [];
    }

    public addEventListener(event: F, props?: EventListenerProps): void {
        if (props?.once) {
            const wrapper: F = ((...args: Parameters<F>) => {
                event(...args);
                this.remove(wrapper);
            }) as F;
            this.events.push(wrapper);
        } else {
            this.events.push(event);
        }
    }
    public async wait(): Promise<Parameters<F>> {
        return new Promise<Parameters<F>>((resolve) => {
            const wrapper: F = ((...args: Parameters<F>) => {
                resolve(args);
                this.remove(wrapper);
            }) as F;
            this.addEventListener(wrapper);
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

    public async triggerAsync(...args: Parameters<F>): Promise<void> {
        for (const event of this.events) {
            await event(...args);
        }
    }
}