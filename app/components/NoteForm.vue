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
  undoHistory,
  redoHistory,
  undo,
  redo
} = useNoteTasks(noteForm)
</script>

<template>
  <div class="noteForm">
    <ContentEditable
      placeholder="Наименование заметки"
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

    <Btn
      @click="addTask()"
    >
      Новая задача
    </Btn>

    <div>
      <Btn
        @click="emit('submit', noteForm)"
      >
        {{ isEdit ? 'Изменить' : 'Добавить' }}
      </Btn>

      <Btn
        v-show="isEdit"
        @click="emit('delete', noteForm)"
      >
        Удалить
      </Btn>

      <Btn
        v-show="isEdit"
        @click="emit('cancel')"
      >
        Отменить
      </Btn>
    </div>

    <Btn
      @click="undo"
    >
      undo
    </Btn>

    <Btn
      @click="redo"
    >
      redo
    </Btn>
    <div style="flex">
      <pre>
        {{ undoHistory }}
      </pre>
      <pre>
        {{ redoHistory }}
      </pre>
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