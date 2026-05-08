/**
 * Area2.ts
 *
 * Auto-generated documentation comment for core/engine/game/Area2.ts.
 */

import Applier from "../appliers/Applier";
import Vector2 from "./Vector2";
import * as CSS from "csstype";

type StylableHTMLElement = { style: CSS.Properties };

/**
 * Area2
 *
 * Class for the engine.
 */
export default class Area2 implements Applier {

    /**
     * Posição da Area
     *
     * @deprecated Use as propriedades `x` e `y` para acessar a posição da área, ou use a propriedade position para acessar a posição como um Vector2.
     * 
     * @example
     * const area = new Area2();
     * area.position = new Vector2(100, 100); // Define a posição da área para (100, 100).
     * area.position.x = 150; // Move a área 50 pixels para a direita.
     * area.position.y = 150; // Move a área 50 pixels para baixo.
     * console.log(area.position.x, area.position.y); // Imprime a posição X e Y da área.
     * 
     * @public
     * @type {Vector2}
     */
    public position: Vector2;


    /**
     * Tamanho da Area
     * 
     * @deprecated Use as propriedades width `w` e height `h` para acessar o tamanho da área, ou use a propriedade size para acessar o tamanho como um Vector2.
     * 
     * @example
     * const area = new Area2();
     * area.size = new Vector2(200, 100); // Define o tamanho da área para (200, 100).
     * area.size.x = 250; // Aumenta a largura da área para 250 pixels.
     * area.size.y = 150; // Aumenta a altura da área para 150 pixels.
     * console.log(area.size.x, area.size.y); // Imprime a largura e altura da área.
     * 
     * @public
     * @type {Vector2}
     */
    public size: Vector2;

    /**
     * Ponto de âncora da Area, representando o ponto central da área em uma escala de 0 a 1, onde (0, 0) é o canto superior esquerdo e (1, 1) é o canto inferior direito.
     * 
     * @example
     * const area = new Area2();
     * area.anchorPoint = new Vector2(0.5, 0.5); // Define o ponto de âncora para o centro da área.
     * 
     * @public
     * @type {Vector2}
     */
    public anchorPoint: Vector2;
    public _callback: () => void = () => {};


    /**
     * Cria uma instância de Area2, uma representação de Tamanho e Posição em uma classe.
     *
     * @example
     * // Define a posição da área para (100, 100), 
     * // o tamanho para (200, 100) 
     * // e o ponto de âncora para o centro da área (0.5, 0.5).
     * const area = new Area2(new Vector2(100, 100), new Vector2(200, 100), new Vector2(0.5, 0.5));
     * 
     * @constructor
     */
    constructor();

    /**
     * Cria uma instância de Area2.
     *
     * @constructor
     * @param {Vector2} position - A posição da área.
     */
    constructor(position: Vector2);

    
    /**
     * Cria uma instância de Area2.
     *
     * @constructor
     * @param {Vector2} position - A posição da área.
     * @param {Vector2} size - O tamanho da área.
     */
    constructor(position: Vector2, size: Vector2);


    /**
     * Cria uma instância de Area2.
     *
     * @constructor
     * @param {Vector2} position - A posição da área.
     * @param {Vector2} size - O tamanho da área.
     * @param {Vector2} anchorPoint - O ponto de âncora/centro da área.
     */
    constructor(position: Vector2, size: Vector2, anchorPoint: Vector2);
    constructor(position: Vector2 = new Vector2(), size: Vector2 = new Vector2(), anchorPoint: Vector2 = new Vector2(0, 0)) {
        this.position = position;
        this.size = size;
        this.anchorPoint = anchorPoint;
    }


    /**
     * Posição X da Area.
     *
     * @public
     * @type {number} - A posição X da área, representada pela componente X da posição da área.
     */
    public get x(): number { return this.position.x; }
    public set x(value: number) { this.position.x = value; this._callback(); }
    

    /**
     * Posição Y da Area.
     *
     * @public
     * @type {number} - A posição Y da área, representada pela componente Y da posição da área.
     */
    public get y(): number { return this.position.y; }
    public set y(value: number) { this.position.y = value; this._callback(); }
    

    /**
     * Tamanho X, Largura da Area.
     *
     * @public
     * @type {number} - A largura da área, representada pela componente X do tamanho da área.
     */
    public get w(): number { return this.size.x; }
    public set w(value: number) { this.size.x = value; this._callback(); }
    
    /**
     * Tamanho Y, Altura da Area.
     *
     * @public
     * @type {number} - A altura da área, representada pela componente Y do tamanho da área.
     */
    public get h(): number { return this.size.y; }
    public set h(value: number) { this.size.y = value; this._callback(); }

    /**
     * Posição esquerda da Area.
     *
     * @public
     * @type {number} - A posição X do lado esquerdo da área, calculada como a posição X da área.
     */
    public get left(): number { return this.position.x; }
    
    /**
     * Posição direita da Area.
     *
     * @public
     * @type {number} - A posição X do lado direito da área, calculada como a posição X mais a largura da área.
     */
    public get right(): number { return this.position.x + this.size.x; }
    
