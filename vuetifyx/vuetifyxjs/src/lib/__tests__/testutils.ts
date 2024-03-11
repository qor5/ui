import { expect, vi } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import { Component, type Ref } from 'vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import SelectMany from '@/lib/SelectMany.vue'

const vuetify = createVuetify({
  components,
  directives
})

global.ResizeObserver = require('resize-observer-polyfill')

export function mountTemplate(component: Component, props: {}): VueWrapper {
  return mount(component, {
    props: {
      ...props
    },
    global: {
      plugins: [vuetify]
    }
  })
}
