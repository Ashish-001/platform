<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import PageHero from '../components/PageHero.vue'
import ServiceCard from '../components/ServiceCard.vue'
import Reveal from '../components/Reveal.vue'
import NotFound from './NotFound.vue'
import { caseStudies, getCaseStudyBySlug } from '../data/caseStudies'
import { getServiceById } from '../data/services'
import { useUi } from '../composables/useUi'

const route = useRoute()
const { openLead } = useUi()

const study = computed(() => getCaseStudyBySlug(route.params.slug))
const usedServices = computed(() =>
  study.value ? study.value.serviceIds.map(getServiceById).filter(Boolean) : [],
)
const others = computed(() => caseStudies.filter((c) => c.slug !== route.params.slug).slice(0, 2))
</script>

<template>
  <NotFound v-if="!study" />

  <template v-else>
    <PageHero
      :eyebrow="`${study.client} · ${study.industry}`"
      :title="study.title"
      :lead="study.summary"
      wide
      :crumbs="[{ to: '/case-studies', label: 'Case studies' }, { label: study.client }]"
    >
      <template #actions>
        <button
          type="button"
          class="btn-primary"
          @click="openLead({ title: 'Start a project like this', subtitle: study.headline })"
        >
          Start Something Similar
        </button>
        <RouterLink :to="`/industries/${study.industrySlug}`" class="btn-outline">
          More {{ study.industry }} work
        </RouterLink>
      </template>

      <template #aside>
        <div class="grid gap-4 sm:grid-cols-4">
          <div v-for="result in study.results" :key="result.label" class="card p-6">
            <p class="font-display text-2xl font-bold text-indigo-600 dark:text-indigo-400">{{ result.value }}</p>
            <p class="mt-1.5 text-[12px] leading-snug text-slate-500 dark:text-slate-400">{{ result.label }}</p>
          </div>
        </div>
      </template>
    </PageHero>

    <section class="shell section grid gap-12 lg:grid-cols-[1.5fr_1fr]">
      <div>
        <Reveal>
          <h2 class="h2 text-3xl">The challenge</h2>
          <p class="mt-5 text-[15px] leading-[1.8] text-slate-600 dark:text-slate-400">{{ study.challenge }}</p>
        </Reveal>

        <Reveal :delay="80">
          <h2 class="h2 mt-14 text-3xl">What we did</h2>
          <ol class="mt-8 space-y-5">
            <li v-for="(step, i) in study.approach" :key="step" class="flex gap-5">
              <span
                class="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-50 font-display text-[12px] font-bold text-indigo-600 dark:bg-slate-800 dark:text-indigo-300"
                >{{ i + 1 }}</span
              >
              <p class="border-b border-slate-200/80 pb-5 text-[14.5px] leading-[1.75] text-slate-600 dark:border-slate-800 dark:text-slate-400">
                {{ step }}
              </p>
            </li>
          </ol>
        </Reveal>

        <Reveal :delay="80">
          <figure class="card mt-14 p-8">
            <span class="font-display text-3xl leading-none text-indigo-300 dark:text-indigo-700">“</span>
            <blockquote class="mt-3 text-[16px] leading-[1.8] text-slate-700 dark:text-slate-200">
              {{ study.quote.text }}
            </blockquote>
            <figcaption class="mt-5 text-[13px] text-slate-500 dark:text-slate-400">
              <span class="font-semibold text-slate-900 dark:text-white">{{ study.quote.author }}</span> ·
              {{ study.quote.role }}
            </figcaption>
          </figure>
        </Reveal>
      </div>

      <aside class="space-y-6 lg:sticky lg:top-24 lg:self-start">
        <div class="card p-7">
          <p class="text-[11px] font-semibold tracking-[0.14em] text-slate-400 uppercase">Stack</p>
          <div class="mt-4 flex flex-wrap gap-1.5">
            <span
              v-for="tech in study.stack"
              :key="tech"
              class="rounded-md bg-slate-100 px-2 py-0.5 text-[11.5px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
              >{{ tech }}</span
            >
          </div>
        </div>

        <div class="card p-7">
          <p class="text-[11px] font-semibold tracking-[0.14em] text-slate-400 uppercase">Headline result</p>
          <p class="mt-3 font-display text-3xl font-bold text-slate-900 dark:text-white">{{ study.headline }}</p>
          <button
            type="button"
            class="btn-primary btn-sm mt-6 w-full"
            @click="openLead({ title: 'Get results like these' })"
          >
            Talk to an Engineer
          </button>
        </div>
      </aside>
    </section>

    <section class="border-y border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900/40">
      <div class="shell section">
        <h2 class="h2 text-3xl">Services used on this project</h2>
        <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ServiceCard v-for="s in usedServices" :key="s.id" :service="s" compact />
        </div>
      </div>
    </section>

    <section class="shell section">
      <h2 class="h2 text-3xl">Read next</h2>
      <div class="mt-10 grid gap-6 md:grid-cols-2">
        <RouterLink
          v-for="c in others"
          :key="c.slug"
          :to="`/case-studies/${c.slug}`"
          class="card card-hover flex flex-col p-7"
        >
          <p class="eyebrow">{{ c.client }} · {{ c.industry }}</p>
          <h3 class="mt-3 font-display text-lg leading-snug font-semibold text-slate-900 dark:text-white">
            {{ c.title }}
          </h3>
          <p class="mt-3 flex-1 text-[13.5px] leading-relaxed text-slate-500 dark:text-slate-400">{{ c.summary }}</p>
          <p class="mt-5 font-display text-xl font-bold text-indigo-600 dark:text-indigo-400">{{ c.headline }}</p>
        </RouterLink>
      </div>
    </section>
  </template>
</template>
