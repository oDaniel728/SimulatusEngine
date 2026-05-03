import { defineConfig } from "vite";
import { resolve } from "path";
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig(({ command }) => ({
    root: "src",
    resolve: {
        alias: {
            "@simulatus": resolve(__dirname, "src/script/simulatus"),
            "@simulatus/": resolve(__dirname, "src/script/simulatus"),
            "@game": resolve(__dirname, "src/script/game"),
            "@game/": resolve(__dirname, "src/script/game")
        }
    },
    server: {
        fs: {
            strict: false
        },
        watch: {
            ignored: ["**/build/**"]
        }
    },
    build: {
        outDir: "../build",
        emptyOutDir: true,
        assetsInlineLimit: 10000000
    },
    plugins: command === "build" ? [viteSingleFile()] : []
}));