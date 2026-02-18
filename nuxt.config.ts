export default defineNuxtConfig({
  compatibilityDate: '2026-02-03',

  future: {
    compatibilityVersion: 4,
  },

  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxt/image'],

  // Nuxt 4 resolverá esto automáticamente desde /app/assets
  css: ['~/assets/css/main.css'],

  app: {
    head: {
      title: 'Ukiyo | Restaurante Japonés',
      htmlAttrs: { lang: 'es' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Ukiyo Cazorla - La esencia de la cocina japonesa.' },
        { name: 'theme-color', content: '#C5A059' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  devtools: {
    enabled: true
  }
})