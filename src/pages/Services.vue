<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import PageHero from '../components/PageHero.vue'
import ServiceCard from '../components/ServiceCard.vue'
import Reveal from '../components/Reveal.vue'
import { serviceCategories, services, servicesInCategory } from '../data/services'
import { useUi } from '../composables/useUi'

const { openLead } = useUi()
const active = ref('all')

const shown = computed(() =>
  (active.value === 'all' ? serviceCategories : serviceCategories.filter((c) => c.slug === active.value)).map(
    (cat) => ({ ...cat, items: servicesInCategory(cat.slug) }),
  ),
)
</script>

<template>
  <PageHero
    eyebrow="Services"
    title="Fifteen ways we help you build, launch and grow"
    lead="Organised into four categories so you can find the work you need and see what it costs before you talk to anyone."
    :crumbs="[{ label: 'Services' }]"
  >
    <template #actions>
      <button type="button" class="btn-primary" @click="openLead({ title: 'Talk through your project' })">
        Talk to an Engineer
      </button>
      <RouterLink to="/tools/project-estimator" class="btn-outline">Estimate My Project</RouterLink>
    </template>
  </PageHero>

  <section class="shell section">
    <!-- Category filter -->
    <div class="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0">
      <button
        type="button"
        class="shrink-0 rounded-full border px-4 py-2 text-[13px] font-medium transition"
        :class="
          active === 'all'
            ? 'border-indigo-600 bg-indigo-600 text-white'
            : 'border-slate-200/80 bg-white text-slate-600 hover:border-indigo-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
        "
        @click="active = 'all'"
      >
        All services
        <span class="ml-1.5 text-[11.5px] opacity-70">{{ services.length }}</span>
      </button>
      <button
        v-for="cat in serviceCategories"
        :key="cat.slug"
        type="button"
        class="shrink-0 rounded-full border px-4 py-2 text-[13px] font-medium transition"
        :class="
          active === cat.slug
            ? 'border-indigo-600 bg-indigo-600 text-white'
            : 'border-slate-200/80 bg-white text-slate-600 hover:border-indigo-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
        "
        @click="active = cat.slug"
      >
        <span class="mr-1" aria-hidden="true">{{ cat.icon }}</span>{{ cat.name }}
        <span class="ml-1.5 text-[11.5px] opacity-70">{{ servicesInCategory(cat.slug).length }}</span>
      </button>
    </div>

    <!-- Grouped services -->
    <div v-for="group in shown" :key="group.slug" class="mt-14">
      <Reveal>
        <div class="flex flex-col gap-4 border-b border-slate-200/80 pb-6 sm:flex-row sm:items-end sm:justify-between dark:border-slate-800">
          <div class="max-w-2xl">
            <div class="flex items-center gap-3">
              <span class="text-xl" aria-hidden="true">{{ group.icon }}</span>
              <h2 class="font-display text-2xl font-bold text-slate-900 dark:text-white">{{ group.name }}</h2>
            </div>
            <p class="mt-2 text-[14.5px] leading-relaxed text-slate-500 dark:text-slate-400">{{ group.tagline }}</p>
          </div>
          <RouterLink :to="`/services/category/${group.slug}`" class="link-arrow shrink-0">
            Category overview <span aria-hidden="true">→</span>
          </RouterLink>
        </div>
      </Reveal>

      <div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Reveal v-for="(s, i) in group.items" :key="s.id" :delay="(i % 3) * 70">
          <ServiceCard :service="s" />
        </Reveal>
      </div>
    </div>
  </section>
</template>
