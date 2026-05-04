import { defineConfig } from "vite";
import { resolve } from "path";
import { viteSingleFile } from "vite-plugin-singlefile";
import obfuscatorModule from "javascript-obfuscator";

const { obfuscate } = obfuscatorModule;

function obfuscatorPlugin() {
    return {
        name: 'vite:obfuscate',
        apply: 'build',
        enforce: 'post',
        generateBundle(options, bundle) {
            for (const [fileName, file] of Object.entries(bundle)) {
                if (file.type === 'asset' && file.fileName.endsWith('.js')) {
                    console.log(`Obfuscating ${file.fileName}...`);
                    file.source = obfuscate(file.source.toString(), {
                        compact: true,
                        controlFlowFlattening: true,
                        deadCodeInjection: true,
                        debugProtection: false,
                        debugProtectionInterval: false,
                        disableConsoleOutput: false,
                        identifierNamesGenerator: 'hexadecimal',
                        log: false,
                        renameGlobals: false,
                        rotateStringArray: true,
                        selfDefending: true,
                        stringArray: true,
                        stringArrayEncoding: ['base64'],
                        stringArrayThreshold: 0.75,
                        unicodeEscapeSequence: false
                    }).getObfuscatedCode();
                }
                // Para HTML com JS inline (gerado pelo viteSingleFile)
                if (file.type === 'asset' && file.fileName.endsWith('.html')) {
                    console.log(`Processing HTML file: ${file.fileName}...`);
                    let html = file.source.toString();
                    
                    // Encontrar e obfuscar scripts inline
                    html = html.replace(/<script[^>]*>([^<]+)<\/script>/gs, (match, scriptContent) => {
                        console.log(`Obfuscating inline script...`);
                        try {
                            const obfuscated = obfuscate(scriptContent, {
                                compact: true,
                                controlFlowFlattening: true,
                                deadCodeInjection: true,
                                debugProtection: false,
                                debugProtectionInterval: false,
                                disableConsoleOutput: false,
                                identifierNamesGenerator: 'hexadecimal',
                                log: false,
                                renameGlobals: false,
                                rotateStringArray: true,
                                selfDefending: true,
                                stringArray: true,
                                stringArrayEncoding: ['base64'],
                                stringArrayThreshold: 0.75,
                                unicodeEscapeSequence: false
                            }).getObfuscatedCode();
                            return `<script>${obfuscated}</script>`;
                        } catch (e) {
                            console.error(`Erro ao obfuscar script: ${e.message}`);
                            return match;
                        }
                    });
                    
                    file.source = html;
                }
            }
        }
    };
}

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
        outDir: "../build",
        emptyOutDir: true,
        assetsInlineLimit: 10000000
    },
    plugins: command === "build" ? [viteSingleFile(), obfuscatorPlugin()] : []
}));