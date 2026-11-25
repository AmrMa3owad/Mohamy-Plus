// ─────────────────────────────────────────────────────────────────────────────
// Site-wide settings. Edit here, then run:  node src/build.mjs
// ─────────────────────────────────────────────────────────────────────────────

export const site = {
  // Production origin WITHOUT a trailing slash, e.g. "https://mohamyplus.com".
  // When set, the build adds canonical URLs, hreflang alternates, absolute
  // Open Graph URLs and a sitemap.xml. Leave empty until the domain is final.
  url: 'https://amrma3owad.github.io/Mohamy-Plus',

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
  // Mohamy Plus CRM: every consultation and contact request is also saved as a
  // new lead there, so none is lost if the visitor never presses Send in WhatsApp.
  // Paste the private link from the CRM (Settings -> Website leads), then rebuild.
  // Leave empty to only open WhatsApp, as before.
  crm: {
    intakeUrl: 'https://script.google.com/macros/s/AKfycby0Y5CqvZEQBPyi2vHvhmWiPF-SN3D4aHJ9WUxWRXHOOPbDswyn6UR1HWd8Rj94aI0eKw/exec?key=f173160c81084ef0acbc0bc002e7d7c89019c1291dc04287a0369535c1aaf416',
  },
  // Optional sections paused at the client's request (see src/sections/paused.mjs).
  // Turn on only once real, client-approved content has been added.
  showClientLogos: false,
  showTestimonials: false,
};
