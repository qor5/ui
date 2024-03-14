<script setup lang="ts">
import {
  inject,
  onBeforeMount,
  reactive,
  ref,
  useAttrs,
  Ref,
  onMounted,
  watch,
  computed
} from 'vue'
import { Core } from '@/lib/Helpers'
import draggable from 'vuedraggable'
import LoadmoreNode from '@/lib/Autocomplete/components/LoadmoreNode.vue'
import VxPagination from '@/lib/Autocomplete/components/VxPagination.vue'

const emit = defineEmits(['update:modelValue'])
const { fieldName, loadPageWithArrayOp } = Core.props
const attrs = useAttrs()
const props = defineProps<{
  modelValue: Array<any>
  remoteUrl: String
  eventName: String
  isPaging: Boolean
  hasIcon: Boolean
  cacheItems: Boolean
  hideSelected: Boolean
  hideDetails: Boolean
  sorting: Boolean
  chipColor: String
  chipTextColor: String
  items: Array<{ icon: string; text: string }>
  loadData: () => Promise<any>
}>()
const listItems: Ref<Array<{ icon: string; text: string }>> = ref([])
const value = ref([])
const cachedSelectedItems = ref([])
const isLoading = ref(false)
const searchKeyword = ref('')
const remote = reactive({
  total: 0,
  current: 0,
  pages: 0,
  page: 0,
  disabled: false
})

const autocompleteData = ref({
  ...attrs,
  ...props
})

const plaid: any = inject('plaid')
const loadRemoteItems = () => {
  if (!props.remoteUrl || !props.eventName) {
    return
  }

  isLoading.value = true
  // props.loadData().then((res: any) => {
  //
  // })
  plaid()
    .url(props.remoteUrl)
    .eventFunc(props.eventName)
    .query('keyword', searchKeyword.value)
    .query('page', remote.page)
    .go()
    .then((r: any) => {
      remote.current = r.data.current
      remote.total = r.data.total
      remote.pages = r.data.pages
      if (props.isPaging) {
        listItems.value = [].concat(cachedSelectedItems.value || [], r.data.items || [])
      } else {
        remote.disabled = remote.current >= remote.total
        // listItems.value = [].concat(listItems.value, r.data.items || [])
        listItems.value = listItems.value.concat(r.data.items || [])
      }
    })
    .finally(() => {
      isLoading.value = false
    })
}

const endIntersect = (entrie: any, observer: any, isIntersecting: any) => {
  if (isIntersecting && !remote.disabled) {
    remote.page += 1
    loadRemoteItems()
  }
}

const changeStatus = (vals: any) => {
  if (!props.remoteUrl || !props.eventName) {
    value.value = vals
    emit('update:modelValue', value.value)
    return
  }

  let cachedSelectedItems: any[] = []
  vals.forEach((val: any) => {
    listItems.value.forEach((item: any) => {
      if (val == item.value) {
        cachedSelectedItems.push(item)
        return
      }
    })
  })
  // remove duplicate items
  const uniqueCachedSelectedItems = cachedSelectedItems.filter((obj, index, self) => {
    return index === self.findIndex((o) => o.value === obj.value)
  })
  cachedSelectedItems = uniqueCachedSelectedItems as []
  value.value = vals
  emit('update:modelValue', value.value)
}

const removeItem = (v: any) => {
  return () => {
    value.value = value.value.filter((element) => element != v)
    changeStatus(value.value)
  }
}

const changeOrder = (vs: any) => {
  cachedSelectedItems.value = vs
  const vals = cachedSelectedItems.value.map((item: any) => item.value)
  value.value = vals as any
  emit('update:modelValue', value.value)
}
onBeforeMount(() => {
  listItems.value = props.items || []
  value.value = (attrs.value as any) || []
  if (props.remoteUrl) {
    cachedSelectedItems.value = value.value
    listItems.value = value.value

    const vals: any[] = []
    value.value.forEach((val: any) => {
      vals.push(val.value)
    })
    value.value = vals as any
    attrs.value = vals as any
  }
})
onMounted(() => {
  plaid().fieldValue(fieldName, value.value)
})

watch(searchKeyword, (val, oldValue) => {
  if (!props.remoteUrl || !props.eventName) {
    return
  }

  if (val === null) {
    searchKeyword.value = ''
    return
  }

  remote.page = 1
  if (!props.isPaging) {
    listItems.value = cachedSelectedItems.value
  }
  loadRemoteItems()
})
const chipsVisible = computed(() => {
  return attrs.chips && (props.hasIcon || props.remoteUrl) && !props.sorting
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
              :prepend-avatar="element.icon"
              :title="element.text"
              animation="300"
            >
              <template v-slot:append>
                <v-icon icon="mdi-drag" class="handle mx-2 cursor-grab"></v-icon>
                <v-btn @click="removeItem(element.value)" variant="text" icon="mdi-delete"> </v-btn>
              </template>
            </v-list-item>
            <v-list-item v-else :title="element.text" animation="300">
              <template v-slot:append>
                <v-icon icon="mdi-drag" class="handle mx-2 cursor-grab"></v-icon>
                <v-btn @click="removeItem(element.value)" variant="text" icon="mdi-delete"></v-btn>
              </template>
            </v-list-item>
          </template>
        </draggable>
      </v-list>
    </v-card>
    <v-autocomplete
      v-bind="autocompleteData"
      v-model="props.modelValue"
      :items="listItems"
      :loading="isLoading"
      :clearable="sorting ? false : !!attrs.clearable"
      :hide-selected="!!hideSelected"
      :hide-details="!!hideDetails"
      :class="sorting ? 'v-autocomplete-sorting' : ''"
      @change="changeStatus"
      @focus="
        () => {
          searchKeyword = ''
        }
      "
      @update:search="
        (val) => {
          searchKeyword = val
        }
      "
    >
      <template v-slot:item="{ item, props }" v-if="hasIcon">
        <v-list-item
          v-bind="props"
          :prepend-avatar="item.raw.icon"
          :title="item.raw.text"
        ></v-list-item>
      </template>
      <template v-slot:chip="{ props, item }" v-if="chipsVisible">
        <v-chip
          v-bind="props"
          :prepend-avatar="hasIcon ? item.raw.icon : undefined"
          :text="item.raw.text"
        ></v-chip>
      </template>
      <vx-pagination
        v-if="remoteUrl"
        :length="remote.pages"
        v-model="remote.page"
        @update:modelValue="loadRemoteItems"
      ></vx-pagination>
      <loadmore-node
        v-else
        @intersect="loadRemoteItems"
        @click="
          () => {
            remote.page += 1
            loadRemoteItems()
          }
        "
      ></loadmore-node>
    </v-autocomplete>
  </div>
</template>

<style scoped></style>
