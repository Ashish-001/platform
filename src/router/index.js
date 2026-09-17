import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'home', component: () => import('../pages/Home.vue') },
  { path: '/services', name: 'services', component: () => import('../pages/Services.vue') },
  { path: '/services/:id', name: 'service-detail', component: () => import('../pages/ServiceDetail.vue') },
  { path: '/portfolio', name: 'portfolio', component: () => import('../pages/Portfolio.vue') },
  { path: '/about', name: 'about', component: () => import('../pages/About.vue') },
  { path: '/contact', name: 'contact', component: () => import('../pages/Contact.vue') },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('../pages/NotFound.vue') },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    return savedPosition || { top: 0 }
  },
})

export default router
