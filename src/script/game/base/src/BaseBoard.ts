import Board from "@simulatus/engine/Board";
import Cube from "./elements/custom/Cube";

export default class BaseBoard extends Board {
    constructor() {
        super("#root");
    }
}