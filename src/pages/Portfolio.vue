<script setup>
import { ref, computed } from 'vue'
import { projects } from '../data/portfolio'

const filters = ['All', ...new Set(projects.map((p) => p.serviceUsed))]
const active = ref('All')

const filtered = computed(() =>
  active.value === 'All' ? projects : projects.filter((p) => p.serviceUsed === active.value),
)
</script>

<template>
  <section class="mx-auto max-w-7xl px-4 py-16 sm:px-6">
    <div class="max-w-2xl">
      <h1 class="font-display text-4xl font-bold text-slate-900 dark:text-white">Portfolio</h1>
      <p class="mt-4 text-lg text-slate-600 dark:text-slate-400">
        Real projects, real results. Filter by the type of work you're interested in.
      </p>
    </div>

    <!-- Filters -->
    <div class="mt-8 flex flex-wrap gap-2">
      <button
        v-for="f in filters"
        :key="f"
        @click="active = f"
        class="rounded-full border px-4 py-1.5 text-sm font-medium transition"
        :class="
          active === f
            ? 'border-indigo-600 bg-indigo-600 text-white'
            : 'border-slate-300 text-slate-600 hover:border-indigo-400 dark:border-slate-700 dark:text-slate-300'
        "
      >
        {{ f }}
      </button>
    </div>

    <!-- Grid -->
    <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <article
        v-for="p in filtered"
        :key="p.id"
        class="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
      >
        <span class="text-4xl">{{ p.emoji }}</span>
        <h3 class="mt-4 font-display text-lg font-semibold text-slate-900 dark:text-white">
          {{ p.title }}
        </h3>
        <p class="mt-2 flex-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          {{ p.description }}
        </p>
        <div class="mt-4 flex flex-wrap gap-1.5">
          <span
            v-for="tech in p.technologies"
            :key="tech"
            class="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
          >
            {{ tech }}
          </span>
        </div>
        <p class="mt-4 text-xs font-semibold tracking-wide text-indigo-600 uppercase dark:text-indigo-400">
          {{ p.serviceUsed }}
        </p>
      </article>
    </div>
  </section>
</template>
