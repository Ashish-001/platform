import { reactive, ref } from 'vue'
import { currentLang } from '../data/languages'
import de from './de'

/*
 * Translations are keyed by the English text itself:
 *
 *   t('Request a Call')            → 'Rückruf anfordern' on /de/…
 *   t('{n} services', { n: 4 })    → '4 Leistungen'
 *
 * English needs no dictionary, and anything without a translation (new admin
 * content, a language added in the admin panel) falls back to the English text.
 * Editing English text in a template or data file means updating its key here too.
 */
export const fileDictionaries = { de }

/**
 * Translations entered in the admin panel, per language: { fr: { 'Contact': 'Contact' } }.
 * They win over the file dictionaries, so the admin can also correct shipped German.
 */
export const customTranslations = reactive({})

/** BCP 47 tags for dates and numbers; unknown codes are passed through. */
const intlLocales = { en: 'en-US', de: 'de-DE' }

/** Set by the router on admin pages, which always stay in English. */
export const englishOnly = ref(false)

const activeLang = () => (englishOnly.value ? 'en' : currentLang.value)

/** Every string the site has asked to translate this session; feeds the admin catalog. */
export const seenKeys = new Set()

const missing = new Set()

function interpolate(text, params) {
  if (!params) return text
  return text.replace(/\{(\w+)\}/g, (match, key) => (key in params ? String(params[key]) : match))
}

export function translationFor(lang, text) {
  return customTranslations[lang]?.[text] || fileDictionaries[lang]?.[text]
}

export function t(text, params) {
  if (text == null || text === '') return ''
  // Data fields can be numbers or names; only strings are looked up.
  if (typeof text !== 'string') return text
  const lang = activeLang()
  if (lang === 'en') return interpolate(text, params)

  if (!englishOnly.value) seenKeys.add(text)
  const translated = translationFor(lang, text)
  if (translated === undefined && import.meta.env.DEV && !missing.has(text)) {
    missing.add(text)
    console.debug(`[i18n] missing ${lang}:`, text)
  }
  return interpolate(translated ?? text, params)
}

/** Translates every string in a list, e.g. a service's feature bullets. */
export const tList = (list) => (Array.isArray(list) ? list.map((item) => t(item)) : [])

export const intlLocale = () => intlLocales[activeLang()] ?? activeLang()

if (import.meta.env.DEV) globalThis.__missingTranslations = missing
