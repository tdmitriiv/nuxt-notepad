<script setup lang="ts">
import ConfirmModal from '~/components/modals/ConfirmModal.vue'

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

const onUpdate = (note: NoteItem) => {
  editNote(note)
  router.push('/')
}

const onDelete = async (note: NoteItem) => {
  await deleteNote(note)
  router.push('/')
}

const onCancel = async () => {
  await useConfirm('Подтвердить отмену?')
  router.push('/')
}

useHead({
  title: note.value.name
})
</script>

<template>
  <div 
    v-if="note"
    class="note"
  >
    <NoteForm 
      :note="note"
      @submit="onUpdate"
      @delete="onDelete"
      @cancel="onCancel"
    />
  </div>

  <ConfirmModal />
</template>

<style lang="sass" scoped>
.note
  &__list
    display: flex
</style>