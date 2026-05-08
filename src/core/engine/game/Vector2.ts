/**
 * Vector2.ts
 *
 * Auto-generated documentation comment for core/engine/game/Vector2.ts.
 */

/**
 * Vector2
 *
 * Class for the engine.
 */
export class Vector2 {

    private _x!: number;
    private _y!: number;

    private _cb!: (() => void) | undefined;
    private get cb() { return this._cb || (() => {}); }

    /**
     * Coordenada X do vetor, representando a posição horizontal ou componente horizontal do vetor.
     *
     * @example
     * const position = new Vector2(100, 50);
     * position.x = 150; // Define a coordenada X do vetor para 150.
     * console.log(position.x); // Output: 150
     * 
     * 
     * @type {number}
     */
    public get x(): number {
        return this._x;
    }

    public set x(value: number) {
        this._x = value;
        this.cb();
    }

    /**
     * Coordenada Y do vetor, representando a posição vertical ou componente vertical do vetor.
     *
     * @example
     * const position = new Vector2(100, 50);
     * position.y = 75; // Define a coordenada Y do vetor para 75.
     * console.log(position.y); // Output: 75
     * 
     * 
     * @type {number}
     */
    public get y(): number {
        return this._y;
    }

    public set y(value: number) {
        this._y = value;
        this.cb();
    }

    /**
     * Cria uma instância de um vetor 2D, representando uma posição ou direção em um espaço bidimensional, com coordenadas X e Y.
     *
     * @example
     * const position = new Vector2(); // Cria um vetor com coordenadas X = 0, Y = 0.
     * console.log(position.x, position.y); // Output: 0 0
     * 
     * @constructor
     */
    constructor();

    /**
     * Cria uma instância de um vetor 2D, representando uma posição ou direção em um espaço bidimensional, com coordenadas X e Y.
     *
     * @example
     * const position = new Vector2(100, 50); // Cria um vetor com coordenadas X = 100, Y = 50.
     * console.log(position.x, position.y); // Output: 100 50
     * 
     * @constructor
     * @param {number} x - A coordenada X do vetor, representando a posição horizontal ou componente horizontal do vetor.
     * @param {number} y - A coordenada Y do vetor, representando a posição vertical ou componente vertical do vetor.
     */
    constructor(x: number, y: number);

    /**
     * Cria uma instância de um vetor 2D, representando uma posição ou direção em um espaço bidimensional, com coordenadas X e Y, e uma função de callback que é chamada sempre que as coordenadas do vetor são alteradas.
     *
     * @example
     * const position = new Vector2(100, 50, () => {
     *    console.log(`As coordenadas do vetor foram alteradas para: (${position.x}, ${position.y})`);
     * });
     * position.x = 150; // Output: As coordenadas do vetor foram alteradas para: (150, 50)
     * position.y = 75; // Output: As coordenadas do vetor foram alteradas para: (150, 75)
     * console.log(position.x, position.y); // Output: 150 75
     * 
     * @constructor
     * @param {number} x - A coordenada X do vetor, representando a posição horizontal ou componente horizontal do vetor.
     * @param {number} y - A coordenada Y do vetor, representando a posição vertical ou componente vertical do vetor.
     * @param {() => void} cb - Uma função de callback que é chamada sempre que as coordenadas do vetor são alteradas, permitindo que outras partes do código sejam notificadas sobre as mudanças nas coordenadas do vetor.
     */
    constructor(x: number, y: number, cb: () => void);
    constructor(x: number = 0, y: number = 0, cb?: () => void) {
        this._x = x;
        this._y = y;
        this._cb = cb;
    }

    /**
     * Adiciona outro vetor ou valores numéricos às coordenadas do vetor atual, retornando um novo vetor resultante da adição.
     *
     * @example
     * const position1 = new Vector2(100, 50);
     * const position2 = new Vector2(20, 30);
     * const result = position1.add(position2); // Retorna um novo vetor com coordenadas (120, 80).
     * console.log(result.x, result.y); // Output: 120 80
     * 
     * 
     * @param {Vector2} other - Outro vetor cujas coordenadas serão adicionadas às coordenadas do vetor atual, resultando em um novo vetor que representa a soma dos dois vetores.
     * @returns {Vector2} - Um novo vetor resultante da adição do vetor atual com o vetor fornecido, representando a soma das coordenadas dos dois vetores.
     */
    public add(other: Vector2): Vector2

