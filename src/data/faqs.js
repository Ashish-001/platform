export const faqGroups = [
  {
    name: 'Web Development',
    items: [
      {
        q: 'How long does a custom website take to build?',
        a: 'A focused marketing site or landing page typically takes two to four weeks; a larger corporate site with a CMS runs four to six. The timeline depends far more on content readiness and feedback speed than on build effort, so we agree on a review schedule before starting.',
      },
      {
        q: 'Do you use templates or build from scratch?',
        a: 'We build from scratch on Vue, React or Next.js. Templates save a week up front and cost months later, because every change fights conventions someone else chose. The exception is Shopify, where we work inside the platform deliberately.',
      },
      {
        q: 'Will my site be fast and pass Core Web Vitals?',
        a: 'Yes — 90+ Lighthouse scores are a delivery requirement, not an upsell. We budget image weight and JavaScript per page during the build, and we hand over the audit alongside the site.',
      },
      {
        q: 'Can I edit the content myself after launch?',
        a: 'If you want to, yes. We integrate a headless CMS so your team can edit copy, images and blog posts without touching code. If you would rather we handle changes, a maintenance retainer covers that instead.',
      },
    ],
  },
  {
    name: 'Web Apps & SaaS',
    items: [
      {
        q: 'Can you build our first version if we have no in-house engineers?',
        a: 'That is most of our SaaS work. We scope a genuinely shippable v1, build frontend, backend, database and deployment, then hand over documented infrastructure. Several clients hired their first engineer onto a codebase we built.',
      },
      {
        q: 'How do you keep a v1 from needing a rewrite at scale?',
        a: 'Mainly by getting the data model and tenancy right before writing feature code. Multi-tenant scoping, role-based access and a migration path cost a few days early and save a rewrite later. None of our launched products has needed one.',
      },
      {
        q: 'Do you handle authentication, roles and permissions?',
        a: 'Yes, including SSO where required. Authentication, role-based access control, invitations, audit logs and session handling are part of the application build rather than separate line items.',
      },
      {
        q: 'What happens to the code if we part ways?',
        a: 'It is yours from the first commit. You own the repository, the cloud accounts and the documentation throughout — there is no dependency on us to keep the product running.',
      },
    ],
  },
  {
    name: 'E-commerce',
    items: [
      {
        q: 'Shopify or a custom storefront — which should we choose?',
        a: 'Shopify if you need to launch quickly with standard catalog and checkout needs. Custom when your merchandising, pricing or fulfilment logic does not fit the platform, or when performance at large catalog sizes matters more than speed to launch. We will tell you honestly which applies.',
      },
      {
        q: 'Can you migrate our existing store without losing SEO?',
        a: 'Yes. Migrations include a full URL inventory, redirect mapping, structured data parity and post-launch crawl monitoring so rankings hold through the cutover.',
      },
      {
        q: 'Which payment gateways do you integrate?',
        a: 'Stripe, Razorpay, PayPal and most regional gateways with a documented API. That covers one-time payments, subscriptions, refunds, disputes and invoicing — with webhook handling built to survive duplicates and timeouts.',
      },
      {
        q: 'How do you reduce cart abandonment?',
        a: 'First by instrumenting the funnel so we know where people actually leave, then by removing whatever is causing it — usually checkout fields, slow catalog pages or surprise shipping costs. On a recent rebuild that sequence cut abandonment 55%.',
      },
    ],
  },
  {
    name: 'Mobile Apps',
    items: [
      {
        q: 'Native or cross-platform?',
        a: 'We build cross-platform with React Native or Flutter, which covers iOS and Android from one codebase at roughly 60% of the cost of two native builds. For heavy real-time graphics or deep OS integration we will recommend native and say so up front.',
      },
      {
        q: 'Do you handle App Store and Play Store submission?',
        a: 'Yes, including store listings, screenshots, privacy declarations and the review back-and-forth. We submit under your developer accounts so you retain ownership.',
      },
      {
        q: 'Will the app work offline?',
        a: 'Where it makes sense, yes. We use local persistence with background sync so users can keep working through a dropped connection and the data reconciles when it returns.',
      },
      {
        q: 'Do you support the app after release?',
        a: 'Mobile apps need maintenance more than websites do, because OS and SDK updates force changes. Our retainers cover SDK upgrades, crash monitoring and store resubmissions.',
      },
    ],
  },
  {
    name: 'AI & Automation',
    items: [
      {
        q: 'How do you stop an AI assistant from making things up?',
        a: 'We constrain answers to retrieved content from your own documentation and cite sources on every response. When retrieval confidence is low the assistant hands off to a human instead of guessing. That distinction is why a previously abandoned bot got replaced successfully.',
      },
      {
        q: 'Can you add AI features to our existing product?',
        a: 'Yes — that is the common case. AI search, summarisation, drafting and support assistants get built into the product you already have, behind your existing auth and data boundaries.',
      },
      {
        q: 'Who pays for the model API usage?',
        a: 'You do, directly on your own provider account, so there is no margin added to token costs. We size expected usage during scoping and add caps and alerts so the bill holds no surprises.',
      },
      {
        q: 'Are your automations monitored?',
        a: 'Always. Scrapers and pipelines break when a source changes, so every automation ships with failure alerts and a retry policy. You hear about a break from us, not from a missing report.',
      },
    ],
  },
  {
    name: 'Process',
    items: [
      {
        q: 'What does working with you actually look like?',
        a: 'Five stages: discovery, proposal, design and build, launch, support. During build you get a working demo every week — not a status document — so progress is visible and course corrections are cheap.',
      },
      {
        q: 'Will I have a single point of contact?',
        a: 'Yes. One lead owns your project end to end and sits in every demo. You can talk to the engineers doing the work whenever you want, but you never have to chase anyone to get an answer.',
      },
      {
        q: 'How do you handle scope changes mid-project?',
        a: 'Small adjustments get absorbed. Anything that moves the timeline or cost gets a written estimate before work starts, so you decide with the numbers in front of you rather than discovering them in an invoice.',
      },
      {
        q: 'What do you need from us to start?',
        a: 'A clear view of the problem, one decision-maker who can approve, and content or data access where relevant. Everything else — specification, architecture, design — we draft and you review.',
      },
    ],
  },
  {
    name: 'Pricing & Packages',
    items: [
      {
        q: 'How much will my project cost?',
        a: 'Each service page lists an honest range, and our project estimator gives an instant ballpark from a few inputs. Detailed quotes are fixed-price per milestone after discovery, so the number you approve is the number you pay.',
      },
      {
        q: 'Do you work fixed-price or hourly?',
        a: 'Fixed-price per milestone for defined projects, which puts estimation risk on us rather than you. Hourly or retainer arrangements are available for open-ended work like ongoing development and support.',
      },
      {
        q: 'What are the payment terms?',
        a: 'Typically 30% to start and the balance across milestones, with the final payment due at handover. Retainers are billed monthly in advance. Bank transfer, card and online gateways all work.',
      },
      {
        q: 'Do you offer smaller packages for early-stage teams?',
        a: 'Yes. Single-page sites, audits, integrations and performance work start in the few-hundred-dollar range, which is often the right first step before committing to a full build.',
      },
    ],
  },
  {
    name: 'Results & Case Studies',
    items: [
      {
        q: 'Can you share measurable results from past work?',
        a: 'Our case studies carry real numbers: 40% more conversions on an apparel rebuild, 60% of support tickets deflected by an AI assistant, 32% fewer clinic no-shows, nine weeks from prototype to paying customers.',
      },
      {
        q: 'How do you measure whether a project succeeded?',
        a: 'We agree on two or three metrics during discovery — conversion rate, LCP, ticket volume, time-to-launch — and instrument them before launch so the comparison afterwards is factual rather than anecdotal.',
      },
      {
        q: 'Can we talk to a reference client?',
        a: 'Yes, for projects comparable to yours. We ask the client first and introduce you directly rather than passing along a curated quote.',
      },
    ],
  },
  {
    name: 'Support & Maintenance',
    items: [
      {
        q: 'What does a maintenance retainer include?',
        a: 'Priority bug fixes, dependency and security updates, backups, uptime monitoring and a monthly health report — with a guaranteed response time written into the agreement.',
      },
      {
        q: 'Can you take over a project someone else built?',
        a: 'Frequently. We start with a paid audit of the codebase and infrastructure so you get a written assessment and a plan before committing to ongoing work.',
      },
      {
        q: 'What if the site breaks outside business hours?',
        a: 'Monitoring alerts us, not you. Retainer clients get an emergency channel with a defined response window for outages, including nights and weekends.',
      },
    ],
  },
  {
    name: 'Miscellaneous',
    items: [
      {
        q: 'Where are you based and which time zones do you cover?',
        a: 'We work remotely across IST and overlap daily with European and US East Coast hours. Demos and calls get scheduled in your working day, not ours.',
      },
      {
        q: 'Do you sign NDAs?',
        a: 'Yes, before discovery if you prefer. We can work under your NDA template or provide ours.',
      },
      {
        q: 'Which industries do you work in most?',
        a: 'SaaS and startups, e-commerce and D2C, healthcare, fintech and education. Each has a dedicated page covering the specific problems we see there.',
      },
      {
        q: 'Do you offer a free consultation?',
        a: 'Yes — a 30-minute call with an engineer, not a salesperson. You leave with a recommended approach and a ballpark range whether or not you hire us.',
      },
    ],
  },
]

export const faqCategoryNames = faqGroups.map((g) => g.name)
