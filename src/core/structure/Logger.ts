/**
 * Logger.ts
 *
 * Auto-generated documentation comment for core/structure/Logger.ts.
 */

type ConvertibleToString = { toString(): string };

const appendMessage = (str: string, situation: "log" | "warn" | "error"): void => {
    const logContainer = document.querySelector(".loading ul");
    if (logContainer) {
        const li = document.createElement("li");
        li.textContent = str;
        li.classList.add(situation);
        logContainer.appendChild(li);
    }

};

/**
 * Logger
 *
 * Class for the engine.
 */
export default class Logger {

    constructor(private _id: string) {
        this.info("Logger initialized with ID:", this._id);
    }

    private convertAllToString(...all: any[]): string[] {
        return all.map((arg) => {
            if (arg.toString) {
                return arg.toString();
            }
            if (typeof arg === "object") {
                try {
                    return JSON.stringify(arg);
                } catch {
                    return String(arg);
                }
            }
            return String(arg);
        });
    }

    private send(fn: Function, content: string): void {
        fn(content);
        appendMessage(content, fn === console.warn ? "warn" : fn === console.error ? "error" : "log");
    }

    public info(...args: any[]): void {
        this.send(console.log, "(" + this._id + ") [INFO]: " + this.convertAllToString(...args).join(" "));
    }

    public warn(...args: any[]): void {
        this.send(console.warn, "(" + this._id + ") [WARN]: " + this.convertAllToString(...args).join(" "));
    }

    public error(...args: any[]): void {
        this.send(console.error, "(" + this._id + ") [ERROR]: " + this.convertAllToString(...args).join(" "));
    }
}