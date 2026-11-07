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
  <Btn
    class="newNote"
    title="Добавить заметку"
    @click="showAddModal"
  >
    <Icon name="pixelarticons:notes-plus"/>
  </Btn>

  <ClientOnly>
    <div class="nodeList">
      <NoteCard
        v-for="(note, noteIndex) of notes"
        :key="`noteItem-${noteIndex}`"
        :note="note"
      />
    </div>

    <template #fallback>
      <div class="skeleton-wrapper">
        <div class="skeleton-bar" style="height: 200px;"></div>
      </div>
    </template>
  </ClientOnly>

  <LazyNoteAddModal 
    v-if="isAddShown"
    v-model="isAddShown"
  />
</template>

<style lang="sass" scoped>
.nodeList
  display: grid
  grid-template-columns: repeat(3, 1fr)
  grid-auto-rows: minmax(100px, auto)
  gap: 10px
  max-width: 620px
  margin-bottom: 10px

  & > div:nth-child(4n + 3)
    grid-row: span 2

  // & > div:nth-child(3n + 2)
  //   grid-row: span 2
.newNote
  position: sticky
</style>