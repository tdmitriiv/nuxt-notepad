<script setup lang="ts">
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
  </div>
</template>

<style lang="sass" scoped>
</style>