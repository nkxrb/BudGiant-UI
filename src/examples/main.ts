import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

/**导入全局初始化样式 */
import "@packages/theme.scss";
import "@packages/base.scss";

// 全局引入kview-ui 组件库
import { Button } from '../packages/index'

import { DatePicker } from 'ant-design-vue';


const app = createApp(App)

app.use(Button)
// app.use(DatePicker);
app.use(router).mount('#app');