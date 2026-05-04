/**
 * elementUtils.ts
 *
 * Auto-generated documentation comment for core/engine/utils/elementUtils.ts.
 */

import type * as CSS from "csstype";

type valuesOf<T> = T[keyof T];
type CSSValue = valuesOf<CSS.Properties>;


/**
 * Itera sobre todos os elementos HTML que possuem a classe CSS especificada e executa uma função de callback para cada um deles.
 * @param className - O nome da classe CSS a ser buscada nos elementos HTML
 * @param callback - A função de callback que será executada para cada elemento encontrado. Recebe o elemento como argumento.
 */
export function forEachElementWithClass(
    className: string, 
    callback: ($: HTMLElement) => void
): void 
{
    const elements = document.getElementsByClassName(className);
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i] as HTMLElement;
        callback(element);
    }
}

/**
 * Itera sobre todos os elementos HTML que correspondem ao seletor CSS especificado e executa uma função de callback para cada um deles.
 * @param selector - O seletor CSS a ser usado para buscar os elementos HTML
 * @param callback - A função de callback que será executada para cada elemento encontrado. Recebe o elemento como argumento.
 */
export function forEachElementWithQuerySelector(
    selector: string, 
    callback: ($: HTMLElement) => void
): void 
{
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
        if (element instanceof HTMLElement) {
            callback(element);
        }
    });
}

/**
 * Altera o valor de uma variável CSS (custom property) para um elemento HTML específico ou para o elemento raiz (`:root`) se nenhum elemento for fornecido.
 * @param element - O elemento HTML cujo CSS será alterado. Se não for fornecido, a variável será alterada no elemento raiz (`:root`).
 * @param variableName - O nome da variável CSS a ser alterada (deve incluir os dois traços, por exemplo, `--main-color`).
 * @param value - O novo valor a ser atribuído à variável CSS. Deve ser um objeto que implemente o método `toString()`, como strings, números ou objetos personalizados.
 */
export function changeElementCSSVariable(
    element: HTMLElement = document.documentElement, 
    variableName: string, 
    value: CSSValue
): void 
{
    //@ts-ignore
    element.style.setProperty(`--${variableName}`, value);
}

/**
 * Altera o valor de uma propriedade CSS para um elemento HTML específico ou para o elemento raiz (`:root`) se nenhum elemento for fornecido.
 * @param element - O elemento HTML cujo CSS será alterado. Se não for fornecido, a propriedade será alterada no elemento raiz (`:root`).
 * @param propertyName - O nome da propriedade CSS a ser alterada (por exemplo, `color`, `background-color`, etc.).
 * @param value - O novo valor a ser atribuído à propriedade CSS. Deve ser um objeto que implemente o método `toString()`, como strings, números ou objetos personalizados.
 */
export function changeElementCSSProperty<K extends keyof CSS.Properties>(
    element: HTMLElement, 
    propertyName: K, 
    value: CSS.Properties[K]
): void
{
    //@ts-ignore
    element.style.setProperty(propertyName, value);
}

/**
 * Altera o valor de uma variável CSS (custom property) para o elemento raiz (`:root`), afetando toda a página.
 * @param variableName - O nome da variável CSS a ser alterada (deve incluir os dois traços, por exemplo, `--main-color`).
 * @param value - O novo valor a ser atribuído à variável CSS. Deve ser um objeto que implemente o método `toString()`, como strings, números ou objetos personalizados.
 */
export function changeDocumentCSSVariable(variableName: string, value: CSSValue): void {
    changeElementCSSVariable(document.documentElement, variableName, value);
}