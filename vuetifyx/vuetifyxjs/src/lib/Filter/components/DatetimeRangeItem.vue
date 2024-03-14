<script setup lang="ts">
import { ref } from 'vue'
import * as constants from '../Constants'
import Datetimepicker from '@/lib/Datetimepicker.vue'

const props = defineProps<{
  modelValue: any
  translations: any
}>()

props.modelValue.modifier = props.modelValue.modifier || constants.ModifierBetween

const datePickerVisible = ref(false)

const emit = defineEmits(['update:modelValue'])
const modifier = props.modelValue.modifier
</script>

<template>
  <div style="width: 200px">
    <datetimepicker
      v-model="modelValue.valueFrom"
      :key="modifier + 'form'"
      :visible="datePickerVisible"
      :hide-details="true"
    />
    <span>{{ translations['to'] }}</span>
    <datetimepicker v-model="modelValue.valueTo" :key="modifier + 'to'" :hide-details="true" />
  </div>
</template>

<style scoped></style>
