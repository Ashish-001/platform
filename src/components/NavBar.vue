<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import BrandMark from './BrandMark.vue'
import { serviceCategories, servicesInCategory } from '../data/services'
import { getPostBySlug, postLanguages } from '../data/blog'
import { currentLang, languages } from '../data/languages'
import { switchLanguagePath } from '../router'
import { industries } from '../data/industries'
import { caseStudies } from '../data/caseStudies'
import { reportCard } from '../data/reports'
import { useUi } from '../composables/useUi'
import { setBodyScrollLock } from '../composables/useScrollLock'
import { t } from '../i18n'

const { openLead } = useUi()
const route = useRoute()
const router = useRouter()

/** Same page in another language; a post missing in that language falls back to its blog. */
function changeLanguage(code) {
  const post = route.name === 'blog-post' ? getPostBySlug(route.params.slug) : null
  const path = post && !postLanguages(post).includes(code) ? `/${code}/blog` : switchLanguagePath(route.path, code)
  router.push({ path, hash: route.hash })
}

const menus = computed(() => [
  {
    key: 'company',
    label: t('Company'),
    grid: 'lg:grid-cols-[repeat(2,minmax(0,1fr))_300px]',
    columns: [
      {
        title: t('Who we are'),
        items: [
          { to: '/about', label: t('About Us'), hint: t('Team, values and how we work') },
          { to: '/about#process', label: t('Our Process'), hint: t('Five stages from discovery to support') },
          { to: '/about#team', label: t('The Team'), hint: t('Senior engineers and designers') },
        ],
      },
      {
        title: t('Inside Service'),
        items: [
          { to: '/careers', label: t('Careers'), hint: t('Open roles and how we hire') },
          { to: '/awards', label: t('Awards & Recognition'), hint: t('Industry honours since 2024') },
          { to: '/press', label: t('Press Releases'), hint: t('Announcements and coverage') },
        ],
      },
    ],
    promo: {
      eyebrow: t('FY 2025–26 Report Card'),
      value: reportCard.stats[1].value,
      text: t('Milestones hit on or before the agreed date, across 38 projects.'),
      action: t('Download Report Card'),
    },
  },
  {
    key: 'services',
    label: t('Our Services'),
    grid: 'lg:grid-cols-[repeat(4,minmax(0,1fr))_300px]',
    columns: serviceCategories.map((cat) => ({
      title: t(cat.name),
      titleTo: `/services/category/${cat.slug}`,
      icon: cat.icon,
      items: servicesInCategory(cat.slug).map((s) => ({ to: `/services/${s.id}`, label: t(s.title) })),
    })),
    promo: {
      eyebrow: t('FY 2025–26 Report Card'),
      value: reportCard.stats[2].value,
      text: t('Median Lighthouse performance score at handover.'),
      action: t('Download Report Card'),
    },
  },
  {
    key: 'work',
    label: t('Our Work'),
    grid: 'lg:grid-cols-[repeat(2,minmax(0,1fr))_300px]',
    columns: [
      {
        title: t('Proof'),
        items: [
          { to: '/portfolio', label: t('Portfolio'), hint: t('Everything we have shipped') },
          { to: '/case-studies', label: t('Case Studies'), hint: t('Full write-ups with numbers') },
          { to: '/testimonials', label: t('Testimonials'), hint: t('What clients say, unedited') },
        ],
      },
      {
        title: t('Featured case studies'),
        items: caseStudies.slice(0, 3).map((c) => ({
          to: `/case-studies/${c.slug}`,
          label: c.client,
          hint: t(c.headline),
        })),
      },
    ],
    promo: {
      eyebrow: t('Free of charge'),
      value: t('30 min'),
      text: t('A code and performance audit of your current site.'),
      action: t('Get a Free Audit'),
    },
  },
  {
    key: 'industries',
    label: t('Industries'),
    grid: 'lg:grid-cols-[repeat(2,minmax(0,1fr))_300px]',
    columns: [
      { title: t('Industries we build for'), items: industries.slice(0, 3).map((i) => ({ to: `/industries/${i.slug}`, label: t(i.name), hint: t(i.tagline) })) },
      { title: '', items: industries.slice(3).map((i) => ({ to: `/industries/${i.slug}`, label: t(i.name), hint: t(i.tagline) })), extra: { to: '/industries', label: t('All industries') } },
    ],
    promo: {
      eyebrow: t('Benchmark reports'),
      value: '7',
      text: t('Sector benchmarks built from our own delivery data.'),
      action: t('Download a Report'),
    },
  },
  {
    key: 'insights',
    label: t('Insights'),
    grid: 'lg:grid-cols-[repeat(2,minmax(0,1fr))_300px]',
    columns: [
      {
        title: t('Published data'),
        items: [
          { to: '/insights/report-card', label: t('Engineering Report Card'), hint: t('Our delivery metrics, published') },
          { to: '/insights/reports', label: t('Benchmark Reports'), hint: t('Cost, performance and adoption data') },
        ],
      },
      {
        title: t('Free tools'),
        items: [
          { to: '/tools/project-estimator', label: t('Project Cost Estimator'), hint: t('Instant ballpark in two minutes') },
          { to: '/faqs', label: t('FAQs'), hint: t('40+ answers on scope and pricing') },
        ],
      },
    ],
    promo: {
      eyebrow: t('FY 2025–26 Report Card'),
      value: reportCard.stats[0].value,
      text: t('Projects delivered across 24 clients this year.'),
      action: t('Download Report Card'),
    },
  },
])

