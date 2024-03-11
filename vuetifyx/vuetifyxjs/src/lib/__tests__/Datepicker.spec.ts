import { describe, it, expect } from 'vitest'

import Datepicker from '../Datepicker.vue'
import { mountTemplate } from '@/lib/__tests__/testutils'
import { nextTick, watch } from 'vue'

it('Datepicker modelvulue', async () => {
  const wrapper = mountTemplate(Datepicker, {
      modelValue: '2023-10-01'
    }
  )
  await nextTick()
  expect(wrapper.html()).toContain('2023-10-01')
})
