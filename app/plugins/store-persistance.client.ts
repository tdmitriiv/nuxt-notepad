import type { PiniaPluginContext } from 'pinia'
import { toRaw } from 'vue'

const STORAGE_KEY = 'notes-store'

const persistancePlugin = ({ store }: PiniaPluginContext) => {
  const storePiniaKey = `${STORAGE_KEY}:${store.$id}`

  const saved = localStorage.getItem(storePiniaKey)
  if (saved) {
    try {
      store.$patch(JSON.parse(saved))
    } catch {
      localStorage.removeItem(storePiniaKey)
    }
  }

  store.$subscribe((_, state) => {
    localStorage.setItem(storePiniaKey, JSON.stringify(toRaw(state)))
  })
}

export default defineNuxtPlugin(({ $pinia, hook }) => {
  $pinia.use(persistancePlugin)
})
