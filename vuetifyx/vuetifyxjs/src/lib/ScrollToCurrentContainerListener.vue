<script setup lang="ts">
import { onMounted } from 'vue'

const scrollToCurrentContainer = (event: any) => {
  const current = document.querySelector('div[data-container-id=\'' + event.data + '\']') as HTMLElement
  if (!current) {
    return
  }
  const hover = document.querySelector('.wrapper-shadow.hover')
  if (hover) {
    hover.classList.remove('hover')
  }
  window.parent.scroll({ top: current.offsetTop, behavior: 'smooth' })
  current.querySelector('.wrapper-shadow')?.classList.add('hover')
}
onMounted(() => {
  document.querySelectorAll('.wrapper-shadow').forEach(shadow => {
    shadow.addEventListener('mouseover', event => {
      document.querySelectorAll('.wrapper-shadow.hover').forEach(item => {
        item.classList.remove('hover')
      })
      shadow.classList.add('hover')
    })
  })

  window.addEventListener('message', scrollToCurrentContainer, false)
})


</script>

<template>

</template>

<style scoped>

</style>
