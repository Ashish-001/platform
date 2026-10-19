// German dictionary, keyed by the English text. Split by area to keep files reviewable.
import catalog from './catalog'
import company from './company'
import faqs from './faqs'
import layout from './layout'
import pages from './pages'
import scripts from './scripts'
import services from './services'
import work from './work'

/** The same files, labelled; the admin Translations tab groups the English source text this way. */
export const groups = [
  { name: 'Navigation & footer', entries: layout },
  { name: 'Page text', entries: { ...pages, ...scripts } },
  { name: 'Services', entries: services },
  { name: 'Industries & case studies', entries: work },
  { name: 'Company', entries: company },
  { name: 'FAQs', entries: faqs },
  { name: 'Portfolio, reports & team', entries: catalog },
]

export default Object.assign({}, ...groups.map((g) => g.entries))
