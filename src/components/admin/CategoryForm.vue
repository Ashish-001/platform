<script setup>
import { computed, ref, watch } from 'vue'
import { serviceCategories } from '../../data/services'
import { clone, slugify } from '../../stores/content'

const props = defineProps({
  category: { type: Object, default: null },
})

const emit = defineEmits(['save', 'cancel'])

const blank = () => ({
  slug: '',
  name: '',
  menuLabel: [],
  icon: '🧩',
  tagline: '',
  description: '',
  stat: { value: '', label: '' },
  outcomes: [],
})

const form = ref(blank())
const outcomeText = ref('')
const originalSlug = ref(null)
const slugTouched = ref(false)
const error = ref('')

watch(
  () => props.category,
  (category) => {
    form.value = category ? clone(category) : blank()
    form.value.stat ??= { value: '', label: '' }
    outcomeText.value = (form.value.outcomes ?? []).join('\n')
    originalSlug.value = category?.slug ?? null
    slugTouched.value = Boolean(category)
    error.value = ''
  },
  { immediate: true },
)

watch(
  () => form.value.name,
  (name) => {
    if (!slugTouched.value) form.value.slug = slugify(name)
  },
)

const isEdit = computed(() => Boolean(originalSlug.value))

/** Splits "Backend & Infrastructure" into two nav lines, as the shipped categories do. */
function menuLabelFor(name) {
  const words = name.trim().split(/\s+/)
  if (words.length < 2) return [name.trim()]
  const mid = Math.ceil(words.length / 2)
  return [words.slice(0, mid).join(' '), words.slice(mid).join(' ')]
}

function submit() {
  const cleaned = clone(form.value)
  cleaned.name = cleaned.name.trim()
  cleaned.slug = slugify(cleaned.slug || cleaned.name)
  cleaned.menuLabel = menuLabelFor(cleaned.name)
  cleaned.outcomes = outcomeText.value
    .split('\n')
    .map((o) => o.trim())
    .filter(Boolean)

  if (!cleaned.name) return (error.value = 'A name is required.')
  if (!cleaned.slug) return (error.value = 'A URL slug is required.')
  if (cleaned.slug !== originalSlug.value && serviceCategories.some((c) => c.slug === cleaned.slug))
    return (error.value = `Another category already uses the slug “${cleaned.slug}”.`)
  if (!cleaned.tagline.trim()) return (error.value = 'A tagline is required — it shows on category cards.')
  if (!cleaned.description.trim()) return (error.value = 'A description is required — it shows on the category page.')

  error.value = ''
  emit('save', { category: cleaned, originalSlug: originalSlug.value })
}
</script>

<template>
  <form class="space-y-5" @submit.prevent="submit">
    <div class="grid gap-4 sm:grid-cols-2">
      <div class="sm:col-span-2">
        <label class="label" for="cf-name">Category name *</label>
        <input id="cf-name" v-model="form.name" type="text" class="field" placeholder="e.g. Data & Analytics" />
      </div>

      <div>
        <label class="label" for="cf-slug">URL slug *</label>
        <input
          id="cf-slug"
          v-model="form.slug"
          type="text"
          class="field"
          placeholder="data-analytics"
          @input="slugTouched = true"
        />
        <p class="mt-1.5 text-[11.5px] text-slate-400">/services/category/{{ form.slug || 'data-analytics' }}</p>
      </div>

      <div>
        <label class="label" for="cf-icon">Icon (emoji)</label>
        <input id="cf-icon" v-model="form.icon" type="text" class="field" maxlength="4" placeholder="🧩" />
      </div>

      <div class="sm:col-span-2">
        <label class="label" for="cf-tagline">Tagline *</label>
        <input
          id="cf-tagline"
          v-model="form.tagline"
          type="text"
          class="field"
          placeholder="One line shown on category cards."
        />
      </div>

      <div class="sm:col-span-2">
        <label class="label" for="cf-description">Description *</label>
        <textarea
          id="cf-description"
          v-model="form.description"
          rows="3"
          class="field"
          placeholder="Two or three sentences shown on the category page."
        ></textarea>
      </div>

      <div>
        <label class="label" for="cf-stat-value">Headline stat</label>
        <input id="cf-stat-value" v-model="form.stat.value" type="text" class="field" placeholder="40%" />
      </div>

      <div>
        <label class="label" for="cf-stat-label">Stat label</label>
        <input
          id="cf-stat-label"
          v-model="form.stat.label"
          type="text"
          class="field"
          placeholder="faster reporting for one client"
        />
      </div>

      <div class="sm:col-span-2">
        <label class="label" for="cf-outcomes">What you get</label>
        <textarea
          id="cf-outcomes"
          v-model="outcomeText"
          rows="3"
          class="field"
          placeholder="One outcome per line"
        ></textarea>
      </div>
    </div>

    <p
      v-if="error"
      class="rounded-xl bg-red-50 px-4 py-3 text-[13px] font-medium text-red-700 dark:bg-red-500/10 dark:text-red-300"
    >
      {{ error }}
    </p>

    <div class="flex flex-wrap gap-3">
      <button type="submit" class="btn-primary">{{ isEdit ? 'Save changes' : 'Add category' }}</button>
      <button type="button" class="btn-outline" @click="emit('cancel')">Cancel</button>
    </div>
  </form>
</template>
