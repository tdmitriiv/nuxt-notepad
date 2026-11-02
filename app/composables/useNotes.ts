export default function useNotes () {
  const noteStore = useNoteStore()

  const notes = computed(() => noteStore.notes)

  const addNote = () => {
    noteStore.addNote({
      name: `Заментка ${noteStore.notes.length + 1}`,
      tasks: []
    })
  }

  return {
    notes,
    addNote
  }
}