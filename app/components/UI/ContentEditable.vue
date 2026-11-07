<script setup lang="ts">
  const editorRef = useTemplateRef('editor')

  const {
    disabled = false,
    type = 'text'
  } = defineProps<{
    disabled?: boolean
    type?: 'text' | 'html'
  }>()
  const model = defineModel<string>({ required: true })

  const update = (value: string) => {
    if (!editorRef.value) {
      return
    }
    const current = type === 'text'
      ? editorRef.value.innerText
      : editorRef.value.innerHTML

    if (current === value) {
      return
    }

    if (type === 'text') {
      editorRef.value.innerText = value
    } else {
      editorRef.value.innerHTML = value
    }
  }

  const onInput = (e: Event) => {
    if (disabled) {
      return
    }

    const target = (e.target as HTMLElement)
    const value = type === 'text'
      ? target.innerText
      : target.innerHTML
    model.value = value
  }

  watch(model, (value) => {
    update(value)
  })

  onMounted (() => {
    update(model.value)
  })

  const contenteditableType = computed(() => {
    return type === 'text'
      ? 'plaintext-only'
      : 'true'
  })
</script>

<template>
  <div
    ref="editor"
    :contenteditable="contenteditableType"
    class="contentEditable"
    @input="onInput"
  />
</template>

<style lang="sass" scoped>
.contentEditable
  width: 100%
  padding: 5px 0
  border: 1px solid transparent
  outline: none
  white-space: pre-wrap

  &:focus
    border-bottom-color: var(--color-border)

  &[placeholder]:empty:not(:focus)::before
    content: attr(placeholder)
    color: var(--color-muted)
    pointer-events: none
</style>