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
  try {
    await deleteNote(note)
    router.push('/')
  } catch {}
}

const onCancel = async () => {
  try {
    await useConfirm('Подтвердить отмену?')
    router.push('/')
  } catch {}
}

useHead({
  title: note.value.name
})
</script>

<template>
  <NuxtLayout>
    <template #header>

    </template>
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
  </NuxtLayout>
</template>

<style lang="scss" scoped>
.note {
  &__list {
    display: flex
  } 
}
</style>