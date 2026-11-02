export type NoteTask = {
  name: string
  checked: boolean
}

export type NoteItem = {
  name: string
  tasks: NoteTask[]
}
