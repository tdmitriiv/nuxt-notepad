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
  target: Ref<NoteTask[]>
) {
  const undoHistory = shallowRef<HistoryItem[]>([])
  const redoHistory = shallowRef<HistoryItem[]>([])

  const execute = (command: TaskCommand, history = undoHistory) => {
    switch (command.type) {
      case 'add': {
        const addIndex = command.params.index ?? target.value.length
        target.value.splice(addIndex, 0, command.params.value)
        history.value.push({
          type: command.type,
          index: addIndex,
          value: command.params.value
        })
        break
      }
        
      case 'delete': {
        const { index } = command.params
        const task = target.value[index]
        if (!task) return

        target.value.splice(index, 1)
        history.value.push({
          type: command.type,
          index,
          value: task,
        })
        break
      }
        
      case 'toggle':
        break
      case 'change': {
        const task = target.value[command.params.index]
        if (!task) return

        target.value[command.params.index] = {
          ...task,
          name: command.params.value
        }
        history.value.push({
          type: 'change',
          index: command.params.index,
          value: task
        })
        break
      }
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
    execute,
    undo,
    redo,
    undoHistory,
    redoHistory
  }
}