// FAQ groups, questions and answers (src/data/faqs.js).
export default {
  // Groups
  'Web Development': 'Webentwicklung',
  'Web Apps & SaaS': 'Web-Apps & SaaS',
  'E-commerce': 'E-Commerce',
  'Mobile Apps': 'Mobile Apps',
  Process: 'Ablauf',
  'Pricing & Packages': 'Preise & Pakete',
  'Results & Case Studies': 'Ergebnisse & Fallstudien',
  'Support & Maintenance': 'Support & Wartung',
  Miscellaneous: 'Sonstiges',

  // Web development
  'How long does a custom website take to build?': 'Wie lange dauert die Entwicklung einer individuellen Website?',
  'A focused marketing site or landing page typically takes two to four weeks; a larger corporate site with a CMS runs four to six. The timeline depends far more on content readiness and feedback speed than on build effort, so we agree on a review schedule before starting.':
    'Eine fokussierte Marketing-Website oder Landingpage dauert in der Regel zwei bis vier Wochen, eine größere Unternehmenswebsite mit CMS vier bis sechs. Der Zeitplan hängt weit mehr davon ab, wann Inhalte bereitstehen und wie schnell Feedback kommt, als vom Entwicklungsaufwand – deshalb vereinbaren wir vor dem Start feste Abstimmungstermine.',
  'Do you use templates or build from scratch?': 'Verwenden Sie Templates oder entwickeln Sie von Grund auf?',
  'We build from scratch on Vue, React or Next.js. Templates save a week up front and cost months later, because every change fights conventions someone else chose. The exception is Shopify, where we work inside the platform deliberately.':
    'Wir entwickeln von Grund auf mit Vue, React oder Next.js. Templates sparen anfangs eine Woche und kosten später Monate, weil jede Änderung gegen die Konventionen eines anderen ankämpft. Die Ausnahme ist Shopify – dort arbeiten wir bewusst innerhalb der Plattform.',
  'Will my site be fast and pass Core Web Vitals?': 'Wird meine Website schnell sein und die Core Web Vitals bestehen?',
  'Yes — 90+ Lighthouse scores are a delivery requirement, not an upsell. We budget image weight and JavaScript per page during the build, and we hand over the audit alongside the site.':
    'Ja – Lighthouse-Werte über 90 sind ein Abnahmekriterium, kein Zusatzangebot. Wir legen während der Entwicklung Budgets für Bildgröße und JavaScript pro Seite fest und übergeben das Audit zusammen mit der Website.',
  'Can I edit the content myself after launch?': 'Kann ich die Inhalte nach dem Launch selbst bearbeiten?',
  'If you want to, yes. We integrate a headless CMS so your team can edit copy, images and blog posts without touching code. If you would rather we handle changes, a maintenance retainer covers that instead.':
    'Wenn Sie möchten, ja. Wir binden ein Headless-CMS an, damit Ihr Team Texte, Bilder und Blogbeiträge ohne Code bearbeiten kann. Wenn Sie Änderungen lieber uns überlassen, deckt ein Wartungsvertrag das ab.',

  // Web apps & SaaS
  'Can you build our first version if we have no in-house engineers?':
    'Können Sie unsere erste Version bauen, wenn wir keine eigenen Entwickler haben?',
  'That is most of our SaaS work. We scope a genuinely shippable v1, build frontend, backend, database and deployment, then hand over documented infrastructure. Several clients hired their first engineer onto a codebase we built.':
    'Das ist der Großteil unserer SaaS-Projekte. Wir definieren eine wirklich auslieferbare v1, bauen Frontend, Backend, Datenbank und Deployment und übergeben eine dokumentierte Infrastruktur. Mehrere Kunden haben ihren ersten Entwickler für eine Codebasis eingestellt, die wir gebaut haben.',
  'How do you keep a v1 from needing a rewrite at scale?': 'Wie verhindern Sie, dass eine v1 beim Wachstum neu gebaut werden muss?',
  'Mainly by getting the data model and tenancy right before writing feature code. Multi-tenant scoping, role-based access and a migration path cost a few days early and save a rewrite later. None of our launched products has needed one.':
    'Vor allem, indem wir Datenmodell und Mandantenfähigkeit klären, bevor wir Funktionen programmieren. Mandantentrennung, rollenbasierter Zugriff und ein Migrationspfad kosten anfangs ein paar Tage und ersparen später einen Neubau. Keines unserer gestarteten Produkte brauchte einen.',
  'Do you handle authentication, roles and permissions?': 'Kümmern Sie sich um Authentifizierung, Rollen und Berechtigungen?',
  'Yes, including SSO where required. Authentication, role-based access control, invitations, audit logs and session handling are part of the application build rather than separate line items.':
    'Ja, bei Bedarf inklusive SSO. Authentifizierung, rollenbasierte Zugriffskontrolle, Einladungen, Audit-Logs und Sitzungsverwaltung sind Teil der Entwicklung und keine separaten Posten.',
  'What happens to the code if we part ways?': 'Was passiert mit dem Code, wenn wir uns trennen?',
  'It is yours from the first commit. You own the repository, the cloud accounts and the documentation throughout — there is no dependency on us to keep the product running.':
    'Er gehört Ihnen ab dem ersten Commit. Repository, Cloud-Konten und Dokumentation sind durchgehend Ihr Eigentum – Sie sind für den Betrieb des Produkts nicht von uns abhängig.',

  // E-commerce
  'Shopify or a custom storefront — which should we choose?': 'Shopify oder ein individueller Shop – was sollten wir wählen?',
  'Shopify if you need to launch quickly with standard catalog and checkout needs. Custom when your merchandising, pricing or fulfilment logic does not fit the platform, or when performance at large catalog sizes matters more than speed to launch. We will tell you honestly which applies.':
    'Shopify, wenn Sie schnell starten müssen und Standardanforderungen an Katalog und Checkout haben. Individuell, wenn Ihre Sortiments-, Preis- oder Versandlogik nicht zur Plattform passt oder Performance bei großen Katalogen wichtiger ist als ein schneller Start. Wir sagen Ihnen ehrlich, was auf Sie zutrifft.',
  'Can you migrate our existing store without losing SEO?': 'Können Sie unseren bestehenden Shop ohne SEO-Verluste migrieren?',
  'Yes. Migrations include a full URL inventory, redirect mapping, structured data parity and post-launch crawl monitoring so rankings hold through the cutover.':
    'Ja. Migrationen umfassen eine vollständige URL-Bestandsaufnahme, Weiterleitungen, gleichwertige strukturierte Daten und Crawl-Monitoring nach dem Launch, damit die Rankings die Umstellung überstehen.',
  'Which payment gateways do you integrate?': 'Welche Zahlungsanbieter binden Sie an?',
  'Stripe, Razorpay, PayPal and most regional gateways with a documented API. That covers one-time payments, subscriptions, refunds, disputes and invoicing — with webhook handling built to survive duplicates and timeouts.':
    'Stripe, Razorpay, PayPal und die meisten regionalen Anbieter mit dokumentierter API. Das umfasst Einmalzahlungen, Abonnements, Erstattungen, Rückbuchungen und Rechnungen – mit einer Webhook-Verarbeitung, die Duplikate und Timeouts übersteht.',
  'How do you reduce cart abandonment?': 'Wie reduzieren Sie Kaufabbrüche?',
  'First by instrumenting the funnel so we know where people actually leave, then by removing whatever is causing it — usually checkout fields, slow catalog pages or surprise shipping costs. On a recent rebuild that sequence cut abandonment 55%.':
    'Zuerst machen wir den Funnel messbar, um zu sehen, wo Kunden tatsächlich abspringen, dann beseitigen wir die Ursache – meist zu viele Checkout-Felder, langsame Katalogseiten oder überraschende Versandkosten. Bei einem aktuellen Relaunch sanken die Abbrüche so um 55 %.',

  // Mobile
  'Native or cross-platform?': 'Nativ oder plattformübergreifend?',
  'We build cross-platform with React Native or Flutter, which covers iOS and Android from one codebase at roughly 60% of the cost of two native builds. For heavy real-time graphics or deep OS integration we will recommend native and say so up front.':
    'Wir entwickeln plattformübergreifend mit React Native oder Flutter – iOS und Android aus einer Codebasis für rund 60 % der Kosten zweier nativer Apps. Bei aufwendiger Echtzeitgrafik oder tiefer Systemintegration empfehlen wir nativ und sagen das von Anfang an.',
  'Do you handle App Store and Play Store submission?': 'Übernehmen Sie die Einreichung im App Store und Play Store?',
  'Yes, including store listings, screenshots, privacy declarations and the review back-and-forth. We submit under your developer accounts so you retain ownership.':
    'Ja, inklusive Store-Einträgen, Screenshots, Datenschutzangaben und der Abstimmung im Review-Prozess. Wir reichen über Ihre Entwicklerkonten ein, damit Sie Eigentümer bleiben.',
  'Will the app work offline?': 'Funktioniert die App offline?',
  'Where it makes sense, yes. We use local persistence with background sync so users can keep working through a dropped connection and the data reconciles when it returns.':
    'Wo es sinnvoll ist, ja. Wir speichern Daten lokal und synchronisieren im Hintergrund, sodass Nutzer bei Verbindungsabbruch weiterarbeiten können und sich die Daten abgleichen, sobald die Verbindung zurück ist.',
  'Do you support the app after release?': 'Betreuen Sie die App nach der Veröffentlichung?',
  'Mobile apps need maintenance more than websites do, because OS and SDK updates force changes. Our retainers cover SDK upgrades, crash monitoring and store resubmissions.':
    'Mobile Apps brauchen mehr Wartung als Websites, weil Betriebssystem- und SDK-Updates Änderungen erzwingen. Unsere Betreuungsverträge umfassen SDK-Upgrades, Absturz-Monitoring und erneute Store-Einreichungen.',

  // AI
  'How do you stop an AI assistant from making things up?': 'Wie verhindern Sie, dass ein KI-Assistent Dinge erfindet?',
  'We constrain answers to retrieved content from your own documentation and cite sources on every response. When retrieval confidence is low the assistant hands off to a human instead of guessing. That distinction is why a previously abandoned bot got replaced successfully.':
    'Wir beschränken Antworten auf Inhalte aus Ihrer eigenen Dokumentation und nennen bei jeder Antwort die Quelle. Ist die Trefferqualität gering, übergibt der Assistent an einen Menschen, statt zu raten. Genau deshalb konnte ein zuvor abgeschalteter Bot erfolgreich ersetzt werden.',
  'Can you add AI features to our existing product?': 'Können Sie KI-Funktionen in unser bestehendes Produkt integrieren?',
  'Yes — that is the common case. AI search, summarisation, drafting and support assistants get built into the product you already have, behind your existing auth and data boundaries.':
    'Ja – das ist der Normalfall. KI-Suche, Zusammenfassungen, Textentwürfe und Support-Assistenten werden in Ihr vorhandenes Produkt eingebaut, hinter Ihrer bestehenden Authentifizierung und Datentrennung.',
  'Who pays for the model API usage?': 'Wer bezahlt die Nutzung der Modell-API?',
  'You do, directly on your own provider account, so there is no margin added to token costs. We size expected usage during scoping and add caps and alerts so the bill holds no surprises.':
    'Sie – direkt über Ihr eigenes Anbieterkonto, ohne Aufschlag auf die Token-Kosten. Wir schätzen die erwartete Nutzung vorab und richten Limits und Alarme ein, damit die Rechnung keine Überraschungen bringt.',
  'Are your automations monitored?': 'Werden Ihre Automatisierungen überwacht?',
  'Always. Scrapers and pipelines break when a source changes, so every automation ships with failure alerts and a retry policy. You hear about a break from us, not from a missing report.':
    'Immer. Scraper und Pipelines brechen, wenn sich eine Quelle ändert – deshalb hat jede Automatisierung Fehleralarme und eine Wiederholungsstrategie. Von einem Ausfall erfahren Sie von uns, nicht durch einen fehlenden Bericht.',

  // Process
  'What does working with you actually look like?': 'Wie sieht die Zusammenarbeit mit Ihnen konkret aus?',
  'Five stages: discovery, proposal, design and build, launch, support. During build you get a working demo every week — not a status document — so progress is visible and course corrections are cheap.':
    'Fünf Phasen: Analyse, Angebot, Design und Entwicklung, Launch, Support. Während der Entwicklung sehen Sie jede Woche eine lauffähige Demo statt eines Statusberichts – so ist der Fortschritt sichtbar und Kurskorrekturen bleiben günstig.',
  'Will I have a single point of contact?': 'Habe ich einen festen Ansprechpartner?',
  'Yes. One lead owns your project end to end and sits in every demo. You can talk to the engineers doing the work whenever you want, but you never have to chase anyone to get an answer.':
    'Ja. Eine verantwortliche Person betreut Ihr Projekt von Anfang bis Ende und ist bei jeder Demo dabei. Sie können jederzeit mit den Entwicklern sprechen, müssen aber nie jemandem hinterherlaufen, um eine Antwort zu bekommen.',
  'How do you handle scope changes mid-project?': 'Wie gehen Sie mit Änderungen am Umfang während des Projekts um?',
  'Small adjustments get absorbed. Anything that moves the timeline or cost gets a written estimate before work starts, so you decide with the numbers in front of you rather than discovering them in an invoice.':
    'Kleine Anpassungen fangen wir auf. Alles, was Zeitplan oder Kosten verändert, bekommt vorab eine schriftliche Schätzung – so entscheiden Sie mit den Zahlen vor Augen, statt sie erst auf der Rechnung zu entdecken.',
  'What do you need from us to start?': 'Was brauchen Sie von uns für den Start?',
  'A clear view of the problem, one decision-maker who can approve, and content or data access where relevant. Everything else — specification, architecture, design — we draft and you review.':
    'Ein klares Bild des Problems, eine entscheidungsbefugte Person und bei Bedarf Zugang zu Inhalten oder Daten. Alles andere – Spezifikation, Architektur, Design – entwerfen wir, und Sie geben Feedback.',

  // Pricing
  'How much will my project cost?': 'Was kostet mein Projekt?',
  'Each service page lists an honest range, and our project estimator gives an instant ballpark from a few inputs. Detailed quotes are fixed-price per milestone after discovery, so the number you approve is the number you pay.':
    'Jede Leistungsseite nennt eine ehrliche Preisspanne, und unser Projektkosten-Rechner liefert mit wenigen Angaben sofort eine erste Schätzung. Detaillierte Angebote erstellen wir nach der Analyse als Festpreis pro Meilenstein – Sie zahlen genau den Betrag, den Sie freigeben.',
  'Do you work fixed-price or hourly?': 'Arbeiten Sie zum Festpreis oder auf Stundenbasis?',
  'Fixed-price per milestone for defined projects, which puts estimation risk on us rather than you. Hourly or retainer arrangements are available for open-ended work like ongoing development and support.':
    'Bei klar definierten Projekten zum Festpreis pro Meilenstein – das Schätzrisiko liegt damit bei uns, nicht bei Ihnen. Für offene Aufgaben wie laufende Weiterentwicklung und Support bieten wir Stundenabrechnung oder Betreuungsverträge an.',
  'What are the payment terms?': 'Welche Zahlungsbedingungen gelten?',
  'Typically 30% to start and the balance across milestones, with the final payment due at handover. Retainers are billed monthly in advance. Bank transfer, card and online gateways all work.':
    'In der Regel 30 % zum Start und der Rest verteilt auf die Meilensteine, die Schlusszahlung bei Übergabe. Betreuungsverträge werden monatlich im Voraus abgerechnet. Überweisung, Karte und Online-Zahlung sind möglich.',
  'Do you offer smaller packages for early-stage teams?': 'Bieten Sie kleinere Pakete für junge Teams an?',
  'Yes. Single-page sites, audits, integrations and performance work start in the few-hundred-dollar range, which is often the right first step before committing to a full build.':
    'Ja. One-Pager, Audits, Integrationen und Performance-Optimierung beginnen im Bereich weniger hundert Dollar – oft der richtige erste Schritt vor einem kompletten Projekt.',

  // Results
  'Can you share measurable results from past work?': 'Können Sie messbare Ergebnisse früherer Projekte zeigen?',
  'Our case studies carry real numbers: 40% more conversions on an apparel rebuild, 60% of support tickets deflected by an AI assistant, 32% fewer clinic no-shows, nine weeks from prototype to paying customers.':
    'Unsere Fallstudien enthalten echte Zahlen: 40 % mehr Conversions nach dem Neubau eines Mode-Shops, 60 % der Support-Tickets durch einen KI-Assistenten abgefangen, 32 % weniger Terminausfälle in Praxen, neun Wochen vom Prototyp bis zu zahlenden Kunden.',
  'How do you measure whether a project succeeded?': 'Wie messen Sie, ob ein Projekt erfolgreich war?',
  'We agree on two or three metrics during discovery — conversion rate, LCP, ticket volume, time-to-launch — and instrument them before launch so the comparison afterwards is factual rather than anecdotal.':
    'Wir vereinbaren in der Analysephase zwei bis drei Kennzahlen – Conversion-Rate, LCP, Ticketvolumen, Zeit bis zum Launch – und machen sie vor dem Launch messbar, damit der spätere Vergleich auf Fakten beruht statt auf Eindrücken.',
  'Can we talk to a reference client?': 'Können wir mit einem Referenzkunden sprechen?',
  'Yes, for projects comparable to yours. We ask the client first and introduce you directly rather than passing along a curated quote.':
    'Ja, bei Projekten, die Ihrem ähneln. Wir fragen den Kunden vorher und stellen den Kontakt direkt her, statt ein ausgewähltes Zitat weiterzugeben.',

  // Support
  'What does a maintenance retainer include?': 'Was umfasst ein Wartungsvertrag?',
  'Priority bug fixes, dependency and security updates, backups, uptime monitoring and a monthly health report — with a guaranteed response time written into the agreement.':
    'Priorisierte Fehlerbehebung, Abhängigkeits- und Sicherheitsupdates, Backups, Uptime-Monitoring und einen monatlichen Statusbericht – mit vertraglich garantierter Reaktionszeit.',
  'Can you take over a project someone else built?': 'Können Sie ein Projekt übernehmen, das jemand anderes gebaut hat?',
  'Frequently. We start with a paid audit of the codebase and infrastructure so you get a written assessment and a plan before committing to ongoing work.':
    'Häufig. Wir beginnen mit einem kostenpflichtigen Audit von Codebasis und Infrastruktur, damit Sie eine schriftliche Bewertung und einen Plan erhalten, bevor Sie sich auf eine laufende Zusammenarbeit festlegen.',
  'What if the site breaks outside business hours?': 'Was passiert, wenn die Website außerhalb der Geschäftszeiten ausfällt?',
  'Monitoring alerts us, not you. Retainer clients get an emergency channel with a defined response window for outages, including nights and weekends.':
    'Das Monitoring alarmiert uns, nicht Sie. Kunden mit Betreuungsvertrag erhalten einen Notfallkanal mit festgelegter Reaktionszeit bei Ausfällen – auch nachts und am Wochenende.',

  // Misc
  'Where are you based and which time zones do you cover?': 'Wo sitzen Sie und welche Zeitzonen decken Sie ab?',
  'We work remotely across IST and overlap daily with European and US East Coast hours. Demos and calls get scheduled in your working day, not ours.':
    'Wir arbeiten remote in der Zeitzone IST und überschneiden uns täglich mit den Arbeitszeiten in Europa und an der US-Ostküste. Demos und Termine legen wir in Ihren Arbeitstag, nicht in unseren.',
  'Do you sign NDAs?': 'Unterzeichnen Sie Geheimhaltungsvereinbarungen?',
  'Yes, before discovery if you prefer. We can work under your NDA template or provide ours.':
    'Ja, auf Wunsch schon vor der Analysephase. Wir arbeiten mit Ihrer NDA-Vorlage oder stellen unsere zur Verfügung.',
  'Which industries do you work in most?': 'In welchen Branchen sind Sie am häufigsten tätig?',
  'SaaS and startups, e-commerce and D2C, healthcare, fintech and education. Each has a dedicated page covering the specific problems we see there.':
    'SaaS und Start-ups, E-Commerce und D2C, Gesundheitswesen, Fintech und Bildung. Für jede Branche gibt es eine eigene Seite zu den typischen Herausforderungen dort.',
  'Do you offer a free consultation?': 'Bieten Sie eine kostenlose Erstberatung an?',
  'Yes — a 30-minute call with an engineer, not a salesperson. You leave with a recommended approach and a ballpark range whether or not you hire us.':
    'Ja – ein 30-minütiges Gespräch mit einem Entwickler, nicht mit dem Vertrieb. Sie erhalten eine Empfehlung zum Vorgehen und eine erste Kostenspanne, egal ob Sie uns beauftragen oder nicht.',
}
