<script setup lang="ts">
import VxFilter from '@/lib/Filter/index.vue'
import { ref } from 'vue'

const value = ref([
  {
    key: 'TestDatetimeRange',
    label: 'TestDatetimeRange',
    itemType: 'DatetimeRangeItem',
    modifier: 'between',
    selected: false,
    folded: false,
    valueFrom: '',
    valueTo: ''
  },
  {
    key: 'TestDateRange',
    label: 'TestDateRange',
    itemType: 'DateRangeItem',
    modifier: 'between',
    selected: false,
    folded: false,
    valueFrom: '',
    valueTo: ''
  },
  {
    key: 'TestDate',
    label: 'TestDate',
    itemType: 'DateItem',
    selected: false,
    folded: false,
    valueIs: ''
  },
  {
    key: 'TestNumber',
    label: 'TestNumber',
    itemType: 'NumberItem',
    selected: false,
    folded: false,
    valueIs: ''
  },
  {
    key: 'TestStringItem',
    label: 'TestStringItem',
    itemType: 'StringItem',
    selected: false,
    folded: false,
    valueIs: ''
  },
  {
    key: 'TestLinkageSelectItem',
    label: 'TestLinkageSelectItem',
    itemType: 'LinkageSelectItem',
    selected: false,
    folded: false,
    valuesAre: [],
    linkageSelectData: {
      items: [
        [
          {
            ID: '1',
            Name: '浙江',
            ChildrenIDs: ['1', '2']
          },
          {
            ID: '2',
            Name: '江苏',
            ChildrenIDs: ['3', '4']
          }
        ],
        [
          { ID: '1', Name: '杭州', ChildrenIDs: ['1', '2'] },
          { ID: '2', Name: '宁波', ChildrenIDs: ['3', '4'] },
          { ID: '3', Name: '南京', ChildrenIDs: ['5', '6'] },
          { ID: '4', Name: '苏州', ChildrenIDs: ['7', '8'] }
        ],
        [
          { ID: '1', Name: '拱墅区' },
          { ID: '2', Name: '西湖区' },
          { ID: '3', Name: '镇海区' },
          { ID: '4', Name: '鄞州区' },
          { ID: '5', Name: '鼓楼区' },
          { ID: '6', Name: '玄武区' },
          { ID: '7', Name: '常熟区' },
          { ID: '8', Name: '吴江区' }
        ]
      ],
      labels: ['Province', 'City', 'District'],
      selectOutOfOrder: false
    }
  },
  {
    key: 'TestMultipleSelectItem',
    label: 'TestMultipleSelectItem',
    itemType: 'MultipleSelectItem',
    selected: false,
    folded: false,
    valuesAre: [],
    options: [
      {
        text: 'John',
        value: 'John'
      },
      {
        text: 'Jacob',
        value: 'Jacob'
      }
    ]
  }
])
const changeValue = ref()

const change = (e: any) => {
  changeValue.value = e
}
</script>

<template>
  <p>{{ value }}</p>
  <v-divider />
  <p>{{ changeValue }}</p>
  <v-divider />
  <vx-filter v-model="value" @change="change" />
</template>

<style scoped></style>
