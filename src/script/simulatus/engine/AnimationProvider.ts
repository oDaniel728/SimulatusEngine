import Animation from "./Animation";
import BoardElement from "./BoardElement";

export default class AnimationProvider {
    private activeAnimations: { anim: Animation; uniqueName: string; styleElement: HTMLStyleElement }[] = [];
    private element: BoardElement<HTMLElement>;

    constructor(element: BoardElement<HTMLElement>) {
        this.element = element;
    }

    public getElement(): BoardElement<HTMLElement> {
        return this.element;
    }
    
    private createUniqueAnimationName(anim: Animation): string {
        const base = anim.name.replace(/[^a-zA-Z0-9_-]/g, "_");
        const suffix = Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
        return `${base}_${suffix}`;
    }

    private createAnimationStyleElement(anim: Animation, uniqueName: string): HTMLStyleElement {
        const style = document.createElement("style");
        style.textContent = anim.export().replace(
            new RegExp(`@keyframes\\s+${anim.name}`),
            `@keyframes ${uniqueName}`
        );
        document.head.appendChild(style);
        return style;
    }

    private updateAnimationStyles(): void {
        const element = this.getElement();
        if (this.activeAnimations.length === 0) {
            element.style.animationName = "none";
            element.style.animationDuration = "0s";
            element.style.animationTimingFunction = "ease";
            element.style.animationDelay = "0s";
            element.style.animationIterationCount = "1";
            element.style.animationDirection = "normal";
            element.style.animationFillMode = "forwards";
            element.style.animationPlayState = "running";
            return;
        }

        element.style.animationName = this.activeAnimations.map((record) => record.uniqueName).join(", ");
        element.style.animationDuration = this.activeAnimations.map((record) => `${record.anim.duration}ms`).join(", ");
        element.style.animationTimingFunction = this.activeAnimations.map((record) => record.anim.timingFunction).join(", ");
        element.style.animationDelay = this.activeAnimations.map((record) => `${record.anim.delay}ms`).join(", ");
        element.style.animationIterationCount = this.activeAnimations.map((record) => String(record.anim.iterationCount)).join(", ");
        element.style.animationDirection = this.activeAnimations.map((record) => record.anim.direction ?? "normal").join(", ");
        element.style.animationFillMode = this.activeAnimations.map((record) => record.anim.fillMode ?? "forwards").join(", ");
        element.style.animationPlayState = this.activeAnimations.map((record) => record.anim.playState ?? "running").join(", ");
    }

    public playAnimation(
        ...anims: Animation[]
    ): Promise<void> {
        const element = this.getElement();
        if (anims.length === 0) {
            return Promise.resolve();
        }

        const newRecords = anims.map((anim) => {
            const uniqueName = this.createUniqueAnimationName(anim);
            const styleElement = this.createAnimationStyleElement(anim, uniqueName);
            return {
                anim,
                uniqueName,
                styleElement,
            };
        });
        this.activeAnimations.push(...newRecords);
        this.updateAnimationStyles();

        const promises = newRecords.map((record) => {
            return new Promise<void>((resolve) => {
                const handleFinish = (event: AnimationEvent) => {
                    if (event.animationName !== record.uniqueName) {
                        return;
                    }

                    element.removeEventListener("animationend", handleFinish);
                    element.removeEventListener("animationcancel", handleFinish);

                    this.activeAnimations = this.activeAnimations.filter((active) => active.uniqueName !== record.uniqueName);
                    this.updateAnimationStyles();
                    if (record.styleElement.parentElement === document.head) {
                        document.head.removeChild(record.styleElement);
                    }
                    resolve();
                };

                element.addEventListener("animationend", handleFinish);
                element.addEventListener("animationcancel", handleFinish);
            });
        });

        return Promise.all(promises).then(() => undefined);
    }
}