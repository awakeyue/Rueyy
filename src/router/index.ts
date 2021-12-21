import { createRouter, createWebHashHistory, RouteRecordRaw  } from 'vue-router'
const { BASE_URL } = import.meta.env // BASE_URL对应github pages仓库名
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/Home.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(BASE_URL),
  routes
})

export default router