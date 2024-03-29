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
        'nuxt-gtag',
        '@nuxtjs/device'
    ],

    gtag: {
        id: 'G-3GKD1BQFGF'
    },
    i18n: {
        vueI18n: "i18n.config.ts", // if you are using custom path, default
    },
    pinia: {
        autoImports: ["defineStore", "storeToRefs"],
        storesDirs: ["~/stores"],
    },
    runtimeConfig: {
        apiBaseUrl:  "http://localhost:8080",
        public: {
            ENV: process.env.NUXT_ENV||"dev",
            appUrl: process.env.NUXT_APP_URL,
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
            // alias: {
            //     '@': path.resolve(__dirname, 'src'),
            // }
        },
        define: {
            "process.env.BROWSER": true,
        }

    },
});
