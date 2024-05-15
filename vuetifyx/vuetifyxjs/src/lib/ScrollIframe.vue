<script setup lang="ts">
import { ref } from 'vue'

const iframe = ref()
const props = defineProps({
  srcdoc: { type: String, required: true },
})

const load = (event: any) => {
  iframe.value.style.height = iframe.value.contentWindow.document.documentElement.scrollHeight + 'px';

}

const scrollToCurrentContainer = (data: any) => {
  if (!iframe.value) {
    return
  }
  const current = iframe.value.contentWindow.document.body.querySelector(
    "div[data-container-id='" + data + "']"
  ) as HTMLElement
  if (!current) {
    return
  }
  const highlight = iframe.value.contentWindow.document.body.querySelector(
    '.wrapper-shadow.highlight'
  )
  if (highlight) {
    highlight.classList.remove('highlight')
  }
  window.parent.scroll({ top: current.offsetTop, behavior: 'smooth' })
  current.parentElement?.classList.add('highlight')
}
defineExpose({ scrollToCurrentContainer })
</script>

<template>
  <iframe
    ref="iframe"
    :srcdoc="srcdoc"
    frameborder="0"
    scrolling="no"
    @load="load"
    :style="{
      width: '100%',
      display: 'block',
      border: 'none',
      padding: 0,
      margin: 0,
    }"
  >
  </iframe>
</template>

<style scoped></style>
