<script setup>
defineProps({
  testimonial: { type: Object, required: true },
})
</script>

<template>
  <figure class="card flex h-full flex-col p-6">
    <span class="font-display text-3xl leading-none text-indigo-300 dark:text-indigo-700">“</span>
    <blockquote class="mt-3 flex-1 text-[13.5px] leading-[1.75] text-slate-600 dark:text-slate-300">
      {{ testimonial.quote }}
    </blockquote>
    <figcaption class="mt-6 border-t border-slate-200/80 pt-4 dark:border-slate-800">
      <p class="text-[13.5px] font-semibold text-slate-900 dark:text-white">{{ testimonial.author }}</p>
      <p class="text-[12px] text-slate-500 dark:text-slate-400">
        {{ testimonial.role }}<span v-if="testimonial.company">, {{ testimonial.company }}</span>
      </p>
      <p
        v-if="testimonial.project"
        class="mt-2 text-[11px] font-semibold tracking-wide text-indigo-600 uppercase dark:text-indigo-400"
      >
        {{ testimonial.project }}
      </p>
    </figcaption>
  </figure>
</template>
