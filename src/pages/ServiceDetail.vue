<script setup>
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { services, getServiceById } from '../data/services'
import ServiceCard from '../components/ServiceCard.vue'

const route = useRoute()
const service = computed(() => getServiceById(route.params.id))

const related = computed(() =>
  services.filter((s) => s.id !== route.params.id).slice(0, 3),
)
</script>

<template>
  <section v-if="service" class="mx-auto max-w-7xl px-4 py-16 sm:px-6">
    <RouterLink to="/services" class="text-sm font-medium text-indigo-600 dark:text-indigo-400"
      >← All services</RouterLink
    >

    <div class="mt-8 grid gap-12 lg:grid-cols-3">
      <!-- Main -->
      <div class="lg:col-span-2">
        <span class="text-5xl">{{ service.icon }}</span>
        <h1 class="mt-5 font-display text-4xl font-bold text-slate-900 dark:text-white">
          {{ service.title }}
        </h1>
        <p class="mt-5 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
          {{ service.longDesc }}
        </p>

        <h2 class="mt-10 font-display text-xl font-semibold text-slate-900 dark:text-white">
          What's included
        </h2>
        <ul class="mt-4 grid gap-3 sm:grid-cols-2">
          <li
            v-for="f in service.features"
            :key="f"
            class="flex items-start gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
          >
            <span class="text-emerald-500">✓</span> {{ f }}
          </li>
        </ul>

        <h2 class="mt-10 font-display text-xl font-semibold text-slate-900 dark:text-white">
          Technologies we use
        </h2>
        <div class="mt-4 flex flex-wrap gap-2">
          <span
            v-for="tech in service.technologies"
            :key="tech"
            class="rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300"
          >
            {{ tech }}
          </span>
        </div>
      </div>

      <!-- Sidebar -->
      <aside>
        <div
          class="sticky top-24 rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900"
        >
          <p class="text-sm text-slate-500 dark:text-slate-400">Typical budget</p>
          <p class="mt-1 font-display text-2xl font-bold text-slate-900 dark:text-white">
            {{ service.priceRange }}
          </p>
          <p class="mt-3 text-xs text-slate-500 dark:text-slate-400">
            Final pricing depends on scope — every quote is fixed before we start.
          </p>
          <RouterLink
            :to="{ path: '/contact', query: { service: service.title } }"
            class="mt-6 block rounded-lg bg-indigo-600 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-indigo-500"
          >
            Request a Quote
          </RouterLink>
        </div>
      </aside>
    </div>

    <!-- Related -->
    <div class="mt-20">
      <h2 class="font-display text-2xl font-bold text-slate-900 dark:text-white">Related services</h2>
      <div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <ServiceCard v-for="s in related" :key="s.id" :service="s" />
      </div>
    </div>
  </section>

  <!-- Not found fallback -->
  <section v-else class="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6">
    <h1 class="font-display text-3xl font-bold text-slate-900 dark:text-white">Service not found</h1>
    <RouterLink to="/services" class="mt-4 inline-block text-indigo-600 dark:text-indigo-400"
      >← Back to all services</RouterLink
    >
  </section>
</template>
