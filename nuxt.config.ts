export default defineNuxtConfig({
  compatibilityDate: '2026-02-03',

  future: {
    compatibilityVersion: 4,
  },

  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxt/image'],

  runtimeConfig: {
    public: {
      // Lo dejamos vacío. Nuxt inyectará aquí automáticamente el valor 
      // de NUXT_PUBLIC_API_BASE que tienes en tu archivo .env
      apiBase: '' 
    }
  },

  css: ['~/assets/css/main.css'],

  app: {
    // ... tu configuración de head ...
  },

  devtools: {
    enabled: true
  }
})