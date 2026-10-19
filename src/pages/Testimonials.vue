<script setup>
import { RouterLink } from 'vue-router'
import PageHero from '../components/PageHero.vue'
import TestimonialCard from '../components/TestimonialCard.vue'
import Reveal from '../components/Reveal.vue'
import { testimonials } from '../data/testimonials'
import { ratings } from '../data/company'
import { useUi } from '../composables/useUi'
import { t } from '../i18n'

const { openLead } = useUi()
</script>

<template>
  <PageHero
    :eyebrow="t('Testimonials')"
    :title="t('What clients say, unedited')"
    :lead="t('Every quote below comes from a completed project. We are happy to introduce you directly to any of them.')"
    :crumbs="[{ label: 'Testimonials' }]"
  >
    <template #actions>
      <button type="button" class="btn-primary" @click="openLead({ title: 'Request a reference call' })">
        {{ t('Request a Reference') }}
      </button>
      <RouterLink to="/case-studies" class="btn-outline">{{ t('Read case studies') }}</RouterLink>
    </template>

    <template #aside>
      <div class="flex flex-wrap gap-3">
        <span v-for="r in ratings" :key="r.platform" class="chip gap-1.5">
          <span class="font-semibold text-slate-800 dark:text-white">{{ t(r.platform) }}</span>
          <span class="text-indigo-600 dark:text-indigo-400">{{ t(r.score) }}</span>
          <span class="text-slate-400">· {{ t(r.detail) }}</span>
        </span>
      </div>
    </template>
  </PageHero>

  <section class="shell section">
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <Reveal v-for="(item, i) in testimonials" :key="item.author" :delay="(i % 3) * 70">
        <TestimonialCard :testimonial="item" />
      </Reveal>
    </div>
  </section>
</template>
