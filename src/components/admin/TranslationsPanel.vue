<script setup>
import { computed, ref, watch } from 'vue'
import { languages } from '../../data/languages'
import { customTranslations, fileDictionaries } from '../../i18n'
import { translationCatalog } from '../../i18n/catalog'
import { setTranslation } from '../../stores/content'

const PAGE_SIZE = 60

const targetLanguages = computed(() => languages.filter((l) => l.code !== 'en'))
const lang = ref(targetLanguages.value[0]?.code ?? '')
const groupName = ref('')
const query = ref('')
const untranslatedOnly = ref(false)
const limit = ref(PAGE_SIZE)
const savedKey = ref('')

// Built once per visit: it reads the live services and what the site has rendered so far.
const catalog = translationCatalog()

const isTranslated = (key) =>
  Boolean(customTranslations[lang.value]?.[key] || fileDictionaries[lang.value]?.[key])

const totals = computed(() => {
  const all = catalog.flatMap((g) => g.keys)
  return { done: all.filter(isTranslated).length, all: all.length }
})

const groupCounts = computed(() =>
  catalog.map((g) => ({ name: g.name, done: g.keys.filter(isTranslated).length, all: g.keys.length })),
)

const rows = computed(() => {
  const needle = query.value.trim().toLowerCase()
  const groups = groupName.value ? catalog.filter((g) => g.name === groupName.value) : catalog
  return groups
    .flatMap((g) => g.keys)
    .filter((key) => !untranslatedOnly.value || !isTranslated(key))
    .filter((key) => {
      if (!needle) return true
      const value = customTranslations[lang.value]?.[key] ?? fileDictionaries[lang.value]?.[key] ?? ''
      return key.toLowerCase().includes(needle) || value.toLowerCase().includes(needle)
    })
})

watch([lang, groupName, query, untranslatedOnly], () => (limit.value = PAGE_SIZE))

// A language deleted elsewhere in the panel, or the first one added after English.
watch(targetLanguages, (list) => {
  if (!list.some((l) => l.code === lang.value)) lang.value = list[0]?.code ?? ''
})

const valueFor = (key) => customTranslations[lang.value]?.[key] ?? fileDictionaries[lang.value]?.[key] ?? ''
const isEdited = (key) => customTranslations[lang.value]?.[key] !== undefined
const hasBuiltIn = (key) => fileDictionaries[lang.value]?.[key] !== undefined

function save(key, value) {
  // Saving the shipped wording unchanged should not turn it into an admin override.
  if (!isEdited(key) && value.trim() === (fileDictionaries[lang.value]?.[key] ?? '')) return
  setTranslation(lang.value, key, value)
  savedKey.value = key
  setTimeout(() => {
    if (savedKey.value === key) savedKey.value = ''
  }, 1600)
}

function reset(key) {
  setTranslation(lang.value, key, '')
}

const rowsFor = (text) => Math.min(6, Math.max(1, Math.ceil(text.length / 70)))
</script>

<template>
  <div>
    <div class="flex flex-wrap items-center justify-between gap-3">
      <h2 class="h3 text-lg">Translations</h2>
      <p v-if="lang" class="text-[12.5px] text-slate-500 dark:text-slate-400">
        {{ totals.done }} of {{ totals.all }} translated
      </p>
    </div>
    <p class="mt-2 max-w-2xl text-[13px] leading-relaxed text-slate-500 dark:text-slate-400">
      Translate the website's text for each language. Anything left empty shows in English. Changes save as you leave
      each field and appear on the site straight away. Blog posts are not translated here — tag each post with its
      language instead.
    </p>

    <div
      v-if="!targetLanguages.length"
      class="card mt-6 p-7 text-[13.5px] text-slate-600 dark:text-slate-300"
    >
      Only English is set up. Add a language in the Languages tab first.
    </div>

    <template v-else>
      <div class="card mt-6 grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-[180px_1fr_1.2fr_auto] lg:items-end">
        <div>
          <label class="label" for="tr-lang">Language</label>
          <select id="tr-lang" v-model="lang" class="field">
            <option v-for="l in targetLanguages" :key="l.code" :value="l.code">{{ l.name }} ({{ l.code }})</option>
          </select>
        </div>
        <div>
          <label class="label" for="tr-group">Section</label>
          <select id="tr-group" v-model="groupName" class="field">
            <option value="">All sections</option>
            <option v-for="g in groupCounts" :key="g.name" :value="g.name">
              {{ g.name }} — {{ g.done }}/{{ g.all }}
            </option>
          </select>
        </div>
        <div>
          <label class="label" for="tr-search">Search</label>
          <input
            id="tr-search"
            v-model="query"
            type="search"
            class="field"
            placeholder="Find English or translated text"
          />
        </div>
        <label class="flex items-center gap-2.5 pb-3 text-[13px] text-slate-600 dark:text-slate-300">
          <input v-model="untranslatedOnly" type="checkbox" class="h-4 w-4 rounded border-slate-300" />
          Untranslated only
        </label>
      </div>

      <p v-if="!rows.length" class="mt-6 text-[13.5px] text-slate-500 dark:text-slate-400">Nothing matches.</p>

      <div v-else class="card mt-6 divide-y divide-slate-200/80 dark:divide-slate-800">
        <div v-for="key in rows.slice(0, limit)" :key="`${lang}:${key}`" class="grid gap-3 p-5 lg:grid-cols-2">
          <p class="text-[13px] leading-relaxed text-slate-700 dark:text-slate-200">{{ key }}</p>
          <div>
            <textarea
              :value="valueFor(key)"
              :rows="rowsFor(key)"
              class="field text-[13px]"
              :placeholder="`${languages.find((l) => l.code === lang)?.name} translation — English shows until filled`"
              :aria-label="`Translation of: ${key}`"
              @change="save(key, $event.target.value)"
            ></textarea>
            <div class="mt-1.5 flex items-center gap-3 text-[11.5px]">
              <span v-if="savedKey === key" class="font-medium text-emerald-600 dark:text-emerald-400">Saved</span>
              <span v-else-if="isEdited(key)" class="text-indigo-600 dark:text-indigo-400">Edited in admin</span>
              <span v-else-if="hasBuiltIn(key)" class="text-slate-400">Built-in translation</span>
              <button
                v-if="isEdited(key)"
                type="button"
                class="text-slate-400 underline-offset-2 hover:text-slate-600 hover:underline dark:hover:text-slate-200"
                @click="reset(key)"
              >
                {{ hasBuiltIn(key) ? 'Restore built-in' : 'Clear' }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="rows.length > limit" class="mt-6 text-center">
        <button type="button" class="btn-outline btn-sm" @click="limit += PAGE_SIZE">
          Show more ({{ rows.length - limit }} left)
        </button>
      </div>
    </template>
  </div>
</template>
