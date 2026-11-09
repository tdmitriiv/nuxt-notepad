<script setup lang="ts">
import Checkbox from '~/components/UI/Checkbox.vue'
import AppIcon from '~/components/UI/AppIcon.vue'

const { note } = defineProps<{
  note: NoteItem
}>()

const emit = defineEmits<{
  delete: [value: NoteItem]
}>()

const onNoteDelete = () => {
  emit('delete', note)
}
</script>

<template>
  <div class="noteCard">
    <NuxtLink 
      :to="`/note/${note.id}`"
      class="noteCard__name"
    >
      {{ note.name }}
    </NuxtLink>

    <div 
      v-for="(task, taskIndex) of note.tasks"
      :key="`taskItem-${taskIndex}-${task.name}`"
      class="noteCard__task"
    >
      <Checkbox 
        type="checkbox"
        :model-value="task.checked"
        disabled
      />
      
      {{ task.name }}
    </div>

    <AppIcon 
      name="pixelarticons:trash"
      class="noteCard__delete"
      @click="onNoteDelete"
    />
  </div>
</template>

<style lang="scss" scoped>
.noteCard {
  position:  relative;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: $spacing;
  border: 1px solid var(--color-border);
  border-radius: $borderRadius;

  &__name {
    color: var(--color-text);
    font-weight: bold;
    text-decoration: none;
  }

  &__task {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  &__delete {
    position: absolute;
    top: 5px;
    right: 5px;
  }
}
</style>