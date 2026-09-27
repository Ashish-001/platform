import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import { hydrateContent } from './stores/content'
import './style.css'

// Published content.json (and any local admin draft) is applied before mount so
// the first paint already reflects the current content.
hydrateContent().finally(() => {
  createApp(App).use(router).mount('#app')
})
