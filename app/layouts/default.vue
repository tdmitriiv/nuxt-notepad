<script setup lang="ts">
import ConfirmModal from '~/components/modals/ConfirmModal.vue'
import AppIcon from '~/components/UI/AppIcon.vue'
import Btn from '~/components/UI/Btn.vue'

const isAddShown = shallowRef(false)

const showAddModal = () => {
  isAddShown.value = true
}
const route = useRoute()
const isHomePage = computed(() => {
  return route.path === '/'
})
</script>

<template>
  <div class="wrapper">
    <header class="header container">
      <NuxtLink to="/">
        <img
          src="~/assets/img/logo.svg"
          alt="notepadd"
          class="logo"
        >
      </NuxtLink>

      <Btn
        v-if="isHomePage"
        class="newNote"
        title="Добавить заметку"
        @click="showAddModal"
      >
        <AppIcon name="pixelarticons:notes-plus" />
      </Btn>
    </header>
    <main class="container">
      <slot />
    </main>

    <ConfirmModal />

    <LazyNoteAddModal 
      v-if="isAddShown"
      v-model="isAddShown"
    />
  </div>
</template>

<style lang="scss" scoped>
</style>