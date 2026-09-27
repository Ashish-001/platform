<script setup>
import { computed, ref, watch } from 'vue'
import { serviceCategories } from '../../data/services'
import { clone, slugify } from '../../stores/content'

const props = defineProps({
  service: { type: Object, default: null },
})

const emit = defineEmits(['save', 'cancel'])

const blank = () => ({
  id: '',
  title: '',
  categorySlug: serviceCategories[0].slug,
  icon: '🧩',
  featured: false,
  shortDesc: '',
  longDesc: '',
  technologies: [],
  priceRange: '',
  timeline: '',
  features: [],
})

const form = ref(blank())
const techText = ref('')
const featureText = ref('')
const originalId = ref(null)
const idTouched = ref(false)
const error = ref('')

watch(
  () => props.service,
  (service) => {
    form.value = service ? clone(service) : blank()
    techText.value = (form.value.technologies ?? []).join(', ')
    featureText.value = (form.value.features ?? []).join('\n')
    originalId.value = service?.id ?? null
    idTouched.value = Boolean(service)
    error.value = ''
  },
  { immediate: true },
)

watch(
  () => form.value.title,
  (title) => {
    if (!idTouched.value) form.value.id = slugify(title)
  },
)

const isEdit = computed(() => Boolean(originalId.value))

const categoryName = computed(
  () => serviceCategories.find((c) => c.slug === form.value.categorySlug)?.name ?? '',
)

function submit() {
  const cleaned = clone(form.value)
  cleaned.id = slugify(cleaned.id || cleaned.title)
  cleaned.category = categoryName.value
  cleaned.technologies = techText.value
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean)
  cleaned.features = featureText.value
    .split('\n')
    .map((f) => f.trim())
    .filter(Boolean)

  if (!cleaned.title.trim()) return (error.value = 'A title is required.')
  if (!cleaned.id) return (error.value = 'A URL slug is required.')
  if (!cleaned.shortDesc.trim()) return (error.value = 'A short description is required — it shows on cards.')
  if (!cleaned.longDesc.trim()) return (error.value = 'A long description is required — it shows on the detail page.')

  error.value = ''
  emit('save', { service: cleaned, originalId: originalId.value })
}
</script>

<template>
  <form class="space-y-5" @submit.prevent="submit">
    <div class="grid gap-4 sm:grid-cols-2">
      <div class="sm:col-span-2">
        <label class="label" for="sf-title">Service title *</label>
        <input id="sf-title" v-model="form.title" type="text" class="field" placeholder="e.g. Data Engineering" />
      </div>

      <div>
        <label class="label" for="sf-id">URL slug *</label>
        <input
          id="sf-id"
          v-model="form.id"
          type="text"
          class="field"
          placeholder="data-engineering"
          @input="idTouched = true"
        />
        <p class="mt-1.5 text-[11.5px] text-slate-400">/services/{{ form.id || 'data-engineering' }}</p>
      </div>

      <div>
        <label class="label" for="sf-category">Category</label>
        <select id="sf-category" v-model="form.categorySlug" class="field">
          <option v-for="cat in serviceCategories" :key="cat.slug" :value="cat.slug">{{ cat.name }}</option>
        </select>
      </div>

      <div>
        <label class="label" for="sf-icon">Icon (emoji)</label>
        <input id="sf-icon" v-model="form.icon" type="text" class="field" maxlength="4" placeholder="🧩" />
      </div>

      <div class="flex items-end">
        <label class="flex items-center gap-2.5 pb-3 text-[13px] text-slate-600 dark:text-slate-300">
          <input v-model="form.featured" type="checkbox" class="h-4 w-4 rounded border-slate-300" />
          Show in homepage highlights
        </label>
      </div>

      <div>
        <label class="label" for="sf-price">Price range</label>
        <input id="sf-price" v-model="form.priceRange" type="text" class="field" placeholder="$1k – $8k" />
      </div>

      <div>
        <label class="label" for="sf-timeline">Timeline</label>
        <input id="sf-timeline" v-model="form.timeline" type="text" class="field" placeholder="4 – 10 weeks" />
      </div>

      <div class="sm:col-span-2">
        <label class="label" for="sf-short">Short description *</label>
        <textarea
          id="sf-short"
          v-model="form.shortDesc"
          rows="2"
          class="field"
          placeholder="One line shown on service cards."
        ></textarea>
      </div>

      <div class="sm:col-span-2">
        <label class="label" for="sf-long">Long description *</label>
        <textarea
          id="sf-long"
          v-model="form.longDesc"
          rows="4"
          class="field"
          placeholder="Two or three sentences shown in the service page hero."
        ></textarea>
      </div>

      <div>
        <label class="label" for="sf-tech">Technologies</label>
        <input id="sf-tech" v-model="techText" type="text" class="field" placeholder="Vue.js, Node.js, PostgreSQL" />
        <p class="mt-1.5 text-[11.5px] text-slate-400">Comma separated</p>
      </div>

      <div>
        <label class="label" for="sf-features">What is included</label>
        <textarea id="sf-features" v-model="featureText" rows="4" class="field" placeholder="One feature per line"></textarea>
      </div>
    </div>

    <p
      v-if="error"
      class="rounded-xl bg-red-50 px-4 py-3 text-[13px] font-medium text-red-700 dark:bg-red-500/10 dark:text-red-300"
    >
      {{ error }}
    </p>

    <div class="flex flex-wrap gap-3">
      <button type="submit" class="btn-primary">{{ isEdit ? 'Save changes' : 'Add service' }}</button>
      <button type="button" class="btn-outline" @click="emit('cancel')">Cancel</button>
    </div>
  </form>
</template>
