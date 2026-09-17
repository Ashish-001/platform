<script setup>
import { RouterLink } from 'vue-router'
import { services } from '../data/services'

const year = new Date().getFullYear()
const topServices = services.slice(0, 6)
</script>

<template>
  <footer class="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
    <div class="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
      <!-- Brand -->
      <div class="md:col-span-2">
        <div class="flex items-center gap-2">
          <span
            class="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 font-display text-lg font-bold text-white"
            >S</span
          >
          <span class="font-display text-xl font-bold text-slate-900 dark:text-white">Service</span>
        </div>
        <p class="mt-4 max-w-sm text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          A full-stack development agency delivering websites, web apps, APIs and AI integrations —
          built by a heavily experienced team that ships.
        </p>
      </div>

      <!-- Services -->
      <div>
        <h3 class="text-sm font-semibold text-slate-900 dark:text-white">Services</h3>
        <ul class="mt-4 space-y-2">
          <li v-for="s in topServices" :key="s.id">
            <RouterLink
              :to="`/services/${s.id}`"
              class="text-sm text-slate-500 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
            >
              {{ s.title }}
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/services" class="text-sm font-medium text-indigo-600 dark:text-indigo-400"
              >View all →</RouterLink
            >
          </li>
        </ul>
      </div>

      <!-- Company -->
      <div>
        <h3 class="text-sm font-semibold text-slate-900 dark:text-white">Company</h3>
        <ul class="mt-4 space-y-2">
          <li>
            <RouterLink to="/about" class="text-sm text-slate-500 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400">About us</RouterLink>
          </li>
          <li>
            <RouterLink to="/portfolio" class="text-sm text-slate-500 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400">Portfolio</RouterLink>
          </li>
          <li>
            <RouterLink to="/contact" class="text-sm text-slate-500 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400">Contact</RouterLink>
          </li>
        </ul>
        <div class="mt-6 flex gap-3">
          <a href="https://github.com" target="_blank" rel="noopener" aria-label="GitHub"
            class="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:text-indigo-600 dark:border-slate-700 dark:text-slate-400">
            <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.17c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.78 1.05.78 2.12v3.14c0 .3.21.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"/></svg>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener" aria-label="LinkedIn"
            class="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:text-indigo-600 dark:border-slate-700 dark:text-slate-400">
            <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z"/></svg>
          </a>
        </div>
      </div>
    </div>
    <div class="border-t border-slate-200 py-5 dark:border-slate-800">
      <p class="text-center text-xs text-slate-400 dark:text-slate-500">
        © {{ year }} Service. All rights reserved.
      </p>
    </div>
  </footer>
</template>
