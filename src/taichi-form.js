import {isConfigured, validEmail, validPhone, prefilledFormUrl} from './form.js';

export function budapestToday(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Budapest', year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(now);
  const value = type => parts.find(part => part.type === type).value;
  return `${value('year')}-${value('month')}-${value('day')}`;
}

function calendarDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const date = new Date(`${value}T12:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value ? date : null;
}

export function nextWednesday(today = budapestToday()) {
  const date = calendarDate(today);
  if (!date) throw new Error('Érvénytelen naptári nap.');
  date.setUTCDate(date.getUTCDate() + (3 - date.getUTCDay() + 7) % 7);
  return date.toISOString().slice(0, 10);
}

export function validClassDate(value, today = budapestToday()) {
  const date = calendarDate(value);
  return Boolean(date && value >= today && date.getUTCDay() === 3);
}

export function taiChiValues(values, today = budapestToday()) {
  if (!validClassDate(values.class_date, today)) throw new Error('Válassz egy mai vagy későbbi szerdát.');
  const date = new Intl.DateTimeFormat('hu-HU', {
    timeZone: 'UTC', year: 'numeric', month: 'long', day: 'numeric',
  }).format(calendarDate(values.class_date));
  return {
    name: values.name.trim(), email: values.email.trim(), phone: values.phone.trim(),
    program: `Tai Chi — ${date}, szerda 10:00–11:30 — Kesztyűgyár`,
    what_brought_you: `A ${date} napján tartott Tai Chi-órára szeretnék jönni.${values.note?.trim() ? `\nKérdésem: ${values.note.trim()}` : ''}`,
    call_window: 'Tai Chi-órával kapcsolatos egyeztetést kérek e-mailben vagy telefonon.',
  };
}

export function taiChiPrefilledUrl(config, values, today = budapestToday()) {
  const url = new URL(prefilledFormUrl(config, taiChiValues(values, today)));
  url.searchParams.set(config.entries.consent, 'Hozzájárulok a Tai Chi-órával kapcsolatos egyeztetéshez e-mailben vagy telefonon.');
  return url.href;
}

export function initTaiChiForm(form, config) {
  const date = form.elements.class_date;
  const status = form.querySelector('.form-status');
  const submit = form.querySelector('[type=submit]');
  date.min = budapestToday();
  date.value = nextWednesday(date.min);
  const showDate = () => {
    const chosen = calendarDate(date.value);
    form.querySelector('#class-date-summary').textContent = chosen
      ? `${new Intl.DateTimeFormat('hu-HU', {timeZone: 'UTC', month: 'long', day: 'numeric', weekday: 'long'}).format(chosen)} · 10:00–11:30`
      : 'Az órák szerdán 10:00–11:30 között vannak.';
  };
  date.addEventListener('input', showDate);
  showDate();
  form.addEventListener('submit', event => {
    event.preventDefault();
    status.textContent = '';
    status.classList.remove('error');
    form.querySelectorAll('.invalid').forEach(element => {
      element.classList.remove('invalid'); element.removeAttribute('aria-invalid');
    });
    const invalid = [...form.querySelectorAll('[required]')].filter(element => {
      if (element.type === 'checkbox') return !element.checked;
      if (!element.value.trim()) return true;
      if (element.name === 'class_date') return !validClassDate(element.value);
      if (element.name === 'email') return !validEmail(element.value);
      if (element.name === 'phone') return !validPhone(element.value);
      return false;
    });
    if (invalid.length) {
      invalid.forEach(element => { element.classList.add('invalid'); element.setAttribute('aria-invalid', 'true'); });
      status.textContent = invalid.includes(date)
        ? 'Az órák szerdán vannak. Válassz egy mai vagy későbbi szerdát.'
        : 'Kérlek, add meg a jelölt adatokat, és jelezd, hogy kéred az órával kapcsolatos egyeztetést.';
      status.classList.add('error'); invalid[0].focus(); return;
    }
    if (!isConfigured(config)) {
      status.textContent = 'Ez még előnézet: a jelzésedet nem küldtük el. Az órára telefonon vagy e-mailben is jelezhetsz.';
      status.classList.add('error'); return;
    }
    const label = submit.innerHTML;
    submit.disabled = true;
    try {
      const url = taiChiPrefilledUrl(config, Object.fromEntries(new FormData(form)));
      window.location.assign(url);
    } catch {
      status.textContent = 'Nem sikerült megnyitni az űrlapot. Az adataid itt megmaradtak; újra megpróbálhatod.';
      status.classList.add('error');
    } finally {
      submit.disabled = false; submit.innerHTML = label;
    }
  });
}
