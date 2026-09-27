import { reactive } from 'vue'
import adminConfig from '../data/adminConfig.json'
import { postSeed, posts } from '../data/blog'
import { serviceSeed, services } from '../data/services'

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
  }
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
  } catch {}
  contentMeta.hasDraft = false
  contentMeta.savedAt = null
}

export function resetToRepoContent() {
  replaceAll(posts, postSeed())
  replaceAll(services, serviceSeed())
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
  } catch {}
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
  if (!applyContent(data)) throw new Error('No "posts" or "services" array found in that file.')
  saveDraft()
}

export const slugify = (value) =>
  String(value)
    .toLowerCase()
    .trim()
    .replace(/['’"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
