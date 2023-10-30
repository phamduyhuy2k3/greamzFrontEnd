// https://nuxt.com/docs/api/configuration/nuxt-config

import {tailwindConfig} from "@storefront-ui/vue/dist/tailwind-config";

export default defineNuxtConfig({
  css: [
      "@mdi/font/css/materialdesignicons.min.css",
    "assets/main.css"
  ],

  build: {
    transpile: ["vuetify"],
  },
  ssr: true,
  devtools: { enabled: false },
  modules: [
      "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "nuxt-icon",
    "@nuxtjs/i18n",
    '@vueuse/nuxt',

   ],

  i18n: {
    vueI18n: "i18n.config.ts", // if you are using custom path, default
  },
  pinia: {
    autoImports: ["defineStore", "storeToRefs"],
  },
  runtimeConfig: {
    springBootServerApi: "http://localhost:8080",
    public: {
      appUrl: "http://localhost:3000",
      apiUrl: "http://localhost:8080",
    },
  },
  imports: {
    dirs: ["stores"]

  },
  tailwindcss: {
    viewer: false,


  },
});
