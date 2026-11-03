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
    }
  }
})