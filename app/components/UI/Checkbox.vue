<script setup lang="ts">
import AppIcon from '~/components/UI/AppIcon.vue'
const checked = defineModel<boolean>({ required: true, default: false })

const { id, disabled = false } = defineProps<{
  id?: string
  disabled?: boolean
}>()

const toggleCheck = () => {
  if (disabled) { return }
  checked.value = !checked.value
}
</script>

<template>
  <span
    :class="[
      'checkbox', {
        'checkbox--checked': checked,
        'checkbox--disabled': disabled
      }
    ]"
  >
    <input
      :checked="checked"
      :id="id"
      type="checkbox"
    >
    <AppIcon
      name="pixelarticons:checkbox-on"
      class="checkbox__on"
      @click="toggleCheck"
    />
    <AppIcon
      name="pixelarticons:checkbox"
      class="checkbox__off"
      @click="toggleCheck"
    />
  </span>
</template>

<style lang="scss" scoped>
.checkbox {
  display: inline-flex;
  width: 20px;
  height: 20px;

  input {
    display: none;
  }

  &--disabled {
    color: var(--color-muted);
  }

  &__on,
  &__off {
    display: none;
  }

  &:not(&--checked) &__off,
  &--checked &__on {
    display: inline-block;
  }
}
</style>