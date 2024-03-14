<script setup lang="ts">
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  rounded: { type: String, default: 'circle' },
  length: { type: Number },
  modelValue: { type: Number },
  totalVisible: { type: Number, default: 5 }
})
</script>
<template slot="append-item">
  <div class="text-center">
    <v-pagination v-bind="props" v-model="props.modelValue"></v-pagination>
  </div>
</template>

<style scoped></style>
