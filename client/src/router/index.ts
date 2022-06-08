import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const HomeView = () => import('@/views/HomeView.vue');
const LandingView = () => import('@/views/LandingView.vue');
const AuthView = () => import('@/views/AuthView.vue');
const NotFound = () => import('@/views/NotFound.vue');

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/landing',
    name: 'landing',
    component: LandingView,
    meta: {
      title: 'Landing'
    }
  },
  {
    path: '/auth',
    name: 'auth',
    component: AuthView,
    meta: {
      title: 'Register/Login'
    }
  },
  {
    path: '/:notFound(.*)',
    component: NotFound,
    meta: {
      title: 'Not Found'
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, _, next) => {
  document.title = to.meta.title ? `${to.meta.title} | Jobify` : 'Jobify';
  next()
})

export default router
