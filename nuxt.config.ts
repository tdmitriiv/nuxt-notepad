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
    '~/assets/styles/index.scss'
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "~/assets/styles/variables/_index.scss" as *;
            @use "~/assets/styles/mixins/_media.scss" as *;
          `
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
