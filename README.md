# Service — Freelancing Agency Website

A full-stack development agency website built with **Vue 3**, **Vite** and **Tailwind CSS 4**, deployed on **GitHub Pages**.

## Features

- 15 dev services with individual detail pages (`/services/:id`)
- Portfolio with service-type filtering
- About page with team, stats and process
- Quote-request contact form (Formspree)
- Dark mode with system preference + toggle
- Fully responsive, auto-deploys via GitHub Actions

## Development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Configuration

- **Contact form**: replace `FORMSPREE_ENDPOINT` in `src/components/ContactForm.vue` with your Formspree form ID.
- **Repo name**: `base` in `vite.config.js` must match the GitHub repo name (currently `/service/`).
- **Content**: edit `src/data/` — services, portfolio, team, testimonials.

## Deployment

Push to `main` → GitHub Actions builds and deploys to GitHub Pages automatically
(Settings → Pages → Source must be set to **GitHub Actions**).
