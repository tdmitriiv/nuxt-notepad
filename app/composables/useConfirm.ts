export default function useConfirm (data: Omit<ConfirmData, 'resolve' | 'reject'>) {
  const confirmBus = useEventBus<ConfirmData>('confirm')

  return new Promise((resolve, reject) => {
    confirmBus.emit({
      resolve,
      reject,
      title: data.title,
      description: data.description || ''
    })
  })
}
