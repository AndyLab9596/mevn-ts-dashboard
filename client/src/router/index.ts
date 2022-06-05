import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const HomeView = () => import('@/views/HomeView.vue');
const LandingView = () => import('@/views/LandingView.vue');

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/landing',
    name: 'landing',
    component: LandingView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
