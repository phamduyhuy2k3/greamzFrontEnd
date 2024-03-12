/** @type {import('tailwindcss').Config} */
import { tailwindConfig } from "@storefront-ui/vue/tailwind-config";
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./**/*.vue",
    "./assets/*.css",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./node_modules/flowbite/**/*.{js,ts}",

    "./node_modules/@storefront-ui/vue/**/*.{js,mjs}",
  ],
  theme: {
    extend: {},
  },

  plugins: [require("flowbite/plugin"),require("daisyui")],
  presets: [tailwindConfig],
  daisyui: {
    themes: false,
  },

};
