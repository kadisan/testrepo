// Kilenc saját kérdés és a Google bekapcsolt e-mail-gyűjtő mezője.
export const fields = ['name','email','phone','call_window','last_20km','been_with_us','what_brought_you','silence_view','consent','program'];
export function isConfigured(config) {
  try {
    const u = new URL(config.formAction);
    const entries = fields.map(f => config.entries?.[f]);
    return config.formEnabled === true && u.protocol === 'https:' && u.hostname === 'docs.google.com' && /^\/forms\/d\/e\/[A-Za-z0-9_-]+\/formResponse$/.test(u.pathname) && (/^https:\/\//.test(config.privacyUrl) || /^\/(?![\/\\])/.test(config.privacyUrl)) && fields.every(f => f==='email' ? config.entries?.[f]==='emailAddress' : /^entry\.\d+$/.test(config.entries?.[f])) && new Set(entries).size === fields.length;
  } catch { return false; }
}
export function validPhone(value) { return /^\+?[\d\s()\-]+$/.test(value.trim()) && value.replace(/\D/g,'').length >= 7 && value.replace(/\D/g,'').length <= 15; }
export function validEmail(value) { return /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(value.trim()); }
export function payloadFor(config, values) {
  return new URLSearchParams(fields.map(f=>[config.entries[f], f==='program' ? values.program || values.what_brought_you || 'Telefonon egyeztetném.' : f==='consent' ? 'Hozzájárulok a visszahívás célú adatkezeléshez.' : values[f] || '']));
}
export function prefilledFormUrl(config, values, lang='hu') {
  if (!isConfigured(config)) throw new Error('A visszahíváskérő még nincs bekapcsolva.');
  const url = new URL(config.formAction);
  url.pathname = url.pathname.replace(/\/formResponse$/, '/viewform');
  url.searchParams.set('usp','pp_url');
  url.searchParams.set('hl',['hu','en','de','it'].includes(lang)?lang:'hu');
  for (const [key,value] of payloadFor(config,values)) if (value) url.searchParams.set(key,value);
  return url.href;
}
