<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  service: { type: Object, required: true },
  compact: { type: Boolean, default: false },
})
</script>

<template>
  <RouterLink :to="`/services/${service.id}`" class="card card-hover group flex flex-col p-6">
    <div class="flex items-start justify-between gap-3">
      <span
        class="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-xl dark:bg-slate-800"
        aria-hidden="true"
        >{{ service.icon }}</span
      >
      <span class="text-[11px] font-semibold tracking-wide text-slate-400 uppercase">{{ service.priceRange }}</span>
    </div>

    <h3 class="mt-5 font-display text-[17px] leading-snug font-semibold text-slate-900 dark:text-white">
      {{ service.title }}
    </h3>
    <p class="mt-2 flex-1 text-[13.5px] leading-relaxed text-slate-500 dark:text-slate-400">
      {{ service.shortDesc }}
    </p>

    <div v-if="!compact" class="mt-5 flex flex-wrap gap-1.5">
      <span
        v-for="tech in service.technologies.slice(0, 3)"
        :key="tech"
        class="rounded-md bg-slate-100 px-2 py-0.5 text-[11.5px] font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-300"
      >
        {{ tech }}
      </span>
    </div>

    <span class="link-arrow mt-5">
      Learn more <span aria-hidden="true" class="transition group-hover:translate-x-0.5">→</span>
    </span>
  </RouterLink>
</template>
