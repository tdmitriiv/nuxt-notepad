// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@pinia/nuxt', '@vueuse/nuxt', '@nuxt/icon/module'],
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  routeRules: {
    '/note/**': { ssr: false }
  },
  css: [
    'normalize.css/normalize.css',
    '~/assets/styles/index.sass'
  ],
  vite: {
    css: {
      preprocessorOptions: {
        sass: {
          additionalData: '@use "~/assets/styles/variables/_index.sass" as *\n',
        }
      }
    }
  },
  app: {
    head: {
      title: 'Notepad',
      titleTemplate: '%s - Notepad',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    }
  }
})
