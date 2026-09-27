<script setup>
import { computed, ref, watch } from 'vue'
import { blogCategories } from '../../data/blog'
import { clone, slugify } from '../../stores/content'

const props = defineProps({
  post: { type: Object, default: null },
})

const emit = defineEmits(['save', 'cancel'])

const blank = () => ({
  slug: '',
  title: '',
  category: blogCategories[0],
  date: new Date().toISOString().slice(0, 10),
  readTime: '6 min',
  excerpt: '',
  body: [{ type: 'p', text: '' }],
})

const form = ref(blank())
const originalSlug = ref(null)
const slugTouched = ref(false)
const error = ref('')

watch(
  () => props.post,
  (post) => {
    form.value = post ? clone(post) : blank()
    originalSlug.value = post?.slug ?? null
    slugTouched.value = Boolean(post)
    error.value = ''
  },
  { immediate: true },
)

watch(
  () => form.value.title,
  (title) => {
    if (!slugTouched.value) form.value.slug = slugify(title)
  },
)

const isEdit = computed(() => Boolean(originalSlug.value))

const blockTypes = [
  { value: 'p', label: 'Paragraph' },
  { value: 'h3', label: 'Heading' },
  { value: 'ul', label: 'Bullet list' },
]

function addBlock(type) {
  form.value.body.push(type === 'ul' ? { type, items: [''] } : { type, text: '' })
}

function removeBlock(index) {
  form.value.body.splice(index, 1)
}

function moveBlock(index, delta) {
  const target = index + delta
  if (target < 0 || target >= form.value.body.length) return
  const [block] = form.value.body.splice(index, 1)
  form.value.body.splice(target, 0, block)
}

function changeBlockType(index, type) {
  const current = form.value.body[index]
  if (type === 'ul') {
    const items = current.text ? current.text.split('\n').filter(Boolean) : ['']
    form.value.body.splice(index, 1, { type, items })
  } else {
    const text = Array.isArray(current.items) ? current.items.join('\n') : (current.text ?? '')
    form.value.body.splice(index, 1, { type, text })
  }
}

function itemsText(block) {
  return Array.isArray(block.items) ? block.items.join('\n') : ''
}

function setItems(block, value) {
  block.items = value.split('\n')
}

function submit() {
  const cleaned = clone(form.value)
  cleaned.slug = slugify(cleaned.slug || cleaned.title)
  cleaned.body = cleaned.body
    .map((block) =>
      block.type === 'ul'
        ? { type: 'ul', items: (block.items ?? []).map((i) => i.trim()).filter(Boolean) }
        : { type: block.type, text: (block.text ?? '').trim() },
    )
    .filter((block) => (block.type === 'ul' ? block.items.length : block.text))

  if (!cleaned.title.trim()) return (error.value = 'A title is required.')
  if (!cleaned.slug) return (error.value = 'A slug is required.')
  if (!cleaned.excerpt.trim()) return (error.value = 'An excerpt is required — it shows on listing cards.')
  if (!cleaned.body.length) return (error.value = 'Add at least one content block.')

  error.value = ''
  emit('save', { post: cleaned, originalSlug: originalSlug.value })
}
</script>

<template>
  <form class="space-y-5" @submit.prevent="submit">
    <div class="grid gap-4 sm:grid-cols-2">
      <div class="sm:col-span-2">
        <label class="label" for="pf-title">Title *</label>
        <input id="pf-title" v-model="form.title" type="text" class="field" placeholder="Post title" />
      </div>

      <div>
        <label class="label" for="pf-slug">URL slug *</label>
        <input
          id="pf-slug"
          v-model="form.slug"
          type="text"
          class="field"
          placeholder="post-url-slug"
          @input="slugTouched = true"
        />
        <p class="mt-1.5 text-[11.5px] text-slate-400">/blog/{{ form.slug || 'post-url-slug' }}</p>
      </div>

      <div>
        <label class="label" for="pf-category">Category</label>
        <select id="pf-category" v-model="form.category" class="field">
          <option v-for="cat in blogCategories" :key="cat" :value="cat">{{ cat }}</option>
        </select>
      </div>

      <div>
        <label class="label" for="pf-date">Date</label>
        <input id="pf-date" v-model="form.date" type="date" class="field" />
      </div>

      <div>
        <label class="label" for="pf-read">Read time</label>
        <input id="pf-read" v-model="form.readTime" type="text" class="field" placeholder="6 min" />
      </div>

      <div class="sm:col-span-2">
        <label class="label" for="pf-excerpt">Excerpt *</label>
        <textarea
          id="pf-excerpt"
          v-model="form.excerpt"
          rows="2"
          class="field"
          placeholder="One or two sentences shown on listing cards and the post hero."
        ></textarea>
      </div>
    </div>

    <!-- Body blocks -->
    <div>
      <div class="flex items-center justify-between">
        <p class="text-[11px] font-semibold tracking-[0.14em] text-slate-400 uppercase">Content</p>
        <div class="flex gap-2">
          <button
            v-for="type in blockTypes"
            :key="type.value"
            type="button"
            class="rounded-lg border border-slate-200 px-2.5 py-1 text-[12px] font-medium text-slate-600 transition hover:border-indigo-300 hover:text-indigo-700 dark:border-slate-700 dark:text-slate-300"
            @click="addBlock(type.value)"
          >
            + {{ type.label }}
          </button>
        </div>
      </div>

      <div class="mt-4 space-y-3">
        <div
          v-for="(block, i) in form.body"
          :key="i"
          class="rounded-xl border border-slate-200/80 p-4 dark:border-slate-800"
        >
          <div class="flex items-center justify-between gap-3">
            <select
              class="field w-auto py-1.5 text-[12.5px]"
              :value="block.type"
              @change="changeBlockType(i, $event.target.value)"
            >
              <option v-for="type in blockTypes" :key="type.value" :value="type.value">{{ type.label }}</option>
            </select>
            <div class="flex gap-1">
              <button
                type="button"
                class="rounded-md px-2 py-1 text-[12px] text-slate-400 hover:text-indigo-600"
                aria-label="Move block up"
                @click="moveBlock(i, -1)"
              >
                ↑
              </button>
              <button
                type="button"
                class="rounded-md px-2 py-1 text-[12px] text-slate-400 hover:text-indigo-600"
                aria-label="Move block down"
                @click="moveBlock(i, 1)"
              >
                ↓
              </button>
              <button
                type="button"
                class="rounded-md px-2 py-1 text-[12px] text-slate-400 hover:text-red-600"
                aria-label="Remove block"
                @click="removeBlock(i)"
              >
                ✕
              </button>
            </div>
          </div>

          <textarea
            v-if="block.type === 'ul'"
            :value="itemsText(block)"
            rows="4"
            class="field mt-3"
            placeholder="One bullet per line"
            @input="setItems(block, $event.target.value)"
          ></textarea>
          <textarea
            v-else
            v-model="block.text"
            :rows="block.type === 'h3' ? 1 : 4"
            class="field mt-3"
            :placeholder="block.type === 'h3' ? 'Section heading' : 'Paragraph text'"
          ></textarea>
        </div>
      </div>
    </div>

    <p
      v-if="error"
      class="rounded-xl bg-red-50 px-4 py-3 text-[13px] font-medium text-red-700 dark:bg-red-500/10 dark:text-red-300"
    >
      {{ error }}
    </p>

    <div class="flex flex-wrap gap-3">
      <button type="submit" class="btn-primary">{{ isEdit ? 'Save changes' : 'Add post' }}</button>
      <button type="button" class="btn-outline" @click="emit('cancel')">Cancel</button>
    </div>
  </form>
</template>
