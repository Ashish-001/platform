<script setup>
import { onBeforeUnmount, onMounted } from 'vue'

const props = defineProps({
  open: { type: Boolean, default: false },
  labelledBy: { type: String, default: '' },
  width: { type: String, default: 'max-w-lg' },
})

const emit = defineEmits(['close'])

function onKeydown(e) {
  if (e.key === 'Escape' && props.open) emit('close')
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="opacity-0"
    >
      <div v-if="open" class="fixed inset-0 z-[90] flex items-start justify-center overflow-y-auto p-4 sm:p-6">
        <div class="fixed inset-0 bg-slate-900/50 backdrop-blur-sm" @click="emit('close')"></div>
        <div
          class="relative my-auto w-full rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-950"
          :class="width"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="labelledBy || undefined"
        >
          <button
            type="button"
            class="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-900"
            aria-label="Close"
            @click="emit('close')"
          >
            <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
