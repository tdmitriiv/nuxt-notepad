<script setup lang="ts">
import Modal from '~/components/UI/Modal.vue'

const isOpen = defineModel<boolean>({ required: true })
  
</script>

<template>
  <Modal
    v-model="isOpen"
    title="Новая заметка"
  >
    <div>
      Тело новой заметки
    </div>
  </Modal>
</template>

<style lang="scss" scoped>

</style>