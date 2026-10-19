<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import NetworkCanvas from '../components/NetworkCanvas.vue'
import Reveal from '../components/Reveal.vue'
import SectionHead from '../components/SectionHead.vue'
import LogoWall from '../components/LogoWall.vue'
import ServiceShowcase from '../components/ServiceShowcase.vue'
import CaseStudyTabs from '../components/CaseStudyTabs.vue'
import TestimonialSlider from '../components/TestimonialSlider.vue'
import FaqAccordion from '../components/FaqAccordion.vue'
import { services } from '../data/services'
import { industries } from '../data/industries'
import { differentiators, featuredOn, press } from '../data/company'
import { process } from '../data/team'
import { benchmarkReports, reportCard } from '../data/reports'
import { formatDate, localizedPosts } from '../data/blog'
import { faqGroups } from '../data/faqs'
import { useUi } from '../composables/useUi'
import { t } from '../i18n'

const { openLead } = useUi()

const heroChips = computed(() => services.filter((s) => s.featured).slice(0, 6))
const latestPosts = computed(() => localizedPosts.value.slice(0, 3))
const featuredReports = benchmarkReports.slice(0, 3)
const homeFaqs = faqGroups.slice(0, 5)

const outcomes = [
  {
    value: '7 wks',
    title: 'Ship sooner',
    desc: 'Median time from kickoff to production across last year’s projects.',
  },
  {
    value: '96',
    title: 'Launch faster pages',
    desc: 'Median Lighthouse performance score at handover, audited and documented.',
  },
  {
    value: '0',
    title: 'Scale without rewrites',
    desc: 'Products that needed re-architecting after launch. The data model comes first.',
  },
]

function downloadReportCard() {
  openLead({
    title: 'Download the Report Card',
    subtitle: 'FY 2025–26 delivery metrics across all 38 projects. Sent straight to your inbox.',
    submitLabel: 'Send Me the Report',
  })
}
</script>

