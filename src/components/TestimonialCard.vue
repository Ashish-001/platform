<script setup>
defineProps({
  testimonial: { type: Object, required: true },
})
</script>

<template>
  <figure
    class="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
  >
    <span class="text-2xl text-indigo-500">“</span>
    <blockquote class="flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
      {{ testimonial.quote }}
    </blockquote>
    <figcaption class="mt-5">
      <p class="text-sm font-semibold text-slate-900 dark:text-white">{{ testimonial.author }}</p>
      <p class="text-xs text-slate-500 dark:text-slate-400">{{ testimonial.role }}</p>
    </figcaption>
  </figure>
</template>
