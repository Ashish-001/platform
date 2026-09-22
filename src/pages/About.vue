<script setup>
import { RouterLink } from 'vue-router'
import PageHero from '../components/PageHero.vue'
import Reveal from '../components/Reveal.vue'
import LogoWall from '../components/LogoWall.vue'
import { process, stats, team, values } from '../data/team'
import { differentiators } from '../data/company'
import { useUi } from '../composables/useUi'

const { openLead } = useUi()
</script>

<template>
  <PageHero
    eyebrow="About us"
    title="A small studio that ships like a large one"
    lead="Service is a full-stack development studio. We are deliberately small, staffed only with senior engineers and designers, and we stay on the projects we build."
    :crumbs="[{ label: 'About' }]"
  >
    <template #actions>
      <button type="button" class="btn-primary" @click="openLead({ title: 'Talk to the team' })">
        Talk to the Team
      </button>
      <RouterLink to="/careers" class="btn-outline">We are hiring</RouterLink>
    </template>

    <template #aside>
      <div class="grid grid-cols-2 gap-5 lg:grid-cols-4">
        <div v-for="stat in stats" :key="stat.label" class="card p-6">
          <p class="font-display text-3xl font-bold text-indigo-600 dark:text-indigo-400">{{ stat.value }}</p>
          <p class="mt-1.5 text-[12.5px] leading-snug text-slate-500 dark:text-slate-400">{{ stat.label }}</p>
        </div>
      </div>
    </template>
  </PageHero>

  <!-- Story -->
  <section class="shell section grid gap-12 lg:grid-cols-[1.4fr_1fr]">
    <Reveal>
      <div class="prose-body max-w-2xl">
        <h2 class="h2 mb-6 text-3xl">Why we work this way</h2>
        <p>
          Most software projects do not fail on technical difficulty. They fail because scope was never agreed
          honestly, progress was reported instead of demonstrated, and nobody was left to own the result once the
          invoice cleared.
        </p>
        <p>
          We built the studio around removing those three failure modes. Scope gets written down along with an
          explicit list of what we are not building. Every week ends with a working demo rather than a status
          update. And the people who built your product are still available when something breaks a year later.
        </p>
        <p>
          That is also why we publish our delivery metrics every year. If an agency will not tell you how often
          it hits its own deadlines, the number is probably not flattering.
        </p>
      </div>
    </Reveal>

    <Reveal :delay="80">
      <div class="card p-7">
        <p class="text-[11px] font-semibold tracking-[0.14em] text-slate-400 uppercase">What we value</p>
        <ul class="mt-5 space-y-5">
          <li v-for="value in values" :key="value.title">
            <p class="font-display text-[15px] font-semibold text-slate-900 dark:text-white">{{ value.title }}</p>
            <p class="mt-1.5 text-[13px] leading-relaxed text-slate-500 dark:text-slate-400">{{ value.desc }}</p>
          </li>
        </ul>
      </div>
    </Reveal>
  </section>

  <!-- Process -->
  <section id="process" class="scroll-mt-24 border-y border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900/40">
    <div class="shell section">
      <Reveal>
        <h2 class="h2 text-3xl">Our process</h2>
        <p class="lead mt-4 max-w-2xl">
          Five stages. The only unusual part is how often you see working software — every week, from the first
          build sprint onward.
        </p>
      </Reveal>

      <div class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        <Reveal v-for="(step, i) in process" :key="step.step" :delay="i * 70">
          <div class="card h-full p-6">
            <span class="font-display text-[13px] font-bold text-indigo-600 dark:text-indigo-400">{{ step.step }}</span>
            <h3 class="mt-3 font-display text-[15px] font-semibold text-slate-900 dark:text-white">{{ step.title }}</h3>
            <p class="mt-2 text-[12.5px] leading-relaxed text-slate-500 dark:text-slate-400">{{ step.desc }}</p>
          </div>
        </Reveal>
      </div>
    </div>
  </section>

  <!-- Team -->
  <section id="team" class="shell section scroll-mt-24">
    <Reveal>
      <h2 class="h2 text-3xl">The team</h2>
      <p class="lead mt-4 max-w-2xl">
        The people in your kickoff call are the people writing your code. No handover to a junior bench once the
        contract is signed.
      </p>
    </Reveal>

    <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <Reveal v-for="(member, i) in team" :key="member.name" :delay="i * 70">
        <div class="card h-full p-6">
          <span
            class="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-xl dark:bg-slate-800"
            aria-hidden="true"
            >{{ member.emoji }}</span
          >
          <h3 class="mt-5 font-display text-[15px] font-semibold text-slate-900 dark:text-white">{{ member.role }}</h3>
          <p class="mt-1 text-[12.5px] text-slate-400">{{ member.name }}</p>
          <div class="mt-4 flex flex-wrap gap-1.5">
            <span
              v-for="skill in member.expertise"
              :key="skill"
              class="rounded-md bg-slate-100 px-2 py-0.5 text-[11.5px] font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-300"
              >{{ skill }}</span
            >
          </div>
        </div>
      </Reveal>
    </div>
  </section>

  <!-- Differentiators -->
  <section class="border-y border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900/40">
    <div class="shell section">
      <Reveal>
        <h2 class="h2 text-3xl">How we are different in practice</h2>
      </Reveal>
      <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Reveal v-for="(item, i) in differentiators.slice(0, 6)" :key="item.title" :delay="(i % 3) * 70">
          <div class="card h-full p-6">
            <h3 class="font-display text-[15px] font-semibold text-slate-900 dark:text-white">{{ item.title }}</h3>
            <p class="mt-2 text-[13px] leading-relaxed text-slate-500 dark:text-slate-400">{{ item.desc }}</p>
          </div>
        </Reveal>
      </div>
    </div>
  </section>

  <!-- Clients -->
  <section class="shell section">
    <p class="text-center text-[11px] font-semibold tracking-[0.16em] text-slate-400 uppercase">
      Teams we have worked with
    </p>
    <div class="mt-8">
      <LogoWall />
    </div>
  </section>
</template>
