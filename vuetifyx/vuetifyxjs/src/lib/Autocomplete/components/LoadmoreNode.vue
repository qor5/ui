<script setup lang="ts">
const props = defineProps({
  class: { type: String, default: 'ma-2' },
  color: { type: String, default: 'primary' },
  disabled: { type: Boolean },
  loading: { type: Boolean },
  current: { type: Number },
  total: { type: Number }
})
const emit = defineEmits(['intersect', 'click'])

const intersect = () => {
  emit('intersect', null)
}
const click = () => {
  emit('click', null)
}
</script>

<template slot="append-item">
  <div class="text-center">
    <v-btn
      :class="props.class"
      :color="props.color"
      :disabled="props.disabled"
      :loading="props.loading"
      v-intersect="intersect"
      @click="click"
      >Load more
    </v-btn>
    <v-divider vertical></v-divider>
    ' '
    <span> {{ props.current }}/{{ props.total }} </span>
  </div>
</template>

<style scoped></style>
