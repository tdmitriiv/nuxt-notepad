import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'
import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineConfig({
  test: {
    projects: [
      {
        name: 'unit',
        include: 'test/unit/*.{spec|test}.ts',
        environment: 'none'
      },
      await defineVitestConfig({
        test: {
          name: 'nuxt',
          include: ['test/nuxt/*.{spec|test}.ts'],
          environmentOptions: {
            nuxt: {
              domEnvironment: 'happy-dom'
            }
          }
        }
      })
    ]
  },
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./app', import.meta.url))
    }
  }
})
