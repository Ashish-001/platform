<script setup>
import { RouterLink } from 'vue-router'
import { team, stats, process } from '../data/team'
</script>

<template>
  <section class="mx-auto max-w-7xl px-4 py-16 sm:px-6">
    <!-- Story -->
    <div class="max-w-3xl">
      <h1 class="font-display text-4xl font-bold text-slate-900 dark:text-white">About Service</h1>
      <p class="mt-6 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
        Service was founded on a simple idea: businesses deserve an engineering partner that
        communicates clearly, prices honestly and ships on time. We're a compact, heavily
        experienced team covering the full stack — from pixel-perfect frontends to cloud
        infrastructure — so you get agency-level capability without agency-level overhead.
      </p>
    </div>

    <!-- Stats -->
    <div class="mt-14 grid grid-cols-2 gap-6 md:grid-cols-4">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center dark:border-slate-800 dark:bg-slate-900"
      >
        <p class="font-display text-3xl font-bold text-indigo-600 dark:text-indigo-400">{{ stat.value }}</p>
        <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ stat.label }}</p>
      </div>
    </div>

    <!-- Team -->
    <h2 class="mt-20 font-display text-3xl font-bold text-slate-900 dark:text-white">The team</h2>
    <div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <div
        v-for="member in team"
        :key="member.name"
        class="rounded-2xl border border-slate-200 bg-white p-6 text-center dark:border-slate-800 dark:bg-slate-900"
      >
        <span
          class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 text-3xl dark:bg-indigo-950"
          >{{ member.emoji }}</span
        >
        <h3 class="mt-4 font-semibold text-slate-900 dark:text-white">{{ member.name }}</h3>
        <p class="mt-1 text-sm text-indigo-600 dark:text-indigo-400">{{ member.role }}</p>
        <div class="mt-4 flex flex-wrap justify-center gap-1.5">
          <span
            v-for="skill in member.expertise"
            :key="skill"
            class="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300"
          >
            {{ skill }}
          </span>
        </div>
      </div>
    </div>

    <!-- Process -->
    <h2 class="mt-20 font-display text-3xl font-bold text-slate-900 dark:text-white">How we work</h2>
    <div class="mt-8 grid gap-6 md:grid-cols-5">
      <div
        v-for="p in process"
        :key="p.step"
        class="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
      >
        <span class="font-display text-2xl font-bold text-indigo-200 dark:text-indigo-800">{{ p.step }}</span>
        <h3 class="mt-3 font-semibold text-slate-900 dark:text-white">{{ p.title }}</h3>
        <p class="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{{ p.desc }}</p>
      </div>
    </div>

    <!-- CTA -->
    <div class="mt-20 rounded-3xl bg-slate-900 px-8 py-14 text-center dark:bg-slate-900">
      <h2 class="font-display text-3xl font-bold text-white">Let's build something together</h2>
      <RouterLink
        to="/contact"
        class="mt-6 inline-block rounded-lg bg-indigo-600 px-8 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
      >
        Get in Touch
      </RouterLink>
    </div>
  </section>
</template>
