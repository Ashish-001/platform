import { computed, reactive, ref } from 'vue'

// Every public URL starts with one of these codes: /en/blog, /de/services, …
// The first entry is the default language; the admin panel edits a reactive copy.
const seedLanguages = [
  { code: 'en', name: 'English' },
  { code: 'de', name: 'Deutsch' },
]

/** Codes are lowercase ISO 639-1, optionally with a region: en, de, pt-br. */
export const LANGUAGE_CODE = /^[a-z]{2}(-[a-z]{2})?$/

export const languages = reactive(structuredClone(seedLanguages))

export const languageSeed = () => structuredClone(seedLanguages)

export const defaultLanguage = computed(() => languages[0]?.code ?? 'en')

/** The language of the page being shown; the router keeps it in sync with the URL. */
export const currentLang = ref(languages[0]?.code ?? 'en')

export const isLanguage = (code) => languages.some((l) => l.code === code)

export const getLanguage = (code) => languages.find((l) => l.code === code)
