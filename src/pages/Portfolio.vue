<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import PageHero from '../components/PageHero.vue'
import Reveal from '../components/Reveal.vue'
import { projects } from '../data/portfolio'
import { caseStudies } from '../data/caseStudies'
import { useUi } from '../composables/useUi'

const { openLead } = useUi()

const types = ['All', ...new Set(projects.map((p) => p.serviceUsed))]
const active = ref('All')

const filtered = computed(() =>
  active.value === 'All' ? projects : projects.filter((p) => p.serviceUsed === active.value),
)

const studyFor = (title) => caseStudies.find((c) => title.toLowerCase().includes(c.client.toLowerCase()))
</script>

<template>
  <PageHero
    eyebrow="Portfolio"
    title="Work we have shipped"
    lead="Storefronts, dashboards, assistants and apps — filter by the kind of work you need and open the case study where there is one."
    :crumbs="[{ label: 'Portfolio' }]"
  >
    <template #actions>
      <RouterLink to="/case-studies" class="btn-primary">Read case studies</RouterLink>
      <button type="button" class="btn-outline" @click="openLead({ title: 'Start a project' })">
        Start a Project
      </button>
    </template>
  </PageHero>

  <section class="shell section">
    <div class="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0">
      <button
        v-for="type in types"
        :key="type"
        type="button"
        class="shrink-0 rounded-full border px-4 py-2 text-[13px] font-medium transition"
        :class="
          active === type
            ? 'border-indigo-600 bg-indigo-600 text-white'
            : 'border-slate-200/80 bg-white text-slate-600 hover:border-indigo-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
        "
        @click="active = type"
      >
        {{ type }}
      </button>
    </div>

    <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <Reveal v-for="(p, i) in filtered" :key="p.id" :delay="(i % 3) * 70">
        <article class="card flex h-full flex-col p-6">
          <span class="text-2xl" aria-hidden="true">{{ p.emoji }}</span>
          <h2 class="mt-4 font-display text-[16.5px] leading-snug font-semibold text-slate-900 dark:text-white">
            {{ p.title }}
          </h2>
          <p class="mt-2 flex-1 text-[13.5px] leading-relaxed text-slate-500 dark:text-slate-400">
            {{ p.description }}
          </p>
          <div class="mt-5 flex flex-wrap gap-1.5">
            <span
              v-for="tech in p.technologies"
              :key="tech"
              class="rounded-md bg-slate-100 px-2 py-0.5 text-[11.5px] font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-300"
              >{{ tech }}</span
            >
          </div>
          <div class="mt-5 flex items-center justify-between border-t border-slate-200/80 pt-4 dark:border-slate-800">
            <span class="text-[11px] font-semibold tracking-wide text-indigo-600 uppercase dark:text-indigo-400">
              {{ p.serviceUsed }}
            </span>
            <RouterLink
              v-if="studyFor(p.title)"
              :to="`/case-studies/${studyFor(p.title).slug}`"
              class="text-[12.5px] font-semibold text-slate-500 transition hover:text-indigo-600 dark:text-slate-400"
              >Case study →</RouterLink
            >
          </div>
        </article>
      </Reveal>
    </div>
  </section>
</template>
