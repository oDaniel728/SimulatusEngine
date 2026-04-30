export default class Vector2 {
    public x: number;
    public y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    public add(other: Vector2): Vector2
    public add(other: number): Vector2
    public add(other: Vector2 | number): Vector2 {
        if (typeof other === "number") {
            return new Vector2(this.x + other, this.y + other);
        } else {
            return new Vector2(this.x + other.x, this.y + other.y);
        }
    }

    public subtract(other: Vector2): Vector2
    public subtract(other: number): Vector2
    public subtract(other: Vector2 | number): Vector2 {
        if (typeof other === "number") {
            return new Vector2(this.x - other, this.y - other);
        } else {
            return new Vector2(this.x - other.x, this.y - other.y);
        }
    }

    public multiply(other: number): Vector2
    public multiply(other: Vector2): Vector2
    public multiply(other: number | Vector2): Vector2 {
        if (typeof other === "number") {
            return new Vector2(this.x * other, this.y * other);
        } else {
            return new Vector2(this.x * other.x, this.y * other.y);
        }
    }

    public divide(other: number): Vector2
    public divide(other: Vector2): Vector2
    public divide(other: number | Vector2): Vector2 {
        if (typeof other === "number") {
            if (other === 0) {
                throw new Error("Cannot divide by zero.");
            }
            return new Vector2(this.x / other, this.y / other);
        } else {
            return new Vector2(this.x / other.x, this.y / other.y);
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
}