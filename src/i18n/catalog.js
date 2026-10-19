import { serviceCategories, services } from '../data/services'
import { customTranslations, fileDictionaries, seenKeys } from '.'
import { groups } from './de'

// Everything the admin Translations tab can translate. The German files list
// the site's English text, admin-edited services add their own, and strings
// seen while browsing catch anything new that no file covers yet.

const serviceText = (s) => [s.title, s.shortDesc, s.longDesc, s.priceRange, s.timeline, ...(s.features ?? [])]
const categoryText = (c) => [c.name, c.tagline, c.description, c.stat?.label, ...(c.outcomes ?? [])]

const isText = (value) => typeof value === 'string' && /[A-Za-z]{2}/.test(value)

/** @returns {{ name: string, keys: string[] }[]} */
export function translationCatalog() {
  const listed = new Set()
  const fresh = (keys) => {
    const out = []
    for (const key of keys) {
      if (!isText(key) || listed.has(key)) continue
      listed.add(key)
      out.push(key)
    }
    return out
  }

  const catalog = groups.map((group) => ({ name: group.name, keys: fresh(Object.keys(group.entries)) }))

  catalog.push({
    name: 'Services added or edited in admin',
    keys: fresh([...serviceCategories.flatMap(categoryText), ...services.flatMap(serviceText)]),
  })

  // Translated text is passed through t() again by some components; skip it.
  const translatedValues = new Set(
    [...Object.values(fileDictionaries), ...Object.values(customTranslations)].flatMap((dict) => Object.values(dict)),
  )
  catalog.push({
    name: 'Other text seen on the site',
    keys: fresh([...seenKeys].filter((key) => !translatedValues.has(key))),
  })

  return catalog.filter((group) => group.keys.length)
}
