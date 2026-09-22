<script setup>
import { RouterLink } from 'vue-router'
import BrandMark from './BrandMark.vue'
import { serviceCategories } from '../data/services'
import { industries } from '../data/industries'
import { contact, ratings } from '../data/company'
import { useUi } from '../composables/useUi'

const { openLead } = useUi()
const year = new Date().getFullYear()

const columns = [
  {
    title: 'Services',
    links: serviceCategories.map((c) => ({ to: `/services/category/${c.slug}`, label: c.name })),
    extra: { to: '/services', label: 'All 15 services' },
  },
  {
    title: 'Industries',
    links: industries.map((i) => ({ to: `/industries/${i.slug}`, label: i.name })),
  },
  {
    title: 'Company',
    links: [
      { to: '/about', label: 'About us' },
      { to: '/careers', label: 'Careers' },
      { to: '/awards', label: 'Awards & recognition' },
      { to: '/press', label: 'Press releases' },
      { to: '/contact', label: 'Contact us' },
    ],
  },
  {
    title: 'Insights & tools',
    links: [
      { to: '/insights/report-card', label: 'Engineering Report Card' },
      { to: '/insights/reports', label: 'Benchmark reports' },
      { to: '/tools/project-estimator', label: 'Project cost estimator' },
      { to: '/blog', label: 'Blog' },
      { to: '/faqs', label: 'FAQs' },
    ],
  },
  {
    title: 'Our work',
    links: [
      { to: '/portfolio', label: 'Portfolio' },
      { to: '/case-studies', label: 'Case studies' },
      { to: '/testimonials', label: 'Testimonials' },
    ],
  },
]

const socials = [
  {
    label: 'GitHub',
    href: 'https://github.com',
    path: 'M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.17c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.78 1.05.78 2.12v3.14c0 .3.21.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    path: 'M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z',
  },
]
</script>

<template>
  <footer class="border-t border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-950">
    <!-- Pre-footer CTA -->
    <div class="shell py-14">
      <div
        class="relative overflow-hidden rounded-3xl bg-slate-900 px-8 py-12 sm:px-12 dark:border dark:border-slate-800"
      >
        <div class="texture-dots pointer-events-none absolute inset-0"></div>
        <div class="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div class="max-w-xl">
            <p class="text-[11px] font-semibold tracking-[0.18em] text-indigo-300 uppercase">Free, no obligation</p>
            <h2 class="mt-3 font-display text-3xl font-bold text-white">
              Get a code & performance audit of your current site
            </h2>
            <p class="mt-3 text-sm leading-relaxed text-slate-300">
              Thirty minutes with a senior engineer. You leave with a written list of what is slowing you
              down and what it would take to fix — whether or not you hire us.
            </p>
          </div>
          <div class="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col">
            <button
              type="button"
              class="btn-light"
              @click="openLead({ title: 'Get a free audit', subtitle: 'Thirty minutes with a senior engineer, no obligation.' })"
            >
              Get My Free Audit
            </button>
            <RouterLink to="/tools/project-estimator" class="btn inline-flex border border-white/25 text-white hover:bg-white/10">
              Estimate my project
            </RouterLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Link columns -->
    <div class="shell grid gap-10 border-t border-slate-200/80 py-14 md:grid-cols-2 lg:grid-cols-7 dark:border-slate-800">
      <div class="lg:col-span-2">
        <RouterLink to="/"><BrandMark tagline /></RouterLink>
        <p class="mt-5 max-w-xs text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          A full-stack development studio delivering websites, web apps, APIs and AI integrations — built by
          senior engineers who stay on after launch.
        </p>
        <div class="mt-6 space-y-2 text-sm">
          <a
            :href="contact.phoneHref"
            class="block text-slate-600 transition hover:text-indigo-600 dark:text-slate-300"
            >{{ contact.phone }}</a
          >
          <a
            :href="`mailto:${contact.email}`"
            class="block text-slate-600 transition hover:text-indigo-600 dark:text-slate-300"
            >{{ contact.email }}</a
          >
        </div>
        <div class="mt-6 flex gap-3">
          <a
            v-for="s in socials"
            :key="s.label"
            :href="s.href"
            target="_blank"
            rel="noopener"
            :aria-label="s.label"
            class="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-indigo-300 hover:text-indigo-600 dark:border-slate-700 dark:text-slate-400"
          >
            <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path :d="s.path" />
            </svg>
          </a>
        </div>
      </div>

      <div v-for="col in columns" :key="col.title">
        <h3 class="text-[11px] font-semibold tracking-[0.14em] text-slate-400 uppercase">{{ col.title }}</h3>
        <ul class="mt-4 space-y-2.5">
          <li v-for="link in col.links" :key="link.to">
            <RouterLink
              :to="link.to"
              class="text-[13.5px] text-slate-600 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
              >{{ link.label }}</RouterLink
            >
          </li>
          <li v-if="col.extra">
            <RouterLink :to="col.extra.to" class="text-[13.5px] font-semibold text-indigo-600 dark:text-indigo-400"
              >{{ col.extra.label }} →</RouterLink
            >
          </li>
        </ul>
      </div>
    </div>

    <!-- Ratings -->
    <div class="shell flex flex-wrap items-center gap-3 border-t border-slate-200/80 py-6 dark:border-slate-800">
      <span
        v-for="r in ratings"
        :key="r.platform"
        class="chip gap-1.5"
      >
        <span class="font-semibold text-slate-800 dark:text-white">{{ r.platform }}</span>
        <span class="text-indigo-600 dark:text-indigo-400">{{ r.score }}</span>
        <span class="text-slate-400">· {{ r.detail }}</span>
      </span>
    </div>

    <!-- Legal -->
    <div class="border-t border-slate-200/80 py-5 dark:border-slate-800">
      <div class="shell flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p class="text-xs text-slate-400">© {{ year }} Service. All rights reserved.</p>
        <div class="flex gap-5 text-xs text-slate-400">
          <RouterLink to="/privacy" class="transition hover:text-indigo-600">Privacy Policy</RouterLink>
          <RouterLink to="/sitemap" class="transition hover:text-indigo-600">Sitemap</RouterLink>
          <RouterLink to="/faqs" class="transition hover:text-indigo-600">FAQs</RouterLink>
        </div>
      </div>
    </div>
  </footer>
</template>
