// ============================================================
// Site-wide constants — single source of truth for SEO,
// business data (JSON-LD) and the author (E-E-A-T).
// ============================================================

export const SITE = {
  url: 'https://fspsicologiaclinica.com.br',
  name: 'FS Psicologia Clínica e Saúde Mental',
  shortName: 'FS Psicologia Clínica',
  locale: 'pt_BR',
  lang: 'pt-BR',
  defaultDescription:
    'Psicoterapia para adultos, particular, na região da Berrini (São Paulo) e online. Abordagem humanista e fenomenológico-existencial. Felipe Zecchin Salim — CRP 06/216021.',
  defaultOgImage: '/assets/img/og-image.jpg',
  themeColor: '#F6F3ED',
  instagram: 'https://instagram.com/fs.psicologiaclinica',
  email: 'atendimento@fspsicologiaclinica.com.br',
  phone: '+5511956772575',
  phoneDisplay: '(11) 95677-2575',
} as const;

// Pre-encoded WhatsApp deep link reused across the whole site.
export const WHATSAPP =
  'https://wa.me/5511956772575?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20os%20atendimentos.';

// Fixed site author — referenced by every BlogPosting (Person + CRP).
export const AUTHOR = {
  name: 'Felipe Zecchin Salim',
  jobTitle: 'Psicólogo clínico',
  crp: 'CRP 06/216021',
  bio: 'Psicólogo clínico (CRP 06/216021) e fundador da FS Psicologia Clínica e Saúde Mental, em São Paulo. Sua trajetória reúne duas formações — Psicologia, pela Universidade Paulista, e Comunicação Social, pela Anhembi Morumbi — e mais de quinze anos de atuação em marketing e publicidade. É dessa vivência em ambientes de alta exigência que vem sua sensibilidade para quem vive sob pressão contínua: executivos, lideranças e profissionais que aprenderam a operar no limite e raramente encontram espaço para si. Atualmente, cursa pós-graduação em Gestão Clínica no Hospital Sírio-Libanês.',
} as const;

// The three thematic clusters (topic authority). Slugs must match the
// `category` values used in post frontmatter and in the Sveltia CMS config.
export const CATEGORIES = {
  'carreira-e-trabalho': {
    label: 'Carreira e trabalho',
    description:
      'Pressão profissional, estresse, esgotamento (burnout) e transições de carreira.',
  },
  'ansiedade-e-transicoes': {
    label: 'Ansiedade e transições',
    description: 'Ansiedade, fases de mudança e decisões difíceis.',
  },
  'relacoes-e-autoconhecimento': {
    label: 'Relações e autoconhecimento',
    description: 'Relacionamentos, autoestima e busca de sentido.',
  },
} as const;

export type CategorySlug = keyof typeof CATEGORIES;

// JSON-LD for the clinic — identical in meaning to the original landing.
export const BUSINESS_JSONLD = {
  '@context': 'https://schema.org',
  // Psychologist is already a subtype of MedicalBusiness/LocalBusiness, so a
  // single type covers everything (address, geo, telephone…) without the
  // "duplicate property" warnings that a multi-type array triggers.
  '@type': 'Psychologist',
  name: SITE.name,
  alternateName: SITE.shortName,
  description:
    'Psicoterapia para adultos, particular, na região da Berrini (São Paulo) e online. Abordagem humanista e fenomenológico-existencial.',
  url: SITE.url + '/',
  image: SITE.url + '/assets/img/og-image.jpg',
  logo: SITE.url + '/assets/img/logo.png',
  telephone: SITE.phone,
  email: SITE.email,
  priceRange: '$$',
  currenciesAccepted: 'BRL',
  availableLanguage: 'Portuguese',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Rua André Ampère, 153',
    addressLocality: 'São Paulo',
    addressRegion: 'SP',
    postalCode: '04562-080',
    addressCountry: 'BR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -23.6100714,
    longitude: -46.6937905,
  },
  areaServed: { '@type': 'City', name: 'São Paulo' },
  availableService: {
    '@type': 'MedicalTherapy',
    name: 'Psicoterapia para adultos',
  },
  sameAs: [SITE.instagram],
  founder: {
    '@type': 'Person',
    name: AUTHOR.name,
    jobTitle: AUTHOR.jobTitle,
    identifier: AUTHOR.crp,
  },
} as const;
