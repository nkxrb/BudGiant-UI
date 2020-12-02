import { DefineComponent } from 'vue'
import KButton from './button.vue'


const install: PluginInstallFunction = (app: DefineComponent) => {
  app.component(KButton.name, KButton)
}
KButton.install = install

const Button: KViewComponent = KButton

export default Button