<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import PageHero from '../components/PageHero.vue'
import Reveal from '../components/Reveal.vue'
import { benchmarkReports } from '../data/reports'
import { useUi } from '../composables/useUi'

const { openLead } = useUi()

const sectors = ['All', ...new Set(benchmarkReports.map((r) => r.sector))]
const active = ref('All')

const filtered = computed(() =>
  active.value === 'All' ? benchmarkReports : benchmarkReports.filter((r) => r.sector === active.value),
)

function download(report) {
  openLead({
    title: `Download: ${report.title}`,
    subtitle: 'We will email the PDF within a minute — no follow-up sequence.',
    submitLabel: 'Send Me the PDF',
  })
}
</script>

<template>
  <PageHero
    eyebrow="Benchmark reports"
    title="Sector benchmarks built from real delivery data"
    lead="Seven reports covering build costs, performance, retention, cloud spend and payments — all sourced from projects we shipped rather than surveys."
    :crumbs="[{ label: 'Insights' }, { label: 'Benchmark reports' }]"
  >
    <template #actions>
      <RouterLink to="/insights/report-card" class="btn-primary">See our Report Card</RouterLink>
      <RouterLink to="/tools/project-estimator" class="btn-outline">Estimate my project</RouterLink>
    </template>
  </PageHero>

  <section class="shell section">
    <div class="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0">
      <button
        v-for="sector in sectors"
        :key="sector"
        type="button"
        class="shrink-0 rounded-full border px-4 py-2 text-[13px] font-medium transition"
        :class="
          active === sector
            ? 'border-indigo-600 bg-indigo-600 text-white'
            : 'border-slate-200/80 bg-white text-slate-600 hover:border-indigo-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
        "
        @click="active = sector"
      >
        {{ sector }}
      </button>
    </div>

    <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <Reveal v-for="(report, i) in filtered" :key="report.slug" :delay="(i % 3) * 70">
        <article class="card flex h-full flex-col p-6">
          <div class="flex items-center justify-between">
            <span class="chip">{{ report.sector }}</span>
            <span class="text-[11.5px] text-slate-400">{{ report.pages }} pages · {{ report.updated }}</span>
          </div>
          <h2 class="mt-5 font-display text-[16.5px] leading-snug font-semibold text-slate-900 dark:text-white">
            {{ report.title }}
          </h2>
          <p class="mt-2 text-[13px] leading-relaxed text-slate-500 dark:text-slate-400">{{ report.summary }}</p>
          <ul class="mt-5 flex-1 space-y-2">
            <li
              v-for="item in report.highlights"
              :key="item"
              class="flex gap-2.5 text-[12.5px] text-slate-600 dark:text-slate-300"
            >
              <span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500"></span>
              <span>{{ item }}</span>
            </li>
          </ul>
          <button type="button" class="btn-outline btn-sm mt-6" @click="download(report)">Download PDF</button>
        </article>
      </Reveal>
    </div>
  </section>
</template>
