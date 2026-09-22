<script setup>
import PageHero from '../components/PageHero.vue'
import ContactForm from '../components/ContactForm.vue'
import Reveal from '../components/Reveal.vue'
import FaqAccordion from '../components/FaqAccordion.vue'
import { contact, offices } from '../data/company'
import { faqGroups } from '../data/faqs'

const contactFaqs = faqGroups.filter((g) => ['Process', 'Pricing & Packages'].includes(g.name))
</script>

<template>
  <PageHero
    eyebrow="Contact"
    title="Let’s do great work together"
    lead="Tell us what you need and you will hear back within one business day — from an engineer who can actually answer technical questions."
    :crumbs="[{ label: 'Contact' }]"
  />

  <section class="shell section grid gap-12 lg:grid-cols-[1fr_1.1fr]">
    <!-- Details -->
    <div class="space-y-6">
      <Reveal>
        <div class="card p-7">
          <p class="text-[11px] font-semibold tracking-[0.14em] text-slate-400 uppercase">Talk to us directly</p>
          <div class="mt-5 space-y-4">
            <a :href="contact.phoneHref" class="flex items-center gap-3 group">
              <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-slate-800 dark:text-indigo-300">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h1.5a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106a1.125 1.125 0 0 0-1.173.417l-.97 1.293a1.125 1.125 0 0 1-1.21.38 12.035 12.035 0 0 1-7.143-7.143 1.125 1.125 0 0 1 .38-1.21l1.293-.97c.334-.251.5-.68.417-1.173L6.313 3.102A1.125 1.125 0 0 0 5.222 2.25H3.75A1.5 1.5 0 0 0 2.25 3.75v3Z"
                  />
                </svg>
              </span>
              <span>
                <span class="block text-[13.5px] font-semibold text-slate-900 group-hover:text-indigo-600 dark:text-white">{{
                  contact.phone
                }}</span>
                <span class="block text-[12px] text-slate-400">{{ contact.hours }}</span>
              </span>
            </a>

            <a :href="`mailto:${contact.email}`" class="flex items-center gap-3 group">
              <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-slate-800 dark:text-indigo-300">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </svg>
              </span>
              <span>
                <span class="block text-[13.5px] font-semibold text-slate-900 group-hover:text-indigo-600 dark:text-white">{{
                  contact.email
                }}</span>
                <span class="block text-[12px] text-slate-400">Project enquiries</span>
              </span>
            </a>

            <a :href="`mailto:${contact.hr}`" class="flex items-center gap-3 group">
              <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-slate-800 dark:text-indigo-300">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.25a7.5 7.5 0 1 1 15 0v.75H4.5v-.75Z"
                  />
                </svg>
              </span>
              <span>
                <span class="block text-[13.5px] font-semibold text-slate-900 group-hover:text-indigo-600 dark:text-white">{{
                  contact.hr
                }}</span>
                <span class="block text-[12px] text-slate-400">Careers & applications</span>
              </span>
            </a>
          </div>
        </div>
      </Reveal>

      <Reveal v-for="(office, i) in offices" :key="office.city" :delay="(i + 1) * 70">
        <div class="card p-7">
          <div class="flex items-center justify-between">
            <h2 class="font-display text-[16px] font-semibold text-slate-900 dark:text-white">{{ office.city }}</h2>
            <span class="chip">{{ office.role }}</span>
          </div>
          <p class="mt-4 text-[13.5px] leading-relaxed text-slate-500 dark:text-slate-400">{{ office.address }}</p>
          <div class="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-[13px]">
            <a :href="`mailto:${office.email}`" class="text-indigo-600 dark:text-indigo-400">{{ office.email }}</a>
            <a :href="contact.phoneHref" class="text-slate-500 dark:text-slate-400">{{ office.phone }}</a>
          </div>
        </div>
      </Reveal>
    </div>

    <!-- Form -->
    <Reveal :delay="80">
      <div class="card p-7 sm:p-9">
        <h2 class="h3 text-xl">Tell us about your project</h2>
        <p class="mt-2 text-[13.5px] leading-relaxed text-slate-500 dark:text-slate-400">
          The more context you give, the more specific our first reply can be.
        </p>
        <div class="mt-7">
          <ContactForm />
        </div>
      </div>
    </Reveal>
  </section>

  <section class="border-t border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900/40">
    <div class="shell section">
      <h2 class="h2 text-3xl">Before you write in</h2>
      <p class="lead mt-4 max-w-2xl">The questions we are asked most often about process and pricing.</p>
      <div class="mt-10">
        <FaqAccordion :groups="contactFaqs" />
      </div>
    </div>
  </section>
</template>
