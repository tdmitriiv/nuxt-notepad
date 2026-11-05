<script setup lang="ts">
import NoteCard from '~/components/NoteCard.vue';
import useNotes from '~/composables/useNotes'

const { notes } = useNotes()

const isAddShown = shallowRef(true)

const showAddModal = () => {
  isAddShown.value = true
}
</script>

<template>
  <NoteCard
    v-for="(note, noteIndex) of notes"
    :key="`noteItem-${noteIndex}`"
    :note="note"
  />

  <button @click="showAddModal">
    <Icon name="pixelarticons:notes-plus"/>
    
    Новая заметка
  </button>

  <LazyNoteAddModal v-model="isAddShown" />
</template>

<style lang="scss" scoped>

</style>