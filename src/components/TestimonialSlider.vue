<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { testimonials } from '../data/testimonials'

const index = ref(0)
const perView = ref(1)

function measure() {
  perView.value = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1
  if (index.value > maxIndex.value) index.value = maxIndex.value
}

const maxIndex = computed(() => Math.max(0, testimonials.length - perView.value))
const offset = computed(() => -(index.value * (100 / perView.value)))

function prev() {
  index.value = index.value > 0 ? index.value - 1 : maxIndex.value
}

function next() {
  index.value = index.value < maxIndex.value ? index.value + 1 : 0
}

onMounted(() => {
  measure()
  window.addEventListener('resize', measure)
})

onBeforeUnmount(() => window.removeEventListener('resize', measure))
</script>

<template>
  <div>
    <div class="overflow-hidden">
      <div
        class="flex transition-transform duration-500 ease-out"
        :style="{ transform: `translateX(${offset}%)` }"
      >
        <figure
          v-for="t in testimonials"
          :key="t.author"
          class="w-full shrink-0 px-2 sm:w-1/2 lg:w-1/3"
        >
          <div class="card flex h-full flex-col p-6">
            <span class="font-display text-3xl leading-none text-indigo-300 dark:text-indigo-700">“</span>
            <blockquote class="mt-3 flex-1 text-[13.5px] leading-[1.75] text-slate-600 dark:text-slate-300">
              {{ t.quote }}
            </blockquote>
            <figcaption class="mt-6 border-t border-slate-200/80 pt-4 dark:border-slate-800">
              <p class="text-[13.5px] font-semibold text-slate-900 dark:text-white">{{ t.author }}</p>
              <p class="text-[12px] text-slate-500 dark:text-slate-400">{{ t.role }}, {{ t.company }}</p>
              <p class="mt-2 text-[11px] font-semibold tracking-wide text-indigo-600 uppercase dark:text-indigo-400">
                {{ t.project }}
              </p>
            </figcaption>
          </div>
        </figure>
      </div>
    </div>

    <div class="mt-8 flex items-center justify-between">
      <div class="flex gap-1.5">
        <button
          v-for="i in maxIndex + 1"
          :key="i"
          type="button"
          class="h-1.5 rounded-full transition-all"
          :class="index === i - 1 ? 'w-6 bg-indigo-600' : 'w-2.5 bg-slate-300 dark:bg-slate-700'"
          :aria-label="`Go to testimonial ${i}`"
          @click="index = i - 1"
        />
      </div>
      <div class="flex gap-2">
        <button
          type="button"
          class="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-indigo-300 hover:text-indigo-600 dark:border-slate-700 dark:text-slate-300"
          aria-label="Previous testimonials"
          @click="prev"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button
          type="button"
          class="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-indigo-300 hover:text-indigo-600 dark:border-slate-700 dark:text-slate-300"
          aria-label="Next testimonials"
          @click="next"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
