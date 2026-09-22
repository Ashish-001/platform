<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  eyebrow: { type: String, default: '' },
  title: { type: String, required: true },
  lead: { type: String, default: '' },
  crumbs: { type: Array, default: () => [] },
  wide: { type: Boolean, default: false },
})
</script>

<template>
  <section class="relative overflow-hidden border-b border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-950">
    <div class="texture-grid pointer-events-none absolute inset-0"></div>
    <div class="shell relative py-14 sm:py-20">
      <nav v-if="crumbs.length" class="flex flex-wrap items-center gap-2 text-[12px] text-slate-400" aria-label="Breadcrumb">
        <RouterLink to="/" class="transition hover:text-indigo-600">Home</RouterLink>
        <template v-for="crumb in crumbs" :key="crumb.label">
          <span aria-hidden="true">/</span>
          <RouterLink v-if="crumb.to" :to="crumb.to" class="transition hover:text-indigo-600">{{ crumb.label }}</RouterLink>
          <span v-else class="text-slate-500 dark:text-slate-300">{{ crumb.label }}</span>
        </template>
      </nav>

      <div :class="wide ? 'max-w-4xl' : 'max-w-3xl'" class="mt-6">
        <p v-if="eyebrow" class="eyebrow">{{ eyebrow }}</p>
        <h1 class="h1" :class="eyebrow && 'mt-3'">{{ title }}</h1>
        <p v-if="lead" class="lead mt-5">{{ lead }}</p>
        <div v-if="$slots.actions" class="mt-8 flex flex-wrap gap-3">
          <slot name="actions" />
        </div>
      </div>

      <div v-if="$slots.aside" class="mt-10">
        <slot name="aside" />
      </div>
    </div>
  </section>
</template>
