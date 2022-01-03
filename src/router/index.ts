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
    component: () => import('@/views/home/index.vue')
  },
  {
    path: '/demos',
    component: () => import('@/views/demos/index.vue'),
    redirect: '/demos/christmas_tree',
    children: [

    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router