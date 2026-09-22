<script setup>
import { ref } from 'vue'
import { serviceCategories, services } from '../data/services'
import { submitEnquiry } from '../composables/useEnquiry'

const props = defineProps({
  preselectedService: { type: String, default: '' },
})

const blank = () => ({
  name: '',
  email: '',
  phone: '',
  company: '',
  service: props.preselectedService,
  budget: '',
  timeline: '',
  message: '',
  consent: false,
})

const form = ref(blank())
const status = ref('idle')

async function submit() {
  status.value = 'sending'
  try {
    await submitEnquiry(form.value)
    status.value = 'success'
    form.value = blank()
  } catch {
    status.value = 'error'
  }
}
</script>

<template>
  <form class="space-y-4" @submit.prevent="submit">
    <div class="grid gap-4 sm:grid-cols-2">
      <div>
        <label class="label" for="cf-name">Name *</label>
        <input id="cf-name" v-model="form.name" type="text" required class="field" placeholder="Your name" />
      </div>
      <div>
        <label class="label" for="cf-email">Work email *</label>
        <input id="cf-email" v-model="form.email" type="email" required class="field" placeholder="you@company.com" />
      </div>
    </div>

    <div class="grid gap-4 sm:grid-cols-2">
      <div>
        <label class="label" for="cf-phone">Phone</label>
        <input id="cf-phone" v-model="form.phone" type="tel" class="field" placeholder="+91 ..." />
      </div>
      <div>
        <label class="label" for="cf-company">Company</label>
        <input id="cf-company" v-model="form.company" type="text" class="field" placeholder="Company name" />
      </div>
    </div>

    <div>
      <label class="label" for="cf-service">Service needed *</label>
      <select id="cf-service" v-model="form.service" required class="field">
        <option value="" disabled>Choose a service</option>
        <optgroup v-for="cat in serviceCategories" :key="cat.slug" :label="cat.name">
          <option v-for="s in services.filter((x) => x.categorySlug === cat.slug)" :key="s.id" :value="s.title">
            {{ s.title }}
          </option>
        </optgroup>
        <option value="Not sure yet">Something else / not sure</option>
      </select>
    </div>

    <div class="grid gap-4 sm:grid-cols-2">
      <div>
        <label class="label" for="cf-budget">Budget</label>
        <select id="cf-budget" v-model="form.budget" class="field">
          <option value="" disabled>Select a range</option>
          <option>Under $500</option>
          <option>$500 – $2,000</option>
          <option>$2,000 – $10,000</option>
          <option>$10,000+</option>
          <option>Monthly retainer</option>
        </select>
      </div>
      <div>
        <label class="label" for="cf-timeline">Timeline</label>
        <select id="cf-timeline" v-model="form.timeline" class="field">
          <option value="" disabled>When do you need it?</option>
          <option>As soon as possible</option>
          <option>Within a month</option>
          <option>This quarter</option>
          <option>Still planning</option>
        </select>
      </div>
    </div>

    <div>
      <label class="label" for="cf-message">Project details *</label>
      <textarea
        id="cf-message"
        v-model="form.message"
        rows="5"
        required
        class="field"
        placeholder="Tell us about your project — goals, timeline, anything that helps."
      ></textarea>
    </div>

    <label class="flex items-start gap-2.5 text-[12px] leading-relaxed text-slate-500 dark:text-slate-400">
      <input v-model="form.consent" type="checkbox" required class="mt-0.5 h-4 w-4 rounded border-slate-300" />
      <span>I agree to be contacted about this enquiry and accept the privacy policy.</span>
    </label>

    <button type="submit" class="btn-primary w-full" :disabled="status === 'sending'">
      {{ status === 'sending' ? 'Sending…' : 'Request a Quote' }}
    </button>

    <p
      v-if="status === 'success'"
      class="rounded-xl bg-emerald-50 px-4 py-3 text-[13px] font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
    >
      Thanks — we have your request and will reply within one business day.
    </p>
    <p
      v-if="status === 'error'"
      class="rounded-xl bg-red-50 px-4 py-3 text-[13px] font-medium text-red-700 dark:bg-red-500/10 dark:text-red-300"
    >
      Something went wrong. Please email us directly instead.
    </p>
  </form>
</template>
