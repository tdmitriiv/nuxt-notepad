import { type PiniaPluginContext } from 'pinia'
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

export default defineNuxtPlugin(({ $pinia }) => {
  $pinia.use(persistancePlugin)

  window.addEventListener('storage', (event) => {
    if (!event.key || !event.key.startsWith(`${STORAGE_KEY}:`)) return

    const storeKey = event.key.split(':')[1] || ''
    const store = $pinia._s.get(storeKey)
    if (!store || event.newValue === null) { return }
    
    try {
      store.$patch(JSON.parse(event.newValue))
    } catch {}
  })
})
