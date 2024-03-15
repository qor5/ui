<script setup lang="ts">
import VxAutocomplete from '@/lib/Autocomplete.vue'
import { onMounted, reactive, ref } from 'vue'

const remote = reactive({
  total: 20,
  current: 0,
  pages: 4,
  page: 1,
  disabled: false
})

const getItems = () => {
  const items = []
  for (let i = 1; i <= 5; i++) {
    items.push({
      icon: `https://cdn.vuetifyjs.com/images/lists/${i}.jpg`,
      text: `test_${remote.page}_${i}`,
      value: (remote.current + i).toFixed()
    })
  }
  return items
}
const loadData = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    resolve({
      data: {
        pages: remote.pages,
        total: remote.pages,
        current: remote.current,
        items: getItems()
      }
    })
  })
}
const items = ref([])
const value = ref([])
</script>
<template>
  <p>{{ value }}</p>
  <vx-autocomplete
    :load-data="loadData"
    sorting
    :items="items"
    has-icon
    :remote="remote"
    v-model="value"
    remote-url="test"
    eventName="test"
    :isPaging="true"
  ></vx-autocomplete>
  <!--  <vx-autocomplete :load-data="loadData" sorting :items="items" has-icon :remote="remote"-->
  <!--                   v-model="value"-->

  <!--  ></vx-autocomplete>-->
</template>

<style scoped></style>
