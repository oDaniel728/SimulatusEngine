# Simulatus Engine

## Table of Contents

- [About](#about)
- [Engine Scope](#engine-scope)
- [Project Structure](#project-structure)
- [Index.html](#indexhtml)
- [main.ts](#maints)
- [Styles and SCSS](#styles-and-scss)
- [Build and Testing](#build-and-testing)
- [Modding and `src/script/` Template](#modding-and-srcscript-template)
- [Core Reference](#core-reference)

## About

This repository contains the Simulatus Engine core implementation at `src/core/`.

The folder `src/script/` is a user-facing game/template layer. It is intended to be replaced or extended by each project or mod author. The engine core itself is in `src/core/`.

## Engine Scope

- `src/core/`: engine implementation, utilities, asset loading, board rendering, DOM event wrappers, animations, sessions, color utilities, and registries.
- `src/script/`: example game code and engine template data for user projects.
- `src/styles/`: global SCSS used by the engine shell.
- `src/index.html`: HTML shell and root container.
- `src/main.ts`: engine bootstrap and game injection logic.

## Project Structure

- `build/`
  - Output folder created by `npm run build`.
- `src/core/`
  - Engine modules and runtime core.
- `src/script/`
  - Template game assets and sample loader classes. Treat this as a customizable game/mod area, not engine core.
- `src/styles/`
  - Global SCSS styles imported by `main.ts`.
- `src/index.html`
  - HTML application shell.
- `src/main.ts`
  - Main application bootstrap.
- `vite.config.js`
  - Path aliases and Vite build settings.

## Index.html

The `src/index.html` file is the engine shell. It contains:

- `<!DOCTYPE html>` and standard metadata.
- `<div class="loading" id="loading">`: a loading overlay used by the engine.
- `<div class="board" id="root"></div>`: the main board root for engine rendering.
- `<script src="./main.ts" type="module"></script>`: the entry point for the application.

### How to customize `index.html`

- Change `<title>` to your game or mod name.
- Update `<link rel="shortcut icon" ...>` to point to your favicon.
- Add additional HTML or markup inside the body if your game needs custom menus or overlays.
- Keep `src="./main.ts" type="module"` or update it to your own entry file if you change the bootstrap path.

## main.ts

`src/main.ts` is the bootstrap script.

It does the following:

1. Imports base loader classes from `@game/base/src/`.
2. Imports core engine classes from `@core` and `core` aliases.
3. Imports `src/styles/main.scss` so Vite compiles the SCSS.
4. Defines `GameInjector.inject(...)` to run:
   - `preLoader.main()`
   - `loader.main()`
   - `domLoader.main()`
   - `unloader.main()` on `beforeunload`
5. Hides `.loading` after injection.
6. Starts board loops with `BoardElement.initAllLoops()`.

### How to customize `main.ts`

- Replace `BasePreLoader`, `BaseLoader`, `BaseDOMLoader`, and `BaseUnloader` with your own classes.
- Keep the injection sequence: preloader → loader → DOM loader → unloader.
- If you relocate your game code, update the import aliases or relative paths.
- If you want a different root element, update `index.html` and your game code accordingly.

## Styles and SCSS

`src/styles/main.scss` is the engine shell stylesheet.

It defines:

- root colors and theme variables.
- base layout for the board container `.board`.
- fixed loading overlay styles.
- basic page reset and typography.

### How SCSS works

- Vite processes `src/styles/main.scss` because it is imported in `src/main.ts`.
- You can add more SCSS files under `src/styles/` and import them from `main.ts`.
- Use SCSS variables, nesting, mixins, or included partials if desired.

## Build and Testing

### Build

Use:

```bash
npm run build
```

This script does:

1. `tsc --noEmit` to type-check the project.
2. `npx vite build` to generate production assets into `build/`.
3. Copy `src/script/` into `build/script/`.
4. Remove nested `src/` folders inside `build/script/game/**/src/`.

This produces the normal production bundle, where Vite may combine and optimize code into a final HTML/JS/CSS output.

### Build without bundling

Use:

```bash
npm run build:js
```

This script performs a JS/CSS-only compilation without the production bundling step:

1. `tsc --noEmit false --outDir build/js` compiles TypeScript into JavaScript under `build/js`.
2. `npx sass src/styles/main.scss build/js/main.css` compiles the SCSS into CSS.

This is useful for inspecting the generated code and assets in a non-bundled form. It does not produce the same single-file/obfuscated production output as `npm run build`.

### Run development server

Use:

```bash
npm run dev
```

### Preview

Use:

```bash
npm run run
```

### Test

There is no dedicated test suite in this repository yet. For now, verify the engine by:

```bash
npm run typecheck
npm run dev
```

`npm run typecheck` runs `tsc --noEmit` and catches TypeScript issues.

## Modding and `src/script/` Template

`src/script/` is designed as a mod/game template area.

- Do not treat `src/script/` as engine core.
- The engine core lives in `src/core/`.
- Your mod should provide its own game namespace under `src/script/game/YourMod`.

### How to create a mod

1. Create a new folder under `src/script/game/<your-mod>`.
2. Add assets under `src/script/game/<your-mod>/assets/`.
3. Add language JSON files under `src/script/game/<your-mod>/assets/lang/`.
4. Add your loader classes under `src/script/game/<your-mod>/src/`.
5. Update `src/main.ts` to import your custom loader classes instead of the base template.
6. Use `Identifier.of("<your-mod>", "<asset-name>")` to load assets with `AssetProvider`.

### How to load a mod

- Use the loader classes you created to initialize mod-specific content.
- `AssetProvider` will resolve asset URLs relative to `./script/game/<namespace>/assets/`.
- `LanguageProvider` loads translations from JSON files inside `assets/lang/`.

## Core Reference

The full engine class and API reference is available in [docs/core_reference.md](docs/core_reference.md).
