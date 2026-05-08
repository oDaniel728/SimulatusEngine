import { Properties } from "csstype";
import Applier from "../appliers/Applier.js";
import Color3 from "./Color3.js";
import BoardApplier from "../appliers/BoardApplier.js";
import BoardElement from "../BoardElement.js";

type Direction = "top" | "bottom" | "left" | "right" | "top left" | "top right" | "bottom left" | "bottom right";

export class Color3Gradient implements Applier, BoardApplier {
    private colors: Color3[] = [];
    private angle: number = 0;

    /**
     * Cria uma instancia de Color3Gradient, uma representação de um Gradiente de Color3.
     *
     * @example
     * const gradient = new Color3Gradient([]);
     * gradient.append(new Color3(255, 0, 0)) // Vermelho
     *         .append(new Color3(0, 255, 0)) // Verde
     *         .append(new Color3(0, 0, 255)) // Azul
     *         .setAngle(45); // Gradiente com ângulo de 45 graus
     * 
     * @constructor
     */
    constructor();

    /**
     * Cria uma instancia de Color3Gradient, uma representação de um Gradiente de Color3.
     *
     * @example
     * const gradient = new Color3Gradient([
     *     new Color3(255, 0, 0), // Vermelho
     *     new Color3(0, 255, 0), // Verde
     *     new Color3(0, 0, 255)  // Azul
     * ]); // Gradiente com ângulo de 0 graus
     * 
     * @constructor
     * @param {Color3[]} colors - Array de cores para o gradiente
     */
    constructor(colors: Color3[]);

    /**
     * Cria uma instancia de Color3Gradient, uma representação de um Gradiente de Color3.
     *
     * @example
     * const gradient = new Color3Gradient([
     *     new Color3(255, 0, 0), // Vermelho
     *     new Color3(0, 255, 0), // Verde
     *     new Color3(0, 0, 255)  // Azul
     * ], 90); // Gradiente com ângulo de 90 graus (da esquerda para a direita)
     * 
     * @constructor
     * @param {Color3[]} colors - Array de cores para o gradiente
     * @param {number} angle - Ângulo do gradiente em graus (0-360)
     */
    constructor(colors: Color3[], angle: number);

    /**
     * Cria uma instancia de Color3Gradient, uma representação de um Gradiente de Color3.
     *
     * @example
     * const gradient = new Color3Gradient([
     *     new Color3(255, 0, 0), // Vermelho
     *     new Color3(0, 255, 0), // Verde
     *     new Color3(0, 0, 255)  // Azul
     * ], "top right"); // Gradiente com direção do canto superior direito para o canto inferior esquerdo
     * 
     * @constructor
     * @param {Color3[]} colors - Array de cores para o gradiente
     * @param {Direction} angle - Direção do gradiente (top, right, bottom, left, top left, top right, bottom left, bottom right)
     */
    constructor(colors: Color3[], angle: Direction);
    constructor(colors: Color3[] = [], angle: number | Direction = 0) {
        this.colors = colors;
        this.setAngle(angle);
    }

    /**
     * Adiciona uma cor no final do gradiente.
     *
     * @example
     * gradient.append(new Color3(255, 0, 0)); // Adiciona vermelho
     *         .append(new Color3(0, 255, 0)); // Adiciona verde
     *         .append(new Color3(0, 0, 255)); // Adiciona azul
     * @public
     * @param {Color3} color - A cor a ser adicionada ao gradiente
     * @returns {this} 
     */
    public append(color: Color3): this {
        this.colors.push(color);
        return this;
    }

