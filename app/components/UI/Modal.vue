<script lang="ts" setup>
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'

const { title } = defineProps<{
  modelValue: boolean
  title?: string
}>()

const isOpen = defineModel<boolean>({ default: true })

const emit = defineEmits(['close']);

const modalRef = useTemplateRef('modal')
const { activate, deactivate } = useFocusTrap(modalRef, { immediate: false })

onMounted(async () => {
  await nextTick()
  activate()
})

onBeforeUnmount(() => {
  deactivate()
})

const close = () => {
  isOpen.value = false
  emit('close')
}

onKeyStroke('Escape', close)
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="isOpen"
        ref="modal"
        class="modal"
        @click.stop="close"
      >
        <div
          class="modal__content" 
          @click.stop
        >
          <slot name="header">
            <h3>
              {{ title }}
            </h3>
          </slot>
          <slot />

          <Icon 
            name="pixelarticons:close"
            class="modal__close"
            @click="close"
          />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="sass" scoped>
.modal
  position: fixed
  top: 0
  left: 0
  width: 100vw
  height: 100vh
  background-color: rgba(255, 255, 255, 0.3)
  display: flex
  justify-content: center
  align-items: center
  z-index: 9999

  &__content
    position: relative
    background: white
    padding: 20px
    border: 1px solid #252525
    border-radius: 2px
    min-width: 300px
  
  &__close
    position: absolute
    top: 10px
    right: 10px

.fade-enter-active,
.fade-leave-active 
  transition: opacity 0.3s ease

.fade-enter-from,
.fade-leave-to 
  opacity: 0
</style>