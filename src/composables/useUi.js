import { readonly, ref, watch } from 'vue'
import { setBodyScrollLock } from './useScrollLock'

const defaultLead = {
  title: 'Request a call back',
  subtitle: 'Tell us where to reach you and an engineer will call within one business day.',
  submitLabel: 'Request a Call',
  asset: '',
}

const leadOpen = ref(false)
const leadContext = ref({ ...defaultLead })

watch(leadOpen, (v) => setBodyScrollLock('lead-modal', v))

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
