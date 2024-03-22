<template>
  <div>
    <v-row v-if="row">
      <v-col v-for="(v, i) in linkageSelectItems" :key="i">
        <v-autocomplete
          :label="labels[i]"
          :items="levelItems(i)"
          item-title="Name"
          item-value="ID"
          v-model="selectedIDs[i]"
          @update:modelValue="selectItem($event, i)"
          :clearable="!chips"
          :error-messages="errorMessages?.[i]"
          :chips="chips"
          :disabled="disabled"
          :hide-details="hideDetails"
          variant="underlined"
        >
        </v-autocomplete>
      </v-col>
    </v-row>
    <v-autocomplete
      v-else
      v-for="(v, i) in linkageSelectItems"
      :label="labels[i]"
      :items="levelItems(i)"
      item-title="Name"
      item-value="ID"
      v-model="selectedIDs[i]"
      variant="underlined"
      @update:modelValue="selectItem($event, i)"
      :clearable="!chips"
      :error-messages="errorMessages?.[i]"
      :chips="chips"
      :disabled="disabled"
      :hide-details="hideDetails"
    >
    </v-autocomplete>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
interface LinkageSelectItem {
  ID: string
  Name: string
  ChildrenIDs: string[]
}

const props = defineProps<{
  modelValue: string[]
  items: LinkageSelectItem[][]
  labels: string[]
  errorMessages?: string[]
  disabled?: boolean
  selectOutOfOrder?: boolean
  chips?: boolean
  row?: boolean
  hideDetails?: boolean
}>()

const emit = defineEmits(['update:modelValue'])
const linkageSelectItems = ref([...props.items])

linkageSelectItems.value.forEach((v: any) => {
  v.forEach((item: LinkageSelectItem) => {
    if (!item.Name) {
      item.Name = item.ID
    }
  })
})

const selectedIDs = reactive([...props.modelValue])

const validateAndResetSelectedIDs = () => {
  linkageSelectItems.value.forEach((v: any, i: number) => {
    if (!selectedIDs[i]) {
      selectedIDs[i] = ''
    }
  })
  selectedIDs.forEach((v, i) => {
    if (!v) {
      selectedIDs[i] = ''
      return
    }

    var exists = false
    for (var item of linkageSelectItems.value[i]) {
      if (item.ID === v) {
        exists = true
        break
      }
    }
    if (!exists) {
      selectedIDs[i] = ''
      return
    }

    if (i === 0) {
      return
    }
    var pID = selectedIDs[i - 1]
    if (!pID) {
      if (!props.selectOutOfOrder) {
        selectedIDs[i] = ''
      }
      return
    } else {
      for (const item of linkageSelectItems.value[i - 1]) {
        if (item.ID === pID) {
          for (var id of item.ChildrenIDs) {
            if (id === v) {
              return
            }
          }
        }
      }
    }

    selectedIDs[i] = ''
    return
  })
}

validateAndResetSelectedIDs()

const levelItems = (level: number): LinkageSelectItem[] => {
  if (level === 0) {
    return linkageSelectItems.value[level]
  }
  let items: LinkageSelectItem[] = []
  if (selectedIDs[level - 1]) {
    let idM: any = {}
    for (const item of linkageSelectItems.value[level - 1]) {
      if (item.ID === selectedIDs[level - 1]) {
        for (let id of item.ChildrenIDs) {
          idM[id] = true
        }
        break
      }
    }
    for (const item of linkageSelectItems.value[level]) {
      if (idM[item.ID]) {
        items.push(item)
      }
    }
    return items
  }

  if (props.selectOutOfOrder) {
    for (let i = level - 2; i >= 0; i--) {
      if (selectedIDs[i]) {
        items = findNextItems(selectedIDs[i], i)
        for (let j = i + 1; j < level; j++) {
          let newItems: Array<LinkageSelectItem> = []
          for (const item of items) {
            newItems = newItems.concat(findNextItems(item.ID, j))
          }
          items = newItems
        }

        return items
      }
    }
    return items
  }
  return []
}

const selectItem = (v: string, level: number) => {
  if (v) {
    for (var i = level + 1; i < selectedIDs.length; i++) {
      if (selectedIDs[i]) {
        var items = levelItems(i)
        if (!items || items.length === 0) {
          selectedIDs[i] = ''
          continue
        }
        var found = false
        for (var item of items) {
          if (item.ID === selectedIDs[i]) {
            found = true
            break
          }
        }
        if (!found) {
          selectedIDs[i] = ''
        }
      }
    }
  } else {
    selectedIDs[level] = ''
    if (!props.selectOutOfOrder) {
      for (let i = level + 1; i < selectedIDs.length; i++) {
        selectedIDs[i] = ''
      }
    }
  }
  emit('update:modelValue', selectedIDs)
}

const findNextItems = (selectedID: any, level: number): LinkageSelectItem[] => {
  if (level + 1 >= linkageSelectItems.value.length) {
    return []
  }
  var childrenIDs: string[] = []
  for (const item of linkageSelectItems.value[level]) {
    if (item.ID === selectedID) {
      childrenIDs = item.ChildrenIDs
      break
    }
  }
  if (childrenIDs.length == 0) {
    return []
  }
  var items = []
  for (const item of linkageSelectItems.value[level + 1]) {
    if (childrenIDs.includes(item.ID)) {
      items.push(item)
    }
  }
  return items
}
</script>
