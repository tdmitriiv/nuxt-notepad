export default function useNotes () {
  const noteStore = useNoteStore()

  const notes = computed(() => noteStore.hydrated ? noteStore.notes : [])

  const addNote = (value: NoteItem) => {
    noteStore.addNote(value)
  }

  const fetchNote = async (noteId: string) => {
    await until(() => noteStore.hydrated).toBeTruthy({ timeout: 5000 })

    return noteStore.notes.find(({ id }) => noteId === id)
  }

  return {
    notes,
    addNote,
    fetchNote
  }
}