    /**
     * Adiciona um valor numérico às coordenadas do vetor atual, retornando um novo vetor resultante da adição.
     * 
     * @example
     * const position = new Vector2(100, 50);
     * const result = position.add(10); // Retorna um novo vetor com coordenadas (110, 60).
     * console.log(result.x, result.y); // Output: 110 60
     * 
     * 
     * @param {number} other - Um valor numérico que será adicionado às coordenadas X e Y do vetor atual, resultando em um novo vetor que representa a soma do vetor atual com o valor numérico fornecido.
     */
    public add(other: number): Vector2

    /**
     * Adiciona valores numéricos às coordenadas do vetor atual, retornando um novo vetor resultante da adição.
     *
     * @example
     * const position = new Vector2(100, 50);
     * const result = position.add(20, 30); // Retorna um novo vetor com coordenadas (120, 80).
     * console.log(result.x, result.y); // Output: 120 80
     *
     * 
     * @param {number} x - O valor que será adicionado à coordenada X do vetor atual.
     * @param {number} y - O valor que será adicionado à coordenada Y do vetor atual.
     * @returns {Vector2} - Um novo vetor resultante da adição das coordenadas do vetor atual com os valores numéricos fornecidos.
     */
    public add(x: number, y: number): Vector2

    public add(x: Vector2 | number, y?: number): Vector2 {
        if (typeof x === "number" && y === undefined) {
            return new Vector2(this.x + x, this.y + x);
        } else if (y !== undefined && typeof x === "number") {
            return new Vector2(this.x + x, this.y + y);
        } else if (x instanceof Vector2) {
            return new Vector2(this.x + x.x, this.y + x.y);
        }
        return new Vector2;
    }

    /**
     * Subtrai outro vetor ou valores numéricos das coordenadas do vetor atual, retornando um novo vetor resultante da subtração.
     *
     * @example
     * const position1 = new Vector2(100, 50);
     * const position2 = new Vector2(20, 30);
     * const result = position1.subtract(position2); // Retorna um novo vetor com coordenadas (80, 20).
     * console.log(result.x, result.y); // Output: 80 20
     *
     * 
     * @param {Vector2} other - Outro vetor cujas coordenadas serão subtraídas das coordenadas do vetor atual, resultando em um novo vetor que representa a diferença dos dois vetores.
     * @returns {Vector2} - Um novo vetor resultante da subtração do vetor atual com o vetor fornecido, representando a diferença das coordenadas dos dois vetores.
     */
    public subtract(other: Vector2): Vector2

    /**
     * Subtrai um valor numérico das coordenadas do vetor atual, retornando um novo vetor resultante da subtração.
     * 
     * @example
     * const position = new Vector2(100, 50);
     * const result = position.subtract(10); // Retorna um novo vetor com coordenadas (90, 40).
     * console.log(result.x, result.y); // Output: 90 40
     * 
     * 
     * @param {number} other - Um valor numérico que será subtraído das coordenadas X e Y do vetor atual, resultando em um novo vetor que representa a diferença do vetor atual com o valor numérico fornecido.
     */
    public subtract(other: number): Vector2

    /**
     * Subtrai valores numéricos das coordenadas do vetor atual, retornando um novo vetor resultante da subtração.
     * 
     * @example
     * const position = new Vector2(100, 50);
     * const result = position.subtract(20, 30); // Retorna um novo vetor com coordenadas (80, 20).
     * console.log(result.x, result.y); // Output: 80 20
     * 
     * 
     * @param {number} x - O valor que será subtraído da coordenada X do vetor atual.
     * @param {number} y - O valor que será subtraído da coordenada Y do vetor atual.
     * @returns {Vector2} - Um novo vetor resultante da subtração das coordenadas do vetor atual com os valores numéricos fornecidos.
     */
    public subtract(x: number, y: number): Vector2
    public subtract(x: Vector2 | number, y?: number): Vector2 {
        if (typeof x === "number") {
            return new Vector2(this.x - x, this.y - x);
        } else if (y !== undefined && typeof x === "number") {
            return new Vector2(this.x - x, this.y - y);
        } else {
            return new Vector2(this.x - x.x, this.y - x.y);
        }
    }

