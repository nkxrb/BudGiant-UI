import { DefineComponent } from 'vue'
import Header from './header.vue'

Header.install = (app: DefineComponent): void => {
  app.component(Header.name, Header)
}

export default Header