import { reactive } from 'vue'
import adminConfig from '../data/adminConfig.json'
import { postSeed, posts } from '../data/blog'
import { languageSeed, languages } from '../data/languages'
import { categorySeed, serviceCategories, serviceSeed, services } from '../data/services'
import { customTranslations } from '../i18n'

const DRAFT_KEY = 'service-admin-draft-v1'

/**
 * All content here is plain JSON, and structuredClone refuses reactive proxies,
 * so a JSON round-trip is both safe and the right shape for content.json.
 */
export const clone = (value) => JSON.parse(JSON.stringify(value))

/**
 * Where the content currently on screen came from:
 *  - repo:      the arrays shipped in src/data
 *  - published: public/content.json, committed and live for every visitor
 *  - draft:     unsaved-to-git edits made in this browser via the admin panel
 */
export const contentMeta = reactive({
  source: 'repo',
  savedAt: null,
  hasDraft: false,
})

function replaceAll(target, next) {
  if (!Array.isArray(next)) return
  target.splice(0, target.length, ...clone(next))
}

function snapshot() {
  return {
    posts: clone(posts),
    services: clone(services),
    serviceCategories: clone(serviceCategories),
    languages: clone(languages),
    translations: clone(customTranslations),
  }
}

function replaceTranslations(next) {
  for (const code of Object.keys(customTranslations)) delete customTranslations[code]
  Object.assign(customTranslations, clone(next))
}

function applyContent(data) {
  if (!data || typeof data !== 'object') return false
  let applied = false
  if (Array.isArray(data.posts)) {
    replaceAll(posts, data.posts)
    applied = true
  }
  if (Array.isArray(data.services)) {
    replaceAll(services, data.services)
    applied = true
  }
  if (Array.isArray(data.languages) && data.languages.length) {
    replaceAll(languages, data.languages)
    applied = true
  }
  if (Array.isArray(data.serviceCategories) && data.serviceCategories.length) {
    replaceAll(serviceCategories, data.serviceCategories)
    applied = true
  }
  if (data.translations && typeof data.translations === 'object') {
    replaceTranslations(data.translations)
    applied = true
  }
  return applied
}

export function saveDraft() {
  try {
    const payload = { ...snapshot(), savedAt: new Date().toISOString() }
    localStorage.setItem(DRAFT_KEY, JSON.stringify(payload))
    contentMeta.source = 'draft'
    contentMeta.savedAt = payload.savedAt
    contentMeta.hasDraft = true
  } catch {
    // Storage can be full or blocked (private mode); editing still works in-memory.
  }
}

export function discardDraft() {
  try {
    localStorage.removeItem(DRAFT_KEY)
  } catch {
    // Ignore storage errors; draft metadata is still reset in memory.
  }
  contentMeta.hasDraft = false
  contentMeta.savedAt = null
}

export function resetToRepoContent() {
  replaceAll(posts, postSeed())
  replaceAll(services, serviceSeed())
  replaceAll(serviceCategories, categorySeed())
  replaceAll(languages, languageSeed())
  replaceTranslations({})
  discardDraft()
  contentMeta.source = 'repo'
}

/**
 * Loads committed content first, then any local draft on top.
 * Called once at boot, before the app mounts.
 */
export async function hydrateContent() {
  const file = adminConfig.publishedContentFile || 'content.json'
  try {
    const res = await fetch(`${import.meta.env.BASE_URL}${file}`, { cache: 'no-cache' })
    if (res.ok) {
      const published = await res.json()
      if (applyContent(published)) contentMeta.source = 'published'
    }
  } catch {
    // No published file yet — the repo content stands.
  }

  try {
    const raw = localStorage.getItem(DRAFT_KEY)
    if (raw) {
      const draft = JSON.parse(raw)
      if (applyContent(draft)) {
        contentMeta.source = 'draft'
        contentMeta.savedAt = draft.savedAt ?? null
        contentMeta.hasDraft = true
      }
    }
  } catch {
    // Ignore invalid/blocked local draft storage and continue with current content.
  }
}

/* ---------- Blog posts ---------- */

