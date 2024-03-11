<template>
  <v-dialog :width="dialogWidth">
    <template v-slot:activator="{ props: activatorProps }">
      <v-text-field
        v-bind="activatorProps"
        :disabled="disabled"
        :loading="loading"
        :label="label"
        v-model="formattedDatetime"
        :hide-details="hideDetails"
        prepend-icon="mdi-calendar-edit"
        readonly
      >
        <v-progress-linear color="primary" indeterminate absolute height="2"></v-progress-linear>
      </v-text-field>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card>
        <v-card-text class="px-0 py-0">
          <v-container>
            <v-row>
              <v-col cols="6" class="pa-0">
                <v-date-picker v-model="date" full-width no-title></v-date-picker>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey lighten-1" variant="text" @click.native="clearHandler(isActive)"
            >{{ clearText }}
          </v-btn>
          <v-btn color="green darken-1" variant="text" @click="okHandler(isActive)"
            >{{ okText }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script lang="ts">
export default { name: 'vx-datepicker' }
</script>
<script lang="ts" setup>
import { format, parse } from 'date-fns'

import { computed, onMounted, Ref, ref } from 'vue'

const DEFAULT_DATE = ''
const DEFAULT_TIME = '00:00:00'
const DEFAULT_DATE_FORMAT = 'yyyy-MM-dd'
const DEFAULT_TIME_FORMAT = 'HH:mm:ss'
const DEFAULT_DIALOG_WIDTH = 580
const DEFAULT_CLEAR_TEXT = 'CLEAR'
const DEFAULT_OK_TEXT = 'OK'

const props = defineProps({
  modelValue: {
    type: String,
    default: null
  },
  disabled: {
    type: Boolean
  },
  loading: {
    type: Boolean
  },
  label: {
    type: String,
    default: ''
  },
  dialogWidth: {
    type: Number,
    default: 580
  },
  dateFormat: {
    type: String,
    default: 'yyyy-MM-dd'
  },
  clearText: {
    type: String,
    default: 'CLEAR'
  },
  okText: {
    type: String,
    default: 'OK'
  },
  textFieldProps: {
    type: Object
  },
  datePickerProps: {
    type: Object
  },
  hideDetails: {
    type: Boolean
  }
})
const display = ref(false)
const date = ref()

const dateTimeFormat = computed(() => {
  return props.dateFormat
})
const formattedDatetime = computed(() => {
  return date.value ? format(<Date>date.value, dateTimeFormat.value) : ''
})
const dateSelected = () => {
  return !date.value
}
const init = () => {
  if (!props.modelValue) {
    return
  }
  // see https://stackoverflow.com/a/9436948
  date.value = parse(props.modelValue, dateTimeFormat.value, new Date())
}

const emit = defineEmits(['update:modelValue'])

const okHandler = (isActive: Ref) => {
  isActive.value = false
  if (!date.value) {
    date.value = new Date()
  }
  emit('update:modelValue', formattedDatetime.value)
}
const clearHandler = (isActive: Ref) => {
  isActive.value = false
  date.value = null
  emit('update:modelValue', null)
}

const resetPicker = () => {
  display.value = false
}
onMounted(() => {
  init()
})
</script>
