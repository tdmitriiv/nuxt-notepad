import { it, describe, expect, beforeEach } from 'vitest';
import { ref, type Ref } from 'vue'
import useTaskHistory from '~/composables/useTaskHistory'

const getTask = (name = 'task', checked = false): NoteTask => {
  return {
    id: `${Date.now()}`,
    checked,
    name
  }
}
describe('useTaskHistory', () => {
  const tasks: Ref<NoteTask[]> = ref([])
  const taskHistory = useTaskHistory(tasks)

  beforeEach(() => {
    taskHistory.reset()
    tasks.value = [
      getTask('test 1')
    ]
  })
  it('Добавление задачи', () => {
    expect(tasks.value).toHaveLength(1)
    taskHistory.processCommand({
      type: 'add',
      params: { value: getTask('test 2') },
    })

    expect(taskHistory.undoHistory.value).toHaveLength(1)
    expect(tasks.value).toHaveLength(2)
  })

  it('Добавление задачи после индекса', () => {
    expect(tasks.value).toHaveLength(1)
    taskHistory.processCommand({
      type: 'add',
      params: { value: getTask('added first') },
    })
    taskHistory.processCommand({
      type: 'add',
      params: { value: getTask('added second'), index: 0 },
    })

    expect(taskHistory.undoHistory.value).toHaveLength(2)
    expect(tasks.value).toHaveLength(3)
    expect(tasks.value[1]?.name).toBe('added second')
  })

  it('удаление элемента', () => {
    expect(tasks.value).toHaveLength(1)
    taskHistory.processCommand({
      type: 'delete',
      params: { index: 0 },
    })
    expect(taskHistory.undoHistory.value).toHaveLength(1)
    expect(tasks.value).toHaveLength(0)
  })

  it('переключение элемента', () => {
    expect(tasks.value).toHaveLength(1)
    taskHistory.processCommand({
      type: 'toggle',
      params: { index: 0, value: true },
    })
    expect(taskHistory.undoHistory.value).toHaveLength(1)
    expect(tasks.value[0]?.checked).toBeTruthy()
  })

  it('изменение элемента', () => {
    expect(tasks.value).toHaveLength(1)
    taskHistory.processCommand({
      type: 'change',
      params: { index: 0, value: 'измененный эелемент' }
    })
    expect(taskHistory.undoHistory.value).toHaveLength(1)
    expect(tasks.value[0]?.name).toBe('измененный эелемент')
  })

  it('undo / redo', () => {
    expect(tasks.value).toHaveLength(1)
    taskHistory.processCommand({
      type: 'add',
      params: { value: getTask('test 2') },
    })
    expect(taskHistory.undoHistory.value).toHaveLength(1)
    expect(tasks.value.map((task) => task.name).join(',')).toBe('test 1,test 2')
    taskHistory.undo()
    expect(taskHistory.undoHistory.value).toHaveLength(0)
    expect(taskHistory.redoHistory.value).toHaveLength(1)
    expect(tasks.value.map((task) => task.name).join(',')).toBe('test 1')
    taskHistory.redo()
    expect(taskHistory.undoHistory.value).toHaveLength(1)
    expect(taskHistory.redoHistory.value).toHaveLength(0)
    expect(tasks.value.map((task) => task.name).join(',')).toBe('test 1,test 2')
  })

  it('undo максимальное число шагов', () => {
    const taskHistoryLimit = useTaskHistory(tasks, 3)
    taskHistoryLimit.processCommand({
      type: 'add',
      params: { value: getTask('test 2') },
    })
    taskHistoryLimit.processCommand({
      type: 'add',
      params: { value: getTask('test 3') },
    })
    taskHistoryLimit.processCommand({
      type: 'add',
      params: { value: getTask('test 4') },
    })
    taskHistoryLimit.processCommand({
      type: 'add',
      params: { value: getTask('test 5') },
    })
    expect(taskHistoryLimit.undoHistory.value).toHaveLength(3)
    expect(taskHistoryLimit.undoHistory.value.map(task => task.value.name).join(',')).toBe('test 3,test 4,test 5')
  })
})