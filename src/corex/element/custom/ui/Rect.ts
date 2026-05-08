import BoardElement from "core/engine/BoardElement.js";
import Area2 from "core/engine/game/Area2.js";
import Vector2 from "core/engine/game/Vector2.js";
import Color3 from "core/engine/utils/Color3.js";
import Color3Gradient from "core/engine/utils/Color3Gradient.js";


/**
 * Representação de um Retângulo utilizando `BoardElement<HTMLDivElement>`
 *
 * @export
 * @class Rect
 * @typedef {Rect}
 * @extends {BoardElement<HTMLDivElement>}
 */
export default class Rect extends BoardElement<HTMLDivElement> {
    private area: Area2 = new Area2();

    
    /**
     * Cor de fundo de um retângulo.
     *
     * @example
     * const rect = new Rect();
     * rect.backgroundColor = "red";
     * rect.backgroundColor = new Color3(255, 0, 0);
     * rect.backgroundColor = new Color3Gradient([new Color3(255, 0, 0), new Color3(0, 0, 255)], "to right");
     * 
     * @public
     * @type {string}
     */
    public get backgroundColor(): string {
        return this.getStyleProperty("backgroundColor") || "transparent";
    }

    
    /** Cor de fundo de um retângulo. */
    public set backgroundColor(value: string | Color3 | Color3Gradient) {
        if (value instanceof Color3Gradient || value instanceof Color3) {
            value.applyToElement(this);
            return;
        }
        this.setStyleProperty("backgroundColor", value.toString());
    }


    /**
     * Lado direito do retângulo em pixels, posição X.
     *
     * @example
     * const rect = new Rect();
     * rect.left = 100; // Define a posição X do retângulo para 100 pixels.
     * rect.left = rect.left + 50; // Move o retângulo 50 pixels para a direita.
     * 
     * @public
     * @readonly
     * @type {number}
     */
    public get left(): number {
        return this.area.left;
    }

    
    /**
     * Lado de cima do retângulo em pixels, posição Y.
     *
     * @example
     * const rect = new Rect();
     * rect.top = 100; // Define a posição Y do retângulo para 100 pixels.
     * rect.top = rect.top + 50; // Move o retângulo 50 pixels para baixo.
     * 
     * @public
     * @readonly
     * @type {number}
     */
    public get top(): number {
        return this.area.top;
    }

    
    /**
     * Tamanho X do retângulo, sua largura.
     *
     * @example
     * const rect = new Rect();
     * rect.width = 200; // Define a largura do retângulo para 200 pixels.
     * rect.width = rect.width + 50; // Aumenta a largura do retângulo em 50 pixels.
     * 
     * @public
     * @readonly
     * @type {number}
     */
    public get width(): number {
        return this.area.w;
    }

    
    /**
     * Tamanho Y do retângulo, sua altura.
     * 
     * @example
     * const rect = new Rect();
     * rect.height = 100; // Define a altura do retângulo para 100 pixels.
     * rect.height = rect.height + 50; // Aumenta a altura do retângulo em 50 pixels.
     *
     * @public
     * @readonly
     * @type {number}
     */
    public get height(): number {
        return this.area.h;
    }

    
    /**
     * Pega a posição do retângulo.
     * 
     * @example
     * const rect = new Rect();
     * const position = rect.position; // Retorna um Vector2 com a posição do retângulo.
     * console.log(position.x, position.y); // Imprime a posição X e Y do retângulo.
     *
     * @public
     * @returns {Vector2} 
     */
    public getPosition(): Vector2 {
        return new Vector2(this.area.x, this.area.y);
    }


    /**
     * Muda a posição do retângulo.
     * 
     * @example
     * const rect = new Rect();
     * 
     * // Define a posição do retângulo para (100, 200).
     * rect.setPosition(new Vector2(100, 200)); 
     * 
     * // Define a posição do retângulo para (150, 250).
     * rect.setPosition(150, 250); 
     * 
     * // Move o retângulo 50 pixels para a direita e 50 pixels para baixo.
     * rect.setPosition(rect.getPosition().add(new Vector2(50, 50))); 
     *
     * @public
     * @param {Vector2} position 
     */
    public setPosition(position: Vector2): void

