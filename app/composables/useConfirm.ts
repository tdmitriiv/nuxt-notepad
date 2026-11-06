export default function useConfirm (title = '') {
  const confirmBus = useEventBus<ConfirmData>('confirm')

  return new Promise((resolve, reject) => {
    confirmBus.emit({
      resolve,
      reject,
      title
    })
  })
}
