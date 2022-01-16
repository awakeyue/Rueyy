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
    name: 'demos',
    redirect: '/demos/list',
    component: () => import('@/views/demos/index.vue'),
    children: [
      {
        path: 'list',
        name: 'demoList',
        component: () => import('@/views/demos/List.vue')
      },
      {
        path: 'transitonGroup',
        name: 'demoTransitonGroup',
        component: () => import('@/views/demos/TransitionGroup.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router