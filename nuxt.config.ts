// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@pinia/nuxt', '@vueuse/nuxt', '@nuxt/icon/module'],
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  routeRules: {
    '/note/**': { ssr: false }
  }
})