    /**
     * Muda a posição X e Y do retângulo.
     * 
     * @example
     * const rect = new Rect();
     * 
     * // Define a posição do retângulo para (100, 200).
     * rect.setPosition(new Vector2(100, 200)); 
     * 
     * // Define a posição do retângulo para (150, 250).
     * rect.setPosition(150, 250); 
     * 
     * // Move o retângulo 50 pixels para a direita e 50 pixels para baixo.
     * rect.setPosition(rect.getPosition().add(new Vector2(50, 50))); 
     *
     * @public
     * @param {number} x 
     * @param {number} y 
     */
    public setPosition(x: number, y: number): void

    public setPosition(x: number | Vector2, y?: number): void {
        if (x instanceof Vector2) {
            this.area.x = x.x;
            this.area.y = x.y;
        } else {
            this.area.x = x;
            this.area.y = y ?? 0;
        }
        this.update()
    }


    /**
     * Muda o tamanho do retângulo.
     *
     * @example
     * const rect = new Rect();
     * 
     * // Define o tamanho do retângulo para (200, 100).
     * rect.setSize(new Vector2(200, 100)); 
     * 
     * // Define o tamanho do retângulo para (250, 150).
     * rect.setSize(250, 150);
     * 
     * // Aumenta a largura do retângulo em 50 pixels e a altura em 25 pixels.
     * rect.setSize(rect.getPosition().add(new Vector2(50, 25)));
     * 
     * @public
     * @param {Vector2} size 
     */
    public setSize(size: Vector2): void


    /**
     * Muda a largura e altura do retângulo.
     *
     * @example
     * const rect = new Rect();
     * 
     * // Define o tamanho do retângulo para (200, 100).
     * rect.setSize(new Vector2(200, 100)); 
     * 
     * // Define o tamanho do retângulo para (250, 150).
     * rect.setSize(250, 150);
     * 
     * // Aumenta a largura do retângulo em 50 pixels e a altura em 25 pixels.
     * rect.setSize(rect.getPosition().add(new Vector2(50, 25)));
     * 
     * @public
     * @param {number} width 
     * @param {number} height 
     */
    public setSize(width: number, height: number): void

    public setSize(width: number | Vector2, height?: number): void {
        if (width instanceof Vector2) {
            this.area.size = width;
        } else {
            this.area.size = new Vector2(width, height ?? 0);
        }
        this.update();
    }


    /**
     * Cria uma instância de um Retângulo, uma representação de um Retângulo 2D, com área e cor.
     *
     * @example
     * const rect = new Rect(new Area2(new Vector2(100, 100), new Vector2(200, 100)));
     * 
     * @constructor
     * @param {?Area2} [initialArea] 
     */
    constructor(initialArea?: Area2) {
        super(document.createElement("div"));
        this.getElement().style.position = "absolute";
        
        if (initialArea) {
            this.area = initialArea;
        }
        this.update();
    }

    
    /**
     * Atualiza o estilo do retângulo na tela.
     *
     * @example
     * const rect = new Rect();
     * 
     * // Atualiza o retângulo para refletir as mudanças de posição e tamanho.
     * rect.update();
     * 
     * @public
     */
    public update(): void {
        this.updateElementSize();
        this.updateElementPosition();
    }


    /**
     * Atualiza o estilo do tamanho do retângulo na tela.
     *
     * @example
     * const rect = new Rect();
     * rect.width = 200; // Define a largura do retângulo para 200 pixels.
     * rect.height = 100; // Define a altura do retângulo para 100 pixels.
     * rect.updateElementSize(); // Atualiza o estilo do tamanho do retângulo na tela.
     * 
     * @public
     */
    public updateElementSize(): void {
        const element = this.getElement();
        element.style.width = `${this.area.w}px`;
        element.style.height = `${this.area.h}px`;
    }

    /**
     * Atualiza o estilo da posição o retângulo na tela.
     *
     * @example
     * const rect = new Rect();
     * rect.left = 100; // Define a posição X do retângulo para 100 pixels.
     * rect.top = 100; // Define a posição Y do retângulo para 100 pixels.
     * rect.updateElementPosition(); // Atualiza o estilo da posição do retângulo na tela.
     * 
     * @public
     */
    public updateElementPosition(): void {
        const element = this.getElement();
        element.style.left = `${this.area.left}px`;
        element.style.top = `${this.area.top}px`;
    }

}