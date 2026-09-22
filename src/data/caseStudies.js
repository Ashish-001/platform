export const caseStudies = [
  {
    slug: 'shakti-arts-storefront',
    client: 'Shakti Arts',
    industry: 'E-commerce & D2C',
    industrySlug: 'ecommerce-d2c',
    emoji: '👖',
    title: 'Apparel Storefront Rebuild: 40% More Conversions in the First Month',
    headline: '+40% conversions',
    summary:
      'A denim and apparel brand outgrew its theme-based store. We rebuilt the storefront and admin panel from scratch, and the first month after launch closed 40% more orders on the same ad spend.',
    challenge:
      'The existing store took over six seconds to render a category page, checkout asked for eleven fields, and the team updated inventory by editing a spreadsheet that synced nightly — so oversells were routine during sale weeks.',
    approach: [
      'Rebuilt the catalog with server-side filtering and image pipelines so category pages render under two seconds at full SKU count.',
      'Cut checkout from eleven fields to five, with address autocomplete and saved payment methods.',
      'Replaced the nightly spreadsheet sync with a Firebase-backed admin panel writing inventory in real time.',
      'Instrumented the full funnel so every later change could be measured rather than argued about.',
    ],
    results: [
      { value: '+40%', label: 'conversion rate, first month' },
      { value: '6.2s → 1.9s', label: 'category page LCP' },
      { value: '0', label: 'oversells after launch' },
      { value: '−55%', label: 'checkout abandonment' },
    ],
    stack: ['React', 'Firebase', 'Tailwind CSS', 'Stripe'],
    serviceIds: ['ecommerce-development', 'payment-gateway-integration', 'seo-performance-optimization'],
    quote: {
      text: 'They rebuilt our store and conversions went up 40% in the first month. Communication was clear the entire way.',
      author: 'Priya S.',
      role: 'Founder, D2C Apparel Brand',
    },
  },
  {
    slug: 'fleettrack-operations-dashboard',
    client: 'FleetTrack',
    industry: 'SaaS & Startups',
    industrySlug: 'saas-startups',
    emoji: '🚚',
    title: 'From Prototype to Paying Customers in Nine Weeks',
    headline: '9 weeks to revenue',
    summary:
      'A logistics startup had a clickable prototype and a signed pilot customer. We built the real product — live tracking, driver management and automated reporting — in nine weeks.',
    challenge:
      'The pilot contract required live vehicle tracking and daily reporting within a quarter. The founding team had no backend engineer, and the prototype had no data model behind it.',
    approach: [
      'Scoped a v1 around the two features the pilot contract actually required and documented everything deferred.',
      'Designed a multi-tenant Postgres schema with row-level scoping so later customers needed no migration.',
      'Built live tracking on a websocket layer that degrades to polling on weak mobile networks.',
      'Automated the daily report as a queued job with retries, delivered by email before the 7 a.m. shift.',
    ],
    results: [
      { value: '9 wks', label: 'prototype to production' },
      { value: '120+', label: 'vehicles tracked live' },
      { value: '0', label: 'schema rewrites since launch' },
      { value: '99.9%', label: 'uptime in year one' },
    ],
    stack: ['Vue.js', 'Node.js', 'PostgreSQL', 'Redis'],
    serviceIds: ['web-application-development', 'backend-development', 'cloud-deployment-devops'],
    quote: {
      text: 'Fast, honest and technically excellent. They flagged problems we didn’t know we had and fixed those too.',
      author: 'James D.',
      role: 'Product Manager, Logistics Co.',
    },
  },
  {
    slug: 'docubot-support-assistant',
    client: 'DocuBot',
    industry: 'Education',
    industrySlug: 'education',
    emoji: '🤖',
    title: 'AI Support Assistant Deflecting 60% of Inbound Tickets',
    headline: '60% ticket deflection',
    summary:
      'An education platform was answering the same admissions questions hundreds of times a week. We built a retrieval-grounded assistant on their own documentation that now handles most of that volume.',
    challenge:
      'Support handled roughly 1,200 tickets a month, the majority repeat questions answerable from existing documentation. An off-the-shelf bot had already been tried and abandoned for inventing policy details.',
    approach: [
      'Indexed 2,000+ pages of documentation into a retrieval pipeline with per-answer source citations.',
      'Constrained the assistant to retrieved context, with an explicit hand-off when confidence is low.',
      'Added an escalation path that passes full conversation context to a human agent.',
      'Shipped an analytics view showing unanswered questions, which now drives documentation updates.',
    ],
    results: [
      { value: '60%', label: 'tickets resolved without a human' },
      { value: '2,000+', label: 'documentation pages indexed' },
      { value: '<2s', label: 'median answer latency' },
      { value: '4.6/5', label: 'answer helpfulness rating' },
    ],
    stack: ['Claude API', 'RAG pipeline', 'Node.js', 'pgvector'],
    serviceIds: ['ai-chatbot-integration', 'api-development-integration'],
    quote: {
      text: 'Our support chatbot now handles most tickets automatically. The team understood AI far beyond the buzzwords.',
      author: 'Anita K.',
      role: 'Head of Operations, EdTech',
    },
  },
  {
    slug: 'payflow-subscription-billing',
    client: 'PayFlow',
    industry: 'Fintech & BFSI',
    industrySlug: 'fintech',
    emoji: '💳',
    title: 'Subscription Billing That Finally Reconciled',
    headline: '99.98% webhook success',
    summary:
      'Three payment providers, a CRM and a self-serve customer portal — wired up in under two weeks, with a reconciliation report the finance team closes the month with.',
    challenge:
      'Plan upgrades were charging the wrong amounts, failed payments never retried, and finance spent the first four days of every month reconciling exports by hand.',
    approach: [
      'Rebuilt webhook handling to be idempotent, with a replayable event log for every provider message.',
      'Covered proration, upgrades, downgrades and dunning with a test suite run on every deploy.',
      'Shipped a self-serve portal for invoices, payment methods and plan changes.',
      'Generated a monthly reconciliation report matching provider payouts to internal records.',
    ],
    results: [
      { value: '99.98%', label: 'webhook processing success' },
      { value: '2 wks', label: 'to integrate three providers' },
      { value: '4 hrs', label: 'monthly reconciliation, down from 4 days' },
      { value: '+18%', label: 'recovered failed payments via dunning' },
    ],
    stack: ['Stripe', 'Razorpay', 'Node.js', 'Vue.js'],
    serviceIds: ['payment-gateway-integration', 'api-development-integration', 'backend-development'],
    quote: {
      text: 'The API integration work was flawless — three payment providers and a CRM wired up in under two weeks.',
      author: 'Rahul M.',
      role: 'CTO, SaaS Startup',
    },
  },
  {
    slug: 'clinicone-booking-app',
    client: 'ClinicOne',
    industry: 'Healthcare',
    industrySlug: 'healthcare',
    emoji: '🏥',
    title: 'Patient Booking App That Cut No-Shows by a Third',
    headline: '−32% no-shows',
    summary:
      'A cross-platform booking app for a clinic network: doctor schedules, payment collection and reminders that actually arrive. No-shows fell 32% within two months.',
    challenge:
      'Bookings came in by phone across three locations and were written into separate diaries, so double-booking was common. Nobody was reminding patients of anything.',
    approach: [
      'Built one slot engine across locations with locking, buffers and cancellation windows.',
      'Shipped iOS and Android from a single React Native codebase with offline-tolerant booking.',
      'Added reminders over SMS and push with delivery receipts and a reschedule link.',
      'Gave front-desk staff a screen designed with them, not for them.',
    ],
    results: [
      { value: '−32%', label: 'patient no-shows' },
      { value: '18k', label: 'appointments in year one' },
      { value: '0', label: 'double-bookings after rollout' },
      { value: '4.7★', label: 'average store rating' },
    ],
    stack: ['React Native', 'Firebase', 'Razorpay'],
    serviceIds: ['mobile-app-development', 'backend-development', 'ui-ux-design'],
    quote: {
      text: 'Our front desk stopped juggling three diaries on day one. The reminders alone paid for the project.',
      author: 'Dr. Meera R.',
      role: 'Director, Clinic Network',
    },
  },
]

export const getCaseStudyBySlug = (slug) => caseStudies.find((c) => c.slug === slug)
