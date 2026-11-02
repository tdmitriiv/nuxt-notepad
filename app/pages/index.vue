<script setup lang="ts">
const noteStore = useNoteStore()

const addNote = () => {
  noteStore.addNote({
    name: `Заментка ${noteStore.notes.length + 1}`,
    tasks: []
  })
}
</script>

<template>
  <div>
    <div
      v-for="(note, noteIndex) of noteStore.notes"
      :key="`noteItem-${noteIndex}`"
    >
      {{  note.name }}

      <div 
        v-for="(task, taskIndex) of note.tasks"
        :key="`taskItem-${noteIndex}-${taskIndex}`"
      >
        {{ task.checked }} {{ task.name }}
      </div>
    </div>

    <button @click="addNote">Add note</button>
  </div>
</template>

<style lang="scss" scoped>

</style>