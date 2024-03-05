import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import DatePicker from '../DatePicker.vue'

describe('DatePicker', () => {
  it('renders properly', () => {
    const wrapper = mount(DatePicker, { props: { msg: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
