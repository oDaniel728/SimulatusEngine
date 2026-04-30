import Animation from "./Animation";
import BoardElement from "./BoardElement";

export default class AnimatedElement<E extends HTMLElement = HTMLDivElement> extends BoardElement<E> {
    constructor() {
        super();
    }
    public playAnimation(
        ...anims: Animation[]
    ): Promise<void> {
        const element = this.getElement();
        if (anims.length === 0) {
            return Promise.resolve();
        }

        // Force restart: clear any existing CSS animation first.
        element.style.animationName = "none";
        element.style.animationDuration = "0s";
        void element.offsetWidth;

        element.style.animationName = anims.map((anim) => anim.name).join(", ");
        element.style.animationDuration = anims.map((anim) => `${anim.duration}ms`).join(", ");
        element.style.animationTimingFunction = anims.map((anim) => anim.timingFunction).join(", ");
        element.style.animationDelay = anims.map((anim) => `${anim.delay}ms`).join(", ");
        element.style.animationIterationCount = anims.map((anim) => String(anim.iterationCount)).join(", ");
        element.style.animationDirection = anims.map((anim) => anim.direction ?? "normal").join(", ");
        element.style.animationFillMode = anims.map((anim) => anim.fillMode ?? "forwards").join(", ");
        element.style.animationPlayState = anims.map((anim) => anim.playState ?? "running").join(", ");

        return new Promise((resolve) => {
            let remaining = anims.length;
            const handleFinish = (event: AnimationEvent) => {
                if (!anims.some((anim) => anim.name === event.animationName)) {
                    return;
                }
                remaining -= 1;
                if (remaining <= 0) {
                    element.removeEventListener("animationend", handleFinish);
                    element.removeEventListener("animationcancel", handleFinish);
                    resolve();
                }
            };

            element.addEventListener("animationend", handleFinish);
            element.addEventListener("animationcancel", handleFinish);
        });
    }
}