const plainLinks = computed(() => [
  { to: '/blog', label: t('Blog') },
  { to: '/contact', label: t('Contact') },
])

const open = ref(null)
const mobileOpen = ref(false)
const mobileSection = ref(null)
const scrolled = ref(false)
const isDark = ref(false)
let closeTimer

function hoverOpen(key) {
  clearTimeout(closeTimer)
  open.value = key
}

function scheduleClose() {
  clearTimeout(closeTimer)
  closeTimer = setTimeout(() => (open.value = null), 160)
}

function closeAll() {
  clearTimeout(closeTimer)
  open.value = null
  mobileOpen.value = false
}

function toggleMenu(key) {
  open.value = open.value === key ? null : key
}

function promoClick(promo) {
  closeAll()
  openLead({ title: promo.action, subtitle: promo.text })
}

function openLeadFromMobile() {
  closeAll()
  openLead()
}

function applyTheme() {
  document.documentElement.classList.toggle('dark', isDark.value)
  try {
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  } catch {}
}

function toggleTheme() {
  isDark.value = !isDark.value
  applyTheme()
}

function onScroll() {
  scrolled.value = window.scrollY > 8
}

function onKeydown(e) {
  if (e.key === 'Escape') closeAll()
}

watch(
  () => route.fullPath,
  () => closeAll(),
)

watch(mobileOpen, (v) => setBodyScrollLock('mobile-nav', v))

// The drawer is hidden from xl up; close it so its scroll lock is released too.
function onResize() {
  if (mobileOpen.value && window.innerWidth >= 1280) mobileOpen.value = false
}

onMounted(() => {
  let saved = null
  try {
    saved = localStorage.getItem('theme')
  } catch {}
  isDark.value = saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches
  applyTheme()
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKeydown)
  window.addEventListener('resize', onResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKeydown)
  window.removeEventListener('resize', onResize)
  setBodyScrollLock('mobile-nav', false)
  clearTimeout(closeTimer)
})
</script>

