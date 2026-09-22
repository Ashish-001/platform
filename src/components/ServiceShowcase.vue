<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { serviceCategories, servicesInCategory } from '../data/services'

const activeSlug = ref(serviceCategories[0].slug)

const active = computed(() => serviceCategories.find((c) => c.slug === activeSlug.value))
const activeServices = computed(() => servicesInCategory(activeSlug.value))
</script>

<template>
  <div class="grid gap-8 lg:grid-cols-[280px_1fr] lg:gap-12">
    <!-- Category rail -->
    <div class="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0">
      <button
        v-for="cat in serviceCategories"
        :key="cat.slug"
        type="button"
        class="flex shrink-0 items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition lg:w-full"
        :class="
          activeSlug === cat.slug
            ? 'border-indigo-200 bg-indigo-50/70 dark:border-indigo-900 dark:bg-slate-900'
            : 'border-slate-200/80 bg-white hover:border-indigo-200 dark:border-slate-800 dark:bg-slate-900/50'
        "
        :aria-pressed="activeSlug === cat.slug"
        @click="activeSlug = cat.slug"
      >
        <span class="text-lg" aria-hidden="true">{{ cat.icon }}</span>
        <span>
          <span
            class="block text-[13.5px] font-semibold whitespace-nowrap lg:whitespace-normal"
            :class="activeSlug === cat.slug ? 'text-indigo-700 dark:text-indigo-300' : 'text-slate-800 dark:text-white'"
            >{{ cat.name }}</span
          >
          <span class="hidden text-[12px] text-slate-400 lg:block">{{ servicesInCategory(cat.slug).length }} services</span>
        </span>
      </button>
    </div>

    <!-- Panel -->
    <div class="card p-7 sm:p-9">
      <div class="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div class="max-w-xl">
          <h3 class="font-display text-2xl font-bold text-slate-900 dark:text-white">{{ active.name }}</h3>
          <p class="mt-3 text-[15px] leading-relaxed text-slate-600 dark:text-slate-400">
            {{ active.description }}
          </p>
        </div>
        <div
          class="shrink-0 rounded-xl border border-slate-200/80 bg-slate-50 px-5 py-4 text-center dark:border-slate-800 dark:bg-slate-950"
        >
          <p class="font-display text-2xl font-bold text-indigo-600 dark:text-indigo-400">{{ active.stat.value }}</p>
          <p class="mt-1 max-w-[150px] text-[11.5px] leading-snug text-slate-500 dark:text-slate-400">
            {{ active.stat.label }}
          </p>
        </div>
      </div>

      <ul class="mt-7 grid gap-2.5 sm:grid-cols-2">
        <li v-for="outcome in active.outcomes" :key="outcome" class="flex gap-2.5 text-[13.5px] text-slate-600 dark:text-slate-300">
          <span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500"></span>
          <span>{{ outcome }}</span>
        </li>
      </ul>

      <div class="mt-8 border-t border-slate-200/80 pt-6 dark:border-slate-800">
        <p class="text-[11px] font-semibold tracking-[0.14em] text-slate-400 uppercase">Included services</p>
        <div class="mt-4 flex flex-wrap gap-2">
          <RouterLink
            v-for="s in activeServices"
            :key="s.id"
            :to="`/services/${s.id}`"
            class="chip transition hover:border-indigo-300 hover:text-indigo-700 dark:hover:border-indigo-700"
          >
            <span class="mr-1.5" aria-hidden="true">{{ s.icon }}</span>{{ s.title }}
          </RouterLink>
        </div>
        <RouterLink :to="`/services/category/${active.slug}`" class="link-arrow mt-6 inline-flex">
          Discover {{ active.name }} <span aria-hidden="true">→</span>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