    /**
     * Define o ângulo do gradiente. Pode ser um número representando o ângulo em graus ou uma direção predefinida.
     *
     * @example
     * gradient.setAngle(45); // Define o ângulo para 45 graus
     * gradient.setAngle("top right"); // Define a direção do gradiente do canto superior direito para o canto inferior esquerdo
     * @public
     * @param {number | Direction} angle - O ângulo do gradiente em graus ou uma direção predefinida (top, right, bottom, left, top left, top right, bottom left, bottom right)
     * @returns {this} 
     */
    public setAngle(angle: number | Direction): this {
        switch (angle) {
            case "top":
                this.angle = 0;
                break;
            case "right":
                this.angle = 90;
                break;
            case "bottom":
                this.angle = 180;
                break;
            case "left":
                this.angle = 270;
                break;
            case "top left":
                this.angle = 315;
                break;
            case "top right":
                this.angle = 45;
                break;
            case "bottom left":
                this.angle = 225;
                break;
            case "bottom right":
                this.angle = 135;
                break;
            default:
                this.angle = typeof angle === "number" ? angle : 0;
        }
        return this;
    }

    /**
     * Retorna um array de Color3 representando as cores do gradiente.
     * 
     * @example
     * const colors = gradient.getColors(); // Retorna as cores do gradiente como um array de Color3
     * 
     * @public
     * @returns {Color3[]} - Array de Color3 representando as cores do gradiente 
     */
    public getColors(): Color3[] {
        return this.colors;
    }

    /**
     * Retorna o ângulo do gradiente.
     * 
     * @example
     * const angle = gradient.getAngle(); // Retorna o ângulo do gradiente
     * 
     * @public
     * @returns {number} - O ângulo do gradiente em graus
     */
    public getAngle(): number {
        return this.angle;
    }

    /**
     * Retorna uma representação em string do gradiente.
     * 
     * @example
     * const gradientString = gradient.toString(); // Retorna a representação em string do gradiente
     * 
     * @public
     * @returns {string} - A representação em string do gradiente
     */
    public toString(): string {
        const colorStrings = this.colors.map(color => color.toString());
        return `linear-gradient(${this.angle}deg, ${colorStrings.join(", ")})`;
    }

    /**
     * Aplica um fator de brilho ao gradiente, ajustando a luminosidade de cada cor. O fator é um número onde 1 mantém o brilho original, valores menores que 1 escurecem o gradiente e valores maiores que 1 clareiam o gradiente.
     *
     * @example
     * gradient.applyBrightness(1.2); // Clareia o gradiente
     * 
     * @public
     * @param {number} factor - O fator de brilho a ser aplicado ao gradiente (1 mantém o brilho original, <1 escurece, >1 clareia) 
     * @returns {Color3Gradient} - O próprio gradiente com o fator de brilho aplicado, permitindo encadeamento de métodos
     */
    public applyBrightness(factor: number): Color3Gradient {
        this.colors = this.colors.map(color => color.applyBrightness(factor));
        return this;
    }

    /**
     * Aplica um fator de escuridão ao gradiente, ajustando a luminosidade de cada cor. O fator é um número onde 1 mantém o brilho original, valores menores que 1 clareiam o gradiente e valores maiores que 1 escurecem o gradiente.
     *
     * @example
     * gradient.applyDarkness(0.8); // Escurece o gradiente
     *
     * @public
     * @param {number} factor - O fator de escuridão a ser aplicado ao gradiente (1 mantém o brilho original, <1 clareia, >1 escurece)
     * @returns {Color3Gradient} - O próprio gradiente com o fator de escuridão aplicado, permitindo encadeamento de métodos
     */
    public applyDarkness(factor: number): Color3Gradient {
        this.colors = this.colors.map(color => color.applyDarkness(factor));
        return this;
    }

    /**
     * Aplica um fator de saturação ao gradiente, ajustando a intensidade das cores. O fator é um número onde 1 mantém a saturação original, valores menores que 1 dessaturam o gradiente e valores maiores que 1 aumentam a saturação do gradiente.
     *
     * @example
     * gradient.applySaturation(0.5); // Dessatura o gradiente
     *
     * @public
     * @param {number} factor - O fator de saturação a ser aplicado ao gradiente (1 mantém a saturação original, <1 dessatura, >1 aumenta a saturação)
     * @returns {Color3Gradient} - O próprio gradiente com o fator de saturação aplicado, permitindo encadeamento de métodos
     */
    public applySaturation(factor: number): Color3Gradient {
        this.colors = this.colors.map(color => color.applySaturation(factor));
        return this;
    }

