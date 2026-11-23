// ─────────────────────────────────────────────────────────────────────────────
// Site-wide settings. Edit here, then run:  node src/build.mjs
// ─────────────────────────────────────────────────────────────────────────────

export const site = {
  // Production origin WITHOUT a trailing slash, e.g. "https://mohamyplus.com".
  // When set, the build adds canonical URLs, hreflang alternates, absolute
  // Open Graph URLs and a sitemap.xml. Leave empty until the domain is final.
  url: '',

  name: { en: 'Mohamy Plus', ar: 'محامي بلس' },
  phone: '+201080509733',
  phoneDisplay: '+20 108 050 9733',
  whatsapp: '201080509733',
  email: 'mohamyplus@gmail.com',
  city: { en: 'Cairo, Egypt', ar: 'القاهرة، مصر' },
  social: [
    { id: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/share/179UMcoDrU/' },
    { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/mohamyplus' },
    { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/company/mohamy-plus/' },
    { id: 'tiktok', label: 'TikTok', href: 'https://www.tiktok.com/@mohamyplus' },
    { id: 'whatsapp', label: 'WhatsApp', href: 'https://wa.me/201080509733' },
  ],
  // Optional sections paused at the client's request (see src/sections/paused.mjs).
  // Turn on only once real, client-approved content has been added.
  showClientLogos: false,
  showTestimonials: false,
};
