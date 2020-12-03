// 导入组件，组件必须声明 name
import NkForm from './NkForm.vue'

// 为组件提供 install 安装方法，供按需引入
NkForm.install = function (Vue) {
  Vue.component(NkForm.name, NkForm)
}

// 默认导出组件
export default NkForm
