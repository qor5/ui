import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import DatePicker from '../DatePicker.vue'
import { myMount } from './testutils'

describe('DatePicker', () => {
  it('renders properly', () => {
    const wrapper = myMount(DatePicker, { props: { msg: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
