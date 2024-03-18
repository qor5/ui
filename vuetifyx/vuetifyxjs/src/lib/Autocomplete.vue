<script setup lang="ts">
import { inject, onBeforeMount, reactive, ref, Ref, onMounted, watch, computed } from 'vue'
import draggable from 'vuedraggable'

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: { type: Array<any>, required: true },
  isPaging: Boolean,
  hasIcon: Boolean,
  cacheItems: Boolean,
  hideSelected: Boolean,
  hideDetails: Boolean,
  clearable: Boolean,
  chips: Boolean,
  sorting: Boolean,
  itemTextKey: { type: String, default: 'text' },
  itemValueKey: { type: String, default: 'value' },
  itemIconKey: { type: String, default: 'icon' },
  pageKey: {
    type: String,
    default: 'page'
  },
  pagesKey: {
    type: String,
    default: 'pages'
  },
  pageSizeKey: {
    type: String,
    default: 'pageSize'
  },
  totalKey: {
    type: String,
    default: 'total'
  },
  itemsKey: {
    type: String,
    default: 'items'
  },
  currentKey: {
    type: String,
    default: 'current'
  },
  searchKey: {
    type: String,
    default: 'search'
  },
  chipColor: String,
  chipTextColor: String,
  items: Array<any>,
  loadData: Function,
  remote: {
    type: Object,
    default: {
      page: 0,
      pageSize: 0
    }
  }
})
const listItems: Ref<Array<any>> = ref([])
const value = ref()
const cachedSelectedItems: Ref<Array<any>> = ref([])
const isLoading = ref(false)
const disabled = ref(false)
const total = ref(0)
const pages = ref(0)
const current = ref(0)

// key like `$.data.total` if just `total` this function will be  change key to `data.total`
// and return object multilevel value
const getObjMultiValue = (d: Object, key: string) => {
  const keys = key.split('.')
  if (keys.length === 0) {
    return d
  }
  if (keys[0] === '$') {
    keys.shift()
  } else {
    keys.unshift('data')
  }
  return getObjectValue(d, keys)
}
const getObjectValue = (d: any, keys: Array<string>): any => {
  if (typeof d !== 'object' || keys.length == 0) {
    return d
  }
  const newKey = keys[0]
  keys.shift()
  return getObjectValue(d[newKey], keys)
}
const loadRemoteItems = () => {
  if (!props.loadData) {
    return
  }

  isLoading.value = true
  props
    .loadData()
    .then((r: any) => {
      total.value = getObjMultiValue(r, props.totalKey)
      pages.value = getObjMultiValue(r, props.pagesKey)
      current.value = getObjMultiValue(r, props.currentKey)
      if (props.isPaging) {
        listItems.value = getObjMultiValue(r, props.itemsKey)
      } else {
        disabled.value = current.value >= total.value
        listItems.value = listItems.value.concat(r.data.items || [])
      }
    })
    .finally(() => {
      isLoading.value = false
    })
}

const endIntersect = (isIntersecting: boolean) => {
  if (isIntersecting && !disabled.value) {
    props.remote[props.pageKey] += 1
    loadRemoteItems()
  }
}

const changeStatus = (e: any) => {
  if (
    cachedSelectedItems.value.find(
      (element) => element[props.itemValueKey] == e[props.itemValueKey]
    )
  ) {
    return
  }
  cachedSelectedItems.value.push(e)
  emit('update:modelValue', cachedSelectedItems.value)
}

const removeItem = (v: any) => {
  value.value = ''
  cachedSelectedItems.value = cachedSelectedItems.value.filter(
    (element) => element[props.itemValueKey] != v[props.itemValueKey]
  )
  emit('update:modelValue', cachedSelectedItems.value)
}
onMounted(() => {
  cachedSelectedItems.value = props.modelValue
  loadRemoteItems()
})

watch(props.remote[props.searchKey], (val, oldValue) => {
  if (!props.loadData) {
    return
  }
  if (val == oldValue || !val) {
    return
  }
  if (val == value.value[props.itemTextKey]) {
    return
  }
  props.remote[props.pageKey] = 1
  loadRemoteItems()
})
const chipsVisible = computed(() => {
  return props.chips && props.hasIcon && !props.sorting
})
</script>

<template>
  <div>
    <v-card v-if="sorting && cachedSelectedItems.length > 0">
      <v-list>
        <draggable animation="300" handle=".handle" v-model="cachedSelectedItems">
          <template #item="{ element }">
            <v-list-item
              v-if="hasIcon"
              :prepend-avatar="element[itemIconKey]"
              :title="element[itemTextKey]"
              animation="300"
            >
              <template v-slot:append>
                <v-icon icon="mdi-drag" class="handle mx-2 cursor-grab"></v-icon>
                <v-btn @click="removeItem(element)" variant="text" icon="mdi-delete"></v-btn>
              </template>
            </v-list-item>
            <v-list-item v-else :title="element[itemTextKey]" animation="300">
              <template v-slot:append>
                <v-icon icon="mdi-drag" class="handle mx-2 cursor-grab"></v-icon>
                <v-btn @click="removeItem(element)" variant="text" icon="mdi-delete"></v-btn>
              </template>
            </v-list-item>
          </template>
        </draggable>
      </v-list>
    </v-card>
    <v-autocomplete
      v-model="value"
      :items="listItems"
      :loading="isLoading"
      :item-value="itemValueKey"
      :item-title="itemTextKey"
      return-object
      :clearable="sorting ? false : clearable"
      :hide-details="hideDetails"
      :class="sorting ? 'v-autocomplete-sorting' : ''"
      @update:modelValue="changeStatus"
      variant="underlined"
      @update:search="
        (val) => {
          remote[searchKey] = val
        }
      "
    >
      <template v-slot:item="{ item, props }" v-if="hasIcon">
        <v-list-item
          v-bind="props"
          :prepend-avatar="item.raw[itemIconKey]"
          :title="item.raw[itemTextKey]"
        ></v-list-item>
      </template>
      <template v-slot:chip="{ props, item }" v-if="chipsVisible">
        <v-chip
          v-bind="props"
          :prepend-avatar="hasIcon ? item.raw[itemIconKey] : undefined"
          :text="item.raw[itemTextKey]"
        ></v-chip>
      </template>
      <template v-slot:append-item="">
        <div class="text-center">
          <v-pagination
            v-if="props.isPaging"
            v-model="remote[pageKey]"
            rounded="circle"
            :length="pages"
            total-visible="5"
            @update:modelValue="loadRemoteItems()"
          ></v-pagination>
          <div v-else>
            <v-btn
              class="ma-2"
              color="primary"
              :disabled="disabled"
              :loading="isLoading"
              v-intersect="endIntersect"
              @click="
                () => {
                  remote[pageKey] += 1
                  loadRemoteItems()
                }
              "
              >Load more
            </v-btn>
            <v-divider vertical></v-divider>
            <span> {{ current }}/{{ total }} </span>
          </div>
        </div>
      </template>
    </v-autocomplete>
  </div>
</template>

<style scoped></style>
