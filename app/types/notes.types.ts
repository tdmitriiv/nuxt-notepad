export type NoteTask = {
  id: string
  name: string
  checked: boolean
}

export type NoteItem = {
  id: string
  name: string
  tasks: NoteTask[]
}
