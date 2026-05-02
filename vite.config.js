import { defineConfig } from "vite";
import { resolve } from "path";
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig({
    root: "src",
    resolve: {
        alias: {
            "@simulatus": resolve(__dirname, "src/script/simulatus"),
            "@simulatus/": resolve(__dirname, "src/script/simulatus"),
            "@game": resolve(__dirname, "src/script/game"),
            "@game/": resolve(__dirname, "src/script/game")
        }
    },
    build: {
        outDir: "../dist",
        emptyOutDir: true
    },
    plugins: [viteSingleFile()]
});