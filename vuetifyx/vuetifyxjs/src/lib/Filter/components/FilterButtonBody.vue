<script setup lang="ts">
import { FilterItem } from '@/lib/Filter/Model'
import { computed } from 'vue'
import * as constants from '@/lib/Filter/Constants'
import { an } from 'vitest/dist/reporters-MmQN-57K'

const props = defineProps<{ op: FilterItem; slotProps: any }>()
const emit = defineEmits(['clear'])
const showValueComputed = computed(() => {
  let op = props.op
  let showValue = ''
  if (op.selected) {
    switch (op.itemType) {
      case 'DatetimeRangeItem':
      case 'DateRangeItem': {
        const mod = op.modifier || constants.ModifierBetween

        if (mod === constants.ModifierBetween) {
          if (op.valueFrom) {
            if (op.valueTo) {
              showValue = `${op.valueFrom} - ${op.valueTo}`
            } else {
              showValue = ` >= ${op.valueFrom}`
            }
          } else {
            if (op.valueTo) {
              showValue = ` < ${op.valueTo}`
            }
          }
        }
        break
      }
      case 'DateItem': {
        showValue = op.valueIs
        break
      }
      case 'NumberItem': {
        const mod = op.modifier || 'equals'

        if (mod === 'equals') {
          const floatValue = parseFloat(op.valueIs)
          if (!isNaN(floatValue)) {
            showValue += floatValue
          }
        }

        if (mod === 'between') {
          const floatFrom = parseFloat(op.valueFrom || '')
          const floatTo = parseFloat(op.valueTo || '')
          const fromValid = !isNaN(floatFrom)
          const toValid = !isNaN(floatTo)
          if (fromValid) {
            if (toValid) {
              showValue = `${op.valueFrom} - ${op.valueTo}`
            } else {
              showValue = ` >= ${op.valueFrom}`
            }
          } else {
            if (toValid) {
              showValue = ` <= ${op.valueTo}`
            }
          }
        }

        if (mod === 'greaterThan') {
          const floatValue = parseFloat(op.valueIs)
          if (!isNaN(floatValue)) {
            showValue += ' > ' + op.valueFrom
          }
        }

        if (mod === 'lessThan') {
          const floatValue = parseFloat(op.valueIs)
          if (!isNaN(floatValue)) {
            showValue += ' < ' + op.valueTo
          }
        }
        break
      }
      case 'StringItem': {
        const mod = op.modifier || 'equals'
        if (mod === 'equals' && op.valueIs) {
          showValue = op.valueIs
        }

        if (mod === 'contains' && op.valueIs) {
          showValue = ' ~ ' + op.valueIs
        }
        break
      }
      case 'SelectItem': {
        const mod = op.modifier || 'equals'
        if (mod === 'equals' && op.valueIs) {
          showValue = op.options!.find((o) => o.value === op.valueIs)!.text
        }
        break
      }
      case 'MultipleSelectItem': {
        const mod = op.modifier || 'in'
        const textsAre = op
          .options!.filter((o) => op.valuesAre.includes(o.value))
          .map((o) => o.text)
        if (mod === 'in' && op.valuesAre && op.valuesAre.length > 0) {
          showValue = ' in ' + '[ ' + textsAre.join(', ') + ' ]'
        }
        if (mod === 'notIn' && op.valuesAre && op.valuesAre.length > 0) {
          showValue = ' not in ' + '[ ' + textsAre.join(', ') + ' ]'
        }
        break
      }
      case 'LinkageSelectItem': {
        const textsAre = op.valuesAre.map((o, i) => {
          return op.linkageSelectData?.items[i].find((x: any) => {
            console.log(o, x)
            return o === x.ID
          }).Name
        })
        showValue = textsAre.join(',')
        break

        // const mod = op.modifier || 'equals'
        // const textsAre = op
        //   .options!.filter((o) => op.valuesAre.includes(o.value))
        //   .map((o) => o.text)
        // if (mod === 'equals' && op.valuesAre && op.valuesAre.length > 0) {
        //   showValue = textsAre.join(', ')
        // }
        // break
      }
      default:
        throw new Error(`itemType '${op.itemType}' not supported`)
    }
  }

  const showValueCopy = showValue
  showValue = ''
  let showLen = 0
  for (let i = 0; i < showValueCopy.length; i++) {
    showValue += showValueCopy.charAt(i)
    if (showValueCopy.charCodeAt(i) > 127) {
      showLen += 2
    } else {
      showLen++
    }
    if (showLen > 66) {
      showValue += '...'
      break
    }
  }
  return showValue
})

const clear = (e: any) => {
  emit('clear', e)
}
</script>

<template>
  <span>
    <v-icon
      start
      @click="clear"
      :icon="op.selected ? 'mdi-close-circle' : 'mdi-plus-circle'"
    ></v-icon>
    <span v-bind="slotProps" class="cursor-pointer">
      {{ op.label }}
      <span v-if="op.selected">
        | <span class="text-primary">{{ showValueComputed }}</span>
      </span>
    </span>
  </span>
</template>

<style scoped></style>
