<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="mx-auto max-w-7xl px-4 py-32 text-center sm:px-6">
    <p class="font-display text-7xl font-bold text-indigo-200 dark:text-indigo-900">404</p>
    <h1 class="mt-4 font-display text-3xl font-bold text-slate-900 dark:text-white">Page not found</h1>
    <p class="mt-3 text-slate-500 dark:text-slate-400">The page you're looking for doesn't exist.</p>
    <RouterLink
      to="/"
      class="mt-8 inline-block rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
    >
      Back to Home
    </RouterLink>
  </section>
</template>
