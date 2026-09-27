<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import TopBar from './components/TopBar.vue'
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'
import FloatingActions from './components/FloatingActions.vue'
import LeadModal from './components/LeadModal.vue'

const route = useRoute()

// The admin panel renders without the marketing chrome.
const bare = computed(() => Boolean(route.meta.bare))
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <TopBar v-if="!bare" />
    <NavBar v-if="!bare" />
    <main class="flex-1">
      <!-- The wrapper element keeps <Transition> to a single child: page
           components are multi-root and would otherwise render only their first node. -->
      <RouterView v-slot="{ Component, route: current }">
        <Transition
          mode="out-in"
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="opacity-0"
          leave-active-class="transition duration-100 ease-in"
          leave-to-class="opacity-0"
        >
          <div :key="current.path">
            <component :is="Component" />
          </div>
        </Transition>
      </RouterView>
    </main>
    <template v-if="!bare">
      <Footer />
      <FloatingActions />
      <LeadModal />
    </template>
  </div>
</template>
