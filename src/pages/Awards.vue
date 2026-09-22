<script setup>
import { RouterLink } from 'vue-router'
import PageHero from '../components/PageHero.vue'
import Reveal from '../components/Reveal.vue'
import { awards, featuredOn, ratings } from '../data/company'
</script>

<template>
  <PageHero
    eyebrow="Awards & recognition"
    title="Recognition for work you can inspect"
    lead="Every award below is tied to a specific project or an anonymous survey of our own team — both of which we are happy to talk you through."
    :crumbs="[{ label: 'Awards' }]"
  >
    <template #aside>
      <div class="flex flex-wrap gap-3">
        <span v-for="r in ratings" :key="r.platform" class="chip gap-1.5">
          <span class="font-semibold text-slate-800 dark:text-white">{{ r.platform }}</span>
          <span class="text-indigo-600 dark:text-indigo-400">{{ r.score }}</span>
          <span class="text-slate-400">· {{ r.detail }}</span>
        </span>
      </div>
    </template>
  </PageHero>

  <section class="shell section">
    <div class="space-y-4">
      <Reveal v-for="(award, i) in awards" :key="award.title" :delay="(i % 2) * 70">
        <article class="card flex flex-col gap-5 p-7 sm:flex-row sm:items-start">
          <span
            class="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-indigo-50 font-display text-[13px] font-bold text-indigo-600 dark:bg-slate-800 dark:text-indigo-300"
            >{{ award.year }}</span
          >
          <div>
            <h2 class="font-display text-lg leading-snug font-semibold text-slate-900 dark:text-white">
              {{ award.title }}
            </h2>
            <p class="mt-1 text-[12.5px] font-semibold text-indigo-600 dark:text-indigo-400">{{ award.org }}</p>
            <p class="mt-3 max-w-2xl text-[13.5px] leading-relaxed text-slate-500 dark:text-slate-400">
              {{ award.body }}
            </p>
          </div>
        </article>
      </Reveal>
    </div>

    <Reveal :delay="100">
      <div class="card mt-10 p-8">
        <p class="text-[11px] font-semibold tracking-[0.14em] text-slate-400 uppercase">As featured on</p>
        <div class="mt-5 flex flex-wrap gap-2.5">
          <span v-for="name in featuredOn" :key="name" class="chip">{{ name }}</span>
        </div>
        <p class="mt-6 text-[13.5px] leading-relaxed text-slate-500 dark:text-slate-400">
          Prefer proof over plaques? The
          <RouterLink to="/insights/report-card" class="font-semibold text-indigo-600 dark:text-indigo-400"
            >Engineering Report Card</RouterLink
          >
          publishes our delivery metrics, and the
          <RouterLink to="/case-studies" class="font-semibold text-indigo-600 dark:text-indigo-400"
            >case studies</RouterLink
          >
          carry the numbers behind each award.
        </p>
      </div>
    </Reveal>
  </section>
</template>
