<script setup>
import ServiceCard from '../components/ServiceCard.vue'
import { services } from '../data/services'
</script>

<template>
  <section class="mx-auto max-w-7xl px-4 py-16 sm:px-6">
    <div class="max-w-2xl">
      <h1 class="font-display text-4xl font-bold text-slate-900 dark:text-white">Our Services</h1>
      <p class="mt-4 text-lg text-slate-600 dark:text-slate-400">
        Fifteen ways we can help you build, launch and grow — each backed by real projects and an
        experienced team.
      </p>
    </div>
    <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <ServiceCard v-for="s in services" :key="s.id" :service="s" />
    </div>
  </section>
</template>
