export const services = [
  {
    id: 'custom-website-development',
    title: 'Custom Website Development',
    icon: '🌐',
    shortDesc: 'Business sites, landing pages and portfolios built for speed, polish and conversions.',
    longDesc:
      'We design and build custom websites from the ground up — no bloated templates. Every site is responsive, fast, SEO-ready and tailored to your brand, whether it is a single landing page or a full corporate presence.',
    technologies: ['Vue.js', 'React', 'Next.js', 'Tailwind CSS'],
    priceRange: '$500 – $5k',
    features: ['Fully responsive design', 'SEO-optimized structure', '90+ Lighthouse scores', 'CMS integration on request'],
  },
  {
    id: 'web-application-development',
    title: 'Web Application Development',
    icon: '🖥️',
    shortDesc: 'Full-stack web apps, dashboards and SaaS products with modern frameworks.',
    longDesc:
      'From internal dashboards to customer-facing SaaS platforms, we build scalable web applications end to end — frontend, backend, database and deployment — with clean architecture your future team can maintain.',
    technologies: ['Vue.js', 'React', 'Node.js', 'PostgreSQL'],
    priceRange: '$2k – $15k',
    features: ['Authentication & roles', 'Real-time features', 'Admin dashboards', 'Scalable architecture'],
  },
  {
    id: 'api-development-integration',
    title: 'API Development & Integration',
    icon: '🔌',
    shortDesc: 'REST & GraphQL APIs, plus integrations with any third-party service.',
    longDesc:
      'We build robust, well-documented APIs and connect your product to the services it needs — payment gateways, CRMs, shipping providers, social logins, ERPs and more. Clean contracts, proper error handling, versioned and tested.',
    technologies: ['Node.js', 'Express', 'GraphQL', 'OpenAPI'],
    priceRange: '$800 – $8k',
    features: ['REST & GraphQL design', 'Third-party integrations', 'API documentation', 'Rate limiting & security'],
  },
  {
    id: 'ecommerce-development',
    title: 'E-commerce Development',
    icon: '🛒',
    shortDesc: 'Online stores with cart, checkout and payments — Shopify, WooCommerce or custom.',
    longDesc:
      'We launch stores that sell: product catalogs, carts, secure checkout, order management and analytics. Whether you want Shopify speed or a fully custom storefront, we handle the entire pipeline from design to payment.',
    technologies: ['Shopify', 'WooCommerce', 'Vue.js', 'Stripe'],
    priceRange: '$1.5k – $12k',
    features: ['Product & inventory management', 'Secure checkout', 'Payment gateway setup', 'Order tracking'],
  },
  {
    id: 'mobile-app-development',
    title: 'Mobile App Development',
    icon: '📱',
    shortDesc: 'Cross-platform iOS & Android apps from a single codebase.',
    longDesc:
      'Using React Native and Flutter, we ship polished mobile apps for both platforms without doubling your budget. Push notifications, offline support, app-store submission — handled.',
    technologies: ['React Native', 'Flutter', 'Firebase'],
    priceRange: '$3k – $20k',
    features: ['iOS & Android from one codebase', 'Push notifications', 'Offline-first support', 'App Store & Play Store publishing'],
  },
  {
    id: 'backend-development',
    title: 'Backend Development',
    icon: '⚙️',
    shortDesc: 'Servers, databases, auth systems and business logic that scale.',
    longDesc:
      'The engine behind your product. We build secure, well-tested backends — authentication, authorization, background jobs, file handling, notifications — with the database design to match.',
    technologies: ['Node.js', 'Python', 'MongoDB', 'PostgreSQL'],
    priceRange: '$1.5k – $10k',
    features: ['Secure authentication', 'Background jobs & queues', 'File storage & media handling', 'Automated testing'],
  },
  {
    id: 'cloud-deployment-devops',
    title: 'Cloud Deployment & DevOps',
    icon: '☁️',
    shortDesc: 'AWS, GCP and Firebase setup, CI/CD pipelines, Docker and hosting migration.',
    longDesc:
      'We take your app from "works on my machine" to production-grade: cloud infrastructure, automated deployments, monitoring, backups and zero-downtime releases. We also migrate existing apps to better, cheaper hosting.',
    technologies: ['AWS', 'GCP', 'Docker', 'GitHub Actions'],
    priceRange: '$500 – $6k',
    features: ['CI/CD pipelines', 'Dockerized environments', 'Monitoring & alerts', 'Cost optimization'],
  },
  {
    id: 'database-design-optimization',
    title: 'Database Design & Optimization',
    icon: '🗄️',
    shortDesc: 'Schema design, query tuning and migrations for SQL & NoSQL.',
    longDesc:
      'Slow queries and messy schemas kill products quietly. We design clean data models, tune the queries dragging your app down, and run safe migrations — SQL or NoSQL, greenfield or legacy.',
    technologies: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'],
    priceRange: '$500 – $5k',
    features: ['Schema design & normalization', 'Query performance tuning', 'Safe data migrations', 'Caching strategies'],
  },
  {
    id: 'ai-chatbot-integration',
    title: 'AI & Chatbot Integration',
    icon: '🤖',
    shortDesc: 'LLM-powered chatbots and AI features inside your existing product.',
    longDesc:
      'We add real AI value to your product: customer-support chatbots trained on your docs, AI-assisted search, content generation, summarization and automation built on the latest LLM APIs.',
    technologies: ['Claude API', 'OpenAI API', 'LangChain', 'RAG pipelines'],
    priceRange: '$1k – $10k',
    features: ['Custom-trained chatbots', 'AI search over your data', 'Content generation tools', 'Workflow automation with AI'],
  },
  {
    id: 'automation-web-scraping',
    title: 'Automation & Web Scraping',
    icon: '🕸️',
    shortDesc: 'Workflow automation, data pipelines and scheduled scrapers.',
    longDesc:
      'Stop doing it by hand. We automate repetitive workflows, build data pipelines, and create reliable scrapers that collect the data your business runs on — scheduled, monitored and delivered where you need it.',
    technologies: ['Python', 'Node.js', 'Puppeteer', 'Zapier / n8n'],
    priceRange: '$300 – $4k',
    features: ['Scheduled data collection', 'Excel / Sheets / DB delivery', 'Workflow automation', 'Anti-breakage monitoring'],
  },
  {
    id: 'payment-gateway-integration',
    title: 'Payment Gateway Integration',
    icon: '💳',
    shortDesc: 'Stripe, Razorpay and PayPal — one-time payments, subscriptions and invoicing.',
    longDesc:
      'We wire payments into your product properly: checkout flows, subscription billing, webhooks, refunds, invoices and tax handling — tested against every edge case so money never gets lost.',
    technologies: ['Stripe', 'Razorpay', 'PayPal', 'Webhooks'],
    priceRange: '$400 – $3k',
    features: ['One-time & subscription billing', 'Webhook reliability', 'Refund & dispute flows', 'Invoicing & receipts'],
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    icon: '🎨',
    shortDesc: 'Figma designs, design systems and product redesigns.',
    longDesc:
      'Design that ships. We create modern interfaces in Figma, build reusable design systems, and redesign dated products — always grounded in usability, not just aesthetics, and handed off developer-ready.',
    technologies: ['Figma', 'Design systems', 'Prototyping'],
    priceRange: '$400 – $5k',
    features: ['High-fidelity Figma designs', 'Interactive prototypes', 'Design systems & components', 'Developer-ready handoff'],
  },
  {
    id: 'seo-performance-optimization',
    title: 'SEO & Performance Optimization',
    icon: '🚀',
    shortDesc: 'Core Web Vitals, page speed and technical SEO that move rankings.',
    longDesc:
      'We make your site fast and findable: Core Web Vitals fixes, image and bundle optimization, structured data, sitemaps and technical SEO audits — with before/after metrics you can verify.',
    technologies: ['Lighthouse', 'Core Web Vitals', 'Schema.org'],
    priceRange: '$300 – $3k',
    features: ['Core Web Vitals fixes', 'Page-speed optimization', 'Technical SEO audit', 'Structured data & sitemaps'],
  },
  {
    id: 'website-maintenance-support',
    title: 'Website Maintenance & Support',
    icon: '🛡️',
    shortDesc: 'Bug fixes, security updates and monthly retainers — we keep it running.',
    longDesc:
      'Your site should not break at 2 a.m. with nobody to call. Our maintenance retainers cover updates, security patches, backups, uptime monitoring and a guaranteed response time for fixes.',
    technologies: ['Monitoring', 'Backups', 'Security patching'],
    priceRange: '$100 – $800 /mo',
    features: ['Priority bug fixes', 'Security & dependency updates', 'Uptime monitoring', 'Monthly health reports'],
  },
  {
    id: 'legacy-code-modernization',
    title: 'Legacy Code Modernization',
    icon: '🔄',
    shortDesc: 'Migrate old codebases to modern stacks without breaking the business.',
    longDesc:
      'jQuery-era frontend? PHP 5 backend? We modernize legacy systems incrementally — new stack, same business logic — with test coverage added along the way so nothing regresses during the move.',
    technologies: ['Vue.js', 'React', 'Node.js', 'Incremental migration'],
    priceRange: '$2k – $20k',
    features: ['Stack migration strategy', 'Incremental, low-risk rollout', 'Test coverage added', 'Zero-downtime cutover'],
  },
]

export const getServiceById = (id) => services.find((s) => s.id === id)
