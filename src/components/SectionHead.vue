<script setup>
defineProps({
  eyebrow: { type: String, default: '' },
  title: { type: String, required: true },
  lead: { type: String, default: '' },
  center: { type: Boolean, default: false },
})
</script>

<template>
  <div
    class="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
    :class="center && 'sm:flex-col sm:items-center'"
  >
    <div :class="center ? 'max-w-3xl text-center' : 'max-w-2xl'">
      <p v-if="eyebrow" class="eyebrow">{{ eyebrow }}</p>
      <h2 class="h2" :class="eyebrow && 'mt-3'">{{ title }}</h2>
      <p v-if="lead" class="lead mt-4">{{ lead }}</p>
    </div>
    <div v-if="$slots.action" class="shrink-0">
      <slot name="action" />
    </div>
  </div>
</template>
