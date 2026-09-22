import { readonly, ref, watch } from 'vue'

const defaultLead = {
  title: 'Request a call back',
  subtitle: 'Tell us where to reach you and an engineer will call within one business day.',
  submitLabel: 'Request a Call',
  asset: '',
}

const leadOpen = ref(false)
const leadContext = ref({ ...defaultLead })

let lockCount = 0

function lockScroll(locked) {
  if (typeof document === 'undefined') return
  lockCount = Math.max(0, lockCount + (locked ? 1 : -1))
  document.body.style.overflow = lockCount > 0 ? 'hidden' : ''
}

watch(leadOpen, (v) => lockScroll(v))

export function useUi() {
  return {
    leadOpen: readonly(leadOpen),
    leadContext: readonly(leadContext),

    /**
     * @param {{title?: string, subtitle?: string, submitLabel?: string, asset?: string}} context
     */
    openLead(context = {}) {
      leadContext.value = { ...defaultLead, ...context }
      leadOpen.value = true
    },
    closeLead() {
      leadOpen.value = false
    },
  }
}
