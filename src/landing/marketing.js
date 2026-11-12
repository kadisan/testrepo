// No Meta resource is loaded until the visitor permits advertising measurement.
export const consentKey = 'sarkadi_marketing_consent_v1';
export const consentLifetime = 180 * 24 * 60 * 60 * 1000;
export function marketingChoice(storage, now = Date.now()) {
  try {
    const item = JSON.parse(storage.getItem(consentKey));
    return item?.version === 1 && ['granted', 'denied'].includes(item.choice) &&
      Number.isFinite(item.at) && item.at <= now && now - item.at < consentLifetime
      ? item.choice : null;
  } catch { return null; }
}
export const pixelConfigured = config => config?.metaPixelEnabled === true && /^\d{10,20}$/.test(config?.metaPixelId || '');

const translations = {
  hu: {title:'Hirdetési mérés',text:'A Meta Pixel segítségével mérem, hogy a Facebook- és Instagram-hirdetésekből hányan jutnak el ide. A mérés csak az engedélyeddel indul. Az űrlapot enélkül is használhatod.',accept:'Engedélyezem',deny:'Nem engedélyezem',details:'Adatkezelési részletek',settings:'Hirdetési mérés beállítása',granted:'Jelenleg engedélyezve.',denied:'Jelenleg nincs engedélyezve.'},
  en: {title:'Advertising measurement',text:'The Meta Pixel measures visits from Facebook and Instagram ads. Measurement starts only with your permission. You can use the form without it.',accept:'Allow',deny:'Do not allow',details:'Privacy details',settings:'Advertising measurement settings',granted:'Currently allowed.',denied:'Currently not allowed.'},
  de: {title:'Werbemessung',text:'Das Meta-Pixel misst Besuche über Facebook- und Instagram-Anzeigen. Die Messung beginnt erst mit deiner Einwilligung. Das Formular kannst du auch ohne sie nutzen.',accept:'Erlauben',deny:'Nicht erlauben',details:'Datenschutzhinweise',settings:'Einstellungen zur Werbemessung',granted:'Derzeit erlaubt.',denied:'Derzeit nicht erlaubt.'},
  it: {title:'Misurazione pubblicitaria',text:'Il Meta Pixel misura le visite provenienti dagli annunci Facebook e Instagram. La misurazione inizia solo con il tuo consenso. Puoi usare il modulo anche senza.',accept:'Consenti',deny:'Non consentire',details:'Informativa privacy',settings:'Impostazioni misurazione pubblicitaria',granted:'Attualmente consentita.',denied:'Attualmente non consentita.'},
};