    /**
     * Multiplica as coordenadas do vetor atual por outro vetor ou valores numéricos, retornando um novo vetor resultante da multiplicação.
     * 
     * @example
     * const position1 = new Vector2(100, 50);
     * const position2 = position1.multiply(2); // Retorna um novo vetor com coordenadas (200, 100).
     * 
     * console.log(position2.x, position2.y); // Output: 200 100
     *
     * 
     * @param {number} other 
     * @returns {Vector2} 
     */
    public multiply(other: number): Vector2

    /**
     * Multiplica as coordenadas do vetor atual por outro vetor ou valores numéricos, retornando um novo vetor resultante da multiplicação.
     *
     * @example
     * const position1 = new Vector2(100, 50);
     * const position2 = new Vector2(2, 3);
     * const result = position1.multiply(position2); // Retorna um novo vetor com coordenadas (200, 150).
     * console.log(result.x, result.y); // Output: 200 150
     *
     * 
     * @param {Vector2} other - Outro vetor cujas coordenadas serão multiplicadas pelas coordenadas do vetor atual, resultando em um novo vetor que representa o produto dos dois vetores.
     * @returns {Vector2} - Um novo vetor resultante da multiplicação do vetor atual com o vetor fornecido, representando o produto das coordenadas dos dois vetores.
     */
    public multiply(other: Vector2): Vector2

    /**
     * Multiplica as coordenadas do vetor atual por valores numéricos, retornando um novo vetor resultante da multiplicação.
     *
     * @example
     * const position1 = new Vector2(100, 50);
     * const result = position1.multiply(2, 3); // Retorna um novo vetor com coordenadas (200, 150).
     * console.log(result.x, result.y); // Output: 200 150
     *
     * 
     * @param {number} x - O valor que será multiplicado pela coordenada X do vetor atual.
     * @param {number} y - O valor que será multiplicado pela coordenada Y do vetor atual.
     * @returns {Vector2} - Um novo vetor resultante da multiplicação das coordenadas do vetor atual com os valores numéricos fornecidos.
     */
    public multiply(x: number, y: number): Vector2
    public multiply(x: Vector2 | number, y?: number): Vector2 {
        if (typeof x === "number") {
            return new Vector2(this.x * x, this.y * x);
        } else if (y !== undefined && typeof x === "number") {
            return new Vector2(this.x * x, this.y * y);
        } else {
            return new Vector2(this.x * x.x, this.y * x.y);
        }
    }

    /**
     * Divide as coordenadas do vetor atual por outro vetor ou valores numéricos, retornando um novo vetor resultante da divisão.
     * 
     * @example
     * const position1 = new Vector2(100, 50);
     * const position2 = position1.divide(2); // Retorna um novo vetor com coordenadas (50, 25).
     * console.log(position2.x, position2.y); // Output: 50 25
     *
     * 
     * @param {number} other - Um valor numérico que será usado para dividir as coordenadas do vetor atual, resultando em um novo vetor que representa a divisão do vetor atual pelo valor numérico fornecido.
     * @returns {Vector2} - Um novo vetor resultante da divisão do vetor atual pelo valor numérico fornecido, representando a divisão das coordenadas do vetor atual por esse valor.
     */
    public divide(other: number): Vector2

    /**
     * Divide as coordenadas do vetor atual por outro vetor ou valores numéricos, retornando um novo vetor resultante da divisão.
     *
     * @example
     * const position1 = new Vector2(100, 50);
     * const position2 = new Vector2(2, 5);
     * const result = position1.divide(position2); // Retorna um novo vetor com coordenadas (50, 10).
     * console.log(result.x, result.y); // Output: 50 10
     *
     * 
     * @param {Vector2} other - Outro vetor cujas coordenadas serão usadas para dividir as coordenadas do vetor atual, resultando em um novo vetor que representa a divisão do vetor atual pelo vetor fornecido.
     * @returns {Vector2} - Um novo vetor resultante da divisão do vetor atual pelo vetor fornecido, representando a divisão das coordenadas do vetor atual pelas coordenadas do vetor fornecido.
     */
    public divide(other: Vector2): Vector2

