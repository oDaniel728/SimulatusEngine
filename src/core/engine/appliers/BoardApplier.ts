import BoardElement from "../BoardElement";

export default interface BoardApplier {
    applyToBoardElement(element: BoardElement): void;
}