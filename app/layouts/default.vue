<script setup lang="ts">
useEventListener(document, 'storage', (event) => {
  console.log(event)
})
</script>

<template>
  <div>
    <slot />
  </div>
</template>

<style lang="sass" scoped>

</style>