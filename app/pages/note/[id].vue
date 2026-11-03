<script setup lang="ts">
  const route = useRoute()
  const id = typeof route.params.id !== 'string'
    ? ''
    : route.params.id
  const note = await useNotes().fetchNote(id)
  
  if (!note) {
    throw createError({
      status: 404,
      statusText: 'Заметка не найдена',
    })
  }

  useHead({
    title: note.name
  })

  const checkTask = (task: NoteTask, event: Event) => {
    task.checked = (event.target as HTMLInputElement).checked
  }
</script>

<template>
  <div v-if="note">
    {{ note.name }}

    <div 
      v-for="(task, index) of note.tasks"
      :key="`task-${index}`"
    >
      <input :id="`task-${index}`" type="checkbox" :checked="task.checked" @input="checkTask(task, $event)">

      {{ task.name }}
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>