export function upsertPost(post, originalSlug = null) {
  const next = clone(post)
  const index = posts.findIndex((p) => p.slug === (originalSlug ?? next.slug))
  if (index === -1) posts.unshift(next)
  else posts.splice(index, 1, next)
  saveDraft()
}

export function removePost(slug) {
  const index = posts.findIndex((p) => p.slug === slug)
  if (index !== -1) posts.splice(index, 1)
  saveDraft()
}

/* ---------- Services ---------- */

export function upsertService(service, originalId = null) {
  const next = clone(service)
  const index = services.findIndex((s) => s.id === (originalId ?? next.id))
  if (index === -1) services.push(next)
  else services.splice(index, 1, next)
  saveDraft()
}

export function removeService(id) {
  const index = services.findIndex((s) => s.id === id)
  if (index !== -1) services.splice(index, 1)
  saveDraft()
}

/* ---------- Service categories ---------- */

/**
 * Services store both the category slug and its display name, so a rename or
 * slug change is carried over to every service in that category.
 */
export function upsertCategory(category, originalSlug = null) {
  const next = clone(category)
  const index = serviceCategories.findIndex((c) => c.slug === (originalSlug ?? next.slug))
  if (index === -1) serviceCategories.push(next)
  else serviceCategories.splice(index, 1, next)

  if (originalSlug) {
    services.forEach((s) => {
      if (s.categorySlug !== originalSlug) return
      s.categorySlug = next.slug
      s.category = next.name
    })
  }
  saveDraft()
}

export function removeCategory(slug) {
  const index = serviceCategories.findIndex((c) => c.slug === slug)
  if (index !== -1) serviceCategories.splice(index, 1)
  saveDraft()
}

/* ---------- Languages ---------- */

/** A changed code is carried over to every post tagged with the old one. */
export function upsertLanguage(language, originalCode = null) {
  const next = clone(language)
  const index = languages.findIndex((l) => l.code === (originalCode ?? next.code))
  if (index === -1) languages.push(next)
  else languages.splice(index, 1, next)

  if (originalCode && originalCode !== next.code) {
    if (customTranslations[originalCode]) {
      customTranslations[next.code] = customTranslations[originalCode]
      delete customTranslations[originalCode]
    }
    posts.forEach((p) => {
      if (Array.isArray(p.languages)) p.languages = p.languages.map((c) => (c === originalCode ? next.code : c))
    })
  }
  saveDraft()
}

/** The first language is the default: unprefixed URLs and new posts use it. */
export function makeDefaultLanguage(code) {
  const index = languages.findIndex((l) => l.code === code)
  if (index <= 0) return
  const [language] = languages.splice(index, 1)
  languages.unshift(language)
  saveDraft()
}

export function removeLanguage(code) {
  const index = languages.findIndex((l) => l.code === code)
  if (index !== -1) languages.splice(index, 1)
  delete customTranslations[code]
  posts.forEach((p) => {
    if (Array.isArray(p.languages)) p.languages = p.languages.filter((c) => c !== code)
  })
  saveDraft()
}

/* ---------- Translations ---------- */

/** An empty value removes the admin translation, falling back to the shipped file or English. */
export function setTranslation(code, english, value) {
  const text = value.trim()
  if (text) {
    customTranslations[code] ??= {}
    customTranslations[code][english] = text
  } else if (customTranslations[code]) {
    delete customTranslations[code][english]
    if (!Object.keys(customTranslations[code]).length) delete customTranslations[code]
  }
  saveDraft()
}

/* ---------- Publishing ---------- */

export function contentAsJson() {
  return JSON.stringify(snapshot(), null, 2)
}

export function downloadContentFile() {
  const blob = new Blob([contentAsJson()], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = adminConfig.publishedContentFile || 'content.json'
  link.click()
  URL.revokeObjectURL(url)
}

export function importContentJson(text) {
  const data = JSON.parse(text)
  if (!applyContent(data)) throw new Error('No posts, services, categories, languages or translations found in that file.')
  saveDraft()
}

export const slugify = (value) =>
  String(value)
    .toLowerCase()
    .trim()
    .replace(/['’"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
