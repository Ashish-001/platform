<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  service: { type: Object, required: true },
})
</script>

<template>
  <RouterLink
    :to="`/services/${service.id}`"
    class="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-700 dark:hover:shadow-indigo-950"
  >
    <span class="text-3xl">{{ service.icon }}</span>
    <h3 class="mt-4 font-display text-lg font-semibold text-slate-900 dark:text-white">
      {{ service.title }}
    </h3>
    <p class="mt-2 flex-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
      {{ service.shortDesc }}
    </p>
    <div class="mt-4 flex flex-wrap gap-1.5">
      <span
        v-for="tech in service.technologies.slice(0, 3)"
        :key="tech"
        class="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
      >
        {{ tech }}
      </span>
    </div>
    <span class="mt-5 text-sm font-semibold text-indigo-600 transition group-hover:translate-x-1 dark:text-indigo-400">
      Learn more →
    </span>
  </RouterLink>
</template>
