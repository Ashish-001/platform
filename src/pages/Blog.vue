<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import PageHero from '../components/PageHero.vue'
import Reveal from '../components/Reveal.vue'
import { blogCategories, formatDate, sortedPosts } from '../data/blog'

const active = ref('All')
const categories = ['All', ...blogCategories]

const filtered = computed(() =>
  active.value === 'All' ? sortedPosts : sortedPosts.filter((p) => p.category === active.value),
)

const featured = computed(() => filtered.value[0])
const rest = computed(() => filtered.value.slice(1))
</script>

<template>
  <PageHero
    eyebrow="Blog"
    title="Notes from the build"
    lead="Engineering write-ups from projects we actually shipped — architecture decisions, performance work and the occasional argument against building software at all."
    :crumbs="[{ label: 'Blog' }]"
  />

  <section class="shell section">
    <div class="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0">
      <button
        v-for="cat in categories"
        :key="cat"
        type="button"
        class="shrink-0 rounded-full border px-4 py-2 text-[13px] font-medium transition"
        :class="
          active === cat
            ? 'border-indigo-600 bg-indigo-600 text-white'
            : 'border-slate-200/80 bg-white text-slate-600 hover:border-indigo-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
        "
        @click="active = cat"
      >
        {{ cat }}
      </button>
    </div>

    <Reveal v-if="featured" class="mt-10">
      <RouterLink
        :to="`/blog/${featured.slug}`"
        class="card card-hover grid gap-8 p-7 sm:p-10 lg:grid-cols-[1.4fr_1fr] lg:items-center"
      >
        <div>
          <div class="flex items-center gap-3 text-[12px] text-slate-400">
            <span class="font-semibold text-indigo-600 dark:text-indigo-400">{{ featured.category }}</span>
            <span>·</span>
            <span>{{ formatDate(featured.date) }}</span>
            <span>·</span>
            <span>{{ featured.readTime }}</span>
          </div>
          <h2 class="mt-4 font-display text-2xl leading-snug font-bold text-slate-900 sm:text-3xl dark:text-white">
            {{ featured.title }}
          </h2>
          <p class="mt-4 max-w-2xl text-[14.5px] leading-relaxed text-slate-500 dark:text-slate-400">
            {{ featured.excerpt }}
          </p>
          <span class="link-arrow mt-6">Read the post <span aria-hidden="true">→</span></span>
        </div>
        <div
          class="flex aspect-[4/3] items-center justify-center rounded-2xl border border-slate-200/80 bg-gradient-to-br from-indigo-50 to-white dark:border-slate-800 dark:from-slate-900 dark:to-slate-950"
        >
          <span class="font-display text-5xl font-bold text-indigo-200 dark:text-slate-800">{{
            featured.category.slice(0, 2).toUpperCase()
          }}</span>
        </div>
      </RouterLink>
    </Reveal>

    <div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <Reveal v-for="(post, i) in rest" :key="post.slug" :delay="(i % 3) * 70">
        <RouterLink :to="`/blog/${post.slug}`" class="card card-hover flex h-full flex-col p-6">
          <div class="flex items-center gap-2.5 text-[11.5px] text-slate-400">
            <span class="font-semibold text-indigo-600 dark:text-indigo-400">{{ post.category }}</span>
            <span>·</span>
            <span>{{ post.readTime }}</span>
          </div>
          <h2 class="mt-4 font-display text-[16.5px] leading-snug font-semibold text-slate-900 dark:text-white">
            {{ post.title }}
          </h2>
          <p class="mt-2 flex-1 text-[13px] leading-relaxed text-slate-500 dark:text-slate-400">{{ post.excerpt }}</p>
          <p class="mt-5 text-[11.5px] text-slate-400">{{ formatDate(post.date) }}</p>
        </RouterLink>
      </Reveal>
    </div>
  </section>
</template>
