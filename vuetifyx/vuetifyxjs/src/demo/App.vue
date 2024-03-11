<template>
  <v-app>
    <v-main>
      <h1>select-many-example</h1>
      <select-many-example></select-many-example>
      <v-divider></v-divider>
      <h1>datepicker-example</h1>
      <datepicker-example></datepicker-example>
      <v-divider></v-divider>
      <h1>linkage-select-example</h1>
      <linkage-select-example></linkage-select-example>

    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import SelectManyExample from '@/demo/components/SelectManyExample.vue'
import DatepickerExample from '@/demo/components/DatepickerExample.vue'
import LinkageSelectExample from '@/demo/components/LinkageSelectExample.vue'
</script>
