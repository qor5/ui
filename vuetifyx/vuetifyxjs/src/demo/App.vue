<template>
  <v-app>
    <v-main>
      <v-select
          label="Select"
          :items="componentItems"
          @update:model-value="changeComponentName"
      ></v-select>
      <component :is="componentName"></component>
      <!--      <vx-datepicker></vx-datepicker>-->
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import {ref,} from "vue";
import VxDatepicker from "@/lib/VxDatepicker.vue";
import HelloWorld from "@/demo/components/HelloWorld.vue";

const componentName = ref()
const componentList = ref([
  VxDatepicker,
  HelloWorld
])
const componentItems = componentList.value.map(x => x.name)
const changeComponentName = (e: string) => {
  componentName.value = componentList.value.filter(x => {
    return x.name === e
  })[0]
}

</script>