<template>
  <!-- Hero -->
  <section class="relative overflow-hidden border-b border-slate-200/80 dark:border-slate-800">
    <div
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(99,102,241,0.12),transparent_70%)]"
    ></div>
    <div
      class="pointer-events-none absolute inset-0 opacity-50 [mask-image:linear-gradient(to_right,transparent_10%,black_55%)]"
    >
      <NetworkCanvas />
    </div>
    <div class="texture-noise pointer-events-none absolute inset-0"></div>

    <div class="shell relative grid gap-14 py-20 sm:py-28 lg:grid-cols-[1.35fr_1fr] lg:items-center">
      <div class="max-w-2xl">
        <span
          class="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white/80 px-3 py-1.5 text-[11.5px] font-semibold text-indigo-700 dark:border-slate-800 dark:bg-slate-900 dark:text-indigo-300"
        >
          <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
          {{ t('15 services · 5 industries · senior engineers only') }}
        </span>

        <h1 class="h1 mt-7">
          {{ t('We build the tech.') }}<br />
          <span class="text-indigo-600 dark:text-indigo-400">{{ t('You build the business.') }}</span>
        </h1>

        <p class="lead mt-6 max-w-2xl">
          {{ t('Service is a full-stack development studio. Websites, web apps, APIs, e-commerce, mobile and AI — scoped honestly, shipped weekly and supported long after launch.') }}
        </p>

        <div class="mt-9 flex flex-wrap gap-3">
          <button
            type="button"
            class="btn-primary"
            @click="openLead({ title: 'Speak to an engineer', subtitle: 'Thirty minutes with the person who would build it. No sales call.' })"
          >
            {{ t('Speak to an Engineer') }}
          </button>
          <RouterLink to="/services" class="btn-outline">{{ t('Our Services') }}</RouterLink>
        </div>

        <div class="mt-12">
          <p class="text-[11px] font-semibold tracking-[0.16em] text-slate-400 uppercase">{{ t('Most requested') }}</p>
          <div class="mt-3 flex flex-wrap gap-2">
            <RouterLink
              v-for="s in heroChips"
              :key="s.id"
              :to="`/services/${s.id}`"
              class="chip transition hover:border-indigo-300 hover:text-indigo-700 dark:hover:border-indigo-700"
            >
              {{ t(s.title) }}
            </RouterLink>
          </div>
        </div>
      </div>

      <!-- Hero side card -->
      <div class="card w-full p-7 lg:max-w-sm lg:justify-self-end">
        <p class="eyebrow">{{ t('Free audit') }}</p>
        <h2 class="h3 mt-3 text-xl">{{ t('Is your current site holding you back?') }}</h2>
        <p class="mt-3 text-[13.5px] leading-relaxed text-slate-500 dark:text-slate-400">
          {{ t('Thirty minutes with a senior engineer. You get a written list of what is slow, what is fragile and what it would take to fix.') }}
        </p>

        <dl class="mt-6 grid grid-cols-3 gap-3 border-y border-slate-200/80 py-5 dark:border-slate-800">
          <div v-for="stat in reportCard.stats.slice(2, 5)" :key="stat.label">
            <dt class="font-display text-lg font-bold text-slate-900 dark:text-white">{{ t(stat.value) }}</dt>
            <dd class="mt-1 text-[10.5px] leading-snug text-slate-400">{{ t(stat.label) }}</dd>
          </div>
        </dl>

        <button
          type="button"
          class="btn-primary mt-6 w-full"
          @click="openLead({ title: 'Get a free audit', subtitle: 'Thirty minutes with a senior engineer, no obligation.' })"
        >
          {{ t('Get My Free Audit') }}
        </button>
        <p class="mt-3 text-center text-[11.5px] text-slate-400">{{ t('No sales call. No follow-up sequence.') }}</p>
      </div>
    </div>
  </section>

  <!-- Clients -->
  <section class="border-b border-slate-200/80 py-12 dark:border-slate-800">
    <div class="shell">
      <p class="text-center text-[11px] font-semibold tracking-[0.16em] text-slate-400 uppercase">
        {{ t('Trusted by teams shipping real products') }}
      </p>
    </div>
    <div class="mt-8">
      <LogoWall marquee />
    </div>
  </section>

  <!-- Services showcase -->
  <section class="section">
    <div class="shell">
      <Reveal>
        <SectionHead
          :eyebrow="t('Services')"
          :title="t('Data-backed services to grow your product')"
          :lead="t('Four categories, fifteen services, one team. Pick the area you need and see exactly what is included, what it costs and what it delivers.')"
        >
          <template #action>
            <RouterLink to="/services" class="btn-outline btn-sm">{{ t('All 15 services') }}</RouterLink>
          </template>
        </SectionHead>
      </Reveal>

      <Reveal :delay="80" class="mt-12">
        <ServiceShowcase />
      </Reveal>
    </div>
  </section>

  <!-- Report card band -->
  <section class="border-y border-slate-200/80 bg-slate-900 dark:border-slate-800">
    <div class="shell py-16 sm:py-20">
      <div class="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-center">
        <div>
          <p class="text-[11px] font-semibold tracking-[0.18em] text-indigo-300 uppercase">
            {{ t('New') }} · {{ t(reportCard.label) }}
          </p>
          <h2 class="mt-4 font-display text-3xl leading-tight font-bold text-white sm:text-[2.5rem]">
            {{ t(reportCard.headline) }}
          </h2>
          <p class="mt-4 max-w-md text-sm leading-relaxed text-slate-300">{{ t(reportCard.intro) }}</p>
          <button type="button" class="btn-light mt-8" @click="downloadReportCard">{{ t('Download Report Card') }}</button>
        </div>

        <div class="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-3">
          <div v-for="stat in reportCard.stats" :key="stat.label" class="bg-slate-900 p-5">
            <p class="font-display text-2xl font-bold text-white">{{ t(stat.value) }}</p>
            <p class="mt-1.5 text-[12px] leading-snug text-slate-400">{{ t(stat.label) }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Outcomes -->
  <section class="section">
    <div class="shell">
      <Reveal>
        <SectionHead
          center
          :eyebrow="t('Outcomes')"
          :title="t('What working with us actually changes')"
          :lead="t('Not promises — the medians from our own delivery data, published every year.')"
        />
      </Reveal>
      <div class="mt-12 grid gap-6 md:grid-cols-3">
        <Reveal v-for="(o, i) in outcomes" :key="o.title" :delay="i * 90">
          <div class="card h-full p-7">
            <p class="font-display text-4xl font-bold text-indigo-600 dark:text-indigo-400">{{ t(o.value) }}</p>
            <h3 class="h3 mt-4 text-lg">{{ t(o.title) }}</h3>
            <p class="mt-2 text-[13.5px] leading-relaxed text-slate-500 dark:text-slate-400">{{ t(o.desc) }}</p>
          </div>
        </Reveal>
      </div>
    </div>
  </section>

  <!-- Process -->
  <section class="border-y border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900/40">
    <div class="shell section">
      <Reveal>
        <SectionHead
          :eyebrow="t('How we work')"
          :title="t('Five stages, weekly demos, no surprises')"
          :lead="t('You see the product running every week. Course corrections happen while they are still cheap.')"
        >
          <template #action>
            <RouterLink to="/about#process" class="btn-outline btn-sm">{{ t('More on our process') }}</RouterLink>
          </template>
        </SectionHead>
      </Reveal>

      <div class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        <Reveal v-for="(step, i) in process" :key="step.step" :delay="i * 70">
          <div class="h-full rounded-2xl border border-slate-200/80 bg-canvas p-5 dark:border-slate-800 dark:bg-slate-950">
            <span class="font-display text-[13px] font-bold text-indigo-600 dark:text-indigo-400">{{ t(step.step) }}</span>
            <h3 class="mt-3 font-display text-[15px] font-semibold text-slate-900 dark:text-white">{{ t(step.title) }}</h3>
            <p class="mt-2 text-[12.5px] leading-relaxed text-slate-500 dark:text-slate-400">{{ t(step.desc) }}</p>
          </div>
        </Reveal>
      </div>
    </div>
  </section>

  <!-- Why us -->
  <section class="section">
    <div class="shell">
      <Reveal>
        <SectionHead
          :eyebrow="t('Why Service')"
          :title="t('Twelve reasons clients stay past the first project')"
          :lead="t('Most of these are operating habits rather than sales points — which is why they show up in the delivery data.')"
        />
      </Reveal>
      <div class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Reveal v-for="(item, i) in differentiators" :key="item.title" :delay="(i % 3) * 70">
          <div class="card card-hover h-full p-6">
            <div class="flex items-start gap-3">
              <span
                class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-[11px] font-bold text-indigo-600 dark:bg-slate-800 dark:text-indigo-300"
                >{{ String(i + 1).padStart(2, '0') }}</span
              >
              <div>
                <h3 class="font-display text-[15px] font-semibold text-slate-900 dark:text-white">{{ t(item.title) }}</h3>
                <p class="mt-2 text-[13px] leading-relaxed text-slate-500 dark:text-slate-400">{{ t(item.desc) }}</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  </section>

  <!-- Industries -->
  <section class="border-y border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900/40">
    <div class="shell section">
      <Reveal>
        <SectionHead
          :eyebrow="t('Industries')"
          :title="t('Built for the problems your sector actually has')"
          :lead="t('Five industries where we have shipped enough to know the edge cases before you hit them.')"
        >
          <template #action>
            <RouterLink to="/industries" class="btn-outline btn-sm">{{ t('All industries') }}</RouterLink>
          </template>
        </SectionHead>
      </Reveal>

      <div class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        <Reveal v-for="(ind, i) in industries" :key="ind.slug" :delay="i * 70">
          <RouterLink
            :to="`/industries/${ind.slug}`"
            class="card card-hover group flex h-full flex-col p-6"
          >
            <span class="text-2xl" aria-hidden="true">{{ t(ind.icon) }}</span>
            <h3 class="mt-4 font-display text-[15px] font-semibold text-slate-900 dark:text-white">{{ t(ind.name) }}</h3>
            <p class="mt-2 flex-1 text-[12.5px] leading-relaxed text-slate-500 dark:text-slate-400">
              {{ t(ind.tagline) }}
            </p>
            <p class="mt-4 font-display text-lg font-bold text-indigo-600 dark:text-indigo-400">
              {{ t(ind.stats[0].value) }}
            </p>
            <p class="text-[11.5px] text-slate-400">{{ t(ind.stats[0].label) }}</p>
          </RouterLink>
        </Reveal>
      </div>
    </div>
  </section>

  <!-- Case studies -->
  <section class="section">
    <div class="shell">
      <Reveal>
        <SectionHead
          :eyebrow="t('Case studies')"
          :title="t('Driving actual business growth for our clients')"
          :lead="t('Full write-ups with the numbers attached — what the problem was, what we built and what changed afterwards.')"
        />
      </Reveal>
      <Reveal :delay="80" class="mt-12">
        <CaseStudyTabs />
      </Reveal>
    </div>
  </section>

  <!-- Testimonials -->
  <section class="border-y border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900/40">
    <div class="shell section">
      <Reveal>
        <SectionHead
          :eyebrow="t('Client testimonials')"
          :title="t('What clients say when the project is done')"
        >
          <template #action>
            <RouterLink to="/testimonials" class="btn-outline btn-sm">{{ t('Read all') }}</RouterLink>
          </template>
        </SectionHead>
      </Reveal>
      <Reveal :delay="80" class="mt-12">
        <TestimonialSlider />
      </Reveal>
    </div>
  </section>

  <!-- Mid CTA -->
  <section class="shell py-16">
    <Reveal>
      <div class="card flex flex-col gap-6 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
        <div class="max-w-xl">
          <h2 class="h3 text-2xl">{{ t('Not sure what your project should cost?') }}</h2>
          <p class="mt-3 text-[14.5px] leading-relaxed text-slate-500 dark:text-slate-400">
            {{ t('Answer six questions and get an instant ballpark built from the medians of 38 delivered projects — no email required.') }}
          </p>
        </div>
        <RouterLink to="/tools/project-estimator" class="btn-primary shrink-0">{{ t('Estimate My Project') }}</RouterLink>
      </div>
    </Reveal>
  </section>

  <!-- Benchmark reports -->
  <section class="border-y border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900/40">
    <div class="shell section">
      <Reveal>
        <SectionHead
          :eyebrow="t('Benchmark reports')"
          :title="t('Sector data from our own delivery record')"
          :lead="t('We publish build costs, performance benchmarks and adoption data instead of keeping them for pitch decks.')"
        >
          <template #action>
            <RouterLink to="/insights/reports" class="btn-outline btn-sm">{{ t('All reports') }}</RouterLink>
          </template>
        </SectionHead>
      </Reveal>

      <div class="mt-12 grid gap-6 md:grid-cols-3">
        <Reveal v-for="(report, i) in featuredReports" :key="report.slug" :delay="i * 90">
          <div class="card flex h-full flex-col p-6">
            <div class="flex items-center justify-between">
              <span class="chip">{{ t(report.sector) }}</span>
              <span class="text-[11.5px] text-slate-400">{{ t('{n} pages', { n: report.pages }) }}</span>
            </div>
            <h3 class="mt-5 font-display text-[16px] leading-snug font-semibold text-slate-900 dark:text-white">
              {{ t(report.title) }}
            </h3>
            <p class="mt-2 flex-1 text-[13px] leading-relaxed text-slate-500 dark:text-slate-400">
              {{ t(report.summary) }}
            </p>
            <button
              type="button"
              class="btn-outline btn-sm mt-6"
              @click="openLead({ title: t('Download: {title}', { title: t(report.title) }), subtitle: 'We will email the PDF within a minute.', submitLabel: 'Send Me the PDF' })"
            >
              {{ t('Download PDF') }}
            </button>
          </div>
        </Reveal>
      </div>
    </div>
  </section>

  <!-- Blog -->
  <section v-if="latestPosts.length" class="section">
    <div class="shell">
      <Reveal>
        <SectionHead :eyebrow="t('Latest writing')" :title="t('Notes from the build')">
          <template #action>
            <RouterLink to="/blog" class="btn-outline btn-sm">{{ t('All posts') }}</RouterLink>
          </template>
        </SectionHead>
      </Reveal>

      <div class="mt-12 grid gap-6 md:grid-cols-3">
        <Reveal v-for="(post, i) in latestPosts" :key="post.slug" :delay="i * 90">
          <RouterLink :to="`/blog/${post.slug}`" class="card card-hover group flex h-full flex-col p-6">
            <div class="flex items-center gap-3 text-[11.5px] text-slate-400">
              <span class="font-semibold text-indigo-600 dark:text-indigo-400">{{ t(post.category) }}</span>
              <span>·</span>
              <span>{{ t(post.readTime) }}</span>
            </div>
            <h3 class="mt-4 font-display text-[16px] leading-snug font-semibold text-slate-900 dark:text-white">
              {{ t(post.title) }}
            </h3>
            <p class="mt-2 flex-1 text-[13px] leading-relaxed text-slate-500 dark:text-slate-400">
              {{ t(post.excerpt) }}
            </p>
            <p class="mt-5 text-[11.5px] text-slate-400">{{ formatDate(post.date) }}</p>
          </RouterLink>
        </Reveal>
      </div>
    </div>
  </section>

  <!-- FAQs -->
  <section class="border-y border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900/40">
    <div class="shell section">
      <Reveal>
        <SectionHead
          :eyebrow="t('FAQs')"
          :title="t('Frequently asked questions')"
          :lead="t('Scope, pricing, process and support — answered in detail rather than in marketing copy.')"
        >
          <template #action>
            <RouterLink to="/faqs" class="btn-outline btn-sm">{{ t('All FAQs') }}</RouterLink>
          </template>
        </SectionHead>
      </Reveal>
      <Reveal :delay="80" class="mt-12">
        <FaqAccordion :groups="homeFaqs" :limit="4" />
      </Reveal>
    </div>
  </section>

  <!-- News + featured on -->
  <section class="section">
    <div class="shell grid gap-12 lg:grid-cols-[1.4fr_1fr]">
      <div>
        <Reveal>
          <SectionHead :eyebrow="t('Newsroom')" :title="t('Service in the news')">
            <template #action>
              <RouterLink to="/press" class="btn-outline btn-sm">{{ t('All releases') }}</RouterLink>
            </template>
          </SectionHead>
        </Reveal>
        <div class="mt-8 divide-y divide-slate-200/80 dark:divide-slate-800">
          <Reveal v-for="(item, i) in press.slice(0, 3)" :key="item.title" :delay="i * 70">
            <article class="py-5">
              <p class="text-[11.5px] text-slate-400">{{ formatDate(item.date) }}</p>
              <h3 class="mt-1.5 font-display text-[15.5px] font-semibold text-slate-900 dark:text-white">
                {{ t(item.title) }}
              </h3>
              <p class="mt-2 text-[13px] leading-relaxed text-slate-500 dark:text-slate-400">{{ t(item.body) }}</p>
            </article>
          </Reveal>
        </div>
      </div>

      <Reveal :delay="120">
        <div class="card p-7">
          <p class="text-[11px] font-semibold tracking-[0.14em] text-slate-400 uppercase">{{ t('As featured on') }}</p>
          <ul class="mt-5 space-y-3">
            <li
              v-for="name in featuredOn"
              :key="name"
              class="border-b border-slate-100 pb-3 font-display text-[15px] font-semibold text-slate-700 last:border-0 last:pb-0 dark:border-slate-800 dark:text-slate-200"
            >
              {{ t(name) }}
            </li>
          </ul>
        </div>
      </Reveal>
    </div>
  </section>
</template>
