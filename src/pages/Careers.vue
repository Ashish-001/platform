<script setup>
import { RouterLink } from 'vue-router'
import PageHero from '../components/PageHero.vue'
import Reveal from '../components/Reveal.vue'
import { openings } from '../data/company'
import { values } from '../data/team'
import { useUi } from '../composables/useUi'

const { openLead } = useUi()

const perks = [
  'Remote-first, with core hours rather than fixed ones',
  'Annual learning budget, no approval theatre',
  'On-call rotation that is paid and genuinely optional',
  'Four-day release weeks — Fridays are for cleanup and learning',
  'Hardware of your choosing, replaced every three years',
  'Direct client contact from your first project',
]
</script>

<template>
  <PageHero
    eyebrow="Careers"
    title="Work on products that actually ship"
    lead="We are a small team of senior engineers and designers. You will own projects end to end, talk to clients directly, and never inherit a codebase nobody is willing to explain."
    :crumbs="[{ label: 'Careers' }]"
  >
    <template #actions>
      <button type="button" class="btn-primary" @click="openLead({ title: 'Send us your profile', submitLabel: 'Submit Application' })">
        Send Us Your Profile
      </button>
      <RouterLink to="/about#team" class="btn-outline">Meet the team</RouterLink>
    </template>
  </PageHero>

  <section class="shell section">
    <Reveal>
      <h2 class="h2 text-3xl">Open roles</h2>
      <p class="lead mt-4 max-w-2xl">
        Four openings. Our process is a portfolio conversation, one paid take-home exercise and a call with the
        team you would work alongside — no whiteboard algorithms.
      </p>
    </Reveal>

    <div class="mt-10 space-y-4">
      <Reveal v-for="(role, i) in openings" :key="role.role" :delay="(i % 2) * 70">
        <article class="card flex flex-col gap-6 p-7 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 class="font-display text-lg font-semibold text-slate-900 dark:text-white">{{ role.role }}</h3>
            <p class="mt-2 max-w-2xl text-[13.5px] leading-relaxed text-slate-500 dark:text-slate-400">
              {{ role.desc }}
            </p>
            <div class="mt-4 flex flex-wrap gap-2">
              <span class="chip">{{ role.type }}</span>
              <span class="chip">{{ role.location }}</span>
              <span class="chip">{{ role.stack }}</span>
            </div>
          </div>
          <button
            type="button"
            class="btn-primary btn-sm shrink-0"
            @click="openLead({ title: `Apply: ${role.role}`, subtitle: 'Tell us where to find your work and we will reply within a week.', submitLabel: 'Submit Application' })"
          >
            Apply
          </button>
        </article>
      </Reveal>
    </div>
  </section>

  <section class="border-y border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900/40">
    <div class="shell section grid gap-12 lg:grid-cols-2">
      <Reveal>
        <h2 class="h2 text-3xl">How we operate</h2>
        <ul class="mt-8 space-y-4">
          <li v-for="perk in perks" :key="perk" class="card flex gap-3 p-5">
            <span class="mt-0.5 text-indigo-600 dark:text-indigo-400" aria-hidden="true">✓</span>
            <span class="text-[13.5px] leading-relaxed text-slate-700 dark:text-slate-300">{{ perk }}</span>
          </li>
        </ul>
      </Reveal>

      <Reveal :delay="80">
        <h2 class="h2 text-3xl">What we value</h2>
        <ul class="mt-8 space-y-5">
          <li v-for="value in values" :key="value.title" class="card p-6">
            <p class="font-display text-[15px] font-semibold text-slate-900 dark:text-white">{{ value.title }}</p>
            <p class="mt-2 text-[13px] leading-relaxed text-slate-500 dark:text-slate-400">{{ value.desc }}</p>
          </li>
        </ul>
      </Reveal>
    </div>
  </section>
</template>
