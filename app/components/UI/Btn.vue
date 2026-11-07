<script setup lang="ts">
const { variant = 'default', disabled = false } = defineProps<{
  variant?: 'default' | 'success' | 'error'
  disabled?: boolean
}>()
</script>

<template>
  <button 
    :class="[
      'button',
      `button--${variant}`,
      {
        'button--disabled': disabled
      }
    ]"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<style lang="sass" scoped>
.button
  display: flex
  align-items: center
  gap: 5px
  height: 50px
  padding: 0 16px
  font-weight: 700
  font-size: 16px
  cursor: pointer
  background-color: var(--bgcolor-btn)
  color: var(--color-btn)
  box-shadow: 4px 4px 0px var(--color-border)

  &--disabled
    background-color: color-mix(in srgb, var(--bgcolor-btn) 70%, transparent)

  &--success
    box-shadow: 4px 4px 0px var(--color-green)
  
  &--error
    box-shadow: 4px 4px 0px var(--color-red)
</style>