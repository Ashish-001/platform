import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'home', component: () => import('../pages/Home.vue') },

  // Services
  { path: '/services', name: 'services', component: () => import('../pages/Services.vue') },
  {
    path: '/services/category/:slug',
    name: 'service-category',
    component: () => import('../pages/ServiceCategory.vue'),
  },
  { path: '/services/:id', name: 'service-detail', component: () => import('../pages/ServiceDetail.vue') },

  // Industries
  { path: '/industries', name: 'industries', component: () => import('../pages/Industries.vue') },
  { path: '/industries/:slug', name: 'industry-detail', component: () => import('../pages/IndustryDetail.vue') },

  // Work
  { path: '/portfolio', name: 'portfolio', component: () => import('../pages/Portfolio.vue') },
  { path: '/case-studies', name: 'case-studies', component: () => import('../pages/CaseStudies.vue') },
  {
    path: '/case-studies/:slug',
    name: 'case-study-detail',
    component: () => import('../pages/CaseStudyDetail.vue'),
  },
  { path: '/testimonials', name: 'testimonials', component: () => import('../pages/Testimonials.vue') },

  // Insights & tools
  { path: '/insights/report-card', name: 'report-card', component: () => import('../pages/ReportCard.vue') },
  { path: '/insights/reports', name: 'reports', component: () => import('../pages/Reports.vue') },
  {
    path: '/tools/project-estimator',
    name: 'project-estimator',
    component: () => import('../pages/ProjectEstimator.vue'),
  },
  { path: '/blog', name: 'blog', component: () => import('../pages/Blog.vue') },
  { path: '/blog/:slug', name: 'blog-post', component: () => import('../pages/BlogPost.vue') },
  { path: '/faqs', name: 'faqs', component: () => import('../pages/Faqs.vue') },

  // Company
  { path: '/about', name: 'about', component: () => import('../pages/About.vue') },
  { path: '/careers', name: 'careers', component: () => import('../pages/Careers.vue') },
  { path: '/awards', name: 'awards', component: () => import('../pages/Awards.vue') },
  { path: '/press', name: 'press', component: () => import('../pages/Press.vue') },
  { path: '/contact', name: 'contact', component: () => import('../pages/Contact.vue') },

  // Legal & utility
  { path: '/privacy', name: 'privacy', component: () => import('../pages/Privacy.vue') },
  { path: '/sitemap', name: 'sitemap', component: () => import('../pages/Sitemap.vue') },

  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('../pages/NotFound.vue') },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (to.hash) return { el: to.hash, top: 96, behavior: 'smooth' }
    return savedPosition || { top: 0 }
  },
})

export default router
