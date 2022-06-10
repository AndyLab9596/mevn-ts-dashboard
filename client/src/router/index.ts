import { useGlobalStore } from '@/stores/globalStore';
import { storeToRefs } from 'pinia';
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

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    redirect: '/stats',
    meta: {
      requiresAuth: true,
    },
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
      title: 'Register/Login',
      requiresUnAuth: true,
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
  const globalStore = useGlobalStore();
  const { isAuthenticated } = storeToRefs(globalStore);
  console.log('isAuthenticated', isAuthenticated.value);

  document.title = to.meta.title ? `${to.meta.title} | Jobify` : 'Jobify';
  if (to.meta.requiresAuth && isAuthenticated.value === false) {
    next('/auth')
  } else if (to.meta.requiresUnAuth && isAuthenticated.value === true) {
    next('/')
  }
  next()
})

export default router
