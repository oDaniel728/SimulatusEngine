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