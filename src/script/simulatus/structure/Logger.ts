export default class Logger {

    constructor(private _id: string) {

    }

    public info(...args: any[]): void {
        console.log("(" + this._id + ") [INFO]:", ...args);
    }

    public warn(...args: any[]): void {
        console.warn("(" + this._id + ") [WARN]:", ...args);
    }

    public error(...args: any[]): void {
        console.error("(" + this._id + ") [ERROR]:", ...args);
    }
}