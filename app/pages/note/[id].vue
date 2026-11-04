<script setup lang="ts">
import ContentEditable from '~/components/UI/ContentEditable.vue'

const { fetchNote, editNote, deleteNote } = useNotes()
const route = useRoute()
const router = useRouter()
const id = typeof route.params.id !== 'string'
  ? ''
  : route.params.id
const note = await fetchNote(id)

if (!note.value) {
  throw createError({
    status: 404,
    statusText: 'Заметка не найдена',
  })
}

useHead({
  title: note.value.name
})

const checkTask = (task: NoteTask, event: Event) => {
  task.checked = (event.target as HTMLInputElement).checked
}
</script>

<template>
  <div 
    v-if="note"
    class="note"
  >
    <ContentEditable
      v-model="note.name"
    />

    <div 
      v-for="(task, index) of note.tasks"
      :key="`task-${index}`"
      class="note__list"
    >
      <input :id="`task-${index}`" type="checkbox" :checked="task.checked" @input="checkTask(task, $event)">

      <ContentEditable
        v-model="task.name"
      />
    </div>

    <button @click="editNote(note)">
      Сохранить
    </button>

    <button @click="deleteNote(note)">
      Удалить
    </button>

    <button @click="router.push('/')">
      Отменить
    </button>
  </div>
</template>

<style lang="sass" scoped>
.note
  &__list
    display: flex
</style>