<script setup>
import { contact } from '../data/company'
</script>

<template>
  <div class="hidden border-b border-slate-200/80 bg-white lg:block dark:border-slate-800 dark:bg-slate-950">
    <div class="shell flex items-center justify-end gap-6 py-2">
      <div class="flex shrink-0 items-center gap-5 text-[12px] font-medium">
        <a
          :href="contact.phoneHref"
          class="flex items-center gap-1.5 text-slate-600 transition hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400"
        >
          <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 6.75c0 8.284 6.716 15 15 15h1.5a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106a1.125 1.125 0 0 0-1.173.417l-.97 1.293a1.125 1.125 0 0 1-1.21.38 12.035 12.035 0 0 1-7.143-7.143 1.125 1.125 0 0 1 .38-1.21l1.293-.97c.334-.251.5-.68.417-1.173L6.313 3.102A1.125 1.125 0 0 0 5.222 2.25H3.75A1.5 1.5 0 0 0 2.25 3.75v3Z"
            />
          </svg>
          {{ contact.phone }}
        </a>
        <a
          :href="`mailto:${contact.email}`"
          class="flex items-center gap-1.5 text-slate-600 transition hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400"
        >
          <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
            />
          </svg>
          {{ contact.email }}
        </a>
        <span class="text-slate-300 dark:text-slate-700">|</span>
        <span class="text-slate-500 dark:text-slate-400">{{ contact.hours }}</span>
      </div>
    </div>
  </div>
</template>
