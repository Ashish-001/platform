<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { caseStudies } from '../data/caseStudies'

const items = caseStudies.slice(0, 4)
const activeSlug = ref(items[0].slug)
const active = computed(() => items.find((c) => c.slug === activeSlug.value))
</script>

<template>
  <div>
    <div class="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:px-0">
      <button
        v-for="item in items"
        :key="item.slug"
        type="button"
        class="shrink-0 rounded-xl border px-4 py-2.5 text-[13px] font-semibold transition"
        :class="
          activeSlug === item.slug
            ? 'border-indigo-600 bg-indigo-600 text-white'
            : 'border-slate-200/80 bg-white text-slate-600 hover:border-indigo-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
        "
        :aria-pressed="activeSlug === item.slug"
        @click="activeSlug = item.slug"
      >
        {{ item.client }}
      </button>
    </div>

    <div class="card mt-6 grid gap-8 p-7 sm:p-9 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
      <div>
        <p class="eyebrow">{{ active.industry }}</p>
        <h3 class="mt-3 font-display text-2xl leading-snug font-bold text-slate-900 dark:text-white">
          {{ active.title }}
        </h3>
        <p class="mt-4 text-[15px] leading-relaxed text-slate-600 dark:text-slate-400">{{ active.summary }}</p>
        <div class="mt-6 flex flex-wrap gap-2">
          <span v-for="tech in active.stack" :key="tech" class="chip">{{ tech }}</span>
        </div>
        <div class="mt-7 flex flex-wrap gap-3">
          <RouterLink :to="`/case-studies/${active.slug}`" class="btn-primary btn-sm">View Case Study</RouterLink>
          <RouterLink to="/case-studies" class="btn-outline btn-sm">All Case Studies</RouterLink>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-3 self-start">
        <div
          v-for="result in active.results"
          :key="result.label"
          class="rounded-xl border border-slate-200/80 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950"
        >
          <p class="font-display text-xl font-bold text-indigo-600 dark:text-indigo-400">{{ result.value }}</p>
          <p class="mt-1 text-[11.5px] leading-snug text-slate-500 dark:text-slate-400">{{ result.label }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
