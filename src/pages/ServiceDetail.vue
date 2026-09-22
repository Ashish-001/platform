<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import PageHero from '../components/PageHero.vue'
import ServiceCard from '../components/ServiceCard.vue'
import ContactForm from '../components/ContactForm.vue'
import Reveal from '../components/Reveal.vue'
import NotFound from './NotFound.vue'
import { getCategoryBySlug, getServiceById, servicesInCategory } from '../data/services'
import { caseStudies } from '../data/caseStudies'
import { process } from '../data/team'
import { useUi } from '../composables/useUi'

const route = useRoute()
const { openLead } = useUi()

const service = computed(() => getServiceById(route.params.id))
const category = computed(() => (service.value ? getCategoryBySlug(service.value.categorySlug) : null))
const related = computed(() =>
  service.value ? servicesInCategory(service.value.categorySlug).filter((s) => s.id !== service.value.id).slice(0, 3) : [],
)
const proof = computed(() =>
  service.value ? caseStudies.filter((c) => c.serviceIds.includes(service.value.id)).slice(0, 2) : [],
)
</script>

<template>
  <NotFound v-if="!service" />

  <template v-else>
    <PageHero
      :eyebrow="service.category"
      :title="service.title"
      :lead="service.longDesc"
      :crumbs="[
        { to: '/services', label: 'Services' },
        { to: `/services/category/${service.categorySlug}`, label: service.category },
        { label: service.title },
      ]"
    >
      <template #actions>
        <button
          type="button"
          class="btn-primary"
          @click="openLead({ title: `Enquire about ${service.title}`, subtitle: service.shortDesc })"
        >
          Request a Quote
        </button>
        <RouterLink to="/tools/project-estimator" class="btn-outline">Estimate cost</RouterLink>
      </template>

      <template #aside>
        <div class="grid gap-5 sm:grid-cols-3">
          <div class="card p-6">
            <p class="text-[11px] font-semibold tracking-[0.14em] text-slate-400 uppercase">Typical investment</p>
            <p class="mt-3 font-display text-2xl font-bold text-slate-900 dark:text-white">{{ service.priceRange }}</p>
          </div>
          <div class="card p-6">
            <p class="text-[11px] font-semibold tracking-[0.14em] text-slate-400 uppercase">Typical timeline</p>
            <p class="mt-3 font-display text-2xl font-bold text-slate-900 dark:text-white">{{ service.timeline }}</p>
          </div>
          <div class="card p-6">
            <p class="text-[11px] font-semibold tracking-[0.14em] text-slate-400 uppercase">Stack</p>
            <div class="mt-3 flex flex-wrap gap-1.5">
              <span
                v-for="tech in service.technologies"
                :key="tech"
                class="rounded-md bg-slate-100 px-2 py-0.5 text-[11.5px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                >{{ tech }}</span
              >
            </div>
          </div>
        </div>
      </template>
    </PageHero>

    <section class="shell section grid gap-12 lg:grid-cols-[1.4fr_1fr]">
      <div>
        <Reveal>
          <h2 class="h2 text-3xl">What is included</h2>
          <div class="mt-8 grid gap-4 sm:grid-cols-2">
            <div
              v-for="feature in service.features"
              :key="feature"
              class="card flex items-start gap-3 p-5"
            >
              <span class="mt-0.5 text-indigo-600 dark:text-indigo-400" aria-hidden="true">✓</span>
              <span class="text-[13.5px] leading-relaxed text-slate-700 dark:text-slate-300">{{ feature }}</span>
            </div>
          </div>
        </Reveal>

        <Reveal :delay="80">
          <h2 class="h2 mt-16 text-3xl">How the engagement runs</h2>
          <ol class="mt-8 space-y-4">
            <li v-for="step in process" :key="step.step" class="flex gap-5">
              <span class="font-display text-[13px] font-bold text-indigo-600 dark:text-indigo-400">{{ step.step }}</span>
              <div class="border-b border-slate-200/80 pb-4 dark:border-slate-800">
                <h3 class="font-display text-[15px] font-semibold text-slate-900 dark:text-white">{{ step.title }}</h3>
                <p class="mt-1.5 text-[13.5px] leading-relaxed text-slate-500 dark:text-slate-400">{{ step.desc }}</p>
              </div>
            </li>
          </ol>
        </Reveal>

        <Reveal v-if="proof.length" :delay="80">
          <h2 class="h2 mt-16 text-3xl">Proof from real projects</h2>
          <div class="mt-8 grid gap-5 sm:grid-cols-2">
            <RouterLink
              v-for="c in proof"
              :key="c.slug"
              :to="`/case-studies/${c.slug}`"
              class="card card-hover p-6"
            >
              <p class="eyebrow">{{ c.client }}</p>
              <p class="mt-3 font-display text-2xl font-bold text-indigo-600 dark:text-indigo-400">{{ c.headline }}</p>
              <p class="mt-3 text-[13px] leading-relaxed text-slate-500 dark:text-slate-400">{{ c.summary }}</p>
              <span class="link-arrow mt-5">Read case study <span aria-hidden="true">→</span></span>
            </RouterLink>
          </div>
        </Reveal>
      </div>

      <!-- Sidebar -->
      <aside class="space-y-6 lg:sticky lg:top-24 lg:self-start">
        <div class="card p-7">
          <h3 class="h3 text-lg">Request a quote</h3>
          <p class="mt-2 text-[13px] leading-relaxed text-slate-500 dark:text-slate-400">
            Pre-filled for {{ service.title }}. We reply within one business day.
          </p>
          <div class="mt-6">
            <ContactForm :preselected-service="service.title" />
          </div>
        </div>

        <div v-if="category" class="card p-7">
          <p class="text-[11px] font-semibold tracking-[0.14em] text-slate-400 uppercase">Part of</p>
          <RouterLink
            :to="`/services/category/${category.slug}`"
            class="mt-3 flex items-center gap-2 font-display text-[15px] font-semibold text-slate-900 dark:text-white"
          >
            <span aria-hidden="true">{{ category.icon }}</span> {{ category.name }}
          </RouterLink>
          <p class="mt-2 text-[13px] leading-relaxed text-slate-500 dark:text-slate-400">{{ category.tagline }}</p>
        </div>
      </aside>
    </section>

    <section v-if="related.length" class="border-t border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900/40">
      <div class="shell section">
        <h2 class="h2 text-3xl">Often bought together</h2>
        <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ServiceCard v-for="s in related" :key="s.id" :service="s" />
        </div>
      </div>
    </section>
  </template>
</template>
