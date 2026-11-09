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
    class="appIcon"
    tabindex="0"
    @keypress.enter="onEnter"
  >
    <Icon
      :name="name"
      :size="size"
    />
  </span>
</template>

<style lang="scss" scoped>
.appIcon {
  display: inline-block;
  cursor: pointer;

  &:focus {
    outline: none;

    > span {
      background: green;
    }
  } 
}
</style>