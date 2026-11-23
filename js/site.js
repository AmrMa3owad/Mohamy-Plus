/* Mohamy Plus — site.js (no dependencies) */
(() => {
  'use strict';

  const doc = document.documentElement;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const reducedMotion = () => motionQuery.matches;
  const store = {
    get(key) { try { return localStorage.getItem(key); } catch (e) { return null; } },
    set(key, value) { try { localStorage.setItem(key, value); } catch (e) { /* storage unavailable */ } },
  };
  const THEME_KEY = 'mohamy-plus-theme';
  const LANG_KEY = 'mohamy-plus-language';
  const isAr = doc.lang === 'ar';
  const format = (template, values) => template.replace(/\{(\w+)\}/g, (_, k) => (k in values ? values[k] : ''));

  /* ---------- Theme ---------- */
  function initTheme() {
    const toggle = $('[data-theme-toggle]');
    const system = window.matchMedia('(prefers-color-scheme: light)');
    const label = (theme) => (theme === 'light'
      ? (isAr ? 'التبديل إلى المظهر الداكن' : 'Switch to dark theme')
      : (isAr ? 'التبديل إلى المظهر الفاتح' : 'Switch to light theme'));
    const apply = (theme, persist) => {
      doc.setAttribute('data-theme', theme);
      if (persist) store.set(THEME_KEY, theme);
      if (toggle) { toggle.setAttribute('aria-label', label(theme)); toggle.setAttribute('title', label(theme)); }
      document.dispatchEvent(new CustomEvent('themechange', { detail: theme }));
    };
    apply(doc.getAttribute('data-theme') || 'dark', false);
    if (toggle) toggle.addEventListener('click', () => apply(doc.getAttribute('data-theme') === 'light' ? 'dark' : 'light', true));
    system.addEventListener('change', (e) => { if (!store.get(THEME_KEY)) apply(e.matches ? 'light' : 'dark', false); });
  }

  /* ---------- Language memory ---------- */
  function initLanguage() {
    $$('[data-lang-switch]').forEach((link) => {
      link.addEventListener('click', () => {
        store.set(LANG_KEY, link.getAttribute('data-lang-switch'));
        if (location.hash) link.href = link.href.split('#')[0] + location.hash;
      });
    });
  }

  /* ---------- Header: mobile menu + scroll behaviour ---------- */
  function initHeader() {
    const header = $('#site-header');
    const nav = $('#primary-nav');
    const toggle = $('[data-menu-toggle]');
    if (!header || !nav || !toggle) return;
    const mobile = window.matchMedia('(max-width: 991.98px)');

    const setOpen = (open, { focus = true } = {}) => {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.querySelector('.visually-hidden').textContent = open ? (isAr ? 'إغلاق القائمة' : 'Close menu') : (isAr ? 'القائمة' : 'Menu');
      if (open) nav.setAttribute('data-open', ''); else nav.removeAttribute('data-open');
      document.body.classList.toggle('menu-open', open);
      if (open && focus) { const first = $('a', nav); if (first) first.focus(); }
      if (!open && focus) toggle.focus();
    };
    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.hasAttribute('data-open')) setOpen(false);
      // Keep focus inside the open menu.
      if (e.key === 'Tab' && nav.hasAttribute('data-open') && mobile.matches) {
        const items = [toggle, ...$$('a, button', nav)];
        const first = items[0], last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    $$('a', nav).forEach((a) => a.addEventListener('click', () => { if (mobile.matches) setOpen(false, { focus: false }); }));
    mobile.addEventListener('change', (e) => { if (!e.matches) setOpen(false, { focus: false }); });

    let lastY = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      const y = window.scrollY;
      header.classList.toggle('is-scrolled', y > 8);
      const hide = mobile.matches && y > 240 && y > lastY + 4 && !nav.hasAttribute('data-open');
      if (hide) header.classList.add('is-hidden');
      else if (y < lastY - 4 || y <= 240) header.classList.remove('is-hidden');
      lastY = y;
      ticking = false;
    };
    window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
    header.addEventListener('focusin', () => header.classList.remove('is-hidden'));
    onScroll();
  }

  /* ---------- Reveal on scroll ---------- */
  function initReveal() {
    const items = $$('.reveal');
    if (!('IntersectionObserver' in window) || reducedMotion()) { items.forEach((el) => el.classList.add('is-visible')); return; }
    // Elements that start fully clipped (the scan-reveal photos) never "intersect" in Chrome,
    // because IntersectionObserver honours the target's own clip-path. Observe their
    // (unclipped) parent instead and reveal the child.
    const targets = new Map();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        (targets.get(entry.target) || [entry.target]).forEach((el) => el.classList.add('is-visible'));
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach((el) => {
      const watch = el.classList.contains('scan-media') ? el.parentElement : el;
      if (watch !== el) targets.set(watch, [...(targets.get(watch) || []), el]);
      io.observe(watch);
    });
    // Elements targeted by a hash link should be visible immediately.
    if (location.hash) { const t = document.getElementById(decodeURIComponent(location.hash.slice(1))); if (t) $$('.reveal', t).concat(t.closest('.reveal') || []).forEach((el) => el.classList.add('is-visible')); }
  }

  /* ---------- Shared form helpers ---------- */
  const PHONE_RE = /^[0-9+()\-\s]{7,20}$/;
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  function setError(input, message) {
    const err = input && document.getElementById(input.getAttribute('aria-describedby')?.split(' ').find((id) => id.endsWith('-error')) || '');
    if (!input) return;
    if (message) input.setAttribute('aria-invalid', 'true'); else input.removeAttribute('aria-invalid');
    if (err) err.textContent = message || '';
  }
  function openWhatsApp(number, lines) {
    const url = `https://wa.me/${number}?text=${encodeURIComponent(lines.join('\n'))}`;
    window.open(url, '_blank', 'noopener');
    return url;
  }
  function initCounters() {
    $$('[data-count-for]').forEach((out) => {
      const field = document.getElementById(out.getAttribute('data-count-for'));
      if (!field) return;
      const update = () => { out.textContent = format(out.getAttribute('data-template'), { n: field.value.length.toLocaleString(isAr ? 'ar-EG' : 'en-US') }); };
      field.addEventListener('input', update);
      update();
    });
  }

  /* ---------- Consultation intake wizard ---------- */
  function initIntake() {
    const form = $('[data-intake]');
    if (!form) return;
    const d = form.dataset;
    const steps = $$('[data-step]', form);
    const tabs = $$('[data-tab]', form);
    const success = $('[data-success]', form);
    const status = $('[data-status]', form);
    const badge = $('[data-priority-badge]', form);
    const field = (name) => form.elements[name];
    let current = 0;

    const show = (index, { focus = true } = {}) => {
      current = index;
      steps.forEach((step, i) => { step.hidden = i !== index; });
      tabs.forEach((tab, i) => {
        if (i === index) tab.setAttribute('aria-current', 'step'); else tab.removeAttribute('aria-current');
        tab.classList.toggle('is-done', i < index);
      });
      if (success) success.hidden = true;
      if (status) status.textContent = format(d.stepLabel, { n: index + 1 });
      if (focus) {
        const heading = $('.step-bar__tag', steps[index]);
        if (heading) heading.focus({ preventScroll: true });
        const top = form.getBoundingClientRect().top;
        if (top < 80 || top > window.innerHeight * 0.6) form.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'start' });
      }
    };

    $$('[data-next]', form).forEach((btn) => btn.addEventListener('click', () => show(Math.min(current + 1, steps.length - 1))));
    $$('[data-prev]', form).forEach((btn) => btn.addEventListener('click', () => show(Math.max(current - 1, 0))));
    $$('input[name="priority"]', form).forEach((radio) => radio.addEventListener('change', () => { if (badge) badge.textContent = radio.dataset.badge; }));

    const validate = () => {
      const name = field('name'), phone = field('phone'), email = field('email');
      [name, phone, email].forEach((el) => setError(el, ''));
      const phoneVal = phone.value.trim(), emailVal = email.value.trim();
      let firstInvalid = null;
      const fail = (el, msg) => { setError(el, msg); if (!firstInvalid) firstInvalid = el; };
      if (!name.value.trim()) fail(name, d.errName);
      if (phoneVal && !PHONE_RE.test(phoneVal)) fail(phone, d.errPhone);
      if (emailVal && !EMAIL_RE.test(emailVal)) fail(email, d.errEmail);
      if (!phoneVal && !emailVal) fail(phone, d.errContact);
      if (firstInvalid) firstInvalid.focus();
      return !firstInvalid;
    };
    ['name', 'phone', 'email'].forEach((n) => field(n).addEventListener('input', () => setError(field(n), '')));

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (current !== steps.length - 1) { show(steps.length - 1); return; }
      if (!validate()) return;
      const category = $('input[name="category"]:checked', form);
      const priority = $('input[name="priority"]:checked', form);
      const val = (n) => field(n).value.trim();
      const url = openWhatsApp(d.wa, [
        d.msgTitle,
        `${d.msgName}: ${val('name')}`,
        `${d.msgPhone}: ${val('phone') || d.msgNone}`,
        `${d.msgEmail}: ${val('email') || d.msgNone}`,
        `${d.msgArea}: ${category ? category.value : d.msgNone}`,
        `${d.msgPriority}: ${priority ? priority.dataset.label : d.msgNone}`,
        `${d.msgSummary}: ${val('summary') || d.msgNone}`,
      ]);
      steps.forEach((s) => { s.hidden = true; });
      tabs.forEach((t) => { t.removeAttribute('aria-current'); t.classList.add('is-done'); });
      success.hidden = false;
      $('[data-wa-fallback]', success).href = url;
      const title = $('h3', success);
      title.focus({ preventScroll: true });
    });
    const restart = $('[data-restart]', form);
    if (restart) restart.addEventListener('click', () => { form.reset(); if (badge) badge.textContent = $('input[name="priority"]:checked', form).dataset.badge; initCountersFor(form); show(0); });
    show(0, { focus: false });
  }
  const initCountersFor = (root) => $$('[data-count-for]', root).forEach((out) => { const f = document.getElementById(out.dataset.countFor); if (f) f.dispatchEvent(new Event('input')); });

  /* ---------- Contact form ---------- */
  function initContact() {
    const form = $('[data-contact]');
    if (!form) return;
    const d = form.dataset;
    const f = (n) => form.elements[n];
    ['name', 'email', 'message'].forEach((n) => f(n).addEventListener('input', () => setError(f(n), '')));
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let firstInvalid = null;
      const fail = (el, msg) => { setError(el, msg); if (!firstInvalid) firstInvalid = el; };
      ['name', 'email', 'message'].forEach((n) => setError(f(n), ''));
      if (!f('name').value.trim()) fail(f('name'), d.errRequired);
      const email = f('email').value.trim();
      if (!email) fail(f('email'), d.errRequired); else if (!EMAIL_RE.test(email)) fail(f('email'), d.errEmail);
      if (!f('message').value.trim()) fail(f('message'), d.errRequired);
      if (firstInvalid) { firstInvalid.focus(); return; }
      const lines = [d.msgTitle, `${d.msgName}: ${f('name').value.trim()}`, `${d.msgEmail}: ${email}`];
      if (f('subject').value.trim()) lines.push(`${d.msgSubject}: ${f('subject').value.trim()}`);
      lines.push(`${d.msgMessage}: ${f('message').value.trim()}`);
      const url = openWhatsApp(d.wa, lines);
      const result = $('[data-result]', form);
      result.hidden = false;
      $('[data-wa-fallback]', result).href = url;
      result.setAttribute('role', 'status');
    });
  }

  /* ---------- Insights search ---------- */
  function initSearch() {
    const status = $('[data-search-status]');
    const params = new URLSearchParams(location.search);
    const q = (params.get('q') || '').trim();
    $$('input[name="q"]').forEach((input) => { input.value = q; });
    if (!status || !q) return;
    const needle = q.toLocaleLowerCase();
    let found = 0;
    $$('[data-search-item]').forEach((item) => {
      const match = item.textContent.toLocaleLowerCase().includes(needle);
      const wrap = item.closest('.reveal') || item;
      wrap.hidden = !match;
      if (match) found += 1;
    });
    status.textContent = found ? format(status.dataset.found, { n: found, q }) : format(status.dataset.none, { q });
  }

  /* ---------- Goal section particles ---------- */
  function initParticles() {
    const canvas = $('.goals__particles');
    if (!canvas || reducedMotion()) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let w = 0, h = 0, raf = 0, running = false, color = '216,195,148';
    const particles = [];
    const readColor = () => { color = doc.getAttribute('data-theme') === 'light' ? '150,112,46' : '216,195,148'; };
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width; h = rect.height;
      canvas.width = Math.round(w * ratio); canvas.height = Math.round(h * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    const spawn = (anywhere) => ({ x: Math.random() * w, y: anywhere ? Math.random() * h : h + 4, r: Math.random() * 1.3 + .5, vx: (Math.random() - .5) * .2, vy: -(Math.random() * .25 + .08), a: Math.random() * .35 + .2 });
    const frame = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy;
        if (p.y < -4 || p.x < -4 || p.x > w + 4) particles[i] = spawn(false);
        ctx.fillStyle = `rgba(${color},${p.a})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
        for (let j = i + 1; j < particles.length; j += 1) {
          const q = particles[j];
          const dist = Math.hypot(p.x - q.x, p.y - q.y);
          if (dist < 90) { ctx.strokeStyle = `rgba(${color},${.1 * (1 - dist / 90)})`; ctx.lineWidth = .6; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke(); }
        }
      }
      raf = requestAnimationFrame(frame);
    };
    const start = () => { if (!running && !document.hidden) { running = true; raf = requestAnimationFrame(frame); } };
    const stop = () => { running = false; cancelAnimationFrame(raf); };
    readColor(); resize();
    const count = Math.round(Math.min(40, Math.max(18, w / 36)));
    for (let i = 0; i < count; i += 1) particles.push(spawn(true));
    new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop())).observe(canvas);
    document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
    document.addEventListener('themechange', readColor);
    window.addEventListener('resize', resize, { passive: true });
  }

  /* ---------- Tilt (mouse only) ---------- */
  function initTilt() {
    if (reducedMotion() || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    $$('[data-tilt]').forEach((card) => {
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        const rx = ((e.clientY - r.top) / r.height - .5) * -6;
        const ry = ((e.clientX - r.left) / r.width - .5) * 6;
        card.style.transform = `perspective(1000px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-6px)`;
      });
      card.addEventListener('pointerleave', () => { card.style.transform = ''; });
    });
  }

  /* ---------- Article: TOC scrollspy, progress, share ---------- */
  function initArticle() {
    const bar = $('[data-read-progress]');
    const article = $('.prose--article');
    if (bar && article) {
      let ticking = false;
      const update = () => {
        const r = article.getBoundingClientRect();
        const total = r.height - window.innerHeight * .6;
        const p = Math.min(1, Math.max(0, -r.top / (total || 1)));
        bar.style.transform = `scaleX(${p})`;
        ticking = false;
      };
      window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
      update();
    }
    const links = $$('[data-toc-link]');
    if (links.length && 'IntersectionObserver' in window) {
      const map = new Map(links.map((a) => [a.getAttribute('href').slice(1), a]));
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          links.forEach((a) => a.classList.remove('is-active'));
          const link = map.get(entry.target.id);
          if (link) link.classList.add('is-active');
        });
      }, { rootMargin: '-20% 0px -70% 0px' });
      map.forEach((_, id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    }
    const pageUrl = encodeURIComponent(location.href.split('#')[0]);
    $$('[data-share]').forEach((a) => {
      const kind = a.getAttribute('data-share');
      if (kind === 'linkedin') a.href = `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`;
      if (kind === 'facebook') a.href = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
      if (kind === 'whatsapp') a.href = `${a.href.split('?')[0]}?text=${encodeURIComponent(document.title.split(' | ')[0] + ' — ' + location.href.split('#')[0])}`;
    });
    const copy = $('[data-copy-link]');
    if (copy) {
      copy.addEventListener('click', async () => {
        const out = $('.share__copied', copy);
        try { await navigator.clipboard.writeText(location.href.split('#')[0]); out.textContent = copy.dataset.copied; }
        catch (e) { window.prompt('', location.href.split('#')[0]); }
        setTimeout(() => { out.textContent = ''; }, 2000);
      });
    }
  }

  function init() {
    initTheme();
    initLanguage();
    initHeader();
    initReveal();
    initCounters();
    initIntake();
    initContact();
    initSearch();
    initParticles();
    initTilt();
    initArticle();
    $$('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
