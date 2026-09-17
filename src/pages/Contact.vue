<script setup>
import { useRoute } from 'vue-router'
import ContactForm from '../components/ContactForm.vue'

const route = useRoute()
const preselected = typeof route.query.service === 'string' ? route.query.service : ''
</script>

<template>
  <section class="mx-auto max-w-7xl px-4 py-16 sm:px-6">
    <div class="grid gap-14 lg:grid-cols-2">
      <!-- Info -->
      <div>
        <h1 class="font-display text-4xl font-bold text-slate-900 dark:text-white">
          Let's talk about your project
        </h1>
        <p class="mt-5 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
          Fill out the form and we'll get back to you within 24 hours with next steps — usually a
          short call, then a fixed-price proposal.
        </p>

        <div class="mt-10 space-y-5">
          <div class="flex items-start gap-4">
            <span class="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-xl dark:bg-indigo-950">📧</span>
            <div>
              <p class="font-semibold text-slate-900 dark:text-white">Email</p>
              <p class="text-sm text-slate-500 dark:text-slate-400">hello@yourdomain.com</p>
            </div>
          </div>
          <div class="flex items-start gap-4">
            <span class="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-xl dark:bg-indigo-950">⏱️</span>
            <div>
              <p class="font-semibold text-slate-900 dark:text-white">Response time</p>
              <p class="text-sm text-slate-500 dark:text-slate-400">Within 24 hours, every time</p>
            </div>
          </div>
          <div class="flex items-start gap-4">
            <span class="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-xl dark:bg-indigo-950">🌍</span>
            <div>
              <p class="font-semibold text-slate-900 dark:text-white">Working worldwide</p>
              <p class="text-sm text-slate-500 dark:text-slate-400">Remote-first, timezone-flexible</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Form -->
      <div
        class="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900"
      >
        <ContactForm :preselected-service="preselected" />
      </div>
    </div>
  </section>
</template>
