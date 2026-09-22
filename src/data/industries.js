export const industries = [
  {
    slug: 'saas-startups',
    name: 'SaaS & Startups',
    icon: '🚀',
    tagline: 'From pitch deck to production in one quarter.',
    intro:
      'Early-stage teams need a product in front of users before the runway gets uncomfortable. We build the first version properly — auth, billing, dashboards — so the second version is an extension, not a rewrite.',
    challenges: [
      'Investor timelines that leave no room for a six-month build',
      'A prototype that cannot survive its first hundred paying users',
      'No in-house engineer to own deployments and on-call',
    ],
    approach: [
      'Scope a genuinely shippable v1 and defer everything else in writing',
      'Multi-tenant data model and role-based access from day one',
      'Subscription billing, trials and dunning wired to Stripe webhooks',
      'CI/CD and monitoring handed over with documentation',
    ],
    stats: [
      { value: '9 wks', label: 'median time to first paying customer' },
      { value: '4', label: 'funded products launched last year' },
      { value: '0', label: 'rewrites requested post-launch' },
    ],
    serviceIds: ['web-application-development', 'backend-development', 'payment-gateway-integration', 'cloud-deployment-devops'],
    caseStudySlug: 'fleettrack-operations-dashboard',
  },
  {
    slug: 'ecommerce-d2c',
    name: 'E-commerce & D2C',
    icon: '🛍️',
    tagline: 'Storefronts judged on revenue, not screenshots.',
    intro:
      'For a D2C brand every 100ms and every extra checkout field has a price. We build and optimise stores around the numbers that show up in your payment dashboard.',
    challenges: [
      'Theme-based stores that slow to a crawl once the catalog grows',
      'Checkout drop-off nobody has instrumented',
      'Inventory and orders maintained by hand across tools',
    ],
    approach: [
      'Catalog architecture that stays fast at thousands of SKUs',
      'Checkout instrumented end to end, then trimmed field by field',
      'Inventory, orders and fulfilment synced to your back office',
      'Core Web Vitals treated as a launch blocker',
    ],
    stats: [
      { value: '+40%', label: 'conversion lift for an apparel brand' },
      { value: '1.9s', label: 'LCP on catalog pages post-build' },
      { value: '12', label: 'storefronts launched or rebuilt' },
    ],
    serviceIds: ['ecommerce-development', 'payment-gateway-integration', 'seo-performance-optimization', 'ui-ux-design'],
    caseStudySlug: 'shakti-arts-storefront',
  },
  {
    slug: 'healthcare',
    name: 'Healthcare',
    icon: '🏥',
    tagline: 'Booking, records and reminders that clinics trust.',
    intro:
      'Healthcare software fails on the unglamorous details: a reminder that did not send, a slot double-booked, a record visible to the wrong account. That is exactly where we spend our time.',
    challenges: [
      'Appointment systems that double-book across locations',
      'Patient data handling with real compliance consequences',
      'Staff who need software that works on the first attempt',
    ],
    approach: [
      'Slot engine with locking, buffers and cancellation rules',
      'Role-scoped access and full audit trails on patient records',
      'Reminders over SMS, email and push with delivery receipts',
      'Staff-facing screens tested with the people who use them daily',
    ],
    stats: [
      { value: '−32%', label: 'no-shows after reminder rollout' },
      { value: '18k', label: 'appointments booked in year one' },
      { value: '3', label: 'clinic networks supported' },
    ],
    serviceIds: ['mobile-app-development', 'backend-development', 'ui-ux-design', 'website-maintenance-support'],
    caseStudySlug: 'clinicone-booking-app',
  },
  {
    slug: 'fintech',
    name: 'Fintech & BFSI',
    icon: '🏦',
    tagline: 'Money movement that reconciles to the paisa.',
    intro:
      'Payment code is judged differently: a 1% failure rate is a support queue and a refund backlog. We build billing and payout flows that survive webhook replays, timeouts and partial failures.',
    challenges: [
      'Subscription logic that breaks on upgrades and proration',
      'Webhooks processed twice, or silently dropped',
      'Finance teams reconciling exports by hand each month',
    ],
    approach: [
      'Idempotent webhook handling with a replayable event log',
      'Plan changes, proration and dunning covered by tests',
      'Self-serve customer portal for invoices and payment methods',
      'Reconciliation reports finance can actually close the month with',
    ],
    stats: [
      { value: '99.98%', label: 'webhook processing success rate' },
      { value: '4 hrs', label: 'saved per month on reconciliation' },
      { value: '0', label: 'unreconciled payments to date' },
    ],
    serviceIds: ['payment-gateway-integration', 'api-development-integration', 'backend-development', 'database-design-optimization'],
    caseStudySlug: 'payflow-subscription-billing',
  },
  {
    slug: 'education',
    name: 'Education',
    icon: '🎓',
    tagline: 'Platforms that hold up on results day.',
    intro:
      'Education traffic is spiky and unforgiving — admissions deadlines, result announcements, enrolment windows. We build for the peak, not the average.',
    challenges: [
      'Traffic spikes that take the site down at the worst moment',
      'Course content and enrolment managed in spreadsheets',
      'Support teams answering the same questions all day',
    ],
    approach: [
      'Load-tested infrastructure with caching ahead of peak days',
      'Course, cohort and enrolment models that admin staff can manage',
      'AI assistant trained on your own admissions documentation',
      'Analytics on drop-off through the enrolment funnel',
    ],
    stats: [
      { value: '60%', label: 'support tickets deflected by AI assistant' },
      { value: '11x', label: 'peak traffic absorbed without downtime' },
      { value: '2.4k', label: 'enrolments processed in one window' },
    ],
    serviceIds: ['ai-chatbot-integration', 'web-application-development', 'cloud-deployment-devops', 'seo-performance-optimization'],
    caseStudySlug: 'docubot-support-assistant',
  },
]

export const getIndustryBySlug = (slug) => industries.find((i) => i.slug === slug)
