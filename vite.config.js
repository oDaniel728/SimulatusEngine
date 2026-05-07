import { defineConfig } from "vite";
import { resolve } from "path";
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig(({ command }) => ({
    root: "src",
    resolve: {
        alias: {
            "core": resolve(__dirname, "src/core"),
            "core/": resolve(__dirname, "src/core/"),
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
        outDir: "../build/run",
        emptyOutDir: true,
        assetsInlineLimit: 10000000
    },
    plugins: command === "build" ? [viteSingleFile()] : []
}));