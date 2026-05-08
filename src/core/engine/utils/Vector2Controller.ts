/**
 * Vector2Controller.ts
 *
 * Auto-generated documentation comment for core/engine/utils/Vector2Controller.ts.
 */

import Vector2 from "../game/Vector2";

/**
 * Vector2Controller
 *
 * Controlador de Vector2 orientado a jogos com movimentação top-down.
 * 
 * @example
 * const vec = new Vector2(1, 2);
 * const controller = new Vector2Controller(vec);
 * 
 * // Adiciona um ouvinte de callback para ser chamado sempre que o vetor for modificado
 * controller._callback = () => {
 *     console.log("O vetor foi modificado:", controller.x, controller.y);
 * };
 * 
 * // Modifica o vetor usando os métodos do controlador
 * controller.add(new Vector2(1, 1)); // Isso acionará o callback e imprimirá: O vetor foi modificado: 2 3
 * controller.up(1); // Isso acionará o callback e imprimirá: O vetor foi modificado: 2 2
 */
export default class Vector2Controller {
    private vec: Vector2;
    public _callback: () => void = () => {};

    constructor(vec: Vector2) {
        this.vec = vec;
    }

    /**
     * Obtém o valor da coordenada x do vetor controlado, retornando o valor atual da coordenada x. Este método permite acessar a coordenada x do vetor controlado, facilitando a leitura e manipulação dos valores do vetor em outras partes do código.
     *
     * @public
     * @type {number}
     */
    public get x(): number { return this.vec.x; }
    public set x(value: number) { this.vec.x = value; this._callback(); }
    
    /**
     * Obtém o valor da coordenada y do vetor controlado, retornando o valor atual da coordenada y. Este método permite acessar a coordenada y do vetor controlado, facilitando a leitura e manipulação dos valores do vetor em outras partes do código.
     *
     * @public
     * @type {number}
     */
    public get y(): number { return this.vec.y; }
    public set y(value: number) { this.vec.y = value; this._callback(); }

    /**
     * Adiciona um vetor ou um valor numérico ao vetor controlado, modificando as coordenadas x e y do vetor de acordo com o valor fornecido. Este método permite realizar operações de adição no vetor controlado, facilitando a manipulação dos valores do vetor em outras partes do código e garantindo que o callback seja acionado sempre que o vetor for modificado.
     *
     * @public
     * @param {(Vector2 | number)} other - O vetor ou valor numérico a ser adicionado ao vetor controlado. Se for um número, ele será adicionado a ambas as coordenadas x e y do vetor controlado. Se for um vetor, suas coordenadas x e y serão adicionadas às coordenadas correspondentes do vetor controlado.
     */
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

    /**
     * Subtrai um vetor ou um valor numérico do vetor controlado, modificando as coordenadas x e y do vetor de acordo com o valor fornecido. Este método permite realizar operações de subtração no vetor controlado, facilitando a manipulação dos valores do vetor em outras partes do código e garantindo que o callback seja acionado sempre que o vetor for modificado.
     *
     * @public
     * @param {(Vector2 | number)} other - O vetor ou valor numérico a ser subtraído do vetor controlado. Se for um número, ele será subtraído de ambas as coordenadas x e y do vetor controlado. Se for um vetor, suas coordenadas x e y serão subtraídas das coordenadas correspondentes do vetor controlado.
     */
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

    /**
     * Multiplica o vetor controlado por um vetor ou um valor numérico, modificando as coordenadas x e y do vetor de acordo com o valor fornecido. Este método permite realizar operações de multiplicação no vetor controlado, facilitando a manipulação dos valores do vetor em outras partes do código e garantindo que o callback seja acionado sempre que o vetor for modificado.
     * 
     * @public
     * @param {(Vector2 | number)} other - O vetor ou valor numérico pelo qual o vetor controlado será multiplicado. Se for um número, ele será multiplicado por ambas as coordenadas x e y do vetor controlado. Se for um vetor, suas coordenadas x e y serão multiplicadas pelas coordenadas correspondentes do vetor controlado.
     */
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