    /**
     * Posição superior da Area.
     *
     * @public
     * @type {number} - A posição Y do topo da área, calculada como a posição Y da área.
     */
    public get top(): number { return this.position.y; }
    
    /**
     * Posição inferior da Area.
     *
     * @public
     * @type {number} - A posição Y do fundo da área, calculada como a posição Y mais a altura da área.
     */
    public get bottom(): number { return this.position.y + this.size.y; }


    /**
     * Obtém um ponto relativo dentro da área, onde o ponto é definido em uma escala de 0 a 1, representando a posição relativa dentro da área.
     * Por exemplo, um ponto de (0.5, 0.5) retornaria o ponto central da área, enquanto um ponto de (0, 0) retornaria o canto superior esquerdo e um ponto de (1, 1) retornaria o canto inferior direito.
     * 
     * @example
     * const area = new Area2(new Vector2(100, 100), new Vector2(200, 100));
     * // Retorna o ponto central da área, que seria (200, 150).
     * const relativePoint = area.getRelativePoint(new Vector2(0.5, 0.5)); 
     * // Imprime a posição X e Y do ponto relativo dentro da área.
     * console.log(relativePoint.x, relativePoint.y); 
     *
     * @public
     * @param {Vector2} point - O ponto relativo dentro da área, onde (0, 0) é o canto superior esquerdo e (1, 1) é o canto inferior direito.
     * @returns {Vector2} - O ponto absoluto dentro da área correspondente ao ponto relativo fornecido.
     */
    public getRelativePoint(point: Vector2): Vector2 {
        // point = (0..1, 0..1) => (position.x..position.x + size.x, position.y..position.y + size.y)
        return new Vector2(
            this.position.x + point.x * this.size.x,
            this.position.y + point.y * this.size.y
        );        
    }

    
    /**
     * Verifica se um ponto está contido dentro da área.
     *
     * @deprecated Use o método containsPoint para verificar se um ponto está contido dentro da área, ou use o método collidesWith para verificar se um ponto ou outra área colide com esta área.
     * 
     * @example
     * const area = new Area2(new Vector2(100, 100), new Vector2(200, 100));
     * const point = new Vector2(150, 150);
     * const isContained = area.contains(point); // Retorna true, pois o ponto (150, 150) está dentro da área definida por (100, 100) e (300, 200).
     * console.log(isContained ? "Ponto está dentro da área" : "Ponto não está dentro da área");
     * // se isContained: "Ponto está dentro da área"
     * // senão: "Ponto não está dentro da área"
     * 
     * @public
     * @param {Vector2} point - O ponto a ser verificado, representado como um Vector2 com coordenadas X e Y.
     * @returns {boolean} - Retorna true se o ponto estiver contido dentro da área, ou false caso contrário.
     */
    public contains(point: Vector2): boolean {
        return point.x >= this.position.x &&
               point.x <= this.position.x + this.size.x &&
               point.y >= this.position.y &&
               point.y <= this.position.y + this.size.y;
    }

    /**
     * Verifica se um ponto ou outra área colide com esta área, ou seja, se um ponto está contido dentro da área ou se outra área intersecta esta área.
     *
     * @example
     * const area = new Area2(new Vector2(100, 100), new Vector2(200, 100));
     * const point = new Vector2(150, 150);
     * const isInside = area.collidesWith(point); // Retorna true, pois o ponto (150, 150) está dentro da área.
     * console.log(isInside ? "Ponto colide com a área" : "Ponto não colide com a área");
     * // se isInside: "Ponto colide com a área"
     * // senão: "Ponto não colide com a área"
     * 
     * @public
     * @param {Vector2} point 
     * @returns {boolean} 
     */
    public containsPoint(point: Vector2): boolean {
        return this.contains(point);
    }


    /**
     * Verifica a colisão com outra area
     *
     * @example
     * const area1 = new Area2(new Vector2(100, 100), new Vector2(200, 100));
     * const area2 = new Area2(new Vector2(150, 150), new Vector2(200, 100));
     * 
     * const isColliding = area1.collidesWith(area2); // Retorna true, pois as áreas se intersectam.
     * 
     * console.log(isColliding ? "As áreas colidem" : "As áreas não colidem");
     * // se isColliding: "As áreas colidem"
     * // senão: "As áreas não colidem"
     * 
     * @public
     * @param {Area2} collision - A outra área a ser verificada para colisão, representada como uma instância de Area2.
     * @returns {boolean} - Retorna true se as áreas colidem, ou false caso contrário.
     */
    public collidesWith(collision: Area2): boolean

