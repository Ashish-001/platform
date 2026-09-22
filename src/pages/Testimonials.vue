<script setup>
import { RouterLink } from 'vue-router'
import PageHero from '../components/PageHero.vue'
import TestimonialCard from '../components/TestimonialCard.vue'
import Reveal from '../components/Reveal.vue'
import { testimonials } from '../data/testimonials'
import { ratings } from '../data/company'
import { useUi } from '../composables/useUi'

const { openLead } = useUi()
</script>

<template>
  <PageHero
    eyebrow="Testimonials"
    title="What clients say, unedited"
    lead="Every quote below comes from a completed project. We are happy to introduce you directly to any of them."
    :crumbs="[{ label: 'Testimonials' }]"
  >
    <template #actions>
      <button type="button" class="btn-primary" @click="openLead({ title: 'Request a reference call' })">
        Request a Reference
      </button>
      <RouterLink to="/case-studies" class="btn-outline">Read case studies</RouterLink>
    </template>

    <template #aside>
      <div class="flex flex-wrap gap-3">
        <span v-for="r in ratings" :key="r.platform" class="chip gap-1.5">
          <span class="font-semibold text-slate-800 dark:text-white">{{ r.platform }}</span>
          <span class="text-indigo-600 dark:text-indigo-400">{{ r.score }}</span>
          <span class="text-slate-400">· {{ r.detail }}</span>
        </span>
      </div>
    </template>
  </PageHero>

  <section class="shell section">
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <Reveal v-for="(t, i) in testimonials" :key="t.author" :delay="(i % 3) * 70">
        <TestimonialCard :testimonial="t" />
      </Reveal>
    </div>
  </section>
</template>
