<script setup lang="ts">
import { inject, onBeforeMount, reactive, ref, Ref, onMounted, watch, computed } from 'vue'
import draggable from 'vuedraggable'

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: { type: Array<any>, required: true },
  remoteUrl: String,
  eventName: String,
  isPaging: Boolean,
  hasIcon: Boolean,
  cacheItems: Boolean,
  hideSelected: Boolean,
  hideDetails: Boolean,
  clearable: Boolean,
  chips: Boolean,
  sorting: Boolean,
  chipColor: String,
  chipTextColor: String,
  items: Array<{ icon: string; text: string; value: string }>,
  loadData: Function,
  remote: {
    type: Object,
    default: {
      total: 0,
      current: 0,
      pages: 0,
      page: 0,
      disabled: false
    }
  }
})
const listItems: Ref<Array<{ icon: string; text: string; value: string }>> = ref([])
const value = ref()
const cachedSelectedItems: Ref<Array<{ icon: string; text: string; value: string }>> = ref([])
const isLoading = ref(false)
const searchKeyword = ref('')

const autocompleteData = ref({
  ...props
})

// const plaid: any = inject('plaid')
const loadRemoteItems = () => {
  // if (!props.remoteUrl || !props.eventName) {
  //   return
  // }
  if (!props.loadData) {
    return
  }

  isLoading.value = true
  props
    .loadData()
    .then((r: any) => {
      if (props.isPaging) {
        // listItems.value = cachedSelectedItems.value.concat(r.data.items || [])
        listItems.value = r.data.items
      } else {
        props.remote.disabled = props.remote.current >= props.remote.total
        // listItems.value = [].concat(listItems.value, r.data.items || [])
        listItems.value = listItems.value.concat(r.data.items || [])
      }
    })
    .finally(() => {
      isLoading.value = false
    })
}
//   plaid()
//     .url(props.remoteUrl)
//     .eventFunc(props.eventName)
//     .query('keyword', searchKeyword.value)
//     .query('page', remote.page)
//     .go()
//     .then((r: any) => {
//       remote.current = r.data.current
//       remote.total = r.data.total
//       remote.pages = r.data.pages
//       if (props.isPaging) {
//         listItems.value = [].concat(cachedSelectedItems.value || [], r.data.items || [])
//       } else {
//         remote.disabled = remote.current >= remote.total
//         // listItems.value = [].concat(listItems.value, r.data.items || [])
//         listItems.value = listItems.value.concat(r.data.items || [])
//       }
//     })
//     .finally(() => {
//       isLoading.value = false
//     })
// }

const endIntersect = (entrie: any, observer: any, isIntersecting: any) => {
  if (isIntersecting && !props.remote.disabled) {
    props.remote.page += 1
    loadRemoteItems()
  }
}

const changeStatus = (e: any) => {
  if (cachedSelectedItems.value.find((element) => element.value == e.value)) {
    return
  }
  cachedSelectedItems.value.push(e)

  // let cachedSelectedItems: any[] = []
  // value.value.forEach((val: any) => {
  //   listItems.value.forEach((item: any) => {
  //     if (val == item.value) {
  //       cachedSelectedItems.push(item)
  //       return
  //     }
  //   })
  // })
  // // remove duplicate items
  // const uniqueCachedSelectedItems = cachedSelectedItems.filter((obj, index, self) => {
  //   return index === self.findIndex((o) => o.value === obj.value)
  // })
  // cachedSelectedItems = uniqueCachedSelectedItems as []
  emit('update:modelValue', cachedSelectedItems.value)
}

const removeItem = (v: any) => {
  value.value = ''
  cachedSelectedItems.value = cachedSelectedItems.value.filter(
    (element) => element.value != v.value
  )
  emit('update:modelValue', cachedSelectedItems.value)
}

const changeOrder = (vs: any) => {
  cachedSelectedItems.value = vs
  const vals = cachedSelectedItems.value.map((item: any) => item.value)
  value.value = vals as any
  emit('update:modelValue', value.value)
}
onBeforeMount(() => {
  // listItems.value = props.items || []
  // if (props.remoteUrl) {
  //   cachedSelectedItems.value = value.value
  //   listItems.value = value.value
  //   value.value = value.value.map((x) => x.value)
  // }
})
onMounted(() => {
  // plaid().fieldValue(fieldName, value.value)
  cachedSelectedItems.value = props.modelValue
  loadRemoteItems()
})

watch(searchKeyword, (val, oldValue) => {
  if (!props.remoteUrl || !props.eventName) {
    return
  }
  if (val == oldValue || !val) {
    return
  }
  if (val == value.value.text) {
    return
  }
  props.remote.page = 1
  if (!props.isPaging) {
    // listItems.value = cachedSelectedItems.value
  }
  loadRemoteItems()
})
const chipsVisible = computed(() => {
  return props.chips && (props.hasIcon || props.remoteUrl) && !props.sorting
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
                <v-btn @click="removeItem(element)" variant="text" icon="mdi-delete"></v-btn>
              </template>
            </v-list-item>
            <v-list-item v-else :title="element.text" animation="300">
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
      item-value="value"
      item-title="text"
      return-object
      :clearable="sorting ? false : clearable"
      :hide-details="hideDetails"
      :class="sorting ? 'v-autocomplete-sorting' : ''"
      @update:modelValue="changeStatus"
      variant="underlined"
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
      <template v-slot:append-item="">
        <div class="text-center">
          <v-pagination
            v-if="remoteUrl"
            v-model="remote.page"
            rounded="circle"
            :length="remote.pages"
            total-visible="5"
            @update:modelValue="loadRemoteItems()"
          ></v-pagination>
          <div v-else>
            <v-btn
              class="ma-2"
              color="primary"
              :disabled="remote.disabled"
              :loading="isLoading"
              v-intersect="endIntersect"
              @click="
                () => {
                  remote.page += 1
                  loadRemoteItems()
                }
              "
              >Load more
            </v-btn>
            <v-divider vertical></v-divider>
            <span> {{ props.remote.current }}/{{ props.remote.total }} </span>
          </div>
        </div>
      </template>
    </v-autocomplete>
  </div>
</template>

<style scoped></style>
