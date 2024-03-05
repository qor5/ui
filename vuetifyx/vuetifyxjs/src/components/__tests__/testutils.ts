import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { mount, VueWrapper } from '@vue/test-utils'
import { type Component } from 'vue'
const vuetify = createVuetify({
  components,
  directives
})

global.ResizeObserver = require('resize-observer-polyfill')

export function myMount(comp: Component, global = {}): VueWrapper {
  return mount(comp, {
    global: {
      ...global,
      plugins: [vuetify]
    }
  })
}
