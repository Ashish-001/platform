<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  delay: { type: Number, default: 0 },
  as: { type: String, default: 'div' },
})

const el = ref(null)
const visible = ref(false)
let observer

onMounted(() => {
  if (typeof IntersectionObserver === 'undefined') {
    visible.value = true
    return
  }
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visible.value = true
          observer.unobserve(entry.target)
        }
      })
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
  )
  if (el.value) observer.observe(el.value)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <component
    :is="props.as"
    ref="el"
    class="reveal"
    :class="{ 'is-visible': visible }"
    :style="{ transitionDelay: `${props.delay}ms` }"
  >
    <slot />
  </component>
</template>
