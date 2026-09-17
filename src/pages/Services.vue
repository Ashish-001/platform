<script setup>
import { ref, computed } from 'vue'
import ServiceCard from '../components/ServiceCard.vue'
import { services, categories } from '../data/services'

const active = ref('All')

const categoryMeta = {
  'Core Development': { icon: '🧱', desc: 'Websites, apps, APIs and stores — built from scratch.' },
  'Backend & Infrastructure': { icon: '🏗️', desc: 'Servers, databases and cloud that scale with you.' },
  'AI & Automation': { icon: '⚡', desc: 'AI features, integrations and workflows that save time.' },
  'Growth & Maintenance': { icon: '📈', desc: 'Design, SEO and long-term care for what you ship.' },
}

const grouped = computed(() => {
  const shown = active.value === 'All' ? categories : [active.value]
  return shown.map((cat) => ({
    name: cat,
    ...categoryMeta[cat],
    items: services.filter((s) => s.category === cat),
  }))
})

const countFor = (cat) =>
  cat === 'All' ? services.length : services.filter((s) => s.category === cat).length
</script>

<template>
  <section class="mx-auto max-w-7xl px-4 py-16 sm:px-6">
    <div class="max-w-2xl">
      <h1 class="font-display text-4xl font-bold text-slate-900 dark:text-white">Our Services</h1>
      <p class="mt-4 text-lg text-slate-600 dark:text-slate-400">
        Fifteen ways we can help you build, launch and grow — organized into four categories, each
        backed by real projects and an experienced team.
      </p>
    </div>

    <!-- Category overview -->
    <div class="mt-10 flex flex-wrap gap-2">
      <button
        v-for="cat in ['All', ...categories]"
        :key="cat"
        @click="active = cat"
        class="rounded-full border px-4 py-2 text-sm font-medium transition"
        :class="
          active === cat
            ? 'border-indigo-600 bg-indigo-600 text-white'
            : 'border-slate-300 text-slate-600 hover:border-indigo-400 hover:text-indigo-600 dark:border-slate-700 dark:text-slate-300 dark:hover:border-indigo-500'
        "
      >
        <span v-if="cat !== 'All'" class="mr-1">{{ categoryMeta[cat].icon }}</span>
        {{ cat }}
        <span
          class="ml-1.5 rounded-full px-1.5 py-0.5 text-xs"
          :class="active === cat ? 'bg-white/20' : 'bg-slate-100 dark:bg-slate-800'"
        >
          {{ countFor(cat) }}
        </span>
      </button>
    </div>

    <!-- Grouped sections -->
    <div v-for="group in grouped" :key="group.name" class="mt-14">
      <div class="flex items-center gap-3">
        <span class="text-2xl">{{ group.icon }}</span>
        <div>
          <h2 class="font-display text-2xl font-bold text-slate-900 dark:text-white">
            {{ group.name }}
          </h2>
          <p class="text-sm text-slate-500 dark:text-slate-400">{{ group.desc }}</p>
        </div>
      </div>
      <div class="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <ServiceCard v-for="s in group.items" :key="s.id" :service="s" />
      </div>
    </div>
  </section>
</template>
