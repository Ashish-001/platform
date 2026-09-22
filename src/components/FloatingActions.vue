<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { contact } from '../data/company'

const showTop = ref(false)
const expanded = ref(false)

function onScroll() {
  showTop.value = window.scrollY > 600
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

const actions = [
  {
    label: 'Call us',
    href: contact.phoneHref,
    path: 'M2.25 6.75c0 8.284 6.716 15 15 15h1.5a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106a1.125 1.125 0 0 0-1.173.417l-.97 1.293a1.125 1.125 0 0 1-1.21.38 12.035 12.035 0 0 1-7.143-7.143 1.125 1.125 0 0 1 .38-1.21l1.293-.97c.334-.251.5-.68.417-1.173L6.313 3.102A1.125 1.125 0 0 0 5.222 2.25H3.75A1.5 1.5 0 0 0 2.25 3.75v3Z',
  },
  {
    label: 'Email us',
    href: `mailto:${contact.email}`,
    path: 'M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75',
  },
  {
    label: 'WhatsApp',
    href: contact.whatsapp,
    path: 'M12 21.75a9.75 9.75 0 1 0-8.48-4.93L2.25 21.75l5.05-1.2A9.7 9.7 0 0 0 12 21.75Zm-3.1-13.2c.2-.45.4-.46.6-.47h.5c.16 0 .37-.02.56.43.2.48.68 1.66.74 1.78.06.12.1.26.02.42-.09.16-.4.53-.55.7-.1.12-.2.2-.08.4.12.2.55.9 1.18 1.46.8.72 1.48.95 1.69 1.05.2.1.33.08.45-.05.13-.14.55-.63.7-.85.14-.21.29-.17.48-.1.2.07 1.25.59 1.46.7.22.1.36.16.42.25.05.1.05.56-.13 1.1-.19.54-1.1 1.05-1.53 1.08-.43.03-.83.19-2.83-.6-2.42-.95-3.95-3.43-4.07-3.59-.12-.16-.96-1.28-.96-2.44 0-1.16.61-1.73.83-1.97Z',
  },
]
</script>

<template>
  <div class="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-2.5 sm:right-6 sm:bottom-6">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 translate-y-1"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="opacity-0"
    >
      <button
        v-if="showTop"
        type="button"
        class="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-lg shadow-slate-900/5 transition hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
        aria-label="Back to top"
        @click="scrollToTop"
      >
        <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
        </svg>
      </button>
    </Transition>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 translate-y-2"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="opacity-0 translate-y-2"
    >
      <div v-if="expanded" class="flex flex-col gap-2">
        <a
          v-for="a in actions"
          :key="a.label"
          :href="a.href"
          target="_blank"
          rel="noopener"
          class="flex items-center gap-2.5 rounded-full border border-slate-200 bg-white py-2 pr-4 pl-2.5 text-[13px] font-medium text-slate-700 shadow-lg shadow-slate-900/5 transition hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
        >
          <span class="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 dark:bg-slate-800">
            <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" :d="a.path" />
            </svg>
          </span>
          {{ a.label }}
        </a>
      </div>
    </Transition>

    <button
      type="button"
      class="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-white shadow-xl shadow-indigo-600/30 transition hover:bg-indigo-700"
      :aria-expanded="expanded"
      aria-label="Contact options"
      @click="expanded = !expanded"
    >
      <svg v-if="!expanded" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm3.75 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm3.75 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM21 12c0 4.556-4.03 8.25-9 8.25a9.76 9.76 0 0 1-2.555-.337A5.97 5.97 0 0 1 5.41 20.97a5.97 5.97 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
        />
      </svg>
      <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
        <path stroke-linecap="round" d="M6 18 18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</template>
