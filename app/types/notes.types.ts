export type NoteTask = {
  name: string
  checked: boolean
}

export type NoteItem = {
  id: string
  name: string
  tasks: NoteTask[]
}
