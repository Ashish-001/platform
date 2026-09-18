import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// base must match the GitHub repo name for GitHub Pages project sites.
// Repo: "platform" -> https://<username>.github.io/platform/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  base: '/platform/',
  server: { port: 5174, strictPort: true },
})
