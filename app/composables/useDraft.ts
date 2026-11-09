export default function useDraft <T>(key = 'draft') {
  const saveDraft = (value: any) => {
    localStorage.setItem(key, JSON.stringify(value))
  }

  const getDraft = (): T | null => {
    const storageDraft = localStorage.getItem(key)

    if (!storageDraft) { return null }

    try {
      const draft = JSON.parse(storageDraft)
      
      return draft as T
    } catch (e) {
      console.error('Unable to parse draft from storage')
      return null
    }
  }

  const deleteDraft = () => {
    localStorage.removeItem(key)
  }

  return {
    getDraft,
    saveDraft,
    deleteDraft
  }
}
