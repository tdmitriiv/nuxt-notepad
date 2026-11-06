<script setup lang="ts">
import Modal from '~/components/UI/Modal.vue'
import Btn from '~/components/UI/Btn.vue'

const isOpen = shallowRef(false)

const confirmData = shallowRef<ConfirmData | null>(null)

const confirmBus = useEventBus<ConfirmData>('confirm')

const title = computed(() => confirmData.value?.title)

confirmBus.on((data) => {
  confirmData.value = data
  isOpen.value = true
})

const confirm = () => {
  if (!confirmData.value) {
    isOpen.value = false
    return
  }
  confirmData.value.resolve()
  isOpen.value = false
}

const decline = () => {
  if (!confirmData.value) {
    isOpen.value = false
    return
  }
  confirmData.value.reject()
  isOpen.value = false
}
</script>

<template>
  <Modal 
    v-model="isOpen"
    :title="title"
  >
    <Btn @click="confirm">Да</Btn>
    <Btn @click="decline">Нет</Btn>
  </Modal>
</template>
