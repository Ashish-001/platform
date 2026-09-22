<script setup>
import TopBar from './components/TopBar.vue'
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'
import FloatingActions from './components/FloatingActions.vue'
import LeadModal from './components/LeadModal.vue'
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <TopBar />
    <NavBar />
    <main class="flex-1">
      <!-- The wrapper element keeps <Transition> to a single child: page
           components are multi-root and would otherwise render only their first node. -->
      <RouterView v-slot="{ Component, route }">
        <Transition
          mode="out-in"
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="opacity-0"
          leave-active-class="transition duration-100 ease-in"
          leave-to-class="opacity-0"
        >
          <div :key="route.path">
            <component :is="Component" />
          </div>
        </Transition>
      </RouterView>
    </main>
    <Footer />
    <FloatingActions />
    <LeadModal />
  </div>
</template>
