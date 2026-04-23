import { createRouter, createWebHistory } from 'vue-router'

export const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../pages/HomePage.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../pages/AboutPage.vue'),
  },
  {
    path: '/education',
    redirect: '/about',
  },
  {
    path: '/experience',
    name: 'experience',
    component: () => import('../pages/ExperiencePage.vue'),
  },
  {
    path: '/skills',
    name: 'skills',
    component: () => import('../pages/SkillsPage.vue'),
  },
  {
    path: '/contacts',
    name: 'contacts',
    component: () => import('../pages/ContactsPage.vue'),
  },
] as const

export const router = createRouter({
  history: createWebHistory(),
  routes: routes as any,
  scrollBehavior() {
    return { top: 0 }
  },
})

