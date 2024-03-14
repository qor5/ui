<script setup lang="ts">
import { computed, h, ref } from 'vue'
import { encodeFilterData, filterData } from '@/lib/Filter/FilterData'
import { FilterItem } from '@/lib/Filter/Model'
import ItemFilter from '@/lib/Filter/components/Filter.vue'
import DatetimeRangeItem from '@/lib/Filter/components/DatetimeRangeItem.vue'
import DateRangeItem from '@/lib/Filter/components/DateRangeItem.vue'
import DateItem from '@/lib/Filter/components/DateItem.vue'
import NumberItem from '@/lib/Filter/components/NumberItem.vue'
import StringItem from '@/lib/Filter/components/StringItem.vue'
import LinkageSelectItem from '@/lib/Filter/components/LinkageSelectItem.vue'
import MultipleSelectItem from '@/lib/Filter/components/MultipleSelectItem.vue'

const props = defineProps({
  modelValue: { type: Array<any>, required: true },
  replaceWindowLocation: Boolean,
  translations: {
    type: Object,
    default: () => {
      return {
        date: {
          to: 'to'
        },
        number: {
          equals: 'is equal to',
          between: 'between',
          greaterThan: 'is greater than',
          lessThan: 'is less than',
          and: 'and'
        },
        string: {
          equals: 'is equal to',
          contains: 'contains'
        },
        multipleSelect: {
          in: 'in',
          notIn: 'not in'
        },
        clear: 'Clear Filters',
        add: 'Add Filters',
        apply: 'Apply'
      }
    }
  } as any
})

const t = props.translations

const itemTypes: any = {
  DatetimeRangeItem,
  DateRangeItem,
  DateItem,
  NumberItem,
  StringItem,
  LinkageSelectItem,
  MultipleSelectItem
}

const trans: any = {
  DatetimeRangeItem: t.date,
  DateRangeItem: t.date,
  DateItem: t.date,
  NumberItem: t.number,
  StringItem: t.string,
  SelectItem: {},
  MultipleSelectItem: t.multipleSelect,
  LinkageSelectItem: {}
}

const initInternalValue = (items: FilterItem[]): FilterItem[] => {
  return items
}
const getSelectedIndexes = (value: FilterItem[]): number[] => {
  return value
    .map((op: FilterItem, i: number) => {
      if (op.selected) {
        return i
      }
      return -1
    })
    .filter((i: number) => i !== -1)
}

const internalValue = ref(initInternalValue(props.modelValue))
const visible = ref(false)
const selectedIndexs = ref(getSelectedIndexes(props.modelValue))

const emit = defineEmits(['update:modelValue', 'change'])

const clickDone = () => {
  emit('update:modelValue', internalValue.value) // input event should be the same format as value
  // collect all query keys in the filter, remove them from location search first. then add it by selecting status
  // but keep original search conditions
  const filterKeys = internalValue.value.map((op: FilterItem, i: number) => {
    return op.key
  })

  const event = {
    filterKeys: filterKeys,
    filterData: filterData(internalValue.value),
    encodedFilterData: encodeFilterData(internalValue.value)
  }
  emit('change', event)
  visible.value = false
}

const clearAll = (e: any) => {
  internalValue.value.map((op: any) => {
    op.selected = false
  })
  selectedIndexs.value = getSelectedIndexes(internalValue.value)
  clickDone()
}

const clear = (e: any) => {
  selectedIndexs.value = getSelectedIndexes(internalValue.value)
  clickDone()
  e.stopPropagation()
}

const togglePopup = () => {
  visible.value = !visible.value
}

const filterCount = () => {
  let count = 0
  internalValue.value.map((op: any) => {
    if (op.selected) {
      count++
    }
  })
  if (count === 0) {
    return
  }
  return h('v-chip', { size: 'small' }, count)
}

const onPanelExpand = (value: any) => {
  selectedIndexs.value = value
  for (const fi of internalValue.value) {
    fi.selected = false
  }
  for (const i of selectedIndexs.value) {
    internalValue.value[i].selected = true
  }
}

const filtersGetFunc = (f: (item: FilterItem) => boolean, isFoldedItem: boolean) => {
  return (itemTypes: any, trans: any) => {
    return internalValue.value
      .filter((op: FilterItem) => {
        if (!f(op)) {
          return false
        }
        // throw new Error(`itemType '${op.itemType}' not supported`)
        return itemTypes[op.itemType]
      })
      .map((op: FilterItem, i: number) => {
        return {
          itemComp: itemTypes[op.itemType],
          op: op,
          internalValue: internalValue,
          isFoldedItem: isFoldedItem,
          translations: props.translations,
          compTranslations: trans[op.itemType],
          index: i
        }
      })
  }
}

const fixedFilters = computed(() => {
  return filtersGetFunc((item) => !item.folded, false)(itemTypes, trans)
})

const otherSelectedFilters = computed(() => {
  return filtersGetFunc((item) => item.folded && !!item.selected, false)(itemTypes, trans)
})
const foldedFilters = computed(() => {
  return filtersGetFunc((item) => item.folded && !item.selected, true)(itemTypes, trans)
})
</script>

<template>
  <div class="d-flex flex-grow-1">
    <div>
      <item-filter
        v-for="item in fixedFilters"
        v-model="item.op"
        v-bind="item"
        @change="clickDone"
        @clear="clear"
      ></item-filter>
      <item-filter
        v-for="item in otherSelectedFilters"
        v-model="item.op"
        v-bind="item"
        @change="clickDone"
        @clear="clear"
      ></item-filter>
    </div>
    <v-spacer />
    <v-btn
      @click="clearAll"
      variant="plain"
      size="small"
      :disabled="internalValue.findIndex((item) => item.selected) < 0"
      class="my-1"
    >
      <v-icon size="small" icon="mdi-close"></v-icon>
      {{ t.clear }}
    </v-btn>
    <v-menu v-if="foldedFilters.length > 0" :close-on-content-click="false" class="rounded-lg">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" variant="plain" size="small" color="primary" class="my-1">
          <v-icon size="small" icon="mdi-filter"></v-icon>
          {{ t.add }}
        </v-btn>
      </template>
      <v-list variant="flat" class="white pa-0">
        <item-filter
          v-for="item in foldedFilters"
          v-model="item.op"
          v-bind="item"
          @change="clickDone"
          @clear="clear"
        ></item-filter>
        <!--        <item-filter v-for="item in foldedFilters " v-bind="item"></item-filter>-->
      </v-list>
    </v-menu>
  </div>
</template>

<style scoped></style>
