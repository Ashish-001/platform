import { START_LOCATION, createRouter, createWebHistory } from 'vue-router'
import adminConfig from '../data/adminConfig.json'
import { LANGUAGE_CODE, currentLang, isLanguage, languages } from '../data/languages'
import { englishOnly } from '../i18n'

// Unlisted on purpose: no nav entry, no sitemap entry, noindex on the page.
// It sits outside the language prefix so it has one stable URL.
const adminRoute = {
  path: adminConfig.adminPath || '/my/admin',
  name: 'admin',
  component: () => import('../pages/Admin.vue'),
  meta: { bare: true },
}

// Written without the language prefix; it is added below.
const siteRoutes = [
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
]

const LANG_PARAM = ':lang([a-z]{2}|[a-z]{2}-[a-z]{2})'
const NotFound = () => import('../pages/NotFound.vue')

const routes = [
  adminRoute,
  ...siteRoutes.map((route) => ({ ...route, path: `/${LANG_PARAM}${route.path === '/' ? '' : route.path}` })),
  { path: `/${LANG_PARAM}/:pathMatch(.*)*`, name: 'not-found', component: NotFound },
  // Unprefixed URLs never render: the guard below redirects them into a language first.
  { path: '/:pathMatch(.*)*', name: 'unprefixed', component: NotFound },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (to.hash) return { el: to.hash, top: 96, behavior: 'smooth' }
    return savedPosition || { top: 0 }
  },
})

const { resolve, push, replace } = router

/**
 * Puts a path under a language: /blog → /de/blog. A path that already starts
 * with an enabled language is left alone; an unknown code (/fr/blog when French
 * is not enabled) is swapped for the given language.
 */
export function localizePath(path, lang = currentLang.value) {
  const [, first = '', ...rest] = path.split('/')
  if (isLanguage(first)) return path
  if (LANGUAGE_CODE.test(first)) return `/${lang}${rest.length ? `/${rest.join('/')}` : ''}`
  return `/${lang}${path === '/' ? '' : path}`
}

/** Same page, other language: /en/blog → /de/blog. */
export function switchLanguagePath(path, lang) {
  const [, first = '', ...rest] = path.split('/')
  const tail = isLanguage(first) ? rest : [first, ...rest]
  const joined = tail.filter(Boolean).join('/')
  return `/${lang}${joined ? `/${joined}` : ''}`
}

function withLang(to) {
  if (typeof to === 'string') {
    if (!to.startsWith('/') || resolve(to).meta.bare) return to
    return localizePath(to)
  }
  if (to && typeof to === 'object' && typeof to.path === 'string') return { ...to, path: withLang(to.path) }
  return to
}

// Links across the site are written as plain paths (to="/about"). Adding the
// current language here gives every RouterLink the right href and active state
// without each one having to know about languages.
router.resolve = (to, current) => resolve(withLang(to), current)
router.push = (to) => push(withLang(to))
router.replace = (to) => replace(withLang(to))

/** First browser language that the site offers, for visitors arriving on an unprefixed URL. */
function preferredLanguage() {
  try {
    for (const tag of navigator.languages ?? [navigator.language]) {
      const code = tag.toLowerCase()
      if (isLanguage(code)) return code
      if (isLanguage(code.split('-')[0])) return code.split('-')[0]
    }
  } catch {
    // navigator.languages can be missing in unusual browsers; use the default below.
  }
  return languages[0]?.code ?? 'en'
}

router.beforeEach((to, from) => {
  if (to.meta.bare) return true

  const first = to.path.split('/')[1] ?? ''
  if (isLanguage(first)) {
    currentLang.value = first
    return true
  }

  const lang = from === START_LOCATION ? preferredLanguage() : currentLang.value
  return { path: localizePath(to.path, lang), query: to.query, hash: to.hash, replace: true }
})

router.afterEach((to) => {
  englishOnly.value = Boolean(to.meta.bare)
  document.documentElement.lang = englishOnly.value ? 'en' : currentLang.value
})

export default router
