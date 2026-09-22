<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import PageHero from '../components/PageHero.vue'
import NotFound from './NotFound.vue'
import { formatDate, getPostBySlug, sortedPosts } from '../data/blog'
import { useUi } from '../composables/useUi'

const route = useRoute()
const { openLead } = useUi()

const post = computed(() => getPostBySlug(route.params.slug))
const related = computed(() => {
  if (!post.value) return []
  const sameCategory = sortedPosts.filter((p) => p.slug !== post.value.slug && p.category === post.value.category)
  const others = sortedPosts.filter((p) => p.slug !== post.value.slug && p.category !== post.value.category)
  return [...sameCategory, ...others].slice(0, 3)
})
</script>

<template>
  <NotFound v-if="!post" />

  <template v-else>
    <PageHero
      :eyebrow="`${post.category} · ${post.readTime} read`"
      :title="post.title"
      :lead="post.excerpt"
      :crumbs="[{ to: '/blog', label: 'Blog' }, { label: post.category }]"
    />

    <article class="shell section grid gap-12 lg:grid-cols-[1.5fr_1fr]">
      <div class="prose-body max-w-2xl">
        <p class="text-[12px] text-slate-400">Published {{ formatDate(post.date) }}</p>
        <template v-for="(block, i) in post.body" :key="i">
          <h3 v-if="block.type === 'h3'">{{ block.text }}</h3>
          <ul v-else-if="block.type === 'ul'">
            <li v-for="item in block.items" :key="item">{{ item }}</li>
          </ul>
          <p v-else>{{ block.text }}</p>
        </template>
      </div>

      <aside class="space-y-6 lg:sticky lg:top-24 lg:self-start">
        <div class="card p-7">
          <h2 class="h3 text-lg">Working on something similar?</h2>
          <p class="mt-2 text-[13px] leading-relaxed text-slate-500 dark:text-slate-400">
            Thirty minutes with the engineer who wrote this, not a salesperson.
          </p>
          <button
            type="button"
            class="btn-primary btn-sm mt-5 w-full"
            @click="openLead({ title: 'Talk to an engineer', subtitle: post.title })"
          >
            Talk to an Engineer
          </button>
        </div>

        <div v-if="related.length" class="card p-7">
          <p class="text-[11px] font-semibold tracking-[0.14em] text-slate-400 uppercase">Read next</p>
          <ul class="mt-4 space-y-4">
            <li v-for="item in related" :key="item.slug">
              <RouterLink :to="`/blog/${item.slug}`" class="group block">
                <span class="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">{{ item.category }}</span>
                <span
                  class="mt-1 block text-[13.5px] leading-snug font-medium text-slate-700 group-hover:text-indigo-600 dark:text-slate-200"
                  >{{ item.title }}</span
                >
              </RouterLink>
            </li>
          </ul>
        </div>
      </aside>
    </article>
  </template>
</template>
