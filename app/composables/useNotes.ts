export default function useNotes () {
  const noteStore = useNoteStore()

  const notes = computed(() => noteStore.hydrated ? noteStore.notes : [])

  const addNote = (value: NoteItem) => {
    noteStore.addNote(value)
  }

  const fetchNote = async (noteId: string): Promise<Ref<NoteItem | null>> => {
    await until(() => noteStore.hydrated).toBeTruthy({ timeout: 5000 })
    const note = noteStore.notes.find(({ id }) => noteId === id)

    return ref(note ? structuredClone(toRaw(note)) : null)
  }

  const editNote = async (note: NoteItem) => {
    noteStore.saveNote(note)
  }

  const deleteNote = async (note: NoteItem) => {
    await useConfirm('Подтвердите удаление?')
    noteStore.deleteNote(note)
  }

  return {
    notes,
    addNote,
    fetchNote,
    editNote,
    deleteNote
  }
}