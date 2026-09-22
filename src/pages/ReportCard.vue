<script setup>
import { RouterLink } from 'vue-router'
import PageHero from '../components/PageHero.vue'
import Reveal from '../components/Reveal.vue'
import LogoWall from '../components/LogoWall.vue'
import { reportCard } from '../data/reports'
import { caseStudies } from '../data/caseStudies'
import { useUi } from '../composables/useUi'

const { openLead } = useUi()

function download() {
  openLead({
    title: 'Download the Report Card',
    subtitle: 'The full FY 2025–26 breakdown, including per-project delivery data.',
    submitLabel: 'Send Me the Report',
  })
}
</script>

<template>
  <PageHero
    :eyebrow="`New · ${reportCard.label}`"
    :title="reportCard.headline"
    :lead="reportCard.intro"
    :crumbs="[{ label: 'Insights' }, { label: 'Report Card' }]"
  >
    <template #actions>
      <button type="button" class="btn-primary" @click="download">Download Report Card</button>
      <RouterLink to="/insights/reports" class="btn-outline">Benchmark reports</RouterLink>
    </template>
  </PageHero>

  <section class="shell section">
    <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <Reveal v-for="(stat, i) in reportCard.stats" :key="stat.label" :delay="(i % 3) * 70">
        <div class="card h-full p-7">
          <p class="font-display text-4xl font-bold text-slate-900 dark:text-white">{{ stat.value }}</p>
          <p class="mt-3 text-[13.5px] leading-relaxed text-slate-500 dark:text-slate-400">{{ stat.label }}</p>
        </div>
      </Reveal>
    </div>

    <Reveal :delay="100">
      <div class="card mt-10 p-8 sm:p-10">
        <h2 class="h3 text-xl">Also worth publishing</h2>
        <ul class="mt-6 space-y-3">
          <li
            v-for="item in reportCard.highlights"
            :key="item"
            class="flex gap-3 text-[14.5px] leading-relaxed text-slate-600 dark:text-slate-300"
          >
            <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500"></span>
            <span>{{ item }}</span>
          </li>
        </ul>
      </div>
    </Reveal>
  </section>

  <section class="border-y border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900/40">
    <div class="shell section">
      <h2 class="h2 text-3xl">Where those numbers came from</h2>
      <p class="lead mt-4 max-w-2xl">
        Every metric above is aggregated from client projects delivered this financial year. Five of them are
        written up in full.
      </p>
      <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <RouterLink
          v-for="c in caseStudies"
          :key="c.slug"
          :to="`/case-studies/${c.slug}`"
          class="card card-hover flex flex-col p-6"
        >
          <p class="eyebrow">{{ c.client }}</p>
          <p class="mt-3 font-display text-2xl font-bold text-indigo-600 dark:text-indigo-400">{{ c.headline }}</p>
          <p class="mt-3 flex-1 text-[13px] leading-relaxed text-slate-500 dark:text-slate-400">{{ c.summary }}</p>
          <span class="link-arrow mt-5">Case study <span aria-hidden="true">→</span></span>
        </RouterLink>
      </div>
    </div>
  </section>

  <section class="shell section">
    <p class="text-center text-[11px] font-semibold tracking-[0.16em] text-slate-400 uppercase">
      Clients represented in this year’s data
    </p>
    <div class="mt-8">
      <LogoWall />
    </div>
  </section>
</template>
