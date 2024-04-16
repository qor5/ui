<template>
  <div :id="props.dragId">
    <slot></slot>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

const props = defineProps({
  dragId: {
    type: String,
    default: 'vx-drag'
  },
  targetId: {
    type: String,
    default: 'vx-drag-target-area'
  }
})

const emit = defineEmits(['drop'])

onMounted(() => {
  const drag = document.getElementById(props.dragId)
  let start = null
  if (!drag) {
    return
  }
  drag.ondragstart = (e) => {
    start = e.target
    const target = document.getElementById(props.targetId)
    if (target) {
      target.style.pointerEvents = 'none'
    }
  }
  drag.ondragover = (e) => {
    e.preventDefault()
    // console.log(e.target)
  }
  drag.ondrop = (e) => {
    const target = document.getElementById(props.targetId)
    if (target) {
      target.style.pointerEvents = 'auto'
    }
    emit('drop', { start: start, target: e.target })
  }
})
</script>

<style scoped>
</style>
