<script setup>
import PageHero from '../components/PageHero.vue'
import { contact } from '../data/company'

const sections = [
  {
    title: 'What we collect',
    body: 'Only what you send us: the name, email, phone number, company and project details submitted through our enquiry forms, plus aggregate analytics about which pages are visited. We do not buy contact data or enrich it from third parties.',
  },
  {
    title: 'Why we collect it',
    body: 'To reply to your enquiry, prepare a proposal and — where you have asked for one — email the report or estimate you requested. That is the entire purpose.',
  },
  {
    title: 'What we never do',
    body: 'We do not sell your data, share it with advertisers, or add you to a drip campaign because you downloaded a PDF. If you ask for a report, you get the report.',
  },
  {
    title: 'How long we keep it',
    body: 'Enquiries are retained for 24 months so we can pick up a conversation where it left off. Ask us to delete your record and it is gone within seven days, along with any backups in the following cycle.',
  },
  {
    title: 'Cookies and analytics',
    body: 'We use privacy-preserving, aggregate analytics without cross-site tracking or advertising cookies. Your theme preference is stored locally in your browser and never leaves your device.',
  },
  {
    title: 'Your rights',
    body: 'You can ask for a copy of what we hold, request a correction, or request deletion at any time. Email us and we will act on it within seven days.',
  },
]
</script>

<template>
  <PageHero
    eyebrow="Legal"
    title="Privacy policy"
    lead="Short, because our data practices are short. We collect what you send us, use it to reply, and delete it when you ask."
    :crumbs="[{ label: 'Privacy' }]"
  />

  <section class="shell section max-w-3xl">
    <div class="space-y-8">
      <div v-for="section in sections" :key="section.title">
        <h2 class="h3 text-lg">{{ section.title }}</h2>
        <p class="mt-3 text-[14.5px] leading-[1.8] text-slate-600 dark:text-slate-400">{{ section.body }}</p>
      </div>
    </div>

    <div class="card mt-12 p-7">
      <p class="text-[13.5px] leading-relaxed text-slate-600 dark:text-slate-300">
        Questions about any of this, or a deletion request? Email
        <a :href="`mailto:${contact.email}`" class="font-semibold text-indigo-600 dark:text-indigo-400">{{
          contact.email
        }}</a
        >.
      </p>
    </div>
  </section>
</template>
