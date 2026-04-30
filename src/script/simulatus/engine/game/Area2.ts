import Vector2 from "./Vector2";

export default class Area2 {
    public position: Vector2;
    public size: Vector2;
    public _callback: () => void = () => {};

    constructor(position: Vector2 = new Vector2(), size: Vector2 = new Vector2()) {
        this.position = position;
        this.size = size;
    }

    public get x(): number { return this.position.x; }
    public set x(value: number) { this.position.x = value; this._callback(); }
    
    public get y(): number { return this.position.y; }
    public set y(value: number) { this.position.y = value; this._callback(); }
    
    public get w(): number { return this.size.x; }
    public set w(value: number) { this.size.x = value; this._callback(); }
    
    public get h(): number { return this.size.y; }
    public set h(value: number) { this.size.y = value; this._callback(); }

    public get left(): number { return this.position.x; }
    public get right(): number { return this.position.x + this.size.x; }
    public get top(): number { return this.position.y; }
    public get bottom(): number { return this.position.y + this.size.y; }

    public getRelativePoint(point: Vector2): Vector2 {
        // point = (0..1, 0..1) => (position.x..position.x + size.x, position.y..position.y + size.y)
        return new Vector2(
            this.position.x + point.x * this.size.x,
            this.position.y + point.y * this.size.y
        );        
    }

    public contains(point: Vector2): boolean {
        return point.x >= this.position.x &&
               point.x <= this.position.x + this.size.x &&
               point.y >= this.position.y &&
               point.y <= this.position.y + this.size.y;
    }

    public intersects(other: Area2): boolean {
        return !(other.position.x > this.position.x + this.size.x ||
                 other.position.x + other.size.x < this.position.x ||
                 other.position.y > this.position.y + this.size.y ||
                 other.position.y + other.size.y < this.position.y);
    }

    public getCenter(): Vector2 {
        return new Vector2(this.position.x + this.size.x / 2, this.position.y + this.size.y / 2);
    }

    public toString(): string {
        return `Area2(position: ${this.position.toString()}, size: ${this.size.toString()})`;
    }
}