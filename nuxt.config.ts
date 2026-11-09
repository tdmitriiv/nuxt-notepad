
const sassAdditionalData =
  '@use "~/assets/styles/variables/_index.scss" as *;\n' +
  '@use "~/assets/styles/mixins/_media.scss" as *;\n';

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
          additionalData: sassAdditionalData
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
