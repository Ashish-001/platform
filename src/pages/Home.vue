<script setup>
import { RouterLink } from 'vue-router'
import ServiceCard from '../components/ServiceCard.vue'
import TestimonialCard from '../components/TestimonialCard.vue'
import { services } from '../data/services'
import { projects } from '../data/portfolio'
import { stats } from '../data/team'
import { testimonials } from '../data/testimonials'

const featured = services.slice(0, 6)
const highlights = projects.slice(0, 3)
</script>

<template>
  <!-- Hero -->
  <section class="relative overflow-hidden">
    <div
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_45%_at_50%_0%,rgba(99,102,241,0.18),transparent_70%),radial-gradient(35%_35%_at_88%_18%,rgba(217,70,239,0.12),transparent_70%),radial-gradient(35%_35%_at_12%_22%,rgba(14,165,233,0.12),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.15),transparent_60%)]"
    ></div>
    <div class="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 md:py-32">
      <span
        class="inline-block rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-xs font-semibold text-indigo-700 dark:border-indigo-900 dark:bg-indigo-950 dark:text-indigo-300"
      >
        15 services · one experienced team
      </span>
      <h1
        class="mx-auto mt-6 max-w-3xl font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl dark:text-white"
      >
        We build the tech.<br />
        <span
          class="bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-500 bg-clip-text text-transparent dark:from-indigo-400 dark:via-violet-400 dark:to-fuchsia-400"
          >You build the business.</span
        >
      </h1>
      <p class="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
        Service is a full-stack development agency. Websites, web apps, APIs, e-commerce, AI —
        designed, built and shipped by a heavily experienced team.
      </p>
      <div class="mt-10 flex flex-wrap justify-center gap-4">
        <RouterLink
          to="/contact"
          class="rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-300/60 transition hover:from-indigo-500 hover:to-violet-500 dark:shadow-indigo-950"
        >
          Get a Free Quote
        </RouterLink>
        <RouterLink
          to="/services"
          class="rounded-lg border border-indigo-200 bg-white px-7 py-3 text-sm font-semibold text-indigo-700 shadow-sm transition hover:border-indigo-400 hover:bg-indigo-50 dark:border-slate-700 dark:bg-transparent dark:text-slate-200 dark:shadow-none dark:hover:bg-slate-900"
        >
          Explore Services
        </RouterLink>
      </div>
    </div>
  </section>

  <!-- Stats -->
  <section
    class="border-y border-indigo-100 bg-gradient-to-r from-indigo-50/90 via-white to-violet-50/90 dark:border-slate-800 dark:bg-slate-900 dark:bg-none"
  >
    <div class="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
      <div v-for="stat in stats" :key="stat.label" class="text-center">
        <p
          class="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text font-display text-3xl font-bold text-transparent dark:from-indigo-400 dark:to-violet-400"
        >{{ stat.value }}</p>
        <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ stat.label }}</p>
      </div>
    </div>
  </section>

  <!-- Featured services -->
  <section class="mx-auto max-w-7xl px-4 py-20 sm:px-6">
    <div class="flex items-end justify-between">
      <div>
        <p class="text-xs font-semibold tracking-widest text-indigo-600 uppercase dark:text-indigo-400">Services</p>
        <h2 class="mt-2 font-display text-3xl font-bold text-slate-900 dark:text-white">What we do</h2>
        <p class="mt-2 text-slate-500 dark:text-slate-400">Six of our most requested services.</p>
      </div>
      <RouterLink to="/services" class="hidden text-sm font-semibold text-indigo-600 sm:block dark:text-indigo-400"
        >All 15 services →</RouterLink
      >
    </div>
    <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <ServiceCard v-for="s in featured" :key="s.id" :service="s" />
    </div>
    <div class="mt-8 text-center sm:hidden">
      <RouterLink to="/services" class="text-sm font-semibold text-indigo-600 dark:text-indigo-400"
        >All 15 services →</RouterLink
      >
    </div>
  </section>

  <!-- Portfolio highlights -->
  <section
    class="border-y border-indigo-100 bg-gradient-to-br from-indigo-50/70 via-white to-fuchsia-50/60 dark:border-slate-800 dark:bg-slate-900 dark:bg-none"
  >
    <div class="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <p class="text-xs font-semibold tracking-widest text-indigo-600 uppercase dark:text-indigo-400">Portfolio</p>
      <h2 class="mt-2 font-display text-3xl font-bold text-slate-900 dark:text-white">Recent work</h2>
      <p class="mt-2 text-slate-500 dark:text-slate-400">A few projects we're proud of.</p>
      <div class="mt-10 grid gap-6 md:grid-cols-3">
        <div
          v-for="p in highlights"
          :key="p.id"
          class="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950"
        >
          <span class="text-3xl">{{ p.emoji }}</span>
          <h3 class="mt-4 font-display text-lg font-semibold text-slate-900 dark:text-white">{{ p.title }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{{ p.description }}</p>
          <p class="mt-4 text-xs font-semibold tracking-wide text-indigo-600 uppercase dark:text-indigo-400">
            {{ p.serviceUsed }}
          </p>
        </div>
      </div>
      <div class="mt-8 text-center">
        <RouterLink to="/portfolio" class="text-sm font-semibold text-indigo-600 dark:text-indigo-400"
          >View full portfolio →</RouterLink
        >
      </div>
    </div>
  </section>

  <!-- Testimonials -->
  <section class="mx-auto max-w-7xl px-4 py-20 sm:px-6">
    <h2 class="text-center font-display text-3xl font-bold text-slate-900 dark:text-white">
      What clients say
    </h2>
    <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <TestimonialCard v-for="(t, i) in testimonials" :key="i" :testimonial="t" />
    </div>
  </section>

  <!-- Bottom CTA -->
  <section class="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
    <div
      class="rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-700 px-8 py-16 text-center text-white"
    >
      <h2 class="font-display text-3xl font-bold sm:text-4xl">Ready to start your project?</h2>
      <p class="mx-auto mt-4 max-w-xl text-indigo-100">
        Tell us what you need — we'll reply within 24 hours with a clear plan and honest pricing.
      </p>
      <RouterLink
        to="/contact"
        class="mt-8 inline-block rounded-lg bg-white px-8 py-3 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-50"
      >
        Get a Free Quote
      </RouterLink>
    </div>
  </section>
</template>
