const locks = new Set()

/**
 * Locks body scrolling while at least one owner holds a lock.
 * Keyed rather than counted, so an unbalanced call (an unmount without a
 * matching release, say) can never leave the page permanently unscrollable.
 */
export function setBodyScrollLock(key, locked) {
  if (typeof document === 'undefined') return

  if (locked) locks.add(key)
  else locks.delete(key)

  document.body.style.overflow = locks.size > 0 ? 'hidden' : ''
}
