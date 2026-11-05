<script setup lang="ts">
const checked = defineModel<boolean>({ required: true, default: false })

const { id } = defineProps<{
  id?: string
}>()

const toggleCheck = () => {
  checked.value = !checked.value
}
</script>

<template>
  <span
    :class="[
      'checkbox', {
        'checkbox--checked': checked
      }
    ]"
    @click="toggleCheck"
  >
    <input
      :checked="checked"
      :id="id"
      type="checkbox"
    >
    <Icon 
      name="pixelarticons:checkbox-on"
      class="checkbox__on"
    />
    <Icon 
      name="pixelarticons:checkbox"
      class="checkbox__off"
    />
  </span>
</template>

<style lang="sass" scoped>
.checkbox
  input
    display: none

  &__on,
  &__off
    display: none

  &:not(&--checked) &__off,
  &--checked &__on
    display: inline-block
</style>