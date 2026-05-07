# Simulatus Engine

## Sumário

- [Sobre](#sobre)
- [Escopo do Engine](#escopo-do-engine)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Index.html](#indexhtml)
- [main.ts](#maints)
- [Estilos e SCSS](#estilos-e-scss)
- [Build e Testes](#build-e-testes)
- [Modding e Modelo `src/script/`](#modding-e-modelo-scrscript)
- [Referência do Core](#referencia-do-core)

## Sobre

Este repositório contém a implementação do núcleo do Simulatus Engine em `src/core/`.

A pasta `src/script/` é uma camada de jogo/modelo voltada para o usuário. Ela deve ser substituída ou estendida por cada projeto ou autor de mod. O núcleo do engine em si está em `src/core/`.

## Escopo do Engine

- `src/core/`: implementação do engine, utilitários, carregamento de assets, renderização do board, wrappers de eventos DOM, animações, sessões, utilitários de cor e registries.
- `src/script/`: código de exemplo do jogo e dados de modelo do engine para projetos de usuário.
- `src/styles/`: SCSS global usado pelo shell do engine.
- `src/index.html`: shell HTML e container raiz.
- `src/main.ts`: bootstrap do engine e lógica de injeção do jogo.

## Estrutura do Projeto

- `build/`
  - Pasta de saída criada por `npm run build`.
- `src/core/`
  - Módulos do engine e núcleo em tempo de execução.
- `src/script/`
  - Assets de jogo de modelo e classes de loader de exemplo. Trate isto como uma área personalizável de jogo/mod, não como núcleo do engine.
- `src/styles/`
  - Estilos SCSS globais importados por `main.ts`.
- `src/index.html`
  - Shell da aplicação HTML.
- `src/main.ts`
  - Bootstrap principal da aplicação.
- `vite.config.js`
  - Aliases de caminho e configurações do Vite.

## Index.html

O arquivo `src/index.html` é o shell do engine. Ele contém:

- `<!DOCTYPE html>` e metadados padrão.
- `<div class="loading" id="loading">`: um overlay de carregamento usado pelo engine.
- `<div class="board" id="root"></div>`: a raiz principal do board para renderização do engine.
- `<script src="./main.ts" type="module"></script>`: o ponto de entrada da aplicação.

### Como personalizar `index.html`

- Altere `<title>` para o nome do seu jogo ou mod.
- Atualize `<link rel="shortcut icon" ...>` para apontar para o seu favicon.
- Adicione HTML ou marcação adicional dentro do body se seu jogo precisar de menus ou overlays personalizados.
- Mantenha `src="./main.ts" type="module"` ou atualize para seu próprio arquivo de entrada se você alterar o caminho do bootstrap.

## main.ts

`src/main.ts` é o script de bootstrap.

Ele faz o seguinte:

1. Importa classes de loader base de `@game/base/src/`.
2. Importa classes do núcleo do engine de alias `@core` e `core`.
3. Importa `src/styles/main.scss` para que o Vite compile o SCSS.
4. Define `GameInjector.inject(...)` para executar:
   - `preLoader.main()`
   - `loader.main()`
   - `domLoader.main()`
   - `unloader.main()` no `beforeunload`
5. Oculta `.loading` após a injeção.
6. Inicia os loops do board com `BoardElement.initAllLoops()`.

### Como personalizar `main.ts`

- Substitua `BasePreLoader`, `BaseLoader`, `BaseDOMLoader` e `BaseUnloader` pelas suas próprias classes.
- Mantenha a sequência de injeção: preloader → loader → DOM loader → unloader.
- Se você realocar o código do jogo, atualize os aliases de importação ou caminhos relativos.
- Se quiser um elemento raiz diferente, atualize `index.html` e o código do seu jogo de acordo.

## Estilos e SCSS

`src/styles/main.scss` é a folha de estilo do shell do engine.

Ele define:

- cores raiz e variáveis de tema.
- layout base para o container do board `.board`.
- estilos fixos do overlay de carregamento.
- reset básico de página e tipografia.

### Como o SCSS funciona

- O Vite processa `src/styles/main.scss` porque ele é importado em `src/main.ts`.
- Você pode adicionar mais arquivos SCSS em `src/styles/` e importá-los a partir de `main.ts`.
- Use variáveis SCSS, aninhamento, mixins ou partials incluídos, se desejar.

## Build e Testes

### Build

Use:

```bash
npm run build
```

Este script faz:

1. `tsc --noEmit` para verificar o projeto com TypeScript.
2. `npx vite build` para gerar os assets de produção em `build/`.
3. Copiar `src/script/` para `build/script/`.
4. Remover pastas `src/` aninhadas dentro de `build/script/game/**/src/`.

Isso produz o bundle de produção normal, onde o Vite pode combinar e otimizar código em um output final de HTML/JS/CSS.

### Build sem empacotamento

Use:

```bash
npm run build:js
```

Este script realiza uma compilação apenas de JS/CSS sem a etapa de empacotamento de produção:

1. `tsc --noEmit false --outDir build/js` compila TypeScript em JavaScript dentro de `build/js`.
2. `npx sass src/styles/main.scss build/js/main.css` compila o SCSS em CSS.

Isso é útil para inspecionar o código e os assets gerados em uma forma não empacotada. Não produz o mesmo output final de arquivo único/obfuscado que `npm run build`.

### Executar servidor de desenvolvimento

Use:

```bash
npm run dev
```

### Visualizar

Use:

```bash
npm run run
```

### Testar

Ainda não há suíte de testes dedicada neste repositório. Por enquanto, verifique o engine com:

```bash
npm run typecheck
npm run dev
```

`npm run typecheck` executa `tsc --noEmit` e captura problemas de TypeScript.

## Modding e Modelo `src/script/`

`src/script/` é projetado como uma área de template para mods/jogos.

- Não trate `src/script/` como núcleo do engine.
- O núcleo do engine vive em `src/core/`.
- Seu mod deve fornecer seu próprio namespace de jogo em `src/script/game/YourMod`.

### Como criar um mod

1. Crie uma nova pasta em `src/script/game/<your-mod>`.
2. Adicione assets em `src/script/game/<your-mod>/assets/`.
3. Adicione arquivos JSON de idioma em `src/script/game/<your-mod>/assets/lang/`.
4. Adicione suas classes de loader em `src/script/game/<your-mod>/src/`.
5. Atualize `src/main.ts` para importar suas classes de loader personalizadas em vez do modelo base.
6. Use `Identifier.of("<your-mod>", "<asset-name>")` para carregar assets com `AssetProvider`.

### Como carregar um mod

- Use as classes de loader que você criou para inicializar conteúdo específico do mod.
- `AssetProvider` resolve URLs de assets relativos a `./script/game/<namespace>/assets/`.
- `LanguageProvider` carrega traduções de arquivos JSON dentro de `assets/lang/`.

## Referência do Core

A referência completa de classes e APIs do engine está disponível em [docs/core_reference.md](docs/core_reference.md).
