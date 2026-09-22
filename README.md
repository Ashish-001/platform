# Service — Development Studio Website

A full-stack development studio website built with **Vue 3**, **Vite** and **Tailwind CSS 4**, deployed on **GitHub Pages**.

## Structure

- **Mega-menu navigation** — Company, Services (4 categories × 15 services), Our Work, Industries, Insights
- **Services** — category landing pages (`/services/category/:slug`) and detail pages (`/services/:id`)
- **Industries** — 5 sector pages with challenges, approach and linked case studies
- **Proof** — portfolio with filters, case studies with detail write-ups, testimonials
- **Insights** — engineering report card, benchmark reports, blog, FAQs
- **Tools** — interactive project cost estimator
- **Company** — about, careers, awards, press, contact, privacy, sitemap
- Lead-capture modal on every CTA, dark mode with system preference, fully responsive

## Development

```bash
npm install
npm run dev      # http://localhost:5174/platform/
npm run build    # production build in dist/
```

## Configuration

- **Forms**: replace `FORMSPREE_ENDPOINT` in `src/composables/useEnquiry.js` with your Formspree form ID.
- **Repo name**: `base` in `vite.config.js` must match the GitHub repo name (currently `/platform/`).
- **Content**: edit `src/data/` — services, industries, case studies, FAQs, blog, reports, company info, team.

## Deployment

Push to `main` → GitHub Actions builds and deploys to GitHub Pages automatically
(Settings → Pages → Source must be set to **GitHub Actions**).
