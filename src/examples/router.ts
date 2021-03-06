import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'

// 定义懒加载函数
const view = (name: string) => Promise.resolve(import(/* webpackChunkName: "views" */ `./${name}.vue`))

// 自定义页面路由
const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: view('home/index') }, // 首页
  {                                                               // 组件
    path: '/components', name: 'components', component: view('components/index'), children: [
      { path: '/about', name: 'about', component: view('guide/about') }, // 首页
      { path: '/import', name: 'import', component: view('guide/import') }, // 首页
      { path: '/guide', name: 'guide', component: view('guide/guide') }, // 首页
      { path: '/button', name: 'button', component: view('components/button/index') }, // 按钮
      { path: '/nav', name: 'nav', component: view('components/nav/index') }, // 导航
      { path: '/modal', name: 'modal', component: view('components/modal/index') }, // 模态框
    ]
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
