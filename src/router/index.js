// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
    ],
  },
  {
    path: '/registerBook',
    name: 'registerBook',
    component: () => import('../components/registerBook.vue')
  },
  {
    path: '/myBooks',
    name: 'myBooks',
    component: () => import('../components/myBooks.vue')
  },
  {
    path: '/editbooks',
    name: 'editBooks',
    component: () => import('../components/editBooks.vue')
  },
  {
    path: '/removeBooks',
    name: 'removeBooks',
    component: () => import('../components/removeBooks.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
