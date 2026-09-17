<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

const links = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

const menuOpen = ref(false)
const isDark = ref(false)

function applyTheme() {
  document.documentElement.classList.toggle('dark', isDark.value)
  try {
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  } catch {}
}

function toggleTheme() {
  isDark.value = !isDark.value
  applyTheme()
}

onMounted(() => {
  let saved = null
  try {
    saved = localStorage.getItem('theme')
  } catch {}
  isDark.value = saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches
  applyTheme()
})
</script>

<template>
  <header
    class="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-lg dark:border-slate-800 dark:bg-slate-950/80"
  >
    <nav class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
      <!-- Logo -->
      <RouterLink to="/" class="flex items-center gap-2" @click="menuOpen = false">
        <span
          class="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 font-display text-lg font-bold text-white"
          >S</span
        >
        <span class="font-display text-xl font-bold tracking-tight text-slate-900 dark:text-white"
          >Service</span
        >
      </RouterLink>

      <!-- Desktop links -->
      <div class="hidden items-center gap-8 md:flex">
        <RouterLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="text-sm font-medium text-slate-600 transition hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400"
          exact-active-class="!text-indigo-600 dark:!text-indigo-400"
        >
          {{ link.label }}
        </RouterLink>
      </div>

      <div class="flex items-center gap-3">
        <!-- Theme toggle -->
        <button
          @click="toggleTheme"
          class="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-lg transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        >
          {{ isDark ? '☀️' : '🌙' }}
        </button>

        <RouterLink
          to="/contact"
          class="hidden rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500 md:block"
        >
          Get Quote
        </RouterLink>

        <!-- Mobile hamburger -->
        <button
          @click="menuOpen = !menuOpen"
          class="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 md:hidden dark:border-slate-700"
          aria-label="Toggle menu"
        >
          <span class="text-xl">{{ menuOpen ? '✕' : '☰' }}</span>
        </button>
      </div>
    </nav>

    <!-- Mobile menu -->
    <div v-if="menuOpen" class="border-t border-slate-200 md:hidden dark:border-slate-800">
      <div class="flex flex-col gap-1 px-4 py-3">
        <RouterLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          @click="menuOpen = false"
          class="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
          exact-active-class="!text-indigo-600 dark:!text-indigo-400"
        >
          {{ link.label }}
        </RouterLink>
        <RouterLink
          to="/contact"
          @click="menuOpen = false"
          class="mt-2 rounded-lg bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white"
        >
          Get Quote
        </RouterLink>
      </div>
    </div>
  </header>
</template>
