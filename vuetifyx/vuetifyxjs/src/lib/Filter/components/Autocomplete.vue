<script setup lang="ts">
import { reactive, ref } from 'vue'

const props = defineProps({
  remoteUrl: String,
  eventName: String,
  isPaging: Boolean,
  hasIcon: Boolean,
  cacheItems: Boolean,
  hideSelected: Boolean,
  hideDetails: Boolean,
  sorting: Boolean,
  chipColor: String,
  chipTextColor: String,
  items: {
    type: Array,
    default: () => []
  }
})
const listItems = ref([])
const cachedSelectedItems = ref([])
const value = ref([])
const isLoading = ref(false)
const searchKeyword = ref('')
const remote = reactive({
  total: 0,
  current: 0,
  pages: 0,
  page: 0,
  disabled: false
})
</script>

<template></template>

<style scoped></style>
