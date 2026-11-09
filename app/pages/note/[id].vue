<script setup lang="ts">
import type { UnwrapRef } from 'vue'

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

const noteDraft = useDraft<NoteItem>('note' + route.params.id)

onMounted (async () => {
  const draft = noteDraft.getDraft()
  if (draft) {
    await nextTick()
    await useConfirm({ title: 'Восстановить черновик?' })
    note.value = draft
  }
})

const onUpdate = (note: NoteItem) => {
  editNote(note)
  noteDraft.deleteDraft()

  router.push('/')
}

const onDelete = async (note: NoteItem) => {
  try {
    await deleteNote(note)
    noteDraft.deleteDraft()
    router.push('/')
  } catch {}
}

const onCancel = async () => {
  try {
    await useConfirm({
      title: 'Подтвердить отмену?'
    })
    router.push('/')
  } catch {}
}

const draftNote = useDebounceFn((value: UnwrapRef<typeof note>) => {
  noteDraft.saveDraft(value)
}, 500)

watch(note, (newNote) => {
  draftNote(newNote)
}, {
  deep: true
})

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
</template>

<style lang="scss" scoped>
.note {
  &__list {
    display: flex
  } 
}
</style>