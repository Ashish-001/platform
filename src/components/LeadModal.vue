<script setup>
import { ref, watch } from 'vue'
import ModalShell from './ModalShell.vue'
import { serviceCategories } from '../data/services'
import { useUi } from '../composables/useUi'
import { submitEnquiry } from '../composables/useEnquiry'

const { leadOpen, leadContext, closeLead } = useUi()

const blank = () => ({ name: '', email: '', phone: '', interest: '', consent: false })
const form = ref(blank())
const status = ref('idle')

watch(leadOpen, (open) => {
  if (open) {
    form.value = blank()
    status.value = 'idle'
  }
})

async function submit() {
  status.value = 'sending'
  try {
    await submitEnquiry({ ...form.value, source: leadContext.value.title })
    status.value = 'success'
  } catch {
    status.value = 'error'
  }
}
</script>

<template>
  <ModalShell :open="leadOpen" width="max-w-md" labelled-by="lead-modal-title" @close="closeLead">
    <div class="p-7 sm:p-8">
      <template v-if="status === 'success'">
        <div class="py-6 text-center">
          <span
            class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-xl dark:bg-emerald-500/10"
            >✓</span
          >
          <h2 class="h3 mt-5">Request received</h2>
          <p class="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            A senior engineer will get back to you within one business day — usually sooner.
          </p>
          <button type="button" class="btn-outline mt-6 w-full" @click="closeLead">Close</button>
        </div>
      </template>

      <template v-else>
        <p class="eyebrow">Talk to an engineer</p>
        <h2 id="lead-modal-title" class="h3 mt-2">{{ leadContext.title }}</h2>
        <p class="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          {{ leadContext.subtitle }}
        </p>

        <form class="mt-6 space-y-3.5" @submit.prevent="submit">
          <div>
            <label class="label" for="lead-name">Name *</label>
            <input id="lead-name" v-model="form.name" type="text" required class="field" placeholder="Your name" />
          </div>
          <div>
            <label class="label" for="lead-email">Work email *</label>
            <input
              id="lead-email"
              v-model="form.email"
              type="email"
              required
              class="field"
              placeholder="you@company.com"
            />
          </div>
          <div>
            <label class="label" for="lead-phone">Phone *</label>
            <input id="lead-phone" v-model="form.phone" type="tel" required class="field" placeholder="+91 ..." />
          </div>
          <div>
            <label class="label" for="lead-interest">What do you need? *</label>
            <select id="lead-interest" v-model="form.interest" required class="field">
              <option value="" disabled>Choose an area</option>
              <option v-for="cat in serviceCategories" :key="cat.slug" :value="cat.name">{{ cat.name }}</option>
              <option value="Not sure yet">Not sure yet</option>
            </select>
          </div>

          <label class="flex items-start gap-2.5 pt-1 text-[12px] leading-relaxed text-slate-500 dark:text-slate-400">
            <input v-model="form.consent" type="checkbox" required class="mt-0.5 h-4 w-4 rounded border-slate-300" />
            <span>I agree to be contacted about this enquiry and accept the privacy policy.</span>
          </label>

          <button type="submit" class="btn-primary w-full" :disabled="status === 'sending'">
            {{ status === 'sending' ? 'Sending…' : leadContext.submitLabel }}
          </button>

          <p
            v-if="status === 'error'"
            class="rounded-xl bg-red-50 px-4 py-3 text-[13px] font-medium text-red-700 dark:bg-red-500/10 dark:text-red-300"
          >
            Something went wrong. Please email us directly instead.
          </p>
        </form>
      </template>
    </div>
  </ModalShell>
</template>
