import BoardElement from "@simulatus/engine/BoardElement";

export default class Cube extends BoardElement {
    constructor() {
        super();

        this.style.width = "100px";
        this.style.height = "100px";

        this.style.backgroundColor = "red";

        this.style.top = "100px";
        this.style.left = "100px";
    }
}