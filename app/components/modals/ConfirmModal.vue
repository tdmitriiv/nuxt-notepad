<script setup lang="ts">
import Modal from '~/components/UI/Modal.vue'
import Btn from '~/components/UI/Btn.vue'

const isOpen = shallowRef(false)

const confirmData = shallowRef<ConfirmData | null>(null)

const confirmBus = useEventBus<ConfirmData>('confirm')

const title = computed(() => confirmData.value?.title)

const description = computed(() => confirmData.value?.description)

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
    class="confirmModal"
  >
    <div class="confirmModal__content">
      <div class="confirmModal__description">
        {{ description }}
      </div>

      <div class="confirmModal__buttons">
        <Btn 
          variant="success"
          @click="confirm"
        >
          Да
        </Btn>
        <Btn 
          variant="error"
          @click="decline"
        >
          Нет
        </Btn>
      </div>
    </div>
  </Modal>
</template>

<style lang="scss" scoped>
.confirmModal {
  &__description {
    color: var(--color-muted);
  }

  &__buttons {
    display: flex;
    justify-content: center;
    gap: 10px;
  }
}
</style>
