<script setup lang="ts">
import ContentEditable from '~/components/UI/ContentEditable.vue'

const { note } = defineProps<{
  note?: NoteItem
}>()

const emit = defineEmits<{
  submit: [value: NoteItem]
}>()

const noteForm = ref<NoteItem>({
  id: getId('note'),
  name: '',
  tasks: []
})

if (note) {
  noteForm.value = note
}

const checkTask = (task: NoteTask, event: Event) => {
  task.checked = (event.target as HTMLInputElement).checked
}

const addTask = (index?: number) => {
  const newTask: NoteTask = {
    id: getId('task'),
    checked: false,
    name: ''
  }

  if (typeof index === 'number') {
    noteForm.value.tasks.splice(index + 1, 0, newTask)
  } else {
    noteForm.value.tasks.push(newTask)
  }
}

const deleteTask = (index: number) => {
  noteForm.value.tasks.splice(index, 1)
} 

</script>

<template>
  <div class="noteForm">
    <ContentEditable
      placeholder="Наименование заметки"
      v-model="noteForm.name"
    />

    <div 
      v-for="(task, index) of noteForm.tasks"
      :key="`task-${task.id}`"
      class="noteForm__task"
    >
      <input 
        :id="`task-${task.id}`"
        :checked="task.checked"
        type="checkbox"
        @input="checkTask(task, $event)"
      >

      <ContentEditable
        v-model="task.name"
        placeholder="Задача"
      />

      <Icon 
        name="pixelarticons:trash"
        class="noteForm__delete"
        @click="deleteTask(index)"
      />

      <Icon 
        name="pixelarticons:plus"
        class="noteForm__add"
        @click="addTask(index)"
      />
    </div>

    <button 
      @click="addTask"
    >
      Новая задача
    </button>

    <button
      @click="emit('submit', noteForm)"
    >
      {{ note ? 'Изменить' : 'Добавить' }}
    </button>
  </div>
</template>

<style lang="sass" scoped>
.noteForm
  &__task
    display: flex
    align-items: center

  &__delete,
  &__add
    cursor: pointer
</style>