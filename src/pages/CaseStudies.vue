<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import PageHero from '../components/PageHero.vue'
import Reveal from '../components/Reveal.vue'
import { caseStudies } from '../data/caseStudies'
import { useUi } from '../composables/useUi'

const { openLead } = useUi()

const sectors = ['All', ...new Set(caseStudies.map((c) => c.industry))]
const active = ref('All')

const filtered = computed(() =>
  active.value === 'All' ? caseStudies : caseStudies.filter((c) => c.industry === active.value),
)
</script>

<template>
  <PageHero
    eyebrow="Case studies"
    title="What changed after we shipped"
    lead="Five projects written up in full: the problem, the decisions we made, and the numbers measured afterwards."
    :crumbs="[{ label: 'Case studies' }]"
  >
    <template #actions>
      <button type="button" class="btn-primary" @click="openLead({ title: 'Start a project' })">
        Start a Project
      </button>
      <RouterLink to="/testimonials" class="btn-outline">Client testimonials</RouterLink>
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

    <div class="mt-10 space-y-6">
      <Reveal v-for="(c, i) in filtered" :key="c.slug" :delay="(i % 2) * 70">
        <RouterLink
          :to="`/case-studies/${c.slug}`"
          class="card card-hover grid gap-8 p-7 sm:p-9 lg:grid-cols-[1.5fr_1fr] lg:items-center"
        >
          <div>
            <div class="flex items-center gap-3">
              <span class="text-xl" aria-hidden="true">{{ c.emoji }}</span>
              <p class="eyebrow">{{ c.client }} · {{ c.industry }}</p>
            </div>
            <h2 class="mt-3 font-display text-2xl leading-snug font-bold text-slate-900 dark:text-white">
              {{ c.title }}
            </h2>
            <p class="mt-3 max-w-2xl text-[14px] leading-relaxed text-slate-500 dark:text-slate-400">
              {{ c.summary }}
            </p>
            <div class="mt-5 flex flex-wrap gap-1.5">
              <span
                v-for="tech in c.stack"
                :key="tech"
                class="rounded-md bg-slate-100 px-2 py-0.5 text-[11.5px] font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-300"
                >{{ tech }}</span
              >
            </div>
            <span class="link-arrow mt-6">Read the full case study <span aria-hidden="true">→</span></span>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div
              v-for="result in c.results"
              :key="result.label"
              class="rounded-xl border border-slate-200/80 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950"
            >
              <p class="font-display text-lg font-bold text-indigo-600 dark:text-indigo-400">{{ result.value }}</p>
              <p class="mt-1 text-[11px] leading-snug text-slate-500 dark:text-slate-400">{{ result.label }}</p>
            </div>
          </div>
        </RouterLink>
      </Reveal>
    </div>
  </section>
</template>