    /**
     * Divide o vetor controlado por um vetor ou um valor numérico, modificando as coordenadas x e y do vetor de acordo com o valor fornecido. Este método permite realizar operações de divisão no vetor controlado, facilitando a manipulação dos valores do vetor em outras partes do código e garantindo que o callback seja acionado sempre que o vetor for modificado. Ele também inclui tratamento para evitar divisões por zero, garantindo que o vetor seja definido como zero se uma divisão por zero for tentada.
     * 
     * @public
     * @param {(Vector2 | number)} other - O vetor ou valor numérico pelo qual o vetor controlado será dividido. Se for um número, ele será usado para dividir ambas as coordenadas x e y do vetor controlado. Se for um vetor, suas coordenadas x e y serão usadas para dividir as coordenadas correspondentes do vetor controlado.
     */
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

    /**
     * Move o vetor controlado para cima, diminuindo a coordenada y do vetor em uma quantidade especificada. Este método é usado para mover o vetor para cima em um sistema de coordenadas onde a direção positiva de y é para baixo, facilitando a manipulação dos valores do vetor em outras partes do código e garantindo que o callback seja acionado sempre que o vetor for modificado.
     * 
     * @public
     * @param {number} amount - A quantidade pela qual a coordenada y do vetor controlado deve ser diminuída para mover o vetor para cima. Este valor é subtraído da coordenada y do vetor controlado, resultando em um movimento para cima no sistema de coordenadas.
     */
    public up(amount: number): void {
        this.vec.y -= amount;
        this._callback();
    }

    /**
     * Move o vetor controlado para baixo, aumentando a coordenada y do vetor em uma quantidade especificada. Este método é usado para mover o vetor para baixo em um sistema de coordenadas onde a direção positiva de y é para baixo, facilitando a manipulação dos valores do vetor em outras partes do código e garantindo que o callback seja acionado sempre que o vetor for modificado.
     * 
     * @public
     * @param {number} amount - A quantidade pela qual a coordenada y do vetor controlado deve ser aumentada para mover o vetor para baixo. Este valor é adicionado à coordenada y do vetor controlado, resultando em um movimento para baixo no sistema de coordenadas.
     */
    public down(amount: number): void {
        this.vec.y += amount;
        this._callback();
    }

    /**
     * Move o vetor controlado para a esquerda, diminuindo a coordenada x do vetor em uma quantidade especificada. Este método é usado para mover o vetor para a esquerda em um sistema de coordenadas onde a direção positiva de x é para a direita, facilitando a manipulação dos valores do vetor em outras partes do código e garantindo que o callback seja acionado sempre que o vetor for modificado.
     *
     * @public
     * @param {number} amount - A quantidade pela qual a coordenada x do vetor controlado deve ser diminuída para mover o vetor para a esquerda. Este valor é subtraído da coordenada x do vetor controlado, resultando em um movimento para a esquerda no sistema de coordenadas.
     */
    public left(amount: number): void {
        this.vec.x -= amount;
        this._callback();
    }

    /**
     * Move o vetor controlado para a direita, aumentando a coordenada x do vetor em uma quantidade especificada. Este método é usado para mover o vetor para a direita em um sistema de coordenadas onde a direção positiva de x é para a direita, facilitando a manipulação dos valores do vetor em outras partes do código e garantindo que o callback seja acionado sempre que o vetor for modificado.
     *
     * @public
     * @param {number} amount - A quantidade pela qual a coordenada x do vetor controlado deve ser aumentada para mover o vetor para a direita. Este valor é adicionado à coordenada x do vetor controlado, resultando em um movimento para a direita no sistema de coordenadas.
     */
    public right(amount: number): void {
        this.vec.x += amount;
        this._callback();
    }
}