import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
    meta: { requiresAuth: false, guestOnly: true }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/RegisterView.vue'),
    meta: { requiresAuth: false, guestOnly: true }
  },
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/course',
    name: 'course',
    component: () => import('@/views/CourseView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/course/detail/:id',
    name: 'courseDetail',
    component: () => import('@/views/CourseDetailView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/count',
    name: 'count',
    component: () => import('@/views/CountView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/notice',
    name: 'notice',
    component: () => import('@/views/NoticeView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/profile/:id',
    name: 'profile',
    component: () => import('@/views/ProfileView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/views/AdminView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/video',
    name: 'video',
    component: () => import('@/views/VideoView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/:catchAll(.*)',
    name: '404',
    component: () => import('@/views/404View.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  if (to.meta.requiresAuth && !userStore.is_login) {
    next({ name: 'login' })
  } else if (to.meta.guestOnly && userStore.is_login) {
    next({ name: 'home' })
  } else {
    next()
  }
})



export default router
