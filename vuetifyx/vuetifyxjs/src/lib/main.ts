import { App } from 'vue'

import Datepicker from '@/lib/Datepicker.vue'
import SelectMany from '@/lib/SelectMany.vue'
import LinkageSelect from '@/lib/LinkageSelect.vue'

const vuetifyx = {
  install: (app: App) => {
    app.component('vx-datepicker', Datepicker)
    app.component('vx-selectmany', SelectMany)
    app.component('vx-linkageselect', LinkageSelect)
  }
}
declare const window: any
window.__goplaidVueComponentRegisters = window.__goplaidVueComponentRegisters || []
window.__goplaidVueComponentRegisters.push((app: App, vueOptions: any): any => {
  app.use(vuetifyx)
})
