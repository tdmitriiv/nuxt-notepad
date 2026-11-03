<script setup lang="ts">
import NoteCard from '~/components/NoteCard.vue';
import useNotes from '~/composables/useNotes'

const { notes } = useNotes()
</script>

<template>
  <NoteCard
    v-for="(note, noteIndex) of notes"
    :key="`noteItem-${noteIndex}`"
    :note="note"
  />
</template>

<style lang="scss" scoped>

</style>