<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import PageHero from '../components/PageHero.vue'
import ServiceCard from '../components/ServiceCard.vue'
import Reveal from '../components/Reveal.vue'
import NotFound from './NotFound.vue'
import { getIndustryBySlug, industries } from '../data/industries'
import { getServiceById } from '../data/services'
import { getCaseStudyBySlug } from '../data/caseStudies'
import { useUi } from '../composables/useUi'

const route = useRoute()
const { openLead } = useUi()

const industry = computed(() => getIndustryBySlug(route.params.slug))
const industryServices = computed(() =>
  industry.value ? industry.value.serviceIds.map(getServiceById).filter(Boolean) : [],
)
const study = computed(() => (industry.value ? getCaseStudyBySlug(industry.value.caseStudySlug) : null))
const others = computed(() => industries.filter((i) => i.slug !== route.params.slug))
</script>

<template>
  <NotFound v-if="!industry" />

  <template v-else>
    <PageHero
      :eyebrow="`Industry · ${industry.name}`"
      :title="industry.tagline"
      :lead="industry.intro"
      :crumbs="[{ to: '/industries', label: 'Industries' }, { label: industry.name }]"
    >
      <template #actions>
        <button
          type="button"
          class="btn-primary"
          @click="openLead({ title: `${industry.name} project enquiry`, subtitle: industry.tagline })"
        >
          Speak to an Engineer
        </button>
        <RouterLink v-if="study" :to="`/case-studies/${study.slug}`" class="btn-outline">
          Read the {{ study.client }} case study
        </RouterLink>
      </template>

      <template #aside>
        <div class="grid gap-5 sm:grid-cols-3">
          <div v-for="stat in industry.stats" :key="stat.label" class="card p-6">
            <p class="font-display text-2xl font-bold text-indigo-600 dark:text-indigo-400">{{ stat.value }}</p>
            <p class="mt-1.5 text-[12.5px] leading-snug text-slate-500 dark:text-slate-400">{{ stat.label }}</p>
          </div>
        </div>
      </template>
    </PageHero>

    <section class="shell section grid gap-12 lg:grid-cols-2">
      <Reveal>
        <h2 class="h2 text-3xl">What usually goes wrong</h2>
        <ul class="mt-8 space-y-4">
          <li v-for="item in industry.challenges" :key="item" class="card flex gap-3 p-5">
            <span class="mt-0.5 text-amber-500" aria-hidden="true">!</span>
            <span class="text-[13.5px] leading-relaxed text-slate-700 dark:text-slate-300">{{ item }}</span>
          </li>
        </ul>
      </Reveal>

      <Reveal :delay="80">
        <h2 class="h2 text-3xl">How we approach it</h2>
        <ul class="mt-8 space-y-4">
          <li v-for="item in industry.approach" :key="item" class="card flex gap-3 p-5">
            <span class="mt-0.5 text-indigo-600 dark:text-indigo-400" aria-hidden="true">✓</span>
            <span class="text-[13.5px] leading-relaxed text-slate-700 dark:text-slate-300">{{ item }}</span>
          </li>
        </ul>
      </Reveal>
    </section>

    <section class="border-y border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900/40">
      <div class="shell section">
        <h2 class="h2 text-3xl">Services we bring to {{ industry.name }}</h2>
        <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <ServiceCard v-for="s in industryServices" :key="s.id" :service="s" compact />
        </div>
      </div>
    </section>

    <section v-if="study" class="shell section">
      <div class="card grid gap-8 p-8 sm:p-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
        <div>
          <p class="eyebrow">Case study · {{ study.client }}</p>
          <h2 class="h2 mt-3 text-3xl">{{ study.title }}</h2>
          <p class="mt-4 text-[15px] leading-relaxed text-slate-600 dark:text-slate-400">{{ study.summary }}</p>
          <RouterLink :to="`/case-studies/${study.slug}`" class="btn-primary mt-7">Read the full story</RouterLink>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div
            v-for="result in study.results"
            :key="result.label"
            class="rounded-xl border border-slate-200/80 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950"
          >
            <p class="font-display text-lg font-bold text-indigo-600 dark:text-indigo-400">{{ result.value }}</p>
            <p class="mt-1 text-[11px] leading-snug text-slate-500 dark:text-slate-400">{{ result.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="shell pb-20">
      <p class="text-[11px] font-semibold tracking-[0.14em] text-slate-400 uppercase">Other industries</p>
      <div class="mt-5 flex flex-wrap gap-2">
        <RouterLink
          v-for="other in others"
          :key="other.slug"
          :to="`/industries/${other.slug}`"
          class="chip transition hover:border-indigo-300 hover:text-indigo-700 dark:hover:border-indigo-700"
        >
          <span class="mr-1.5" aria-hidden="true">{{ other.icon }}</span>{{ other.name }}
        </RouterLink>
      </div>
    </section>
  </template>
</template>
