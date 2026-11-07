import useTaskHistory from '~/composables/useTaskHistory'

export default function useNotaTasks (note: Ref<NoteItem>) {
  const tasks = computed(() => note.value.tasks)

  const { processCommand, redo, undo, undoHistory, redoHistory } = useTaskHistory(tasks)

  const addTask = (index?: number) => {
    const newTask: NoteTask = {
      id: getId('task'),
      checked: false,
      name: ''
    }

    processCommand({
      type: 'add',
      params: {
        value: newTask,
        index
      }
    })
  }

  const deleteTask = (index: number) => {
    processCommand({
      type: 'delete',
      params: {
        index
      }
    })
  }

  const updateTask = useDebounceFn((value: string, index: number) => {
    processCommand({
      type: 'change',
      params: {
        index,
        value
      }
    })
  }, 500)

  const toggleTask = (value: boolean, index: number) => {
    processCommand({
      type: 'toggle',
      params: {
        index,
        value
      }
    })
  }

  return {
    addTask,
    deleteTask,
    updateTask,
    toggleTask,
    redo,
    redoHistory,
    undo,
    undoHistory,
    tasks
  }
}