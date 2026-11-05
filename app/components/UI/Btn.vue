<script setup lang="ts">
const { variant = 'default' } = defineProps<{
  variant?: 'default' | 'success' | 'error'
}>()
</script>

<template>
  <button 
    :class="['button', `button--${variant}`]"
  >
    <slot />
  </button>
</template>

<style lang="sass" scoped>
.button
  display: flex
  align-items: center
  gap: 5px
  padding: 14px 24px
  font-weight: 700
  font-size: 16px
  background-color: var(--bgcolor-btn)
  color: var(--color-btn)
  box-shadow: 4px 4px 0px var(--color-border)

  &--succes
    box-shadow: 4px 4px 0px var(--color-green)
  
  &--error
    box-shadow: 4px 4px 0px var(--color-red)
</style>