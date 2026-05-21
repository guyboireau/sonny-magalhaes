// ═════════════════════════════════════════════════════════════════════════════
//  SITE CONFIG
// ═════════════════════════════════════════════════════════════════════════════

export const siteConfig = {
  // Navigation (landing 1 page)
  nav: [
    { label: 'Services',  href: '#services' },
    { label: 'À propos',  href: '#apropos' },
    { label: 'Tarifs',    href: '#tarifs' },
    { label: 'FAQ',       href: '#faq' },
    { label: 'Contact',   href: '#contact' },
  ],

  // ── 1. INFORMATIONS BUSINESS ───────────────────────────────────────────────
  business: {
    name:     'Sonny Magalhaes',
    tagline:  'Plombier et chauffagiste à La Chapelle-Bouëxic',
    industry: 'plumbing',          // utilisé pour schema.org + choix de contenu IA
    icon:     'drop',            // Icône de métier
    phone:    '06 79 01 15 00',
    email:    'contact@sonny-magalhaes-plomberie.fr',
    address: {
      street:     '17 rue Rennes',
      city:       'La Chapelle Bouëxic',
      postalCode: '35330',
      country:    'FR',
    },
    openingHours: {
      monday:    '07:30-19:30',
      tuesday:   '07:30-19:30',
      wednesday: '07:30-19:30',
      thursday:  '07:30-19:30',
      friday:    '07:30-19:30',
      saturday:  '07:30-12:00',
      sunday:    null,
    },
    socialLinks: {
      linkedin:  '',
      instagram: '',
      facebook:  'https://www.facebook.com/',
      twitter:   '',
    },
    siret:        '',
    availability: 'Disponible',
    urgency: {
      active:    true,
      label:     'Dépannage Rapide',
      phone:     '06 79 01 15 00',
    },
    serviceArea: [
      'La Chapelle-Bouëxic',
      'Guichen',
      'Lohéac',
      'Baulon',
      'Mernel',
      'Guignen',
      'Val d’Anast',
      'Lassy',
      'Goven',
      'Bruz',
      'Chartres-de-Bretagne',
    ],
    certifications: [
      { label: 'Garantie décennale', sublabel: 'Assurance RC Pro incluse',          icon: '🛡️' },
      { label: 'Artisan',            sublabel: 'Artisan certifié qualité',            icon: '✅' },
    ],
    assurance: {
      name:   '',
      numero: '',
    },
  },

  // ── 2. BRANDING ────────────────────────────────────────────────────────────
  branding: {
    primaryColor:    '#1d62c8',   // Bleu Plombier
    primaryDark:     '#1550a8',
    primarySoft:     '#dbeafe',
    secondaryColor:  '#0f172a',
    accentColor:     '#f08c00',   // Orange urgence
    fontHeading:     'Outfit',
    fontBody:        'Outfit',
    fontMono:        'Geist Mono',
    logoPath:        '/assets/logo.svg',
    faviconPath:     '/favicon.svg',
  },

  // ── 3. SEO ─────────────────────────────────────────────────────────────────
  seo: {
    titleTemplate:      '%s | Sonny Magalhaes - Plombier Chauffagiste',
    defaultTitle:       'Sonny Magalhaes - Plombier Chauffagiste à La Chapelle-Bouëxic',
    defaultDescription: 'Dépannage rapide 7j/7, entretien de chaudière, PAC, et rénovation de salle de bain à La Chapelle-Bouëxic, Guichen, Val d\'Anast et alentours.',
    keywords: [
      'plombier',
      'chauffagiste',
      'La Chapelle-Bouëxic',
      'dépannage plomberie',
      'entretien chaudière',
      'pompe à chaleur',
      'rénovation salle de bain',
      'fuite d\'eau',
    ],
    googleBusinessUrl:   '',
    googleAnalyticsId:   '',
    googleSearchConsole: '',
    bingWebmasterKey:    '',
    plausibleDomain:     '',
    sentryDsn:           '',
    locale:              'fr_FR',
    siteUrl:             'https://sonnymagalhaes-plomberie.fr',
    ogImage:             '/assets/og-image.jpg',
  },

  // ── 4. DESIGN VARIANTS ─────────────────────────────────────────────────────
  design: {
    isSketchy: false,
    variants: {
      header:       'A',
      hero:         'A',
      services:     'A',
      about:        'A',
      testimonials: 'A',
      pricing:      'A',
      faq:          'A',
      cta:          'A',
      footer:       'A',
    },
  },

  // ── 5. PAGES (multipage) ──────────────────────────────────────────────────
  pages: {
    home: {
      slug:        '/',
      title:       'Accueil',
      description: 'Bienvenue sur notre site.',
    },
    services: {
      slug:        '/services',
      title:       'Nos services',
      description: 'Découvrez nos prestations.',
    },
    about: {
      slug:        '/a-propos',
      title:       'À propos',
      description: 'En savoir plus sur notre entreprise.',
    },
    blog: {
      slug:        '/blog',
      title:       'Blog',
      description: 'Actualités et conseils.',
    },
    realisations: {
      slug:        '/realisations',
      title:       'Réalisations',
      description: 'Nos projets récents.',
    },
    contact: {
      slug:        '/contact',
      title:       'Contact',
      description: 'Contactez-nous pour toute demande.',
    },
  },

  // ── 6. FEATURES ────────────────────────────────────────────────────────────
  features: {
    blog:          false,
    booking:       false,
    multilingual:  false,
    pricing:       false,
    testimonials:  true,
    newsletter:    false,
    cookieBanner:  true,
    analytics:     false,
    plausible:     false,
    sentry:        false,
  },

  // ── 7. CONTENT ─────────────────────────────────────────────────────────────
  content: {

    hero: {
      eyebrow:  'PLOMBIER ET CHAUFFAGISTE — LA CHAPELLE-BOUËXIC',
      h1:       'Dépannage rapide & Installation de Plomberie et Chauffage',
      subtitle: 'Fuite d\'eau, chauffe-eau en panne ou besoin d\'entretenir votre pompe à chaleur ? Nous intervenons rapidement sur La Chapelle-Bouëxic, Guichen, et les environs pour des prestations soignées et garanties.',
      image:    '/hero.png',
      cta1:     { label: 'Demander une intervention', href: '#contact' },
      cta2:     { label: 'Voir nos services', href: '#services' },
      trust:    ['Intervention rapide', 'Travail propre et soigné', 'Tarifs transparents'],
      badge:    { label: 'Avis Clients', value: '4.9/5', sub: 'sur Google (74 avis)' },
      infoCard: { status: 'Disponible', hours: 'Lun–Ven · 07h30–19h30', location: '17 rue Rennes, La Chapelle Bouëxic' },
    },

    services: {
      eyebrow:  '— Nos prestations',
      title:    'Des solutions complètes pour votre confort',
      subtitle: 'Expert en plomberie et chauffage, nous vous accompagnons dans tous vos projets d\'installation, d\'entretien et de réparation.',
      items: [
        {
          icon:  'wrench',
          title: 'Dépannage Plomberie',
          text:  'Intervention rapide pour toutes vos urgences : fuites d\'eau, canalisations bouchées, ballon d\'eau chaude en panne.',
          link:  'En savoir plus →',
          tag:   'Urgence 7j/7',
          features: ['Recherche et réparation de fuites', 'Débouchage canalisations', 'Remplacement chauffe-eau'],
        },
        {
          icon:  'fire',
          title: 'Chauffage & PAC',
          text:  'Entretien et dépannage de chaudières (gaz, fioul, condensation) et pompes à chaleur (PAC) pour optimiser vos économies d\'énergie.',
          link:  'En savoir plus →',
          tag:   'Entretien',
          features: ['Entretien chaudière', 'Dépannage PAC', 'Désembouage réseau chauffage'],
        },
        {
          icon:  'shower',
          title: 'Salle de bain',
          text:  'Création et rénovation complète de votre salle de bain : de la plomberie sanitaire à l\'installation de douches à l\'italienne.',
          link:  'En savoir plus →',
          tag:   'Rénovation',
          features: ['Installation sanitaire', 'Douche à l\'italienne', 'Robinetterie de qualité'],
        },
      ],
    },

    about: {
      eyebrow: '— À propos',
      title: 'Votre artisan de confiance en Ille-et-Vilaine',
      text: [
        'Installé à La Chapelle-Bouëxic, Sonny Magalhaes met à votre service son savoir-faire d\'artisan plombier chauffagiste pour vous garantir un confort thermique optimal et des installations sanitaires fiables.',
        'Nous privilégions une approche humaine : réactivité, écoute, conseils personnalisés et travail soigné sont au cœur de nos priorités. Que ce soit pour un dépannage en urgence ou un projet de rénovation, nous nous engageons à fournir des prestations de qualité à des prix transparents.',
      ],
      stats: [
        { value: '4.9/5',   label: 'Note Google (74 avis)' },
        { value: '10+',  label: 'Villes desservies' },
        { value: '100%',  label: 'Engagement qualité' },
      ],
      cta:    { label: 'Nous contacter', href: '#contact' },
      image:  '/about.png',
      author: { name: 'Sonny Magalhaes', role: 'Artisan Plombier Chauffagiste', image: '/assets/images/placeholder-portrait.png' },
    },

    testimonials: {
      eyebrow:   '— Témoignages',
      title:     'Ce que disent nos clients',
      ratingStr: '4.9 / 5 · 74 avis clients',
      items: [
        {
          quote:   'Intervention rapide et professionnelle. Plombier très réactif, aimable et à l’écoute. Je recommande vivement.',
          name:    'Catherine Goter',
          role:    'Particulier',
          initial: 'C',
        },
        {
          quote:   'Nous sommes très satisfaits des services de Sonny Magalhaes. Intervient rapidement, travail très propre, des prix tout à fait corrects, de bon conseil. De plus, Sonny est une personne très aimable et agréable.',
          name:    'WolfRaven',
          role:    'Particulier',
          initial: 'W',
        },
        {
          quote:   'Sonny a réalisé chez nous un travail de qualité et très soigné. Il a pris le temps de nous donner des explications claires et détaillées. Enfin un plombier professionnel, qui respecte ses engagements !',
          name:    'Isamar56',
          role:    'Particulier',
          initial: 'I',
        },
      ],
    },

    pricing: {
      eyebrow:  '— Tarifs',
      title:    'Tarifs transparents',
      subtitle: 'Nos offres pour l\'entretien de vos systèmes de chauffage',
      plans: [
        {
          name:      'Entretien Chaudière',
          price:     'Sur devis',
          unit:      '/ an',
          desc:      'Optimisez votre chaudière gaz ou fioul.',
          features:   ['Vérification conformité', 'Nettoyage des brûleurs', 'Contrôle combustion'],
          cta:        'Demander un devis',
          highlight:  false,
          stripeLink: '',
        },
        {
          name:       'Entretien PAC',
          price:      'Sur devis',
          unit:       '/ an',
          desc:       'Assurez la longévité de votre Pompe À Chaleur.',
          features:   ['Contrôle d\'étanchéité', 'Nettoyage filtres', 'Vérification pression'],
          cta:        'Demander un devis',
          highlight:  true,
          stripeLink: '',
        },
        {
          name:       'Désembouage',
          price:      'Sur devis',
          unit:       '/ réseau',
          desc:       'Nettoyage de votre réseau de chauffage.',
          features:   ['Amélioration du rendement', 'Protection de la chaudière', 'Économies d\'énergie'],
          cta:        'Demander un devis',
          highlight:  false,
          stripeLink: '',
        },
      ],
    },

    faq: {
      eyebrow: '— Questions fréquentes',
      title:   'Vos questions, nos réponses',
      items: [
        { q: 'Dans quelles zones intervenez-vous ?', a: 'Nous intervenons à La Chapelle-Bouëxic, Guichen, Lohéac, Baulon, Mernel, Guignen, Val d\'Anast, Lassy, Goven, Bruz, et Chartres-de-Bretagne.' },
        { q: 'Quels types de chauffage réparez-vous ?', a: 'Nous entretenons et réparons les chaudières à gaz, à fioul classique ou à condensation, ainsi que les pompes à chaleur (PAC) et les ballons d\'eau chaude.' },
        { q: 'Intervenez-vous en urgence ?', a: 'Oui, nous proposons un dépannage rapide pour les fuites d\'eau, les pannes de chaudière, de PAC ou de chauffe-eau.' },
        { q: 'Faites-vous la rénovation de salle de bain ?', a: 'Absolument. Nous prenons en charge la création et la rénovation de salles de bain de A à Z (plomberie, sanitaires, douches à l\'italienne, etc.).' },
        { q: 'Quels sont vos tarifs ?', a: 'Nous pratiquons des prix corrects et transparents. N\'hésitez pas à nous contacter pour obtenir un devis personnalisé avant toute intervention.' },
      ],
    },

    cta: {
      eyebrow:  'UNE URGENCE OU UN PROJET ?',
      title:    'Contactez votre expert plomberie !',
      subtitle: 'Nous sommes à votre disposition pour vous conseiller et intervenir rapidement chez vous.',
      cta1:     { label: 'Nous appeler : 06 79 01 15 00', href: 'tel:+33679011500' },
      cta2:     { label: 'Demander un devis',  href: '#contact' },
    },

    contact: {
      eyebrow:        '— Contact',
      title:          'Parlons de votre projet',
      subtitle:       'Vous avez une urgence plomberie ou un projet de rénovation ? Remplissez ce formulaire ou appelez-nous directement.',
      successMessage: 'Votre message a bien été envoyé. Nous vous recontacterons très vite.',
      formTypes:      ['Dépannage / Urgence', 'Entretien Chaudière / PAC', 'Devis Plomberie', 'Rénovation Salle de bain'],
    },
    certifications: {
      eyebrow:  '— Certifications & Garanties',
      title:    'Votre sérénité avant tout',
      subtitle: 'Artisan qualifié, nous vous garantissons des travaux réalisés dans les règles de l\'art.',
    },

    footer: {
      description: 'Magalhaes Sonny – Votre expert en plomberie et chauffage à La Chapelle-Bouëxic, disponible pour toute urgence, dépannage, entretien ou rénovation.',
      links: [
        { label: 'Services',  href: '#services' },
        { label: 'À propos',  href: '#apropos' },
        { label: 'Tarifs',    href: '#tarifs' },
        { label: 'FAQ',       href: '#faq' },
        { label: 'Contact',   href: '#contact' },
      ],
      legal: [
        { label: 'Mentions légales', href: '/mentions-legales' },
        { label: 'CGV',              href: '/cgv' },
        { label: 'RGPD',             href: '/rgpd' },
      ],
      madeBy: 'Site réalisé par <a href="https://guyboireau.com" rel="noopener" target="_blank">guyboireau.com</a>',
    },
    portfolio: {
      items: []
    },

  }, // fin content

} as const;

// ─── Re-exports nommés (compat avec les composants existants) ──────────────
export type Variant = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H';

export const { business, branding, seo, design, features, pages, nav, content } = siteConfig;
export const variants      = siteConfig.design.variants;
export const hero          = siteConfig.content.hero;
export const services      = siteConfig.content.services;
export const about         = siteConfig.content.about;
export const testimonials  = siteConfig.content.testimonials;
export const pricing       = siteConfig.content.pricing;
export const faq           = siteConfig.content.faq;
export const cta           = siteConfig.content.cta;
export const contact       = siteConfig.content.contact;
export const footer        = siteConfig.content.footer;
export const portfolio     = siteConfig.content.portfolio;
export const certifications = siteConfig.content.certifications;
