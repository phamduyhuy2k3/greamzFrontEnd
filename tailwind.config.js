/** @type {import('tailwindcss').Config} */
module.exports = {

    content: [
        "./components/**/*.{js,vue,ts}",
        "./assets/*.css",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./nuxt.config.{js,ts}",
        "./node_modules/flowbite/**/*.{js,ts}",
        "./storyblok/**/*.{html,vue,js,ts}",
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require('flowbite/plugin')({
            charts: true,
        }),

    ],
}

