<script setup lang="ts">
import { ref } from 'vue'

const iframe = ref()
const props = defineProps({
  srcdoc: { type: String, required: true },
  iframeHeightName: { type: String, required: true },
  iframeValue: { type: String, required: true }
})

const load = (event: any) => {
  let height = document.body.parentElement?.offsetHeight + 'px'
  document.body.style.height = height
  document.cookie = `${props.iframeHeightName}=` + height
  addListener()
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
  const hover = iframe.value.contentWindow.document.body.querySelector('.wrapper-shadow.hover')
  if (hover) {
    hover.classList.remove('hover')
  }
  window.parent.scroll({ top: current.offsetTop, behavior: 'smooth' })
  current.querySelector('.wrapper-shadow')?.classList.add('hover')
}
const addListener = () => {
  if (!iframe.value) {
    return
  }
  iframe.value.contentWindow.document.body
    .querySelectorAll('.wrapper-shadow')
    .forEach((shadow: any) => {
      shadow.addEventListener('mouseover', (event: any) => {
        iframe.value.contentWindow.document.body
          .querySelectorAll('.wrapper-shadow.hover')
          .forEach((item: any) => {
            item.classList.remove('hover')
          })
        shadow.classList.add('hover')
      })
    })
}
defineExpose({ scrollToCurrentContainer })
</script>

<template>
  <iframe
    ref="iframe"
    :srcdoc="srcdoc"
    @load="load"
    :style="{
      width: '100%',
      display: 'block',
      border: 'none',
      padding: 0,
      margin: 0,
      height: iframeValue
    }"
  >
  </iframe>
</template>

<style scoped></style>
