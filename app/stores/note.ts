export const useNoteStore = defineStore('notes', {
  state: (): {
    notes: NoteItem[]
  } => ({
    notes: [
      {
        name: 'Заметка 1',
        tasks: [
          {
            name: 'задача 1',
            checked: false
          },
          {
            name: 'задача 2',
            checked: false
          },
          {
            name: 'задача 3',
            checked: false
          }
        ]
      },
      {
        name: 'Заметка 2',
        tasks: [
          {
            name: 'задача 2 1',
            checked: false
          },
          {
            name: 'задача 2 2',
            checked: false
          },
          {
            name: 'задача 2 3',
            checked: false
          }
        ]
      }
    ]
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