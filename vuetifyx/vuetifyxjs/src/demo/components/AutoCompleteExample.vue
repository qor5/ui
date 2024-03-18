<script setup lang="ts">
import VxAutocomplete from '@/lib/Autocomplete.vue'
import { onMounted, reactive, ref } from 'vue'

const remote = reactive({
  pageSize: 5,
  page: 1,
  search: ''
})

const getItems = () => {
  const items = []
  for (let i = 1; i <= remote.pageSize; i++) {
    items.push({
      icon: `https://cdn.vuetifyjs.com/images/lists/${i}.jpg`,
      text: `test_${remote.page}_${i}`,
      value: (remote.pageSize * (remote.page - 1) + i).toFixed()
    })
  }
  return items
}
const loadData = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    resolve({
      data: {
        pages: 4,
        total: 20,
        current: remote.page * remote.pageSize,
        items: getItems()
      }
    })
  })
}
const items = ref([])
const value = ref(getItems())
</script>
<template>
  <p>{{ value }}</p>
  <vx-autocomplete
    sorting
    v-model="value"
    :items="items"
    :load-data="loadData"
    has-icon
    :remote="remote"
  ></vx-autocomplete>
  <!--    <vx-autocomplete :load-data="loadData" sorting :items="items" has-icon :remote="remote"-->
  <!--                     v-model="value"-->

  <!--    ></vx-autocomplete>-->
</template>

<style scoped></style>