    /**
     * Aplica um fator de alpha ao gradiente, ajustando a opacidade de cada cor. O fator é um número onde 1 mantém a opacidade original, valores menores que 1 tornam o gradiente mais transparente e valores maiores que 1 tornam o gradiente mais opaco.
     *
     * @example
     * gradient.applyAlpha(0.5); // Torna o gradiente mais transparente
     *
     * @public
     * @param {number} factor - O fator de alpha a ser aplicado ao gradiente (1 mantém a opacidade original, <1 torna mais transparente, >1 torna mais opaco)
     * @returns {Color3Gradient} - O próprio gradiente com o fator de alpha aplicado, permitindo encadeamento de métodos
     */
    public applyAlpha(factor: number): Color3Gradient {
        this.colors = this.colors.map(color => color.applyAlpha(factor));
        return this;
    }

    /**
     * Aplica um fator de contraste ao gradiente, ajustando a diferença entre as cores. O fator é um número onde 1 mantém o contraste original, valores menores que 1 reduzem o contraste e valores maiores que 1 aumentam o contraste do gradiente.
     *
     * @example
     * gradient.applyContrast(1.5); // Aumenta o contraste do gradiente
     * 
     * @public
     * @param {number} factor - O fator de contraste a ser aplicado ao gradiente (1 mantém o contraste original, <1 reduz o contraste, >1 aumenta o contraste)
     * @returns {Color3Gradient} - O próprio gradiente com o fator de contraste aplicado, permitindo encadeamento de métodos
     */
    public applyContrast(factor: number): Color3Gradient {
        this.colors = this.colors.map(color => color.applyContrast(factor));
        return this;
    }

    /**
     * Aplica um efeito de escala de cinza ao gradiente, convertendo cada cor para sua versão em tons de cinza.
     *
     * @example
     * gradient.applyGrayscale(); // Converte o gradiente para tons de cinza
     *
     * @public
     * @returns {Color3Gradient} - O próprio gradiente com o efeito de escala de cinza aplicado, permitindo encadeamento de métodos
     */
    public applyGrayscale(): Color3Gradient {
        this.colors = this.colors.map(color => color.applyGrayscale());
        return this;
    }

    /**
     * Aplica um efeito de sépia ao gradiente, dando a cada cor uma tonalidade quente e envelhecida.
     *
     * @example
     * gradient.applySepia(); // Aplica o efeito de sépia ao gradiente
     *
     * @public
     * @returns {Color3Gradient} - O próprio gradiente com o efeito de sépia aplicado, permitindo encadeamento de métodos
     */
    public applySepia(): Color3Gradient {
        this.colors = this.colors.map(color => color.applySepia());
        return this;
    }

    /**
     * Aplica o gradiente como plano de fundo de um elemento HTML, definindo a propriedade CSS "background" do elemento para a representação em string do gradiente.
     *
     * @example
     * gradient.applyToElement(document.getElementById("myElement")); // Aplica o gradiente como plano de fundo do elemento com id "myElement"
     *
     * @public
     * @param {BoardElement} element 
     */
    public applyToBoardElement(element: BoardElement): void {
        this.applyToElement(element);
    }

    /**
     * Aplica o gradiente como plano de fundo de um elemento HTML, definindo a propriedade CSS "background" do elemento para a representação em string do gradiente.
     *
     * @example
     * gradient.applyToElement(document.getElementById("myElement")); // Aplica o gradiente como plano de fundo do elemento com id "myElement" 
     *
     * @public
     * @param {{ style: Properties; }} element 
     */
    public applyToElement(element: { style: Properties; }): void {
        element.style.background = this.toString();
    }
}
export default Color3Gradient;