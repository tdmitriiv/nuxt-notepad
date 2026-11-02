<script setup lang="ts">
import useNotes from '~/composables/useNotes'

const { notes, addNote } = useNotes()
</script>

<template>
  <div
    v-for="(note, noteIndex) of notes"
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
</template>

<style lang="scss" scoped>

</style>