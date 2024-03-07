<template>
  <v-app>
    <v-main>
      <v-select
        label="Select"
        v-model="componentName"
        :items="componentItems"
        @update:model-value="changeComponentName"
      ></v-select>
<!--      <component :is="component"></component>-->
      <vx-datepicker></vx-datepicker>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import VxDatepicker from "@/lib/VxDatepicker.vue";
import {ref,} from "vue";

const componentName = ref()
const componentList = ref([
  VxDatepicker
])
const componentItems = componentList.value.map(x => x.name)
const changeComponentName = () => {
  // componentName.value = componentList.value.filter(x=>{return x.name === })
}

</script>
