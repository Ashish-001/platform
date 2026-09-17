import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// base must match the GitHub repo name for GitHub Pages project sites.
// Repo: "service" -> https://<username>.github.io/service/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  base: '/service/',
  server: { port: 5174, strictPort: true },
})
