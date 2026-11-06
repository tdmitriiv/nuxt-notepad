<script setup lang="ts">
import Checkbox from '~/components/UI/Checkbox.vue'

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
      <Checkbox 
        type="checkbox"
        :model-value="task.checked"
        disabled
      />
      
      {{ task.name }}
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>