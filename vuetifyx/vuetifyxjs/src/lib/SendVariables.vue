<script setup lang="ts">
import { ref } from 'vue'

const vnode = ref()

const tagInputsFocus = (v: any) => {
  vnode.value = v
}
const addTags = (tag: any) => {
  if (!vnode.value) {
    return
  }
  var lazyValue = vnode.value.modelValue
  var startString = lazyValue.substring(0, vnode.value.$el.querySelector('input').selectionStart)
  var endString = lazyValue.substring(
    vnode.value.$el.querySelector('input').selectionEnd,
    lazyValue.length
  )

  vnode.value.$emit('update:modelValue', startString + '{{' + tag + '}}' + endString)
  vnode.value.focus()
}
defineExpose({
  tagInputsFocus,
  addTags
})
</script>

<template>
  <div>
    <slot></slot>
  </div>
</template>

<style scoped></style>
