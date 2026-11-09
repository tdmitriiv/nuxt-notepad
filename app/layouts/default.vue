<script setup lang="ts">
import ConfirmModal from '~/components/modals/ConfirmModal.vue'
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
    </header>
    <main class="container">
      <slot />
    </main>

    <ConfirmModal />
  </div>
</template>

<style lang="scss" scoped>
</style>