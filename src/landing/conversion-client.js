import {conversionOffer as offer} from './conversion-content.js';

const arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>';
const phoneValid = value => /^\+?[\d\s()\-]+$/.test(value.trim()) && value.replace(/\D/g, '').length >= 7 && value.replace(/\D/g, '').length <= 15;
const packageIds = offer.packages.map(pack => pack.id);

export function initConversion(config = {}) {
  const form = document.querySelector('#callback-form');
  if (!form) return;
  const menu = document.querySelector('.et-menu');
  const nav = document.querySelector('#et-nav');
  const closeMenu = () => {menu.setAttribute('aria-expanded', 'false'); nav.classList.remove('is-open');};
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('click', event => {if (!event.target.closest('.et-header')) closeMenu();});
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {closeMenu(); menu.focus();}
  });

  let selectedPackage = '';
  let selectedWeekends = [];
  let lastFingerprint = '';
  let requestId = '';
  let ready = false;
  let sending = false;
  let completed = false;
  const summary = form.querySelector('.et-selection');
  const summaryText = form.querySelector('#et-selection-text');
  const submit = form.querySelector('.et-submit');
  const status = form.querySelector('#et-form-status');
  const availability = form.querySelector('#et-form-availability');
  const name = form.elements.namedItem('name');
  const phone = form.elements.namedItem('phone');
  const consent = form.elements.namedItem('consent');

  function renderSelection() {
    const pack = offer.packages.find(item => item.id === selectedPackage);
    const weekends = selectedWeekends.map(index => offer.weekends[index].label);
    summary.hidden = !pack;
    summaryText.textContent = pack ? [pack.name, ...weekends].join(' · ') : '';
    document.querySelectorAll('[data-et-package]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.etPackage === selectedPackage)));
    document.querySelectorAll('[data-et-weekend]').forEach(button => button.setAttribute('aria-pressed', String(selectedWeekends.includes(Number(button.dataset.etWeekend)))));
  }
  function select(pack, weekends = []) {
    selectedPackage = pack;
    selectedWeekends = weekends;
    renderSelection();
    document.querySelector('#kapcsolat').scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start'});
    // After an already completed request, selection controls still bring the
    // confirmed result into view; they do not silently create another lead.
    if (!completed) name.focus({preventScroll: true});
  }
  document.querySelectorAll('[data-et-package]').forEach(button => button.addEventListener('click', () => {
    const id = button.dataset.etPackage;
    select(id, ['series', 'plus'].includes(id) ? [0, 1, 2] : []);
  }));
  document.querySelectorAll('[data-et-weekend]').forEach(button => button.addEventListener('click', () => select('one', [Number(button.dataset.etWeekend)])));
  form.querySelector('#et-clear-selection').addEventListener('click', () => {selectedPackage = ''; selectedWeekends = []; renderSelection(); name.focus();});
  const initialPackage = new URL(location.href).searchParams.get('pack');
  if (packageIds.includes(initialPackage)) {selectedPackage = initialPackage; selectedWeekends = ['series', 'plus'].includes(initialPackage) ? [0, 1, 2] : []; renderSelection();}

  const sticky = document.querySelector('.et-mobile-call');
  if (sticky && 'IntersectionObserver' in window) {
    let heroVisible = true;
    let formVisible = false;
    const updateSticky = () => {sticky.hidden = heroVisible || formVisible;};
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.target.classList.contains('et-hero')) heroVisible = entry.isIntersecting;
        if (entry.target.id === 'kapcsolat') formVisible = entry.isIntersecting;
      });
      updateSticky();
    }, {threshold: 0});
    observer.observe(document.querySelector('.et-hero'));
    observer.observe(document.querySelector('#kapcsolat'));
  }

  function showError(message) {
    status.textContent = message;
    status.classList.add('is-error');
    status.focus({preventScroll: true});
  }
  function inactive() {
    ready = false;
    submit.disabled = true;
    submit.innerHTML = `Kérem a visszahívást ${arrow}`;
    availability.hidden = false;
    form.removeAttribute('aria-busy');
  }

  let endpoint;
  try {
    endpoint = new URL(config.callbackEndpoint || '/eletutak-talalkozasa/api/callback', location.origin);
    if (endpoint.origin !== location.origin || !['http:', 'https:'].includes(endpoint.protocol)) throw new Error('Invalid callback endpoint');
  } catch {inactive(); return;}

  async function checkAvailability() {
    if (config.callbackEnabled !== true) {inactive(); return;}
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    submit.disabled = true;
    availability.hidden = true;
    submit.textContent = 'Kapcsolat ellenőrzése…';
    try {
      const response = await fetch(endpoint, {method: 'GET', cache: 'no-store', credentials: 'same-origin', signal: controller.signal, headers: {Accept: 'application/json'}});
      const result = response.ok ? await response.json() : null;
      ready = result?.enabled === true;
      if (!ready) {inactive(); return;}
      submit.disabled = false;
      submit.innerHTML = `Kérem a visszahívást ${arrow}`;
      availability.hidden = true;
    } catch {inactive();}
    finally {clearTimeout(timeout);}
  }
  checkAvailability();

  form.addEventListener('input', event => {
    if (event.target.hasAttribute('aria-invalid')) event.target.removeAttribute('aria-invalid');
    if (status.classList.contains('is-error')) {status.textContent = ''; status.classList.remove('is-error');}
  });
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (sending || completed) return;
    status.textContent = '';
    status.classList.remove('is-error');
    form.querySelectorAll('[aria-invalid]').forEach(field => field.removeAttribute('aria-invalid'));
    const invalid = [];
    if (!name.value.trim()) invalid.push(name);
    if (!phoneValid(phone.value)) invalid.push(phone);
    if (!consent.checked) invalid.push(consent);
    if (invalid.length) {
      invalid.forEach(field => field.setAttribute('aria-invalid', 'true'));
      status.textContent = 'Kérlek, add meg a neved, egy elérhető telefonszámot, és jelöld az adatkezelési hozzájárulást.';
      status.classList.add('is-error');
      invalid[0].focus();
      return;
    }
    if (!ready) {
      showError('Az online visszahíváskérés még nem aktív. Kérlek, hívj telefonon vagy írj e-mailt a megadott elérhetőségen.');
      return;
    }
    const values = {
      name: name.value.trim(), phone: phone.value.trim(), reason: form.elements.namedItem('reason').value.trim(),
      consent: true, package: selectedPackage, weekends: selectedWeekends,
      website: form.elements.namedItem('website').value.trim(),
    };
    const fingerprint = JSON.stringify(values);
    if (!requestId || fingerprint !== lastFingerprint) {requestId = crypto.randomUUID(); lastFingerprint = fingerprint;}
    const payload = {...values, requestId};
    sending = true;
    form.setAttribute('aria-busy', 'true');
    const controls = [...form.querySelectorAll('input, textarea, button')];
    controls.forEach(control => {control.disabled = true;});
    submit.textContent = 'Visszahíváskérés küldése…';
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch(endpoint, {
        method: 'POST', credentials: 'same-origin', cache: 'no-store', signal: controller.signal,
        headers: {'Content-Type': 'application/json', Accept: 'application/json'}, body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok || result?.ok !== true || result.requestId !== requestId) throw new Error('Callback not confirmed');
      completed = true;
      form.reset();
      selectedPackage = ''; selectedWeekends = []; renderSelection();
      form.dataset.state = 'success';
      status.innerHTML = '<span class="et-success-mark" aria-hidden="true">✓</span><strong>Megérkezett a visszahíváskérésed.</strong><span>Köszönöm a bizalmad. Hétköznap 9–19 között érkező kérésedre egy órán belül visszahívlak. Máskor a következő hétköznap 9–19 között kereslek.</span><span class="et-small">A kérés nem foglalás, és nem jár fizetési kötelezettséggel.</span>';
      status.focus({preventScroll: true});
      status.scrollIntoView({block: 'center', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
      window.dispatchEvent(new CustomEvent('sarkadi:callback-confirmed', {detail: {requestId}}));
    } catch {
      showError('A kérés rögzítését most nem tudtuk visszaigazolni. Az adataid itt maradtak: próbáld újra, vagy keress a +36 70 316 1897 számon.');
    } finally {
      clearTimeout(timeout);
      sending = false;
      form.removeAttribute('aria-busy');
      controls.forEach(control => {control.disabled = false;});
      submit.disabled = completed || !ready;
      submit.innerHTML = `${completed ? 'Kérésed megérkezett' : 'Kérem a visszahívást'} ${arrow}`;
    }
  });
}
