export const blogCategories = ['Engineering', 'AI & Automation', 'Performance', 'E-commerce', 'Product']

export const posts = [
  {
    slug: 'rag-assistants-that-dont-hallucinate',
    title: 'Building a Support Assistant That Refuses to Guess',
    category: 'AI & Automation',
    date: '2026-09-18',
    readTime: '8 min',
    excerpt:
      'Most support bots get retired because they invent policy. The fix is architectural, not a better prompt — here is the retrieval and hand-off design we ship.',
    body: [
      { type: 'p', text: 'Every abandoned support bot we have replaced failed the same way: asked a question the documentation did not answer, it produced something plausible and wrong. One confidently invented refund window is enough for a support lead to switch it off permanently.' },
      { type: 'h3', text: 'Retrieval first, generation second' },
      { type: 'p', text: 'The model never answers from its own memory. Every response is generated strictly from passages retrieved out of your documentation, and each passage carries a citation the user can open. If retrieval returns nothing above the similarity threshold, there is no generation step at all.' },
      { type: 'h3', text: 'Design the refusal path deliberately' },
      { type: 'p', text: 'The most important behaviour is the one that happens when confidence is low. Rather than stretching a weak match into an answer, the assistant says it does not know and hands off with the full conversation attached. Support teams trust a bot that escalates cleanly far more than one that is right slightly more often.' },
      { type: 'ul', items: ['Threshold retrieval confidence and refuse below it', 'Cite the source passage on every answer', 'Escalate with full context, never a cold hand-off', 'Log unanswered questions as a documentation backlog'] },
      { type: 'h3', text: 'The analytics matter more than the model' },
      { type: 'p', text: 'The unanswered-question log turned out to be the most valuable output of the project. It shows precisely which gaps in the documentation are generating tickets, which means the assistant keeps improving through content updates rather than model changes.' },
    ],
  },
  {
    slug: 'core-web-vitals-checklist-2026',
    title: 'The Core Web Vitals Checklist We Run Before Every Launch',
    category: 'Performance',
    date: '2026-09-02',
    readTime: '7 min',
    excerpt:
      'Performance is a launch blocker on our projects, not a phase-two ticket. This is the exact list we work through, in the order we work through it.',
    body: [
      { type: 'p', text: 'Treating performance as post-launch cleanup guarantees it never happens. We budget it up front: every page gets a JavaScript and image weight allowance during the build, and a page that exceeds its budget does not ship.' },
      { type: 'h3', text: 'Fix the largest contentful paint first' },
      { type: 'p', text: 'LCP is usually one element — a hero image or a headline blocked by a web font. Preload the hero, serve it in a modern format at the size it renders, and use font-display so text paints immediately. That single pass typically halves LCP.' },
      { type: 'h3', text: 'Then eliminate layout shift' },
      { type: 'p', text: 'Reserve dimensions for every image, embed and ad slot. Most CLS in production comes from late-loading banners and cookie notices that push content down after the first paint.' },
      { type: 'ul', items: ['Explicit width and height on all media', 'Reserve space for injected banners', 'Load fonts with a matched fallback metric', 'Avoid inserting content above the current viewport'] },
      { type: 'h3', text: 'Measure on real devices' },
      { type: 'p', text: 'Lab scores on a fast laptop hide the problem. We test on a mid-range Android over throttled mobile data, because that is closer to how most of your traffic actually arrives.' },
    ],
  },
  {
    slug: 'when-not-to-build-custom',
    title: 'When You Should Not Hire Us to Build Something Custom',
    category: 'Product',
    date: '2026-08-21',
    readTime: '6 min',
    excerpt:
      'Custom software is the right answer less often than agencies admit. Three situations where an off-the-shelf tool will serve you better, and how to tell.',
    body: [
      { type: 'p', text: 'We turn down a meaningful number of projects, usually because the client is about to pay for software that already exists. Saying so costs us a project and earns the referral later.' },
      { type: 'h3', text: 'Your workflow is genuinely standard' },
      { type: 'p', text: 'If your process matches what a mature SaaS product already does, buy the product. Custom becomes worth it when your differentiating logic cannot be expressed inside someone else’s data model — not when the interface annoys you.' },
      { type: 'h3', text: 'You have not validated demand' },
      { type: 'p', text: 'Pre-validation, a no-code assembly answers the only question that matters — will anyone use it — for a fraction of the cost. Build custom once the usage data justifies the investment.' },
      { type: 'h3', text: 'Nobody will own it internally' },
      { type: 'p', text: 'Custom software needs a decision-maker for the next several years. Without one, it drifts out of date and becomes a liability. That is an organisational question, not a technical one, and it is worth answering honestly before the build starts.' },
    ],
  },
  {
    slug: 'idempotent-webhooks',
    title: 'Webhooks Will Be Delivered Twice: Design For It',
    category: 'Engineering',
    date: '2026-08-12',
    readTime: '9 min',
    excerpt:
      'Duplicate and out-of-order payment webhooks are normal operation, not an edge case. The event-log pattern that got one client to 99.98% processing success.',
    body: [
      { type: 'p', text: 'Payment providers guarantee at-least-once delivery, which means duplicates are expected behaviour. Handlers written as if each message arrives exactly once produce double charges, double fulfilment and a reconciliation mess.' },
      { type: 'h3', text: 'Store the event before acting on it' },
      { type: 'p', text: 'Persist every incoming webhook keyed on the provider event ID, inside a transaction, before any business logic runs. A duplicate hits a unique constraint and is acknowledged without side effects. It also gives you a replayable log when a handler has a bug.' },
      { type: 'h3', text: 'Make handlers idempotent anyway' },
      { type: 'p', text: 'Belt and braces: a handler should be safe to run twice. Check current state before transitioning it rather than blindly applying a delta, and derive balances from the event log instead of incrementing counters.' },
      { type: 'ul', items: ['Unique index on the provider event ID', 'Acknowledge fast, process asynchronously', 'Transition state conditionally, never blindly', 'Keep a replay endpoint for failed events'] },
      { type: 'h3', text: 'Reconcile on a schedule' },
      { type: 'p', text: 'Even with all of the above, reconcile nightly against the provider API. It catches the events that never arrived at all — the failure mode no amount of handler correctness can detect from the inside.' },
    ],
  },
  {
    slug: 'shopify-vs-custom-storefront',
    title: 'Shopify or Custom? A Decision Framework With Actual Numbers',
    category: 'E-commerce',
    date: '2026-08-04',
    readTime: '7 min',
    excerpt:
      'Platform cost, catalog size, merchandising complexity and performance ceilings — the four variables that settle this argument in about twenty minutes.',
    body: [
      { type: 'p', text: 'This decision gets made on preference far more often than on numbers. Four variables usually settle it, and they can be worked through in a single call.' },
      { type: 'h3', text: 'Catalog size and page performance' },
      { type: 'p', text: 'Under roughly a thousand SKUs, a well-built Shopify theme performs fine. Above that, faceted filtering on a hosted platform starts to hurt, and a custom storefront with server-side filtering pulls ahead decisively.' },
      { type: 'h3', text: 'Merchandising and pricing logic' },
      { type: 'p', text: 'Standard collections, discounts and bundles are what Shopify does well. Contract pricing per customer, regional inventory rules or made-to-order configuration all fight the platform, and fighting the platform costs more over two years than building custom did.' },
      { type: 'h3', text: 'Total cost over two years' },
      { type: 'p', text: 'Compare platform fees, transaction percentages and app subscriptions against a custom build plus hosting. For a store doing meaningful volume with several paid apps, the crossover arrives sooner than most founders expect.' },
    ],
  },
  {
    slug: 'scoping-a-v1-that-ships',
    title: 'How to Scope a V1 That Actually Ships in a Quarter',
    category: 'Product',
    date: '2026-07-22',
    readTime: '6 min',
    excerpt:
      'Every overrun project we have rescued had the same root cause: a v1 defined by everything it might include rather than the one thing it must prove.',
    body: [
      { type: 'p', text: 'Nine weeks from prototype to paying customers is not a matter of working faster. It is a matter of the scope document being ruthless before anyone opens an editor.' },
      { type: 'h3', text: 'Write down what you are not building' },
      { type: 'p', text: 'A deferred list is more useful than a feature list. It makes the trade-offs explicit, and it means a mid-project request gets checked against an agreement instead of relitigated from scratch.' },
      { type: 'h3', text: 'Anchor scope to a contract or a metric' },
      { type: 'p', text: 'On the FleetTrack build, v1 meant exactly what the pilot contract required: live tracking and a daily report. Everything else waited. That clarity is why the deadline held.' },
      { type: 'ul', items: ['One sentence defining what v1 must prove', 'An explicit, signed-off deferred list', 'Weekly demos against the scope, not a status doc', 'A written estimate for anything that moves the date'] },
    ],
  },
  {
    slug: 'multi-tenant-schema-decisions',
    title: 'The Multi-Tenant Schema Decisions You Cannot Defer',
    category: 'Engineering',
    date: '2026-07-09',
    readTime: '10 min',
    excerpt:
      'Three days of data modelling at the start is what stands between your v1 and a rewrite at customer twenty. The choices that are expensive to change later.',
    body: [
      { type: 'p', text: 'Almost every SaaS rewrite we have been asked to quote traces back to tenancy decisions made implicitly in week one. These are the ones worth deciding on purpose.' },
      { type: 'h3', text: 'Shared schema with row-level scoping' },
      { type: 'p', text: 'For most B2B products, one schema with a tenant column on every table — enforced by row-level security rather than application code — gives you the operational simplicity of a single database with hard isolation guarantees.' },
      { type: 'h3', text: 'Identity separate from membership' },
      { type: 'p', text: 'A user is not a tenant member. Modelling them separately from day one is what lets someone belong to two workspaces later, and retrofitting it is a migration nobody enjoys.' },
      { type: 'h3', text: 'Plan for the noisy neighbour' },
      { type: 'p', text: 'Your largest customer will eventually be ten times the size of your median one. Per-tenant rate limits, background job queues partitioned by tenant, and indexes that assume skew keep that customer from degrading everyone else.' },
    ],
  },
  {
    slug: 'legacy-migration-without-downtime',
    title: 'Migrating a Legacy App Without a Big-Bang Cutover',
    category: 'Engineering',
    date: '2026-06-27',
    readTime: '8 min',
    excerpt:
      'Rewrites that replace everything at once are the ones that fail. The incremental strangler approach we use to modernise stacks while the business keeps running.',
    body: [
      { type: 'p', text: 'The all-at-once rewrite is appealing on a whiteboard and brutal in practice: months without shippable value, then a single high-risk cutover weekend. We route around it.' },
      { type: 'h3', text: 'Put a routing layer in front' },
      { type: 'p', text: 'A proxy in front of the legacy app lets new routes be served by new code while everything else passes through untouched. Migration becomes a series of small, reversible releases rather than one irreversible event.' },
      { type: 'h3', text: 'Add tests as you go, not before' },
      { type: 'p', text: 'Retrofitting full coverage onto a legacy codebase up front stalls the project. Instead, each slice gets characterisation tests describing current behaviour immediately before it is replaced — coverage grows exactly where change is happening.' },
      { type: 'h3', text: 'Keep both paths live briefly' },
      { type: 'p', text: 'Run old and new side by side, compare outputs on real traffic, then flip the switch. Rollback stays a configuration change instead of a restore from backup.' },
    ],
  },
]

export const sortedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date))

export const getPostBySlug = (slug) => posts.find((p) => p.slug === slug)

export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
