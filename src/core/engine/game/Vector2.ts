/**
 * Vector2.ts
 *
 * Auto-generated documentation comment for core/engine/game/Vector2.ts.
 */

/**
 * Vector2
 *
 * Class for the engine.
 */
export default class Vector2 {

    private _x!: number;
    private _y!: number;

    private _cb!: (() => void) | undefined;
    private get cb() { return this._cb || (() => {}); }

    public get x(): number {
        return this._x;
    }

    public set x(value: number) {
        this._x = value;
        this.cb();
    }

    public get y(): number {
        return this._y;
    }

    public set y(value: number) {
        this._y = value;
        this.cb();
    }

    constructor();
    constructor(x: number, y: number);
    constructor(x: number, y: number, cb: () => void);
    constructor(x: number = 0, y: number = 0, cb?: () => void) {
        this._x = x;
        this._y = y;
        this._cb = cb;
    }

    public add(other: Vector2): Vector2
    public add(other: number): Vector2
    public add(x: number, y: number): Vector2
    public add(x: Vector2 | number, y?: number): Vector2 {
        if (typeof x === "number" && y === undefined) {
            return new Vector2(this.x + x, this.y + x);
        } else if (y !== undefined && typeof x === "number") {
            return new Vector2(this.x + x, this.y + y);
        } else if (x instanceof Vector2) {
            return new Vector2(this.x + x.x, this.y + x.y);
        }
        return new Vector2;
    }

    public subtract(other: Vector2): Vector2
    public subtract(other: number): Vector2
    public subtract(x: number, y: number): Vector2
    public subtract(x: Vector2 | number, y?: number): Vector2 {
        if (typeof x === "number") {
            return new Vector2(this.x - x, this.y - x);
        } else if (y !== undefined && typeof x === "number") {
            return new Vector2(this.x - x, this.y - y);
        } else {
            return new Vector2(this.x - x.x, this.y - x.y);
        }
    }

    public multiply(other: number): Vector2
    public multiply(other: Vector2): Vector2
    public multiply(x: number, y: number): Vector2
    public multiply(x: Vector2 | number, y?: number): Vector2 {
        if (typeof x === "number") {
            return new Vector2(this.x * x, this.y * x);
        } else if (y !== undefined && typeof x === "number") {
            return new Vector2(this.x * x, this.y * y);
        } else {
            return new Vector2(this.x * x.x, this.y * x.y);
        }
    }

    public divide(other: number): Vector2
    public divide(other: Vector2): Vector2
    public divide(x: number, y: number): Vector2
    public divide(x: Vector2 | number, y?: number): Vector2 {
        if (typeof x === "number") {
            return new Vector2(this.x / x, this.y / x);
        } else if (y !== undefined && typeof x === "number") {
            return new Vector2(this.x / x, this.y / y);
        } else {
            return new Vector2(this.x / x.x, this.y / x.y);
        }
    }

    public magnitude(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    public normalize(): Vector2 {
        const mag = this.magnitude();
        if (mag === 0) {
            return new Vector2(0, 0);
        }
        return this.divide(mag);
    }

    public toString(): string {
        return `Vector2(${this.x}, ${this.y})`;
    }
        
    public clone(): Vector2 {
        return new Vector2(this.x, this.y);
    }
}