<script setup lang="ts">
const { note } = defineProps<{
  note: NoteItem
}>()
</script>

<template>
  <div>
    <NuxtLink :to="`/note/${note.id}`">
      {{ note.name }}
    </NuxtLink>

    <div 
      v-for="(task, taskIndex) of note.tasks"
      :key="`taskItem-${taskIndex}-${task.name}`"
    >
      <input type="checkbox" :checked="task.checked">
      
      {{ task.name }}
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>