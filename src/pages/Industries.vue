<script setup>
import { RouterLink } from 'vue-router'
import PageHero from '../components/PageHero.vue'
import Reveal from '../components/Reveal.vue'
import { industries } from '../data/industries'
import { useUi } from '../composables/useUi'

const { openLead } = useUi()
</script>

<template>
  <PageHero
    eyebrow="Industries"
    title="Five sectors we know well enough to warn you"
    lead="Every industry has its own failure modes. These are the five where we have shipped enough to recognise them before they cost you a quarter."
    :crumbs="[{ label: 'Industries' }]"
  >
    <template #actions>
      <button type="button" class="btn-primary" @click="openLead({ title: 'Discuss your sector' })">
        Talk to an Engineer
      </button>
      <RouterLink to="/case-studies" class="btn-outline">See case studies</RouterLink>
    </template>
  </PageHero>

  <section class="shell section space-y-6">
    <Reveal v-for="(ind, i) in industries" :key="ind.slug" :delay="(i % 2) * 70">
      <RouterLink
        :to="`/industries/${ind.slug}`"
        class="card card-hover grid gap-8 p-7 sm:p-9 lg:grid-cols-[1.5fr_1fr] lg:items-center"
      >
        <div>
          <div class="flex items-center gap-3">
            <span class="text-2xl" aria-hidden="true">{{ ind.icon }}</span>
            <h2 class="font-display text-2xl font-bold text-slate-900 dark:text-white">{{ ind.name }}</h2>
          </div>
          <p class="mt-3 text-[15px] font-medium text-indigo-600 dark:text-indigo-400">{{ ind.tagline }}</p>
          <p class="mt-3 max-w-2xl text-[14px] leading-relaxed text-slate-500 dark:text-slate-400">{{ ind.intro }}</p>
          <span class="link-arrow mt-5">Explore {{ ind.name }} <span aria-hidden="true">→</span></span>
        </div>

        <div class="grid grid-cols-3 gap-3">
          <div
            v-for="stat in ind.stats"
            :key="stat.label"
            class="rounded-xl border border-slate-200/80 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950"
          >
            <p class="font-display text-lg font-bold text-slate-900 dark:text-white">{{ stat.value }}</p>
            <p class="mt-1 text-[11px] leading-snug text-slate-500 dark:text-slate-400">{{ stat.label }}</p>
          </div>
        </div>
      </RouterLink>
    </Reveal>
  </section>
</template>
