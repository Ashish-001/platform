<script setup>
import { RouterLink } from 'vue-router'
import { serviceCategories } from '../data/services'
import { t } from '../i18n'
</script>

<template>
  <section class="shell flex flex-col items-center py-28 text-center">
    <p class="font-display text-6xl font-bold text-indigo-600 dark:text-indigo-400">404</p>
    <h1 class="h2 mt-6">{{ t('This page does not exist') }}</h1>
    <p class="lead mt-4 max-w-md">
      {{ t('The link may be out of date. Here are the places people usually mean to land.') }}
    </p>

    <div class="mt-9 flex flex-wrap justify-center gap-3">
      <RouterLink to="/" class="btn-primary">{{ t('Back to home') }}</RouterLink>
      <RouterLink to="/services" class="btn-outline">{{ t('Browse services') }}</RouterLink>
    </div>

    <div class="mt-12 flex flex-wrap justify-center gap-2">
      <RouterLink
        v-for="cat in serviceCategories"
        :key="cat.slug"
        :to="`/services/category/${cat.slug}`"
        class="chip transition hover:border-indigo-300 hover:text-indigo-700 dark:hover:border-indigo-700"
      >
        <span class="mr-1.5" aria-hidden="true">{{ t(cat.icon) }}</span>{{ t(cat.name) }}
      </RouterLink>
    </div>
  </section>
</template>
