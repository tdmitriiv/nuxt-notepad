<script setup lang="ts">
import ContentEditable from '~/components/UI/ContentEditable.vue'
import Checkbox from '~/components/UI/Checkbox.vue'
import AppIcon from '~/components/UI/AppIcon.vue'

const { note } = defineProps<{
  note?: NoteItem
}>()

const emit = defineEmits<{
  submit: [value: NoteItem]
  cancel: void
  delete: [value: NoteItem]
}>()

const noteForm = ref<NoteItem>({
  id: getId('note'),
  name: '',
  tasks: []
})

if (note) {
  noteForm.value = note
}

const isEdit = computed(() => Boolean(note))

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
      <Checkbox
        v-model="task.checked"
        :id="`task-${task.id}`"
      />

      <ContentEditable
        v-model="task.name"
        placeholder="Задача"
      />

      <AppIcon 
        name="pixelarticons:trash"
        class="noteForm__delete"
        @click="deleteTask(index)"
      />

      <AppIcon 
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

    <div>
      <button
        @click="emit('submit', noteForm)"
      >
        {{ isEdit ? 'Изменить' : 'Добавить' }}
      </button>

      <button
        v-show="isEdit"
        @click="emit('delete', noteForm)"
      >
        Удалить
      </button>

      <button
        v-show="isEdit"
        @click="emit('cancel')"
      >
        Отменить
      </button>
    </div>
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