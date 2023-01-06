import type { App, Component } from 'vue';
import IconVue from './jc-icons/Icon.vue';

const components: Component[] = [
  IconVue,
]

export const JCComponents = {
  install:(app: App<Element>)=>{
    components.forEach(component =>{
      app.component((component as any).name, component)
    })
  }
}