<template>
  <header
    class="sticky top-0 z-50 border-b bg-white/85 backdrop-blur-xl transition-[box-shadow,border-color] dark:bg-slate-950/85"
    :class="
      scrolled
        ? 'border-slate-200/80 shadow-[0_8px_24px_-20px_rgba(15,23,42,0.5)] dark:border-slate-800'
        : 'border-transparent'
    "
    @mouseleave="scheduleClose"
  >
    <nav class="shell flex items-center justify-between gap-6 py-3.5" :aria-label="t('Primary')">
      <RouterLink to="/" class="shrink-0" @click="closeAll">
        <BrandMark />
      </RouterLink>

      <!-- Desktop nav -->
      <div class="hidden items-center gap-1 xl:flex">
        <div v-for="menu in menus" :key="menu.key" @mouseenter="hoverOpen(menu.key)">
          <button
            type="button"
            class="flex items-center gap-1 rounded-lg px-3 py-2 text-[13.5px] font-medium transition"
            :class="
              open === menu.key
                ? 'bg-indigo-50 text-indigo-700 dark:bg-slate-900 dark:text-indigo-300'
                : 'text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400'
            "
            :aria-expanded="open === menu.key"
            aria-haspopup="true"
            @click="toggleMenu(menu.key)"
          >
            {{ t(menu.label) }}
            <svg
              class="h-3 w-3 transition-transform"
              :class="open === menu.key && 'rotate-180'"
              fill="none"
              stroke="currentColor"
              stroke-width="2.4"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
        </div>

        <RouterLink
          v-for="link in plainLinks"
          :key="link.to"
          :to="link.to"
          class="rounded-lg px-3 py-2 text-[13.5px] font-medium text-slate-600 transition hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400"
          active-class="!text-indigo-600 dark:!text-indigo-400"
          @mouseenter="scheduleClose"
        >
          {{ t(link.label) }}
        </RouterLink>
      </div>

      <div class="flex shrink-0 items-center gap-2">
        <select
          v-if="languages.length > 1"
          :value="currentLang"
          :aria-label="t('Language')"
          class="h-9 cursor-pointer rounded-lg border border-slate-200 bg-transparent px-2 text-[12.5px] font-semibold text-slate-600 uppercase transition hover:border-indigo-300 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300"
          @change="changeLanguage($event.target.value)"
        >
          <option v-for="lang in languages" :key="lang.code" :value="lang.code">{{ t(lang.code) }}</option>
        </select>
        <button
          type="button"
          class="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-indigo-300 hover:text-indigo-600 dark:border-slate-700 dark:text-slate-400"
          :aria-label="isDark ? t('Switch to light mode') : t('Switch to dark mode')"
          @click="toggleTheme"
        >
          <svg v-if="isDark" class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm0-16a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0V3a1 1 0 0 1 1-1Zm0 18a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0v-1a1 1 0 0 1 1-1ZM3 11h1a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2Zm17 0h1a1 1 0 0 1 0 2h-1a1 1 0 0 1 0-2ZM5.6 4.2l.7.7a1 1 0 0 1-1.4 1.4l-.7-.7a1 1 0 0 1 1.4-1.4Zm12.1 12.1.7.7a1 1 0 0 1-1.4 1.4l-.7-.7a1 1 0 0 1 1.4-1.4Zm.7-12.1a1 1 0 0 1 0 1.4l-.7.7a1 1 0 0 1-1.4-1.4l.7-.7a1 1 0 0 1 1.4 0ZM6.3 16.3a1 1 0 0 1 0 1.4l-.7.7a1 1 0 0 1-1.4-1.4l.7-.7a1 1 0 0 1 1.4 0Z"
            />
          </svg>
          <svg v-else class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M21.3 14.2a9 9 0 0 1-11.5-11.5 1 1 0 0 0-1.3-1.2A11 11 0 1 0 22.5 15.5a1 1 0 0 0-1.2-1.3Z"
            />
          </svg>
        </button>

        <button type="button" class="btn-primary btn-sm hidden md:inline-flex" @click="openLead()">
          {{ t('Request a Call') }}
        </button>

        <button
          type="button"
          class="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 xl:hidden dark:border-slate-700 dark:text-slate-300"
          :aria-expanded="mobileOpen"
          :aria-label="t('Toggle menu')"
          @click="mobileOpen = !mobileOpen"
        >
          <svg v-if="!mobileOpen" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <path stroke-linecap="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
          </svg>
          <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <path stroke-linecap="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </nav>

    <!-- Desktop mega panel -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-1"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        class="absolute inset-x-0 top-full hidden border-t border-slate-200/80 bg-white shadow-[0_24px_48px_-24px_rgba(15,23,42,0.25)] xl:block dark:border-slate-800 dark:bg-slate-950"
        @mouseenter="hoverOpen(open)"
      >
        <div v-for="menu in menus" :key="menu.key">
          <div v-if="open === menu.key" class="shell grid gap-10 py-9" :class="menu.grid">
            <div v-for="(col, i) in menu.columns" :key="i">
              <RouterLink
                v-if="col.titleTo"
                :to="col.titleTo"
                class="group flex items-start gap-2 text-[13px] font-semibold text-slate-900 dark:text-white"
              >
                <span aria-hidden="true">{{ t(col.icon) }}</span>
                <span class="group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
                  >{{ t(col.title) }}
                  <span class="text-indigo-500 opacity-0 transition group-hover:opacity-100">→</span></span
                >
              </RouterLink>
              <p
                v-else-if="col.title"
                class="text-[11px] font-semibold tracking-[0.14em] text-slate-400 uppercase"
              >
                {{ t(col.title) }}
              </p>
              <span v-else class="block h-4" />

              <ul class="mt-4 space-y-1">
                <li v-for="item in col.items" :key="item.to">
                  <RouterLink
                    :to="item.to"
                    class="block rounded-lg px-2 py-1.5 transition hover:bg-indigo-50/70 dark:hover:bg-slate-900"
                    @click="closeAll"
                  >
                    <span class="block text-[13.5px] font-medium text-slate-700 dark:text-slate-200">{{ t(item.label) }}</span>
                    <span v-if="item.hint" class="mt-0.5 block text-[12px] text-slate-400">{{ t(item.hint) }}</span>
                  </RouterLink>
                </li>
                <li v-if="col.extra" class="pt-1">
                  <RouterLink :to="col.extra.to" class="link-arrow px-2 text-[13px]" @click="closeAll">
                    {{ t(col.extra.label) }} <span aria-hidden="true">→</span>
                  </RouterLink>
                </li>
              </ul>
            </div>

            <!-- Promo -->
            <div
              v-if="menu.promo"
              class="rounded-2xl border border-indigo-100 bg-indigo-50/60 p-6 dark:border-slate-800 dark:bg-slate-900"
            >
              <p class="text-[10px] font-semibold tracking-[0.16em] text-indigo-600 uppercase dark:text-indigo-400">
                {{ t(menu.promo.eyebrow) }}
              </p>
              <p class="mt-3 font-display text-4xl font-bold text-slate-900 dark:text-white">
                {{ t(menu.promo.value) }}
              </p>
              <p class="mt-2 text-[13px] leading-relaxed text-slate-600 dark:text-slate-400">
                {{ t(menu.promo.text) }}
              </p>
              <button type="button" class="btn-primary btn-sm mt-5 w-full" @click="promoClick(menu.promo)">
                {{ t(menu.promo.action) }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Mobile drawer.
         Teleported out of <header>: its backdrop-filter would otherwise act as the
         containing block for this fixed panel and collapse it to the header's height. -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0"
        leave-active-class="transition duration-150 ease-in"
        leave-to-class="opacity-0"
      >
        <div
          v-if="mobileOpen"
          class="fixed inset-0 z-[80] flex flex-col bg-white xl:hidden dark:bg-slate-950"
          role="dialog"
          aria-modal="true"
          :aria-label="t('Site menu')"
        >
          <div
            class="flex shrink-0 items-center justify-between border-b border-slate-200/80 px-5 py-3.5 dark:border-slate-800"
          >
            <RouterLink to="/" @click="closeAll">
              <BrandMark />
            </RouterLink>
            <button
              type="button"
              class="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300"
              :aria-label="t('Close menu')"
              @click="closeAll"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                <path stroke-linecap="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="flex-1 overflow-y-auto overscroll-contain px-5 py-5">
          <div v-for="menu in menus" :key="menu.key" class="border-b border-slate-100 pb-1 dark:border-slate-900">
            <button
              type="button"
              class="flex w-full items-center justify-between py-3 text-left text-sm font-semibold text-slate-900 dark:text-white"
              :aria-expanded="mobileSection === menu.key"
              @click="mobileSection = mobileSection === menu.key ? null : menu.key"
            >
              {{ t(menu.label) }}
              <svg
                class="h-4 w-4 text-slate-400 transition-transform"
                :class="mobileSection === menu.key && 'rotate-180'"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            <div v-if="mobileSection === menu.key" class="pb-3">
              <div v-for="(col, i) in menu.columns" :key="i" class="mb-3">
                <RouterLink
                  v-if="col.titleTo"
                  :to="col.titleTo"
                  class="mb-1.5 block text-[11px] font-semibold tracking-[0.14em] text-indigo-600 uppercase dark:text-indigo-400"
                  @click="closeAll"
                  >{{ t(col.title) }} →</RouterLink
                >
                <p
                  v-else-if="col.title"
                  class="mb-1.5 text-[11px] font-semibold tracking-[0.14em] text-slate-400 uppercase"
                >
                  {{ t(col.title) }}
                </p>
                <RouterLink
                  v-for="item in col.items"
                  :key="item.to"
                  :to="item.to"
                  class="block rounded-lg px-3 py-2 text-[13.5px] text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900"
                  @click="closeAll"
                >
                  {{ t(item.label) }}
                </RouterLink>
                <RouterLink
                  v-if="col.extra"
                  :to="col.extra.to"
                  class="block px-3 py-2 text-[13px] font-semibold text-indigo-600 dark:text-indigo-400"
                  @click="closeAll"
                  >{{ t(col.extra.label) }} →</RouterLink
                >
              </div>
            </div>
          </div>

            <RouterLink
              v-for="link in plainLinks"
              :key="link.to"
              :to="link.to"
              class="block border-b border-slate-100 py-3 text-sm font-semibold text-slate-900 dark:border-slate-900 dark:text-white"
              @click="closeAll"
            >
              {{ t(link.label) }}
            </RouterLink>
          </div>

          <div
            class="shrink-0 space-y-3 border-t border-slate-200/80 px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] dark:border-slate-800"
          >
            <button type="button" class="btn-primary w-full" @click="openLeadFromMobile">{{ t('Request a Call') }}</button>
            <RouterLink to="/tools/project-estimator" class="btn-outline w-full" @click="closeAll">
              {{ t('Estimate my project') }}
            </RouterLink>
          </div>
        </div>
      </Transition>
    </Teleport>
  </header>
</template>
