<script setup>
import { computed, ref, watch } from 'vue'
import { faqGroups } from '../data/faqs'

const props = defineProps({
  groups: { type: Array, default: () => faqGroups },
  limit: { type: Number, default: 0 },
})

const activeGroup = ref(props.groups[0]?.name ?? '')
const openItem = ref(0)

const active = computed(() => props.groups.find((g) => g.name === activeGroup.value) ?? props.groups[0])
const items = computed(() => (props.limit ? active.value.items.slice(0, props.limit) : active.value.items))

watch(activeGroup, () => (openItem.value = 0))
</script>

<template>
  <div class="grid gap-8 lg:grid-cols-[240px_1fr] lg:gap-12">
    <div class="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 lg:mx-0 lg:flex-col lg:px-0">
      <button
        v-for="group in groups"
        :key="group.name"
        type="button"
        class="shrink-0 rounded-lg px-3.5 py-2.5 text-left text-[13px] font-medium transition lg:w-full"
        :class="
          activeGroup === group.name
            ? 'bg-indigo-50 text-indigo-700 dark:bg-slate-900 dark:text-indigo-300'
            : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-900'
        "
        :aria-pressed="activeGroup === group.name"
        @click="activeGroup = group.name"
      >
        <span class="whitespace-nowrap lg:whitespace-normal">{{ group.name }}</span>
      </button>
    </div>

    <div class="divide-y divide-slate-200/80 dark:divide-slate-800">
      <div v-for="(item, i) in items" :key="item.q">
        <button
          type="button"
          class="flex w-full items-start justify-between gap-6 py-5 text-left"
          :aria-expanded="openItem === i"
          @click="openItem = openItem === i ? -1 : i"
        >
          <span class="text-[15px] font-semibold text-slate-900 dark:text-white">{{ item.q }}</span>
          <span
            class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition dark:border-slate-700"
            :class="openItem === i && 'rotate-45 border-indigo-300 text-indigo-600'"
            aria-hidden="true"
          >
            <svg class="h-3 w-3" fill="none" stroke="currentColor" stroke-width="2.4" viewBox="0 0 24 24">
              <path stroke-linecap="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </span>
        </button>
        <p v-if="openItem === i" class="pb-6 text-[14px] leading-[1.8] text-slate-600 dark:text-slate-400">
          {{ item.a }}
        </p>
      </div>
    </div>
  </div>
</template>
