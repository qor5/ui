import VxDatepicker from "@/lib/VxDatepicker.vue";

import {App} from "vue";


const vuetifyx = {
  install: (app: App) => {
    app.component(VxDatepicker.name, VxDatepicker);
  }
};
declare const window: any;
window.__goplaidVueComponentRegisters = window.__goplaidVueComponentRegisters || [];
window.__goplaidVueComponentRegisters.push((app: App, vueOptions: any): any => {
  app.use(vuetifyx)
});
