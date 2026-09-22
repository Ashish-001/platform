<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import PageHero from '../components/PageHero.vue'
import { useUi } from '../composables/useUi'

const { openLead } = useUi()

const projectTypes = [
  { id: 'website', label: 'Marketing website', base: 1200, weeks: 3 },
  { id: 'webapp', label: 'Web app / SaaS', base: 6000, weeks: 9 },
  { id: 'store', label: 'E-commerce store', base: 3500, weeks: 6 },
  { id: 'mobile', label: 'Mobile app', base: 8000, weeks: 12 },
  { id: 'ai', label: 'AI feature or assistant', base: 3000, weeks: 6 },
  { id: 'rescue', label: 'Legacy rescue / migration', base: 5000, weeks: 10 },
]

const sizes = [
  { id: 'small', label: 'Small — up to 5 screens', factor: 0.7, weeks: -1 },
  { id: 'medium', label: 'Medium — 6 to 15 screens', factor: 1, weeks: 0 },
  { id: 'large', label: 'Large — 16 to 40 screens', factor: 1.7, weeks: 4 },
  { id: 'xl', label: 'Extra large — 40+ screens', factor: 2.6, weeks: 9 },
]

const addOns = [
  { id: 'design', label: 'UI/UX design from scratch', cost: 1500, weeks: 2 },
  { id: 'auth', label: 'Accounts, roles & permissions', cost: 1200, weeks: 1 },
  { id: 'payments', label: 'Payments or subscriptions', cost: 1000, weeks: 1 },
  { id: 'integrations', label: 'Third-party integrations (CRM, ERP)', cost: 1400, weeks: 2 },
  { id: 'ai', label: 'AI assistant or AI search', cost: 2200, weeks: 3 },
  { id: 'cms', label: 'CMS so your team can edit content', cost: 800, weeks: 1 },
  { id: 'devops', label: 'Cloud setup, CI/CD & monitoring', cost: 900, weeks: 1 },
  { id: 'seo', label: 'Technical SEO & performance pass', cost: 700, weeks: 1 },
]

const urgencies = [
  { id: 'normal', label: 'Standard schedule', factor: 1 },
  { id: 'fast', label: 'Compressed — needed sooner', factor: 1.25 },
  { id: 'rush', label: 'Rush — all hands', factor: 1.5 },
]

const support = [
  { id: 'none', label: 'No retainer for now', cost: 0 },
  { id: 'basic', label: 'Basic — updates & monitoring', cost: 200 },
  { id: 'growth', label: 'Growth — ongoing development', cost: 650 },
]

const type = ref(projectTypes[1].id)
const size = ref(sizes[1].id)
const selectedAddOns = ref(['design', 'devops'])
const urgency = ref(urgencies[0].id)
const retainer = ref('basic')

const activeType = computed(() => projectTypes.find((t) => t.id === type.value))
const activeSize = computed(() => sizes.find((s) => s.id === size.value))
const activeUrgency = computed(() => urgencies.find((u) => u.id === urgency.value))
const activeSupport = computed(() => support.find((s) => s.id === retainer.value))

const addOnTotal = computed(() =>
  addOns.filter((a) => selectedAddOns.value.includes(a.id)).reduce((sum, a) => sum + a.cost, 0),
)

const addOnWeeks = computed(() =>
  addOns.filter((a) => selectedAddOns.value.includes(a.id)).reduce((sum, a) => sum + a.weeks, 0),
)

const midpoint = computed(
  () => (activeType.value.base * activeSize.value.factor + addOnTotal.value) * activeUrgency.value.factor,
)

const low = computed(() => Math.round((midpoint.value * 0.85) / 100) * 100)
const high = computed(() => Math.round((midpoint.value * 1.25) / 100) * 100)

const weeks = computed(() => {
  const total = activeType.value.weeks + activeSize.value.weeks + Math.round(addOnWeeks.value * 0.6)
  const adjusted = urgency.value === 'normal' ? total : Math.round(total * (urgency.value === 'fast' ? 0.8 : 0.65))
  return Math.max(2, adjusted)
})

const money = (n) => `$${n.toLocaleString('en-US')}`

function toggleAddOn(id) {
  selectedAddOns.value = selectedAddOns.value.includes(id)
    ? selectedAddOns.value.filter((a) => a !== id)
    : [...selectedAddOns.value, id]
}

function sendEstimate() {
  openLead({
    title: 'Email me this estimate',
    subtitle: `${activeType.value.label} · ${money(low.value)} – ${money(high.value)} · about ${weeks.value} weeks`,
    submitLabel: 'Send My Estimate',
  })
}
</script>

