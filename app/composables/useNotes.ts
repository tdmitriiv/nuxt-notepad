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

  const editNote = (note: NoteItem) => {
    noteStore.saveNote(note)
  }

  const deleteNote = (note: NoteItem) => {
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