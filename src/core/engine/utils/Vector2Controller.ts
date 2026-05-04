/**
 * Vector2Controller.ts
 *
 * Auto-generated documentation comment for core/engine/utils/Vector2Controller.ts.
 */

import Vector2 from "../game/Vector2";

/**
 * Vector2Controller
 *
 * Class for the engine.
 */
export default class Vector2Controller {
    private vec: Vector2;
    public _callback: () => void = () => {};

    constructor(vec: Vector2) {
        this.vec = vec;
    }

    public get x(): number { return this.vec.x; }
    public set x(value: number) { this.vec.x = value; this._callback(); }
    
    public get y(): number { return this.vec.y; }
    public set y(value: number) { this.vec.y = value; this._callback(); }

    public add(other: Vector2 | number): void {
        if (typeof other === "number") {
            this.vec.x += other;
            this.vec.y += other;
        } else {
            this.vec.x += other.x;
            this.vec.y += other.y;
        }
        this._callback();
    }

    public subtract(other: Vector2 | number): void {
        if (typeof other === "number") {
            this.vec.x -= other;
            this.vec.y -= other;
        } else {
            this.vec.x -= other.x;
            this.vec.y -= other.y;
        }
        this._callback();
    }

    public multiply(other: Vector2 | number): void {
        if (typeof other === "number") {
            this.vec.x *= other;
            this.vec.y *= other;
        } else {
            this.vec.x *= other.x;
            this.vec.y *= other.y;
        }
        this._callback();
    }

    public divide(other: Vector2 | number): void {
        if (typeof other === "number") {
            if (other === 0) {
                throw new Error("Cannot divide by zero.");
            }
            this.vec.x /= other;
            this.vec.y /= other;
        } else {
            if (other.x === 0 || other.y === 0) {
                this.vec.x = 0;
                this.vec.y = 0;
            }
            this.vec.x /= other.x;
            this.vec.y /= other.y;
        }
        this._callback();
    }

    public up(amount: number): void {
        this.vec.y -= amount;
        this._callback();
    }

    public down(amount: number): void {
        this.vec.y += amount;
        this._callback();
    }

    public left(amount: number): void {
        this.vec.x -= amount;
        this._callback();
    }

    public right(amount: number): void {
        this.vec.x += amount;
        this._callback();
    }
}