function forgetMetaCookies() {
  const host = location.hostname;
  const parts = host.split('.');
  const domains = [null, host, ...parts.slice(0, -1).map((_, i) => '.' + parts.slice(i).join('.'))];
  for (const name of ['_fbp', '_fbc']) for (const domain of domains) {
    document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax${domain ? `; Domain=${domain}` : ''}${location.protocol === 'https:' ? '; Secure' : ''}`;
  }
}

export function initMarketing(config, lang = 'hu') {
  if (!pixelConfigured(config) || document.querySelector('#lp-marketing-consent')) return;
  const t = translations[lang] || translations.hu, id = config.metaPixelId;
  let storage;
  try { storage = window.localStorage; } catch { storage = null; }
  let choice = marketingChoice(storage), sdkState = 'idle', initialized = false, pageViewed = false, returnFocus = null;
  const panel = document.createElement('aside');
  panel.id = 'lp-marketing-consent';
  panel.className = 'lp-marketing-consent';
  panel.setAttribute('aria-labelledby', 'lp-marketing-title');
  panel.innerHTML = '<h2 id="lp-marketing-title"></h2><p class="lp-marketing-description"></p><p class="lp-marketing-current"></p><a class="lp-marketing-details" target="_blank" rel="noopener noreferrer"></a><div class="lp-marketing-actions"><button type="button" class="lp-btn lp-btn-outline" data-marketing-choice="granted"></button><button type="button" class="lp-btn lp-btn-outline" data-marketing-choice="denied"></button></div>';
  panel.querySelector('h2').textContent = t.title;
  panel.querySelector('.lp-marketing-description').textContent = t.text;
  const details = panel.querySelector('a');
  details.textContent = t.details;
  details.href = '/eletutak-talalkozasa/adatkezeles/#hirdetesi-meres';
  panel.querySelector('[data-marketing-choice=granted]').textContent = t.accept;
  panel.querySelector('[data-marketing-choice=denied]').textContent = t.deny;
  const settings = document.createElement('button');
  settings.type = 'button';
  settings.className = 'lp-marketing-settings';
  settings.textContent = t.settings;
  settings.setAttribute('aria-controls', panel.id);
  document.querySelector('.lp-footer-bottom>div')?.appendChild(settings);
  const header = document.querySelector('.lp-header');
  if (header) header.after(panel); else document.body.prepend(panel);

  function show(open) {
    panel.hidden = !open;
    settings.setAttribute('aria-expanded', String(open));
    panel.querySelector('.lp-marketing-current').textContent = choice === 'granted' ? t.granted : choice === 'denied' ? t.denied : '';
  }
  function activate() {
    if (choice !== 'granted' || sdkState !== 'loaded') return;
    const fbq = window.fbq;
    fbq('consent', 'grant');
    if (!initialized) {
      // Disable automatic button/form detection. No form values or user data are supplied.
      fbq('set', 'autoConfig', false, id);
      fbq('init', id);
      initialized = true;
    }
    if (!pageViewed) { fbq('track', 'PageView'); pageViewed = true; }
  }
  function allow() {
    if (sdkState === 'loaded') { activate(); return; }
    if (sdkState === 'loading') return;
    sdkState = 'loading';
    if (!window.fbq) {
      const fbq = function () { fbq.callMethod ? fbq.callMethod.apply(fbq, arguments) : fbq.queue.push(arguments); };
      window.fbq = fbq;
      if (!window._fbq) window._fbq = fbq;
      fbq.push = fbq; fbq.loaded = true; fbq.version = '2.0'; fbq.queue = [];
    }
    const script = document.createElement('script');
    script.id = 'lp-meta-pixel-sdk';
    script.async = true;
    script.src = 'https://connect.facebook.net/en_US/fbevents.js';
    script.onload = () => {
      sdkState = 'loaded';
      // Consent can have been withdrawn while the SDK was in flight.
      if (choice === 'granted') activate();
      else { window.fbq('consent', 'revoke'); forgetMetaCookies(); }
    };
    script.onerror = () => { sdkState = 'idle'; script.remove(); };
    document.head.appendChild(script);
  }
  function choose(next) {
    choice = next;
    try { storage?.setItem(consentKey, JSON.stringify({version:1, choice, at:Date.now()})); } catch { /* Permission applies to this visit only. */ }
    if (choice === 'granted') allow();
    else {
      if (window.fbq) window.fbq('consent', 'revoke');
      forgetMetaCookies();
    }
    const focused = panel.contains(document.activeElement);
    show(false);
    if (focused) (returnFocus || document.querySelector('.lp-hero-actions a'))?.focus({preventScroll:true});
  }
  panel.querySelectorAll('[data-marketing-choice]').forEach(button => button.addEventListener('click', () => choose(button.dataset.marketingChoice)));
  settings.addEventListener('click', () => { returnFocus = settings; show(true); panel.querySelector('button').focus(); });
  panel.addEventListener('keydown', event => { if (event.key === 'Escape' && choice) { show(false); settings.focus(); } });
  show(!choice);
  if (choice === 'granted') allow();
  else forgetMetaCookies();
  window.addEventListener('storage', event => {
    if (event.key !== consentKey && event.key !== null) return;
    choice = marketingChoice(storage);
    if (choice === 'granted') allow();
    else { if (window.fbq) window.fbq('consent', 'revoke'); forgetMetaCookies(); }
    show(!choice);
  });
}
