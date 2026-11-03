<script setup lang="ts">
const { note } = defineProps<{
  note: NoteItem
}>()


const addTask = () => {
  note.tasks.push({
    name: 'Задача' + (note.tasks.length + 1),
    checked: false
  })
}
</script>

<template>
  <div>
    <NuxtLink :to="`/note/${note.id}`">
      {{  note.name }}
    </NuxtLink>

    <div 
      v-for="(task, taskIndex) of note.tasks"
      :key="`taskItem-${taskIndex}-${task.name}`"
    >
      <input type="checkbox" :checked="task.checked">
      
      {{ task.name }}
    </div>

    <button @click="addTask">Add task</button>
  </div>
</template>

<style lang="scss" scoped>

</style>