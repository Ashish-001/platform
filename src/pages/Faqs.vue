<script setup>
import PageHero from '../components/PageHero.vue'
import FaqAccordion from '../components/FaqAccordion.vue'
import { faqGroups } from '../data/faqs'
import { useUi } from '../composables/useUi'

const { openLead } = useUi()
const total = faqGroups.reduce((sum, g) => sum + g.items.length, 0)
</script>

<template>
  <PageHero
    eyebrow="FAQs"
    :title="`${total} answers about how we work`"
    lead="Scope, pricing, process, support and the awkward questions. If something is missing, ask us directly and we will add it."
    :crumbs="[{ label: 'FAQs' }]"
  >
    <template #actions>
      <button type="button" class="btn-primary" @click="openLead({ title: 'Ask us anything' })">
        Ask a Question
      </button>
    </template>
  </PageHero>

  <section class="shell section">
    <FaqAccordion :groups="faqGroups" />
  </section>
</template>
