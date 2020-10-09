import { ComponentOptions } from 'vue'

import Button from './button/button.vue'
import Header from './header/header.vue'
import Nav from './nav/nav.vue'
import NavTree from './nav/navtree.vue'

const components: ComponentOptions[] = [
  Header,
  Button,
  Nav,
  NavTree,
]

// vue3.0的组件全局注册方法
const register = function (app: ComponentOptions) {
  components.forEach(component => {
    app.component(component.name, component)
  });
}


export default register

export {
  Header,
  Button,
  Nav,
  NavTree
}