<script setup>
import PageHero from '../components/PageHero.vue'
import Reveal from '../components/Reveal.vue'
import { contact, featuredOn, press } from '../data/company'
import { formatDate } from '../data/blog'
</script>

<template>
  <PageHero
    eyebrow="Newsroom"
    title="Press releases & announcements"
    lead="Company news, new practices and the data we publish. For interviews or commentary, our inbox is below."
    :crumbs="[{ label: 'Press' }]"
  />

  <section class="shell section grid gap-12 lg:grid-cols-[1.5fr_1fr]">
    <div class="divide-y divide-slate-200/80 dark:divide-slate-800">
      <Reveal v-for="(item, i) in press" :key="item.title" :delay="(i % 2) * 70">
        <article class="py-7 first:pt-0">
          <p class="text-[12px] text-slate-400">{{ formatDate(item.date) }}</p>
          <h2 class="mt-2 font-display text-xl leading-snug font-semibold text-slate-900 dark:text-white">
            {{ item.title }}
          </h2>
          <p class="mt-3 max-w-2xl text-[14px] leading-relaxed text-slate-500 dark:text-slate-400">{{ item.body }}</p>
        </article>
      </Reveal>
    </div>

    <aside class="space-y-6">
      <div class="card p-7">
        <p class="text-[11px] font-semibold tracking-[0.14em] text-slate-400 uppercase">Media enquiries</p>
        <a
          :href="`mailto:${contact.email}`"
          class="mt-3 block font-display text-[15px] font-semibold text-indigo-600 dark:text-indigo-400"
          >{{ contact.email }}</a
        >
        <p class="mt-2 text-[13px] leading-relaxed text-slate-500 dark:text-slate-400">
          We usually reply the same day. Happy to provide data, quotes or a technical explainer.
        </p>
      </div>

      <div class="card p-7">
        <p class="text-[11px] font-semibold tracking-[0.14em] text-slate-400 uppercase">Coverage</p>
        <ul class="mt-4 space-y-3">
          <li
            v-for="name in featuredOn"
            :key="name"
            class="border-b border-slate-100 pb-3 text-[13.5px] font-medium text-slate-700 last:border-0 last:pb-0 dark:border-slate-800 dark:text-slate-200"
          >
            {{ name }}
          </li>
        </ul>
      </div>
    </aside>
  </section>
</template>
