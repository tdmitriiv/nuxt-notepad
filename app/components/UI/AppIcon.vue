<script setup lang="ts">
const { name, size = 20 } = defineProps<{
  name: string
  size?: string | number
}>()

const onEnter = (event: Event) => {
  (event.currentTarget as HTMLElement).click()
}
</script>

<template>
  <span 
    class="icon"
    tabindex="0"
    @keypress.enter="onEnter"
  >
    <Icon
      :name="name"
      :size="size"
    />
  </span>
</template>

<style lang="sass" scoped>
.icon
  display: inline-flex

  &:focus
    outline: none

  &:focus span
    background: green
</style>