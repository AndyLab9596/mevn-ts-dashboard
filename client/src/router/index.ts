import { useGlobalStore } from '@/stores/globalStore';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const HomeView = () => import('@/views/HomeView.vue');
const LandingView = () => import('@/views/LandingView.vue');
const AuthView = () => import('@/views/AuthView.vue');
const NotFound = () => import('@/views/NotFound.vue');

// Dashboard segment
const StatsView = () => import('@/views/StatsView.vue');
const AllJobsView = () => import('@/views/AllJobsView.vue');
const AddJobView = () => import('@/views/AddJobView.vue');
const ProfileView = () => import('@/views/ProfileView.vue');

const globalStore = useGlobalStore();

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    redirect: '/stats',
    children: [
      {
        path: 'stats', component: StatsView, name: 'stats'
      },
      {
        path: 'all-jobs', component: AllJobsView, name: 'all-jobs'
      },
      {
        path: 'add-job', component: AddJobView, name: 'add-job'
      },
      {
        path: 'profile', component: ProfileView, name: 'profile'
      }
    ]
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

  if (to.meta.requiresAuth && !globalStore.isAuthenticated) {
    next({ name: 'auth' })
  } else if (to.meta.requiresUnAuth && !globalStore.isAuthenticated) {
    next({ name: '/' })
  }

  next()
})




export default router
