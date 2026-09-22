<script setup>
defineProps({
  tagline: { type: Boolean, default: false },
})
</script>

<template>
  <span class="flex items-center gap-2.5">
    <span
      class="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 font-display text-lg font-bold text-white"
      aria-hidden="true"
      >S</span
    >
    <span class="leading-none">
      <span class="block font-display text-lg font-bold tracking-tight text-slate-900 dark:text-white"
        >Service</span
      >
      <span
        v-if="tagline"
        class="mt-0.5 block text-[10px] font-medium tracking-[0.16em] text-slate-400 uppercase"
        >Engineering studio</span
      >
    </span>
  </span>
</template>