    /**
     * Verifica a colisão com um ponto
     * 
     * @example
     * const area = new Area2(new Vector2(100, 100), new Vector2(200, 100));
     * const point = new Vector2(150, 150);
     * 
     * const isColliding = area.collidesWith(point); // Retorna true, pois o ponto (150, 150) colide com a área.
     * 
     * console.log(isColliding ? "O ponto colide com a área" : "O ponto não colide com a área");
     * // se isColliding: "O ponto colide com a área"
     * // senão: "O ponto não colide com a área"
     * 
     * @public
     * @param {Vector2} point - O ponto a ser verificado, representado como um Vector2 com coordenadas X e Y.
     * @returns {boolean} - Retorna true se o ponto colidir com a área, ou false caso contrário.
     */
    public collidesWith(point: Vector2): boolean
    public collidesWith(other: Area2 | Vector2): boolean {
        if (other instanceof Area2) {
            return this.intersects(other);
        } else {
            return this.containsPoint(other);
        }
    }


    /**
     * Verifica se esta área intersecta com outra área, ou seja, se as áreas se sobrepõem em algum ponto.
     *
     * @example
     * const area1 = new Area2(new Vector2(100, 100), new Vector2(200, 100));
     * const area2 = new Area2(new Vector2(150, 150), new Vector2(200, 100));
     * 
     * const isIntersecting = area1.intersects(area2); // Retorna true, pois as áreas se intersectam.
     * 
     * console.log(isIntersecting ? "As áreas se intersectam" : "As áreas não se intersectam");
     * // se isIntersecting: "As áreas se intersectam"
     * // senão: "As áreas não se intersectam"
     * 
     * @public
     * @param {Area2} other - A outra área a ser verificada para interseção, representada como uma instância de Area2.
     * @returns {boolean} - Retorna true se as áreas se intersectam, ou false caso contrário.
     */
    public intersects(other: Area2): boolean {
        return !(other.position.x > this.position.x + this.size.x ||
                 other.position.x + other.size.x < this.position.x ||
                 other.position.y > this.position.y + this.size.y ||
                 other.position.y + other.size.y < this.position.y);
    }


    /**
     * Obtém o ponto central da área, calculado com base na posição, tamanho e ponto de âncora da área.
     *
     * @example
     * const area = new Area2(new Vector2(100, 100), new Vector2(200, 100), new Vector2(0.5, 0.5));
     * const center = area.getCenter(); // Retorna o ponto central da área, que seria (200, 150).
     * 
     * console.log(center.x, center.y); // Imprime a posição X e Y do ponto central da área.
     * 
     * @public
     * @returns {Vector2} - O ponto central da área, representado como um Vector2 com coordenadas X e Y.
     */
    public getCenter(): Vector2 {
        return new Vector2(
            this.left - (this.size.x * this.anchorPoint.x),
            this.top - (this.size.y * this.anchorPoint.y)
        );
    }

    /**
     * Retorna uma representação em string da área, incluindo sua posição, tamanho e ponto de âncora.
     *
     * @example
     * const area = new Area2(new Vector2(100, 100), new Vector2(200, 100), new Vector2(0.5, 0.5));
     * 
     * console.log(area.toString()); // Imprime "Area2(position: (100, 100), size: (200, 100), anchorPoint: (0.5, 0.5))"
     * 
     * @public
     * @returns {string} - Uma string representando a área, no formato "Area2(position: (x, y), size: (width, height), anchorPoint: (anchorX, anchorY))".
     */
    public toString(): string {
        return `Area2(position: ${this.position.toString()}, size: ${this.size.toString()}, anchorPoint: ${this.anchorPoint.toString()})`;
    }

    /**
     * Aplica as propriedades da área a um elemento HTML, definindo seu estilo para refletir a posição, tamanho e ponto de âncora da área. 
     *
     * @example
     * const boardElement = new BoardElement(document.createElement("div"));
     * const area = new Area2(new Vector2(100, 100), new Vector2(200, 100), new Vector2(0.5, 0.5));
     * 
     * area.applyToElement(boardElement.getElement()); // Aplica as propriedades da área ao elemento HTML, centralizando o elemento em relação à área.
     * 
     * @public 
     * @implements {Applier}
     * @param {StylableHTMLElement} element - O elemento HTML ao qual as propriedades da área serão aplicadas, representado como um objeto que possui uma propriedade style do tipo CSS.Properties.
     */
    public applyToElement(element: StylableHTMLElement): void {
        this.applyCenterToElement(element)
    }

    /**
     * Aplica as propriedades da área a um elemento HTML, definindo seu estilo para refletir a posição, tamanho e ponto de âncora da área, centralizando o elemento em relação à área.
     *
     * @deprecated Use o método applyToElement para aplicar as propriedades da área a um elemento HTML, ou use os métodos updateElementSize e updateElementPosition para atualizar o estilo do tamanho e posição do elemento HTML separadamente.
     * 
     * @public
     * @param {StylableHTMLElement} element - O elemento HTML ao qual as propriedades da área serão aplicadas, representado como um objeto que possui uma propriedade style do tipo CSS.Properties.
     */
    public applyCenterToElement(element: StylableHTMLElement): void {
        const center = this.getCenter();
        element.style.position = "absolute";
        element.style.left = `${center.x}px`;
        element.style.top = `${center.y}px`;
        element.style.width = `${this.size.x}px`;
        element.style.height = `${this.size.y}px`;
    }
}