<template>
  <PageHero
    eyebrow="Free tool"
    title="Project cost estimator"
    lead="Six inputs, an instant ballpark. The numbers come from medians across 38 delivered projects — no email required to see them."
    :crumbs="[{ label: 'Tools' }, { label: 'Project estimator' }]"
  />

  <section class="shell section grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-start">
    <!-- Inputs -->
    <div class="space-y-8">
      <fieldset>
        <legend class="text-[11px] font-semibold tracking-[0.14em] text-slate-400 uppercase">
          1 · What are you building?
        </legend>
        <div class="mt-4 grid gap-3 sm:grid-cols-2">
          <label
            v-for="option in projectTypes"
            :key="option.id"
            class="card flex cursor-pointer items-center gap-3 p-4 transition"
            :class="type === option.id && 'border-indigo-300 bg-indigo-50/60 dark:border-indigo-800 dark:bg-slate-900'"
          >
            <input v-model="type" type="radio" :value="option.id" class="h-4 w-4" name="project-type" />
            <span class="text-[13.5px] font-medium text-slate-800 dark:text-slate-200">{{ option.label }}</span>
          </label>
        </div>
      </fieldset>

      <fieldset>
        <legend class="text-[11px] font-semibold tracking-[0.14em] text-slate-400 uppercase">
          2 · How big is the scope?
        </legend>
        <div class="mt-4 grid gap-3 sm:grid-cols-2">
          <label
            v-for="option in sizes"
            :key="option.id"
            class="card flex cursor-pointer items-center gap-3 p-4 transition"
            :class="size === option.id && 'border-indigo-300 bg-indigo-50/60 dark:border-indigo-800 dark:bg-slate-900'"
          >
            <input v-model="size" type="radio" :value="option.id" class="h-4 w-4" name="project-size" />
            <span class="text-[13.5px] font-medium text-slate-800 dark:text-slate-200">{{ option.label }}</span>
          </label>
        </div>
      </fieldset>

      <fieldset>
        <legend class="text-[11px] font-semibold tracking-[0.14em] text-slate-400 uppercase">
          3 · What needs to be included?
        </legend>
        <div class="mt-4 grid gap-3 sm:grid-cols-2">
          <label
            v-for="option in addOns"
            :key="option.id"
            class="card flex cursor-pointer items-start gap-3 p-4 transition"
            :class="
              selectedAddOns.includes(option.id) &&
              'border-indigo-300 bg-indigo-50/60 dark:border-indigo-800 dark:bg-slate-900'
            "
          >
            <input
              type="checkbox"
              class="mt-0.5 h-4 w-4 rounded"
              :checked="selectedAddOns.includes(option.id)"
              @change="toggleAddOn(option.id)"
            />
            <span class="text-[13.5px] font-medium text-slate-800 dark:text-slate-200">{{ option.label }}</span>
          </label>
        </div>
      </fieldset>

      <div class="grid gap-6 sm:grid-cols-2">
        <div>
          <label class="text-[11px] font-semibold tracking-[0.14em] text-slate-400 uppercase" for="urgency"
            >4 · Timeline pressure</label
          >
          <select id="urgency" v-model="urgency" class="field mt-4">
            <option v-for="option in urgencies" :key="option.id" :value="option.id">{{ option.label }}</option>
          </select>
        </div>
        <div>
          <label class="text-[11px] font-semibold tracking-[0.14em] text-slate-400 uppercase" for="retainer"
            >5 · Support after launch</label
          >
          <select id="retainer" v-model="retainer" class="field mt-4">
            <option v-for="option in support" :key="option.id" :value="option.id">{{ option.label }}</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Result -->
    <aside class="lg:sticky lg:top-24">
      <div class="card overflow-hidden">
        <div class="bg-slate-900 p-7">
          <p class="text-[11px] font-semibold tracking-[0.16em] text-indigo-300 uppercase">Estimated range</p>
          <p class="mt-4 font-display text-3xl font-bold text-white">
            {{ money(low) }} – {{ money(high) }}
          </p>
          <p class="mt-2 text-[13px] text-slate-400">
            about {{ weeks }} weeks · {{ activeType.label.toLowerCase() }}
          </p>
        </div>

        <div class="space-y-3 p-7">
          <div class="flex items-baseline justify-between text-[13px]">
            <span class="text-slate-500 dark:text-slate-400">Base build</span>
            <span class="font-semibold text-slate-800 dark:text-slate-200">{{
              money(Math.round(activeType.base * activeSize.factor))
            }}</span>
          </div>
          <div class="flex items-baseline justify-between text-[13px]">
            <span class="text-slate-500 dark:text-slate-400"
              >Add-ons ({{ selectedAddOns.length }})</span
            >
            <span class="font-semibold text-slate-800 dark:text-slate-200">{{ money(addOnTotal) }}</span>
          </div>
          <div class="flex items-baseline justify-between text-[13px]">
            <span class="text-slate-500 dark:text-slate-400">Schedule factor</span>
            <span class="font-semibold text-slate-800 dark:text-slate-200">×{{ activeUrgency.factor }}</span>
          </div>
          <div
            v-if="activeSupport.cost"
            class="flex items-baseline justify-between border-t border-slate-200/80 pt-3 text-[13px] dark:border-slate-800"
          >
            <span class="text-slate-500 dark:text-slate-400">Retainer</span>
            <span class="font-semibold text-slate-800 dark:text-slate-200">{{ money(activeSupport.cost) }}/mo</span>
          </div>

          <p class="pt-2 text-[12px] leading-relaxed text-slate-400">
            Indicative only. A fixed-price quote follows a 30-minute discovery call, and the number we agree
            there is the number you pay.
          </p>

          <button type="button" class="btn-primary mt-2 w-full" @click="sendEstimate">Email Me This Estimate</button>
          <RouterLink to="/contact" class="btn-outline w-full">Book a discovery call</RouterLink>
        </div>
      </div>
    </aside>
  </section>
</template>