    /**
     * Divide as coordenadas do vetor atual por valores numéricos, retornando um novo vetor resultante da divisão.
     * 
     * @example
     * const position1 = new Vector2(100, 50);
     * const result = position1.divide(2, 5); // Retorna um novo vetor com coordenadas (50, 10).
     * 
     * console.log(result.x, result.y); // Output: 50 10
     * 
     * 
     * @param {number} x - O valor que será usado para dividir a coordenada X do vetor atual.
     * @param {number} y - O valor que será usado para dividir a coordenada Y do vetor atual.
     * @return {Vector2} - Um novo vetor resultante da divisão das coordenadas do vetor atual pelos valores numéricos fornecidos, representando a divisão das coordenadas do vetor atual por esses valores.
     */
    public divide(x: number, y: number): Vector2
    public divide(x: Vector2 | number, y?: number): Vector2 {
        if (typeof x === "number") {
            return new Vector2(this.x / x, this.y / x);
        } else if (y !== undefined && typeof x === "number") {
            return new Vector2(this.x / x, this.y / y);
        } else {
            return new Vector2(this.x / x.x, this.y / x.y);
        }
    }

    /**
     * Calcula a magnitude (ou comprimento) do vetor, que é a distância do ponto representado pelo vetor à origem (0, 0) no espaço bidimensional, usando o teorema de Pitágoras para calcular a raiz quadrada da soma dos quadrados das coordenadas X e Y do vetor.
     * 
     * @example
     * const position = new Vector2(3, 4);
     * const magnitude = position.magnitude(); // Retorna 5, que é a distância do ponto (3, 4) à origem (0, 0).
     * console.log(magnitude); // Output: 5
     *
     * 
     * @returns {number} - A magnitude do vetor, representando a distância do ponto representado pelo vetor à origem (0, 0) no espaço bidimensional.
     */
    public magnitude(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    /**
     * Normaliza o vetor, retornando um novo vetor com a mesma direção, mas com magnitude igual a 1, calculando as coordenadas do vetor normalizado dividindo as coordenadas do vetor atual pela sua magnitude. Se a magnitude do vetor for zero, retorna um vetor com coordenadas (0, 0) para evitar divisão por zero.
     *
     * @example
     * const position = new Vector2(3, 4);
     * const normalized = position.normalize(); // Retorna um novo vetor com coordenadas (0.6, 0.8), que é o vetor normalizado de (3, 4).
     * console.log(normalized.x, normalized.y); // Output: 0.6 0.8
     * 
     * 
     * @returns {Vector2} - Um novo vetor normalizado, representando a mesma direção do vetor atual, mas com magnitude igual a 1.
     */
    public normalize(): Vector2 {
        const mag = this.magnitude();
        if (mag === 0) {
            return new Vector2(0, 0);
        }
        return this.divide(mag);
    }

    /**
     * Converte o vetor para uma representação em string.
     * 
     * @example
     * const position = new Vector2(100, 50);
     * console.log(position.toString()); // Output: "Vector2(100, 50)"
     *
     * 
     * @returns {string} - Uma string representando o vetor, no formato "Vector2(x, y)", onde x e y são as coordenadas do vetor.
     */
    public toString(): string {
        return `Vector2(${this.x}, ${this.y})`;
    }
        
    /**
     * Cria um novo vetor com as mesmas coordenadas do vetor atual, retornando um novo vetor que é uma cópia do vetor atual, permitindo que o novo vetor seja modificado sem afetar o vetor original.
     * 
     * @example
     * const position1 = new Vector2(100, 50);
     * const position2 = position1.clone(); // Retorna um novo vetor com as mesmas coordenadas de position1.
     * console.log(position2.x, position2.y); // Output: 100 50
     *
     * 
     * @returns {Vector2} 
     */
    public clone(): Vector2 {
        return new Vector2(this.x, this.y);
    }
}

export default Vector2;