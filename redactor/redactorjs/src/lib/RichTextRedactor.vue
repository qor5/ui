<script setup>
/*
    Redactor Vue Component
    Version 1.2
    Updated: June 9, 2021

    http://imperavi.com/redactor/

    Copyright 2021, Imperavi Ltd.
    License: MIT
*/
import {onMounted, onUnmounted, ref, watch} from "vue";
import "./redactor.min.css"
import "./redactor.min.js"

const Redactor = window.Redactor

const redactor = ref(false)
const emit = defineEmits(["update:modelValue"])
const props = defineProps({
  modelValue: {
    default: '',
    type: String
  },
  placeholder: {
    type: String,
    default: null
  },
  name: {
    type: String,
    default: null
  },
  config: {
    default: {
      callbacks: {}
    },
    type: Object
  }
})
onMounted(() => {
  props.config.callbacks = {
    changed: function (html) {
      emit("update:modelValue", html)
      return html
    }
  }
  redactor.value = Redactor(redactor.value, props.config);
})
onUnmounted(() => {
  // Call destroy on redactor to cleanup event handlers
  Redactor(redactor.value, 'destroy');

  // unset instance for garbage collection
  redactor.value = null;
  // this.$parent.redactor = null;
})


watch(props.modelValue, (newValue, oldValue) => {
  if (redactor.value?.editor.isFocus() || redactor.value?.editor.isSourceMode()) {
    return;
  }
  redactor.value?.source.setCode(newValue);
})

</script>


<template>
  <textarea ref="redactor" :name="name" :placeholder="placeholder" :value="modelValue"/>
</template>

