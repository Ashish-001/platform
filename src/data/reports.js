export const reportCard = {
  label: 'FY 2025–26 Engineering Report Card',
  headline: '38 projects. One year. Real numbers.',
  intro:
    'We publish the delivery metrics most agencies keep quiet about — measured across every client project we shipped or maintained this financial year.',
  stats: [
    { value: '38', label: 'projects delivered across 24 clients' },
    { value: '94%', label: 'milestones hit on or before the agreed date' },
    { value: '96', label: 'median Lighthouse performance score at handover' },
    { value: '99.9%', label: 'uptime across all managed deployments' },
    { value: '1.9s', label: 'median LCP on pages we optimised' },
    { value: '0', label: 'post-launch rewrites requested' },
  ],
  highlights: [
    'Median time from kickoff to production: 7 weeks',
    'Fixed-price milestones honoured on 38 of 38 projects',
    'Emergency response within the agreed window, every incident',
  ],
}

export const benchmarkReports = [
  {
    slug: 'saas-build-cost-benchmark',
    title: 'SaaS Build Cost Benchmark 2026',
    sector: 'SaaS',
    pages: 24,
    updated: 'Aug 2026',
    summary:
      'What a production-ready SaaS v1 actually costs, broken down by feature surface — auth, billing, dashboards, integrations — with medians from 38 delivered projects.',
    highlights: ['Cost per feature surface', 'Timeline distributions', 'Where budgets overrun most often'],
  },
  {
    slug: 'ecommerce-performance-benchmark',
    title: 'E-commerce Performance Benchmark',
    sector: 'E-commerce',
    pages: 18,
    updated: 'Jul 2026',
    summary:
      'Core Web Vitals across 120 D2C storefronts, and the correlation between category-page LCP and checkout completion rate.',
    highlights: ['LCP vs conversion data', 'Platform-by-platform comparison', 'Checkout field benchmarks'],
  },
  {
    slug: 'ai-adoption-report',
    title: 'AI Feature Adoption Report',
    sector: 'AI & Automation',
    pages: 22,
    updated: 'Sep 2026',
    summary:
      'Which AI features users actually engage with after launch, measured across support assistants, AI search and drafting tools in live products.',
    highlights: ['Engagement by feature type', 'Ticket deflection medians', 'Cost per resolved conversation'],
  },
  {
    slug: 'mobile-app-retention-report',
    title: 'Mobile App Retention Report',
    sector: 'Mobile',
    pages: 16,
    updated: 'Jun 2026',
    summary:
      'Day-1, day-7 and day-30 retention across cross-platform apps we shipped, and the onboarding changes that moved the numbers most.',
    highlights: ['Retention curves by category', 'Onboarding A/B results', 'Push notification impact'],
  },
  {
    slug: 'cloud-cost-optimisation-report',
    title: 'Cloud Cost Optimisation Report',
    sector: 'Infrastructure',
    pages: 20,
    updated: 'May 2026',
    summary:
      'Where hosting bills leak on small and mid-sized deployments, with the average saving achieved per optimisation across audited accounts.',
    highlights: ['Top ten sources of waste', 'Average saving per fix', 'Right-sizing playbook'],
  },
  {
    slug: 'legacy-modernisation-report',
    title: 'Legacy Modernisation Report',
    sector: 'Engineering',
    pages: 26,
    updated: 'Apr 2026',
    summary:
      'Timelines, risks and real costs of incremental migrations versus big-bang rewrites, drawn from modernisation projects on jQuery and PHP-era stacks.',
    highlights: ['Incremental vs rewrite costs', 'Risk register template', 'Cutover checklists'],
  },
  {
    slug: 'payments-reliability-report',
    title: 'Payments Reliability Report',
    sector: 'Fintech',
    pages: 19,
    updated: 'Mar 2026',
    summary:
      'Webhook failure modes observed in production across three major gateways, and the handler patterns that eliminate double-charging.',
    highlights: ['Failure mode taxonomy', 'Idempotency patterns', 'Reconciliation templates'],
  },
]

export const getReportBySlug = (slug) => benchmarkReports.find((r) => r.slug === slug)
