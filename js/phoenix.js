/* Phoenix (فينيكس) — Mohamy Plus site assistant. Loaded on demand by site.js.
   Rule-based and private: it only repeats approved content from PHOENIX_DATA,
   and requests are handed to WhatsApp for the visitor to review and send. */
(() => {
  'use strict';
  const D = window.PHOENIX_DATA;
  const root = document.querySelector('[data-phoenix]');
  if (!D || !root || window.Phoenix) return;

  const doc = document.documentElement;
  const isAr = D.ui.lang === 'ar';
  const launcher = root.querySelector('.phx-launcher');
  const KEY = 'mohamy-plus-phoenix';
  const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mobile = () => window.matchMedia('(max-width: 640px)').matches;
  const store = {
    get() { try { return JSON.parse(sessionStorage.getItem(KEY)); } catch (e) { return null; } },
    set(v) { try { sessionStorage.setItem(KEY, JSON.stringify(v)); } catch (e) { /* storage unavailable */ } },
  };

  /* ---------------- Text helpers ---------------- */
  const norm = (s) => String(s || '').toLowerCase()
    .replace(/[ً-ْٰـ]/g, '')
    .replace(/[أإآٱ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي').replace(/ؤ/g, 'و').replace(/ئ/g, 'ي')
    .replace(/[’'`]/g, '')
    .replace(/[^\p{L}\p{N}&\s]/gu, ' ')
    .replace(/\s+/g, ' ').trim();
  const escapeHtml = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const rich = (s) => escapeHtml(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
  const latin = /^[a-z0-9&\s]+$/;
  const reEsc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const matchScore = (text, kws) => {
    let score = 0;
    for (const k of kws) {
      if (!k) continue;
      const hit = latin.test(k) ? new RegExp('(^|\\s)' + reEsc(k)).test(text) : text.includes(k);
      if (hit) score += k.length;
    }
    return score;
  };

  const intents = D.intents.map((it) => ({ ...it, kws: (it.kw || []).map(norm) }));
  const byId = Object.fromEntries(intents.map((it) => [it.id, it]));
  const adviceKws = D.adviceTriggers.map(norm);
  const navVerbs = ['go to', 'take me', 'open', 'show', 'navigate', 'visit', 'bring me', 'افتح', 'وديني', 'روح', 'اعرض', 'خدني', 'انتقل', 'اذهب', 'ودني', 'عايز اشوف', 'اريد ان ارى'].map(norm);
  const cancelKws = D.booking.cancelWords.map(norm);
  const skipKws = D.booking.skipWords.map(norm);
  const PHONE_RE = /^[0-9+()\-\s]{7,20}$/;
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function classify(raw) {
    const text = norm(raw);
    const nav = navVerbs.some((v) => (latin.test(v) ? new RegExp('(^|\\s)' + reEsc(v)).test(text) : text.includes(v)));
    let best = null, bestScore = 0, area = null, areaScore = 0;
    for (const it of intents) {
      if (it.needsNavVerb && !nav) continue;
      const s = matchScore(text, it.kws) * (it.weight || 1);
      if (it.area && s > areaScore) { area = it; areaScore = s; }
      if (s > bestScore) { best = it; bestScore = s; }
    }
    return { best, area, advice: matchScore(text, adviceKws) > 0 };
  }
  const categoryFor = (areaIntent) => {
    const b = areaIntent && areaIntent.buttons.find((x) => x.action.startsWith('book:'));
    return b ? b.action.slice(5) : null;
  };

  /* ---------------- DOM ---------------- */
  const markSvg = (suffix) => launcher.querySelector('.phx-mark').innerHTML.replace(/phx-(fire|wing)/g, `phx-$1-${suffix}`);
  const panel = document.createElement('section');
  panel.className = 'phx-panel';
  panel.id = 'phx-panel';
  panel.hidden = true;
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-labelledby', 'phx-title');
  panel.innerHTML = `
    <canvas class="phx-embers" aria-hidden="true"></canvas>
    <div class="phx-head">
      <span class="phx-avatar" aria-hidden="true"><span class="phx-avatar__halo"></span>${markSvg('a')}</span>
      <div class="phx-head__text">
        <h2 class="phx-title" id="phx-title">${escapeHtml(D.ui.name)}</h2>
        <p class="phx-status"><span class="phx-status__dot"></span>${escapeHtml(D.ui.status)}</p>
      </div>
      <button class="phx-icon-btn" type="button" data-phx="restart" aria-label="${escapeHtml(D.ui.restart)}" title="${escapeHtml(D.ui.restart)}">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12a8 8 0 1 0 2.34-5.66M4 4v4h4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <button class="phx-icon-btn" type="button" data-phx="close" aria-label="${escapeHtml(D.ui.close)}" title="${escapeHtml(D.ui.close)}">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
      </button>
    </div>
    <div class="phx-log" role="log" aria-live="polite" aria-relevant="additions"></div>
    <form class="phx-compose" novalidate>
      <label class="visually-hidden" for="phx-input">${escapeHtml(D.ui.placeholder)}</label>
      <input id="phx-input" class="phx-input" type="text" autocomplete="off" enterkeyhint="send" maxlength="600" placeholder="${escapeHtml(D.ui.placeholder)}">
      <button class="phx-send" type="submit" aria-label="${escapeHtml(D.ui.send)}">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
    </form>
    <p class="phx-note">${escapeHtml(D.ui.disclaimer)}</p>`;
  root.appendChild(panel);
  const log = panel.querySelector('.phx-log');
  const form = panel.querySelector('.phx-compose');
  const input = panel.querySelector('.phx-input');

  /* ---------------- State ---------------- */
  let state = store.get();
  if (!state || state.lang !== D.ui.lang) state = { lang: D.ui.lang, open: false, log: [], flow: null };
  let queue = Promise.resolve();
  const save = () => store.set(state);

  /* ---------------- Rendering ---------------- */
  function buttonsHtml(buttons) {
    if (!buttons || !buttons.length) return '';
    return `<div class="phx-chips">${buttons.map((b) => `<button type="button" class="phx-chip${b.primary ? ' phx-chip--primary' : ''}" data-action="${escapeHtml(b.action)}">${escapeHtml(b.label)}</button>`).join('')}</div>`;
  }
  function render(entry, animate) {
    const el = document.createElement('div');
    el.className = `phx-msg phx-msg--${entry.who}${animate ? ' phx-msg--in' : ''}`;
    if (entry.card) {
      el.innerHTML = `<div class="phx-bubble"><p>${rich(entry.text)}</p><dl class="phx-card">${entry.card.map(([k, v]) => `<div><dt>${escapeHtml(k)}</dt><dd${/^[+\d\s()-]+$|@/.test(v) ? ' dir="ltr"' : ''}>${escapeHtml(v)}</dd></div>`).join('')}</dl></div>${buttonsHtml(entry.buttons)}`;
    } else {
      el.innerHTML = `<div class="phx-bubble">${entry.who === 'user' ? escapeHtml(entry.text) : rich(entry.text)}</div>${buttonsHtml(entry.buttons)}`;
    }
    // Only the newest message keeps its quick replies.
    log.querySelectorAll('.phx-chips').forEach((c) => { if (!c.closest('.phx-msg') || c.closest('.phx-msg') !== el) c.remove(); });
    log.appendChild(el);
    log.scrollTop = log.scrollHeight;
  }
  function push(entry, animate = true) {
    state.log.push(entry);
    if (state.log.length > 60) state.log = state.log.slice(-60);
    save();
    render(entry, animate);
  }
  function user(text) { push({ who: 'user', text }); }
  function bot(text, buttons, extra = {}) {
    queue = queue.then(() => new Promise((resolve) => {
      const delay = reduced() ? 0 : Math.min(1100, 380 + text.length * 4);
      if (!delay) { push({ who: 'bot', text, buttons, ...extra }); resolve(); return; }
      const typing = document.createElement('div');
      typing.className = 'phx-msg phx-msg--bot phx-typing';
      typing.setAttribute('aria-label', D.ui.typing);
      typing.innerHTML = '<div class="phx-bubble"><span class="phx-flame"></span><span class="phx-flame"></span><span class="phx-flame"></span></div>';
      log.appendChild(typing);
      log.scrollTop = log.scrollHeight;
      setTimeout(() => { typing.remove(); push({ who: 'bot', text, buttons, ...extra }); resolve(); }, delay);
    }));
    return queue;
  }
  const setPlaceholder = (flowInput) => { input.placeholder = flowInput ? D.ui.placeholderInput : D.ui.placeholder; };

  /* ---------------- Navigation ---------------- */
  const currentFile = () => (location.pathname.split('/').pop() || 'index.html');
  function go(target) {
    const [key, hash] = target.split('#');
    const file = D.pages[key];
    if (!file) return;
    if (file === currentFile()) {
      const el = hash && document.getElementById(hash);
      if (el) { el.scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth', block: 'start' }); history.replaceState(null, '', '#' + hash); }
      else window.scrollTo({ top: 0, behavior: reduced() ? 'auto' : 'smooth' });
      if (mobile()) setOpen(false);
      return;
    }
    state.open = !mobile();
    save();
    location.href = file + (hash ? '#' + hash : '');
  }

  /* ---------------- WhatsApp ---------------- */
  const waUrl = (text) => `https://wa.me/${D.wa}${text ? '?text=' + encodeURIComponent(text) : ''}`;
  const openWa = (text) => { const url = waUrl(text); window.open(url, '_blank', 'noopener'); return url; };
  const lastQuestion = () => { const q = [...state.log].reverse().find((e) => e.who === 'user'); return q ? q.text : ''; };

  /* ---------------- Booking flow ---------------- */
  const steps = D.booking.steps;
  function startBooking(preset = {}) {
    state.flow = { i: 0, data: { ...preset } };
    save();
    let intro = D.booking.start;
    if (preset.category) {
      const opt = steps[0].options.find((o) => o.value === preset.category);
      if (opt) intro = D.booking.preselected.replace('{area}', opt.label) + intro;
    }
    bot(intro);
    ask();
  }
  function ask() {
    const f = state.flow;
    while (f.i < steps.length && f.data[steps[f.i].key] !== undefined) f.i += 1;
    if (f.i >= steps.length) { review(); return; }
    const step = steps[f.i];
    const buttons = (step.options || []).map((o) => ({ label: o.label, action: 'opt:' + o.value }));
    if (step.optional) buttons.push({ label: D.booking.skip, action: 'skip' });
    if (f.i > 0) buttons.push({ label: D.booking.back, action: 'back' });
    setPlaceholder(true);
    save();
    bot(step.ask, buttons);
  }
  function answer(raw, { fromChip = false, value } = {}) {
    const f = state.flow;
    const step = steps[f.i];
    const text = String(raw || '').trim();
    if (!fromChip && cancelKws.some((k) => norm(text) === k || norm(text).startsWith(k + ' '))) { cancelBooking(); return; }
    let result;
    if (value !== undefined) result = value;
    else if (step.options) {
      const n = norm(text);
      const opt = step.options.find((o) => norm(o.label) === n || norm(o.value) === n)
        || step.options.find((o) => n && (norm(o.label).includes(n) || n.includes(norm(o.label))));
      if (opt) result = opt.value;
      else if (step.free && text && !answeredAside(text)) result = text.slice(0, 80);
      else { if (!step.free) answeredAside(text); ask(); return; }
    } else if (step.input === 'contact') {
      // Accept Arabic-Indic (٠-٩) and Persian (۰-۹) digits, which many visitors type.
      const latinDigits = text.replace(/[٠-٩]/g, (c) => '٠١٢٣٤٥٦٧٨٩'.indexOf(c)).replace(/[۰-۹]/g, (c) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(c));
      if (!PHONE_RE.test(latinDigits) && !EMAIL_RE.test(latinDigits)) { bot(step.error); return; }
      result = latinDigits;
    } else {
      if (step.optional && (!text || skipKws.includes(norm(text)))) result = '';
      else if (!text) { bot(step.error || step.ask); return; }
      else result = text.slice(0, step.max || 600);
    }
    f.data[step.key] = result;
    f.i += 1;
    save();
    ask();
  }
  // A question asked in the middle of booking ("how much?") is answered, then the step is repeated.
  function answeredAside(text) {
    const { best } = classify(text);
    if (!best || best.action === 'book' || best.area || best.nav || !best.reply || ['greet', 'thanks', 'menu', 'unsure'].includes(best.id)) return false;
    bot(best.reply);
    return true;
  }
  function labelFor(key, value) {
    const step = steps.find((s) => s.key === key);
    const opt = step && step.options && step.options.find((o) => o.value === value);
    return opt ? opt.label : value;
  }
  function review() {
    const d = state.flow.data;
    const rows = steps.map((s) => [D.booking.labels[s.key], d[s.key] ? labelFor(s.key, d[s.key]) : D.booking.none]);
    setPlaceholder(false);
    bot(D.booking.review, [
      { label: D.booking.sendWa, action: 'send-wa', primary: true },
      { label: D.booking.edit, action: 'restart-flow' },
      { label: D.booking.cancel, action: 'cancel-flow' },
    ], { card: rows });
  }
  function sendBooking() {
    const d = state.flow.data;
    const lines = [D.booking.msgTitle, ...steps.map((s) => `${D.booking.labels[s.key]}: ${d[s.key] ? labelFor(s.key, d[s.key]) : D.booking.none}`)];
    const url = openWa(lines.join('\n'));
    state.flow = null;
    save();
    bot(D.booking.sent, [{ label: D.booking.reopen, action: 'url:' + url, primary: true }, ...D.ui.menu.slice(2, 4)]);
  }
  function cancelBooking() {
    state.flow = null;
    setPlaceholder(false);
    save();
    bot(D.booking.cancelled, D.ui.menu);
  }

  /* ---------------- Intents ---------------- */
  function respond(it) {
    if (it.action === 'book') { startBooking(); return; }
    bot(it.reply, it.buttons);
    if (it.nav) setTimeout(() => go(it.nav), reduced() ? 300 : 1400);
  }
  function handleText(raw) {
    const text = raw.trim();
    if (!text) return;
    user(text);
    if (state.flow) { answer(text); return; }
    const { best, area, advice } = classify(text);
    if (advice) {
      const buttons = [{ label: D.ui.menu[1].label, action: area ? `book:${categoryFor(area)}` : 'book', primary: true }];
      if (area) buttons.push(...area.buttons.slice(1, 2));
      buttons.push({ label: D.ui.askTeam, action: 'ask-team' });
      bot(D.ui.advice, buttons);
      return;
    }
    if (best && best.action === 'book') {
      const cat = categoryFor(area);
      startBooking(cat ? { category: cat } : {});
      return;
    }
    if (best) { respond(best); return; }
    bot(D.ui.fallback, [...D.ui.menu.slice(0, 4), { label: D.ui.askTeam, action: 'ask-team' }]);
  }

  function runAction(action, label) {
    if (action.startsWith('opt:')) { user(label); answer(label, { fromChip: true, value: action.slice(4) }); return; }
    if (action === 'skip') { user(label); answer('', { fromChip: true, value: '' }); return; }
    if (action === 'back') {
      user(label);
      const f = state.flow;
      f.i = Math.max(0, f.i - 1);
      delete f.data[steps[f.i].key];
      save();
      ask();
      return;
    }
    if (action === 'send-wa') { user(label); sendBooking(); return; }
    if (action === 'restart-flow') { user(label); startBooking(); return; }
    if (action === 'cancel-flow') { user(label); cancelBooking(); return; }
    if (action.startsWith('url:')) { window.open(action.slice(4), '_blank', 'noopener'); return; }
    if (action === 'wa') { openWa(''); return; }
    if (action === 'tel') { location.href = 'tel:' + D.phone; return; }
    if (action === 'mail') { location.href = 'mailto:' + D.email; return; }
    if (action === 'ask-team') { const q = lastQuestion(); openWa(q ? `${D.ui.waQuestion}\n${q}` : ''); return; }
    user(label);
    if (action === 'menu') { bot(byId.menu.reply, D.ui.menu); return; }
    if (action === 'book') { startBooking(); return; }
    if (action.startsWith('book:')) {
      const v = action.slice(5);
      startBooking(v === 'urgent' ? { priority: 'Time-sensitive' } : { category: v });
      return;
    }
    if (action.startsWith('intent:')) { const it = byId[action.slice(7)]; if (it) respond(it); return; }
    if (action.startsWith('nav:')) { bot(D.ui.navigating); setTimeout(() => go(action.slice(4)), reduced() ? 150 : 700); }
  }

  /* ---------------- Open / close ---------------- */
  let embers = null;
  function setOpen(open, { focus = true } = {}) {
    state.open = open;
    save();
    panel.hidden = !open;
    root.classList.toggle('is-open', open);
    launcher.setAttribute('aria-expanded', String(open));
    launcher.setAttribute('aria-label', open ? D.ui.close : D.ui.open);
    document.body.classList.toggle('phx-lock', open && mobile());
    if (open) {
      if (!state.log.length) bot(D.ui.welcome, D.ui.menu);
      log.scrollTop = log.scrollHeight;
      if (focus) requestAnimationFrame(() => input.focus({ preventScroll: true }));
      if (embers) embers.start();
    } else {
      if (embers) embers.stop();
      if (focus) launcher.focus({ preventScroll: true });
    }
  }
  function restart() {
    state = { lang: D.ui.lang, open: true, log: [], flow: null };
    save();
    log.innerHTML = '';
    queue = Promise.resolve();
    setPlaceholder(false);
    bot(D.ui.welcome, D.ui.menu);
    input.focus({ preventScroll: true });
  }

  /* ---------------- Embers (decorative) ---------------- */
  function makeEmbers(canvas) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    let w = 0, h = 0, raf = 0, running = false;
    const parts = [];
    const size = () => {
      const r = canvas.getBoundingClientRect(), ratio = Math.min(devicePixelRatio || 1, 2);
      w = r.width; h = r.height; canvas.width = w * ratio; canvas.height = h * ratio; ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    const spawn = (any) => ({ x: Math.random() * w, y: any ? Math.random() * h : h + 6, r: Math.random() * 1.6 + .4, vy: -(Math.random() * .35 + .12), vx: (Math.random() - .5) * .15, life: Math.random() * .5 + .3, hue: Math.random() < .3 ? '208,122,53' : '226,196,132' });
    const frame = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < parts.length; i += 1) {
        const p = parts[i];
        p.x += p.vx + Math.sin((p.y + i) / 40) * .08; p.y += p.vy;
        if (p.y < -6) parts[i] = spawn(false);
        const fade = Math.min(1, p.y / h) * p.life;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.hue},${fade})`; ctx.shadowColor = `rgba(${p.hue},.8)`; ctx.shadowBlur = 6; ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    };
    return {
      start() { if (running || reduced()) return; size(); if (!parts.length) for (let i = 0; i < 26; i += 1) parts.push(spawn(true)); running = true; raf = requestAnimationFrame(frame); },
      stop() { running = false; cancelAnimationFrame(raf); },
    };
  }
  embers = makeEmbers(panel.querySelector('.phx-embers'));

  /* ---------------- Events ---------------- */
  launcher.addEventListener('click', () => setOpen(panel.hidden));
  panel.addEventListener('click', (e) => {
    const chip = e.target.closest('[data-action]');
    if (chip) { runAction(chip.dataset.action, chip.textContent.trim()); return; }
    const ctl = e.target.closest('[data-phx]');
    if (ctl && ctl.dataset.phx === 'close') setOpen(false);
    if (ctl && ctl.dataset.phx === 'restart') restart();
  });
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const v = input.value;
    input.value = '';
    handleText(v);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !panel.hidden && (panel.contains(document.activeElement) || mobile())) setOpen(false);
  });
  window.addEventListener('resize', () => document.body.classList.toggle('phx-lock', !panel.hidden && mobile()), { passive: true });

  /* ---------------- Restore ---------------- */
  state.log.forEach((entry) => render(entry, false));
  setPlaceholder(!!(state.flow && steps[state.flow.i] && steps[state.flow.i].input));

  window.Phoenix = { open: () => setOpen(true), close: () => setOpen(false), isOpen: () => !panel.hidden, ask: (t) => handleText(t) };
  root.classList.add('is-ready');
  if (state.open) setOpen(true, { focus: false });
})();
