<script setup lang="ts">
import Modal from '~/components/UI/Modal.vue'

const isOpen = defineModel<boolean>({ required: true })

const { addNote } = useNotes()

const submitNote = (note: NoteItem) => {
  addNote(note)
  isOpen.value = false
}
</script>

<template>
  <Modal
    v-model="isOpen"
    title="Новая заметка"
  >
    <NoteForm @submit="submitNote" />
  </Modal>
</template>

<style lang="scss" scoped>

</style>