<script setup>
import { computed, ref, watch } from 'vue'
import { LANGUAGE_CODE, languages } from '../../data/languages'
import { clone } from '../../stores/content'

const props = defineProps({
  language: { type: Object, default: null },
})

const emit = defineEmits(['save', 'cancel'])

const form = ref({ code: '', name: '' })
const originalCode = ref(null)
const error = ref('')

watch(
  () => props.language,
  (language) => {
    form.value = language ? clone(language) : { code: '', name: '' }
    originalCode.value = language?.code ?? null
    error.value = ''
  },
  { immediate: true },
)

const isEdit = computed(() => Boolean(originalCode.value))

function submit() {
  const cleaned = { code: form.value.code.trim().toLowerCase(), name: form.value.name.trim() }

  if (!cleaned.name) return (error.value = 'A name is required.')
  if (!LANGUAGE_CODE.test(cleaned.code))
    return (error.value = 'Use a two-letter code like “de”, optionally with a region like “pt-br”.')
  if (cleaned.code !== originalCode.value && languages.some((l) => l.code === cleaned.code))
    return (error.value = `“${cleaned.code}” is already a language on this site.`)

  error.value = ''
  emit('save', { language: cleaned, originalCode: originalCode.value })
}
</script>

<template>
  <form class="space-y-5" @submit.prevent="submit">
    <div class="grid gap-4 sm:grid-cols-2">
      <div>
        <label class="label" for="lf-name">Language name *</label>
        <input id="lf-name" v-model="form.name" type="text" class="field" placeholder="e.g. Français" />
        <p class="mt-1.5 text-[11.5px] text-slate-400">Shown in the language switcher</p>
      </div>

      <div>
        <label class="label" for="lf-code">Code *</label>
        <input id="lf-code" v-model="form.code" type="text" class="field" maxlength="5" placeholder="fr" />
        <p class="mt-1.5 text-[11.5px] text-slate-400">URLs start with /{{ form.code || 'fr' }}/</p>
      </div>
    </div>

    <p
      v-if="isEdit && form.code.trim().toLowerCase() !== originalCode"
      class="rounded-xl bg-amber-50 px-4 py-3 text-[13px] text-amber-800 dark:bg-amber-500/10 dark:text-amber-300"
    >
      Changing the code changes every URL in this language. Links already shared with /{{ originalCode }}/ will send
      visitors to the default language.
    </p>

    <p
      v-if="error"
      class="rounded-xl bg-red-50 px-4 py-3 text-[13px] font-medium text-red-700 dark:bg-red-500/10 dark:text-red-300"
    >
      {{ error }}
    </p>

    <div class="flex flex-wrap gap-3">
      <button type="submit" class="btn-primary">{{ isEdit ? 'Save changes' : 'Add language' }}</button>
      <button type="button" class="btn-outline" @click="emit('cancel')">Cancel</button>
    </div>
  </form>
</template>
