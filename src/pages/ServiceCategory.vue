<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import PageHero from '../components/PageHero.vue'
import ServiceCard from '../components/ServiceCard.vue'
import Reveal from '../components/Reveal.vue'
import NotFound from './NotFound.vue'
import { getCategoryBySlug, servicesInCategory } from '../data/services'
import { caseStudies } from '../data/caseStudies'
import { useUi } from '../composables/useUi'

const route = useRoute()
const { openLead } = useUi()

const category = computed(() => getCategoryBySlug(route.params.slug))
const items = computed(() => (category.value ? servicesInCategory(category.value.slug) : []))
const related = computed(() =>
  caseStudies.filter((c) => c.serviceIds.some((id) => items.value.some((s) => s.id === id))).slice(0, 2),
)
</script>

<template>
  <NotFound v-if="!category" />

  <template v-else>
    <PageHero
      :eyebrow="`${items.length} services`"
      :title="category.name"
      :lead="category.description"
      :crumbs="[{ to: '/services', label: 'Services' }, { label: category.name }]"
    >
      <template #actions>
        <button
          type="button"
          class="btn-primary"
          @click="openLead({ title: `Discuss ${category.name}`, subtitle: category.tagline })"
        >
          Speak to an Engineer
        </button>
        <RouterLink to="/case-studies" class="btn-outline">See the proof</RouterLink>
      </template>

      <template #aside>
        <div class="grid gap-5 sm:grid-cols-3">
          <div class="card p-6 sm:col-span-1">
            <p class="font-display text-3xl font-bold text-indigo-600 dark:text-indigo-400">
              {{ category.stat.value }}
            </p>
            <p class="mt-1.5 text-[12.5px] leading-snug text-slate-500 dark:text-slate-400">
              {{ category.stat.label }}
            </p>
          </div>
          <div class="card p-6 sm:col-span-2">
            <p class="text-[11px] font-semibold tracking-[0.14em] text-slate-400 uppercase">What you get</p>
            <ul class="mt-4 space-y-2">
              <li
                v-for="outcome in category.outcomes"
                :key="outcome"
                class="flex gap-2.5 text-[13.5px] text-slate-600 dark:text-slate-300"
              >
                <span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500"></span>
                <span>{{ outcome }}</span>
              </li>
            </ul>
          </div>
        </div>
      </template>
    </PageHero>

    <section class="shell section">
      <h2 class="h2 text-3xl">Services in this category</h2>
      <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Reveal v-for="(s, i) in items" :key="s.id" :delay="(i % 3) * 70">
          <ServiceCard :service="s" />
        </Reveal>
      </div>
    </section>

    <section v-if="related.length" class="border-t border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900/40">
      <div class="shell section">
        <h2 class="h2 text-3xl">Related case studies</h2>
        <div class="mt-10 grid gap-6 md:grid-cols-2">
          <RouterLink
            v-for="c in related"
            :key="c.slug"
            :to="`/case-studies/${c.slug}`"
            class="card card-hover flex flex-col p-7"
          >
            <p class="eyebrow">{{ c.industry }}</p>
            <h3 class="mt-3 font-display text-lg leading-snug font-semibold text-slate-900 dark:text-white">
              {{ c.title }}
            </h3>
            <p class="mt-3 flex-1 text-[13.5px] leading-relaxed text-slate-500 dark:text-slate-400">
              {{ c.summary }}
            </p>
            <p class="mt-5 font-display text-xl font-bold text-indigo-600 dark:text-indigo-400">{{ c.headline }}</p>
          </RouterLink>
        </div>
      </div>
    </section>
  </template>
</template>
