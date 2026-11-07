<script setup lang="ts">
import NoteCard from '~/components/NoteCard.vue'
import Btn from '~/components/UI/Btn.vue'
import useNotes from '~/composables/useNotes'

const { notes } = useNotes()

const isAddShown = shallowRef(false)

const showAddModal = () => {
  isAddShown.value = true
}
</script>

<template>
  <ClientOnly>
    <NoteCard
      v-for="(note, noteIndex) of notes"
      :key="`noteItem-${noteIndex}`"
      :note="note"
    />

    <template #fallback>
      <div class="skeleton-wrapper">
        <div class="skeleton-bar" style="height: 200px;"></div>
      </div>
    </template>
  </ClientOnly>

  <Btn @click="showAddModal">
    <Icon name="pixelarticons:notes-plus"/>
    
    Новая заметка
  </Btn>

  <LazyNoteAddModal 
    v-if="isAddShown"
    v-model="isAddShown"
  />
</template>

<style lang="scss" scoped>

</style>