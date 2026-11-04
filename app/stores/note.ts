export const useNoteStore = defineStore('notes', {
  state: (): {
    notes: NoteItem[]
    hydrated: boolean
  } => ({
    notes: [],
    hydrated: false
  }),
  actions: {
    setNotes (notes: NoteItem[]) {
      this.notes = notes
    },
    addNote (note: NoteItem) {
      this.notes.push(note)
    },
    saveNote (note: NoteItem) {
      const index = this.notes.findIndex(({ id }) => id === note.id)

      if (index === -1) return

      this.notes[index] = note
    },
    deleteNote (note: NoteItem) {
      const index = this.notes.findIndex(({ id }) => id === note.id)

      if (index === -1) return

      this.notes.splice(index, 1)
    }
  }
})