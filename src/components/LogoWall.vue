<script setup>
import { computed } from 'vue'
import { clients } from '../data/company'

const props = defineProps({
  marquee: { type: Boolean, default: false },
})

const initials = (name) =>
  name
    .split(/[\s&]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()

const loop = computed(() => (props.marquee ? [...clients, ...clients] : clients))
</script>

<template>
  <div v-if="marquee" class="marquee relative overflow-hidden">
    <div
      class="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-canvas to-transparent dark:from-slate-950"
    ></div>
    <div
      class="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-canvas to-transparent dark:from-slate-950"
    ></div>
    <div class="marquee-track flex w-max gap-4">
      <div
        v-for="(client, i) in loop"
        :key="`${client.name}-${i}`"
        class="flex w-56 shrink-0 items-center gap-3 rounded-xl border border-slate-200/80 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900"
      >
        <span
          class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 font-display text-[13px] font-bold text-slate-500 dark:bg-slate-800 dark:text-slate-300"
          >{{ initials(client.name) }}</span
        >
        <span class="min-w-0">
          <span class="block truncate text-[13.5px] font-semibold text-slate-800 dark:text-white">{{
            client.name
          }}</span>
          <span class="block truncate text-[11.5px] text-slate-400">{{ client.sector }}</span>
        </span>
      </div>
    </div>
  </div>

  <div v-else class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
    <div
      v-for="client in loop"
      :key="client.name"
      class="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900"
    >
      <span
        class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 font-display text-[13px] font-bold text-slate-500 dark:bg-slate-800 dark:text-slate-300"
        >{{ initials(client.name) }}</span
      >
      <span class="min-w-0">
        <span class="block truncate text-[13.5px] font-semibold text-slate-800 dark:text-white">{{
          client.name
        }}</span>
        <span class="block truncate text-[11.5px] text-slate-400">{{ client.sector }}</span>
      </span>
    </div>
  </div>
</template>
