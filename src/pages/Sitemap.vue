<script setup>
import { RouterLink } from 'vue-router'
import PageHero from '../components/PageHero.vue'
import { serviceCategories, services } from '../data/services'
import { industries } from '../data/industries'
import { caseStudies } from '../data/caseStudies'
import { sortedPosts } from '../data/blog'

const groups = [
  {
    title: 'Main',
    links: [
      { to: '/', label: 'Home' },
      { to: '/services', label: 'All services' },
      { to: '/industries', label: 'Industries' },
      { to: '/portfolio', label: 'Portfolio' },
      { to: '/case-studies', label: 'Case studies' },
      { to: '/testimonials', label: 'Testimonials' },
      { to: '/contact', label: 'Contact' },
    ],
  },
  {
    title: 'Service categories',
    links: serviceCategories.map((c) => ({ to: `/services/category/${c.slug}`, label: c.name })),
  },
  {
    title: 'Services',
    links: services.map((s) => ({ to: `/services/${s.id}`, label: s.title })),
  },
  {
    title: 'Industries',
    links: industries.map((i) => ({ to: `/industries/${i.slug}`, label: i.name })),
  },
  {
    title: 'Case studies',
    links: caseStudies.map((c) => ({ to: `/case-studies/${c.slug}`, label: c.client })),
  },
  {
    title: 'Insights & tools',
    links: [
      { to: '/insights/report-card', label: 'Engineering Report Card' },
      { to: '/insights/reports', label: 'Benchmark reports' },
      { to: '/tools/project-estimator', label: 'Project cost estimator' },
      { to: '/faqs', label: 'FAQs' },
      { to: '/blog', label: 'Blog' },
    ],
  },
  {
    title: 'Blog posts',
    links: sortedPosts.map((p) => ({ to: `/blog/${p.slug}`, label: p.title })),
  },
  {
    title: 'Company',
    links: [
      { to: '/about', label: 'About us' },
      { to: '/careers', label: 'Careers' },
      { to: '/awards', label: 'Awards & recognition' },
      { to: '/press', label: 'Press releases' },
      { to: '/privacy', label: 'Privacy policy' },
    ],
  },
]
</script>

<template>
  <PageHero
    eyebrow="Sitemap"
    title="Every page on this site"
    lead="All routes in one place — useful for you, and for the crawlers."
    :crumbs="[{ label: 'Sitemap' }]"
  />

  <section class="shell section grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
    <div v-for="group in groups" :key="group.title">
      <h2 class="text-[11px] font-semibold tracking-[0.14em] text-slate-400 uppercase">{{ group.title }}</h2>
      <ul class="mt-4 space-y-2.5">
        <li v-for="link in group.links" :key="link.to">
          <RouterLink
            :to="link.to"
            class="text-[13.5px] text-slate-600 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
            >{{ link.label }}</RouterLink
          >
        </li>
      </ul>
    </div>
  </section>
</template>
