<script setup lang="ts">
import ContentEditable from '~/components/UI/ContentEditable.vue'
import Checkbox from '~/components/UI/Checkbox.vue'
import AppIcon from '~/components/UI/AppIcon.vue'
import Btn from '~/components/UI/Btn.vue'

const { note } = defineProps<{
  note?: NoteItem
}>()

const emit = defineEmits<{
  submit: [value: NoteItem]
  cancel: void
  delete: [value: NoteItem]
}>()

const noteForm = ref<NoteItem>(note
  ? note
  : {
    id: getId('note'),
    name: '',
    tasks: []
  }
)

const isEdit = computed(() => Boolean(note))

const {
  tasks,
  addTask,
  deleteTask,
  updateTask,
  toggleTask,
  undo,
  redo,
  undoHistory,
  redoHistory
} = useNoteTasks(noteForm)
</script>

<template>
  <div class="noteForm">
    <ContentEditable
      placeholder="Наименование заметки"
      class="noteForm__name"
      v-model="noteForm.name"
    />

    <div 
      v-for="(task, index) of tasks"
      :key="`task-${task.id}`"
      class="noteForm__task"
    >
      <Checkbox
        :model-value="task.checked"
        :id="`task-${task.id}`"
        @update:model-value="toggleTask($event, index)"
      />

      <ContentEditable
        :model-value="task.name"
        placeholder="Задача"
        @update:model-value="updateTask($event, index)"
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

    <div class="noteForm__buttons">
      <Btn
        v-show="isEdit"
        :disabled="!undoHistory.length"
        variant="success"
        title="Вернуть назад"
        @click="undo"
      >
        <AppIcon name="pixelarticons:undo-sharp" />
      </Btn>
      
      <Btn
        title="Новая задача"
        @click="addTask()"
      >
        <AppIcon 
          name="pixelarticons:plus"
          class="noteForm__add"
        />
      </Btn>

      <Btn
        v-show="isEdit"
        :disabled="!redoHistory.length"
        variant="error"
        title="Перейти вперед"
        @click="redo"
      >
        <AppIcon name="pixelarticons:redo-sharp" />
      </Btn>

      <Btn
        variant="success"
        @click="emit('submit', noteForm)"
      >
        {{ isEdit ? 'Изменить' : 'Добавить' }}
      </Btn>

      <Btn
        v-show="isEdit"
        variant="error"
        @click="emit('delete', noteForm)"
      >
        <AppIcon name="pixelarticons:trash" />
      </Btn>

      <Btn
        v-show="isEdit"
        title="Отменить"
        @click="emit('cancel')"
      >
        <AppIcon name="pixelarticons:chevron-left" />
      </Btn>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.noteForm
  display: flex
  flex-direction: column
  gap: 8px

  &__name
    font-size: 18px
    font-weight: bold

  &__task
    display: flex
    align-items: center
    gap: 5px

  &__delete,
  &__add
    cursor: pointer

  &__buttons
    display: flex
    align-items: center
    flex-wrap: wrap
    gap: 10px
    margin-top: 10px
</style>