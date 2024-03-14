<template>
  <v-app>
    <v-main>
      <v-container>
        <h1 class="text-h2 mb-4">select-many-example</h1>
        <select-many-example></select-many-example>
        <v-divider class="mb-6"></v-divider>
        <h1 class="text-h2 mb-4">datepicker-example</h1>
        <datepicker-example></datepicker-example>
        <v-divider class="mb-6"></v-divider>
        <h1 class="text-h2 mb-4">datetimepicker-example</h1>
        <datetimepicker-example></datetimepicker-example>
        <v-divider class="mb-6"></v-divider>
        <h1 class="text-h2 mb-4">linkage-select-example</h1>
        <linkage-select-example></linkage-select-example>
        <v-divider class="mb-6"></v-divider>
        <h1 class="text-h2 mb-4">filter-example</h1>
        <filter-example></filter-example>
        <v-divider class="mb-6"></v-divider>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import SelectManyExample from '@/demo/components/SelectManyExample.vue'
import DatepickerExample from '@/demo/components/DatepickerExample.vue'
import LinkageSelectExample from '@/demo/components/LinkageSelectExample.vue'
import DatetimepickerExample from '@/demo/components/DatetimepickerExample.vue'
import FilterExample from '@/demo/components/FilterExample.vue'
</script>
