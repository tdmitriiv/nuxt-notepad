import { shallowRef, type Ref } from 'vue'

export type TaskCommandName = 'add' | 'delete' | 'toggle' | 'change'

export type AddCommend = {
  type: 'add',
  params: {
    value: NoteTask
    index?: number
  }
}

type DeleteCommand = {
  type: 'delete',
  params: {
    index: number
  }
}

type ToggleCommand = {
  type: 'toggle',
  params: {
    index: number
    value: boolean
  }
}

type ChangeCommand = {
  type: 'change',
  params: {
    index: number
    value: string
  }
}

type TaskCommand = AddCommend | DeleteCommand | ToggleCommand | ChangeCommand

export type HistoryItem = {
  index: number
  type: TaskCommandName
  value: NoteTask
}

export default function useTaskHistory (
  tasks: Ref<NoteTask[]>
) {
  const undoHistory = shallowRef<HistoryItem[]>([])
  const redoHistory = shallowRef<HistoryItem[]>([])

  const execute = (command: TaskCommand, history = undoHistory) => {
    switch (command.type) {
      case 'add': {
        const addIndex = command.params.index ?? tasks.value.length
        tasks.value.splice(addIndex, 0, command.params.value)
        history.value.push({
          type: command.type,
          index: addIndex,
          value: { ...command.params.value }
        })
        break
      }
        
      case 'delete': {
        const task = tasks.value[command.params.index]
        if (!task) return

        tasks.value.splice(command.params.index, 1)
        history.value.push({
          type: command.type,
          index: command.params.index,
          value: { ...task },
        })
        break
      }
        
      case 'toggle':
        const task = tasks.value[command.params.index]
        if (!task) return

        const previousTask = { ...task }
        task.checked = command.params.value
        history.value.push({
          type: command.type,
          index: command.params.index,
          value: previousTask
        })
        break
      case 'change': {
        const task = tasks.value[command.params.index]
        if (!task) return

        const previousTask = { ...task }

        task.name = command.params.value

        history.value.push({
          type: command.type,
          index: command.params.index,
          value: previousTask
        })
        break
      }
    }
  }

  const processCommand = (command: TaskCommand) => {
    execute(command)

    if (redoHistory.value.length) {
      redoHistory.value = []
    }
  }

  const processHistory = (fromHistory = undoHistory, toHistory = redoHistory) => {
    const command = fromHistory.value.pop()

    if (!command) { return }

    switch (command.type) {
      case 'add': {
        execute({
          type: 'delete',
          params: {
            index: command.index
          }
        }, toHistory)
        break
      }
      case 'delete': {
        execute({
          type: 'add',
          params: {
            value: command.value,
            index: command.index
          }
        }, toHistory)
        break
      }
      case 'toggle':
        execute({
          type: 'toggle',
          params: {
            value: command.value.checked,
            index: command.index
          }
        }, toHistory)
        break
      case 'change':
        execute({
          type: 'change',
          params: {
            value: command.value.name,
            index: command.index
          }
        }, toHistory)
        break
    }
  }

  const undo = () => {
    processHistory()
  }

  const redo = () => {
    processHistory(redoHistory, undoHistory)
  }

  return {
    processCommand,
    undo,
    redo,
    undoHistory,
    redoHistory
  }
}