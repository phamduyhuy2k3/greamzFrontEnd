// https://nuxt.com/docs/api/configuration/nuxt-config

import vue from '@vitejs/plugin-vue'
import path from 'path'
import inject from '@rollup/plugin-inject'
export default defineNuxtConfig({
    app: {
        head:{
            meta: [

                {name: 'naive-ui-style'},
                {name: 'vue-style'},
            ]
        }

    },
    css: [
        "@mdi/font/css/materialdesignicons.min.css",
        "assets/main.css",
        "solana-wallets-vue/styles.css"

    ],

    ssr: false,
    devtools: {enabled: false},
    modules: [
        "@nuxtjs/tailwindcss",
        "@pinia/nuxt",
        "nuxt-icon",
        "@nuxtjs/i18n",
        '@vueuse/nuxt',
        'nuxt-gtag'
    ],

    gtag: {
        id: 'G-SZELXWHR5V'
    },
    i18n: {
        vueI18n: "i18n.config.ts", // if you are using custom path, default
    },
    pinia: {
        autoImports: ["defineStore", "storeToRefs"],
        storesDirs: ["~/stores"],
    },
    runtimeConfig: {
        public: {
            apiUrl: process.env.NUXT_SPRING_BOOT_SERVER_API || "http://localhost:8080",
            ENV: process.env.ENV || "dev",
        },
    },
    appConfig:{
      nuxt: {

      }
    },

    imports: {
        dirs: ["stores"]

    },
    tailwindcss: {
        viewer: false,

    },

    vite: {

        esbuild: {
            target: "esnext",
        },
        build: {
            target: "esnext",
            rollupOptions: {
                plugins: [inject({ Buffer: ['buffer', 'Buffer'] })],
            },
        },
        optimizeDeps: {
            include: [ "@solana/web3.js", "buffer"],
            esbuildOptions: {
                target: "esnext",
            },
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src'),
            }
        },
        define: {
            "process.env.BROWSER": true,
        }

    },
});
