<script setup>
import { ref } from 'vue'
import { services } from '../data/services'

// Replace with your own Formspree endpoint (https://formspree.io — free tier).
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID'

const props = defineProps({
  preselectedService: { type: String, default: '' },
})

const form = ref({
  name: '',
  email: '',
  phone: '',
  service: props.preselectedService,
  budget: '',
  message: '',
})

const status = ref('idle') // idle | sending | success | error

async function submit() {
  status.value = 'sending'
  try {
    const res = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(form.value),
    })
    if (!res.ok) throw new Error('Request failed')
    status.value = 'success'
    form.value = { name: '', email: '', phone: '', service: '', budget: '', message: '' }
  } catch {
    status.value = 'error'
  }
}

const inputClass =
  'w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:ring-indigo-950'
</script>

<template>
  <form @submit.prevent="submit" class="space-y-4">
    <div class="grid gap-4 sm:grid-cols-2">
      <div>
        <label class="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Name *</label>
        <input v-model="form.name" type="text" required placeholder="Your name" :class="inputClass" />
      </div>
      <div>
        <label class="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Email *</label>
        <input v-model="form.email" type="email" required placeholder="you@company.com" :class="inputClass" />
      </div>
    </div>

    <div class="grid gap-4 sm:grid-cols-2">
      <div>
        <label class="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Phone</label>
        <input v-model="form.phone" type="tel" placeholder="+91 ..." :class="inputClass" />
      </div>
      <div>
        <label class="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Budget</label>
        <select v-model="form.budget" :class="inputClass">
          <option value="" disabled>Select a range</option>
          <option>Under $500</option>
          <option>$500 – $2,000</option>
          <option>$2,000 – $10,000</option>
          <option>$10,000+</option>
        </select>
      </div>
    </div>

    <div>
      <label class="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Service needed *</label>
      <select v-model="form.service" required :class="inputClass">
        <option value="" disabled>Choose a service</option>
        <option v-for="s in services" :key="s.id" :value="s.title">{{ s.title }}</option>
        <option>Something else / not sure</option>
      </select>
    </div>

    <div>
      <label class="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Project details *</label>
      <textarea
        v-model="form.message"
        rows="5"
        required
        placeholder="Tell us about your project — goals, timeline, anything that helps."
        :class="inputClass"
      ></textarea>
    </div>

    <button
      type="submit"
      :disabled="status === 'sending'"
      class="w-full rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:opacity-60"
    >
      {{ status === 'sending' ? 'Sending…' : 'Request a Quote' }}
    </button>

    <p v-if="status === 'success'" class="rounded-lg bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
      ✅ Thanks! We received your request and will reply within 24 hours.
    </p>
    <p v-if="status === 'error'" class="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:bg-red-950 dark:text-red-300">
      Something went wrong. Please email us directly instead.
    </p>
  </form>
</template>
