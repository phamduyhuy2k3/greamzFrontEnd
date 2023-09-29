// https://nuxt.com/docs/api/configuration/nuxt-config
export default ({
  css: [
      'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css',
      'assets/main.css'
  ],
  build: {
    transpile: ['vuetify'],
  },

  devtools: {enabled: false},
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    'nuxt-icon',
    [
      '@storyblok/nuxt',
      {
        accessToken: 'a4GQTPYAq9n8A56wsx61Fgtt',
      },
    ],
  ],
  pinia:{
    autoImports: [
      'defineStore',
      'storeToRefs'
    ]
  },
  runtimeConfig: {
    public: {

    },
  },
  imports: {
    dirs: ['stores']
  },
  tailwindcss: {
    viewer: false,
    content: [
      "./components/**/*.{js,vue,ts}",
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

})
