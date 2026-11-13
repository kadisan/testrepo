import {conversionOffer as offer, conversionMoney as money} from './conversion-content.js';

const arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>';
const leaf = '<svg viewBox="0 0 44 60" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" aria-hidden="true"><path d="M20 57c-2-18 2-34 5-51M22 37C9 36 4 26 5 18c11 1 17 8 17 19Zm2-9c13 1 19-7 18-15-10 0-16 6-18 15Zm-3 19c10 2 17-2 20-9-10-2-17 1-20 9ZM25 16C16 14 13 8 15 2c8 1 12 7 10 14Z"/></svg>';
const check = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="m4 10 4 4L16 6"/></svg>';
const escape = text => String(text).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const fullPhotos = {'erdei-gyokerek.webp':'erdei-gyokerek-hq.webp','marciusi-to.webp':'marciusi-to-hq.webp'};
const photo = (file, alt, width, height, extra = '') => {
  const full = fullPhotos[file] || file;
  const responsive = fullPhotos[file] ? ` srcset="/images/eletutak/${file} ${width}w, /images/eletutak/${full} ${file==='erdei-gyokerek.webp'?1600:1531}w" sizes="(min-width: 901px) 32vw, (min-width: 641px) 45vw, 90vw"` : '';
  const image = `<img src="/images/eletutak/${file}" alt="${escape(alt)}" width="${width}" height="${height}" decoding="async"${responsive} ${extra}>`;
  return !alt ? image : `<button class="et-photo-open" type="button" data-et-photo="/images/eletutak/${full}" data-et-caption="${escape(alt)}" aria-label="Kép megnyitása: ${escape(alt)}">${image}<span class="et-photo-zoom" aria-hidden="true">Nagyítás <span>↗</span></span></button>`;
};
const call = (label = 'Kérek egy visszahívást', cls = '') => `<a class="et-button ${cls}" href="#kapcsolat">${label}${arrow}</a>`;
const brandLogo = (loading='eager') => `<a class="et-brand et-brand-logo" href="#lp-content" aria-label="Sarkadi Sándor — az oldal tetejére"><img src="/images/eletutak/sarkadi-sandor-logo.webp" width="2171" height="724" alt="Sarkadi Sándor · Utak · Csend · Jelenlét" loading="${loading}" decoding="async"></a>`;

export function renderConversionLanding() {
  const first = offer.packages[0];
  const html = `<a class="et-skip" href="#lp-content">Ugrás a tartalomhoz</a>
<header class="et-header">
  ${brandLogo()}
  <button class="et-menu" type="button" aria-expanded="false" aria-controls="et-nav">Menü <span aria-hidden="true">☰</span></button>
  <nav id="et-nav" aria-label="Az oldal részei"><a href="#hetvegek">Időpontok</a><a href="#kiserod">A kísérőd</a><a href="#reszvetel">Részvétel</a>${call('Kérek egy hívást', 'et-button-small')}</nav>
</header>
<main id="lp-content">
  <section class="et-hero" aria-labelledby="et-title">
    ${photo('napfenyes-erdei-hatter.webp', '', 1536, 1024, 'class="et-hero-forest" fetchpriority="high"')}
    <div class="et-hero-wash"></div>
    <div class="et-shell et-hero-inner">
      <p class="et-kicker">ÉLETUTAK TALÁLKOZÁSA <span>BAKONY · 2027. JANUÁR–MÁRCIUS</span></p>
      <h1 id="et-title">Önismereti hétvége<br> a természetben.</h1>
      <p class="et-hero-lead">${offer.subtitle}</p>
      <p class="et-hero-text">Változásban vagy, és még nem látod a következő lépést? Hagyj időt arra, hogy ránézz, mi fontos most neked.</p>
      <div class="et-hero-actions">${call()}<a class="et-text-link" href="#hetvegek">Megnézem az időpontokat <span aria-hidden="true">↓</span></a></div>
      <p class="et-hero-assurance">Először beszélgetünk. A döntés utána a tiéd.</p>
      <ul class="et-hero-facts"><li><strong>3</strong> külön is választható hétvége</li><li><strong>12</strong> fő legfeljebb</li><li><strong>60 000 Ft</strong> / fő / hétvége</li></ul>
    </div>
    <div class="et-hero-caption"><span>Ősfenyves Vendégházak</span><span>2 éjszaka · 3 étkezés · vezetett program</span></div>
  </section>

  <section class="et-section et-intro" id="neked" aria-labelledby="et-intro-title"><div class="et-shell et-intro-grid">
    <div><p class="et-kicker">AMIKOR VÁLTOZÁSBAN VAGY</p><h2 id="et-intro-title">Nem kell tudnod előre a választ.</h2><span class="et-quiet-branch" aria-hidden="true">${leaf}</span></div>
    <div class="et-intro-copy"><p class="et-large">Talán valami lezárult. Talán változik körülötted az élet, vagy benned fogalmazódik valami új.</p><p>Ezen a hétvégén időt és figyelmet kapsz magadra. Gyaloglás, egyszerű mozdulatok, csend és beszélgetés adnak teret annak, ami most foglalkoztat.</p><p>Nem kell kész kérdéssel érkezned. A telefonbeszélgetésben közösen tisztázzuk, mi hozott most ide, és hogy neked való-e ez az út.</p><p class="et-intro-note">Akkor is várlak, ha most találkozol velem először, és egyedül érkezel.</p></div>
  </div></section>

  <section class="et-section et-practice" id="program" aria-labelledby="et-practice-title"><div class="et-shell">
    <div class="et-section-heading"><div><p class="et-kicker">A HÉTVÉGE KÖZEGE</p><h2 id="et-practice-title">A lépések között<br> magadra is figyelhetsz.</h2></div><p>A csend, a mozdulat és a beszélgetés egymás mellett kap helyet. Annyit osztasz meg, amennyit szeretnél.</p></div>
    <div class="et-practice-grid">
      <figure class="et-walk-photo">${photo('erdei-ut.webp', 'Gyalogló egy napsütötte erdei úton', 688, 1536, 'loading="lazy"')}<figcaption>Úton, a fák között.</figcaption></figure>
      <div class="et-practice-list"><article><span>01</span><div><h3>Gyaloglás és erdei jelenlét</h3><p>Haladunk, megállunk, figyelünk. Lesznek csendes szakaszok, és idő arra is, hogy észrevedd, mi vesz körül.</p></div></article><article><span>02</span><div><h3>Tai Chi, egyszerű mozdulatokkal</h3><p>A mozdulaton keresztül fordítjuk a figyelmet a testünkre. Előképzettségre nincs szükséged.</p></div></article><article><span>03</span><div><h3>Beszélgetés, valódi figyelemmel</h3><p>Vezetett kérdésekkel és közös beszélgetésekkel dolgozunk. Ha igényled, négyszemközti beszélgetésre is biztosítok külön időt.</p></div></article></div>
      <figure class="et-tai-photo">${photo('tai-chi-telen.webp', 'Tai Chi-gyakorlás egy havas kertben', 1080, 1920, 'loading="lazy"')}<figcaption>A mozdulatnak is van helye.</figcaption></figure>
    </div>
    <p class="et-practice-outcome">Időt kaphatsz magadra. Ránézhetsz arra, ami fontos. Megfogalmazhatsz egy lehetséges következő lépést. <strong>Kész válasszal hazamenned nem kell.</strong></p>
  </div></section>

  <section class="et-section et-weekends" id="hetvegek" aria-labelledby="et-weekends-title"><div class="et-shell">
    <div class="et-section-heading"><div><p class="et-kicker">EGYETLEN HÉTVÉGÉRE IS ÉRKEZHETSZ</p><h2 id="et-weekends-title">Három időpont.<br> Válaszd a saját ritmusod.</h2></div><p>Pénteki megérkezés, szombati és vasárnapi program. Két éjszaka a Bakonyban, legfeljebb 12 fős csoportban.</p></div>
    <div class="et-trip-grid">${offer.weekends.map((trip, i) => `<article class="et-trip"><div class="et-trip-photo">${photo(trip.image, trip.alt, trip.width, trip.height, 'loading="lazy"')}<span>${trip.month}<b>0${i + 1}</b></span></div><div class="et-trip-copy"><time datetime="${trip.date}">${trip.label}</time><h3>${trip.title}</h3><p>${trip.text}</p><button class="et-text-link" type="button" data-et-weekend="${i}">Ez a hétvége érdekel ${arrow}</button></div></article>`).join('')}</div>
    <div class="et-walk-note">${check}<p>A hétvégék gyalogtávja eltér; a konkrét távot és terepet előre megadom. A felkészültségedet telefonon átbeszéljük, a programot a téli körülményekhez igazítjuk.</p></div>
  </div></section>

  <section class="et-section et-guide" id="kiserod" aria-labelledby="et-guide-title"><div class="et-shell et-guide-grid">
    <figure class="et-portrait">${photo('sarkadi-sandor-fatronk-portre.webp', 'Sarkadi Sándor portréja fekete polárfelsőben, fatörzs előtt', 1122, 1402, 'loading="lazy"')}<figcaption>SARKADI SÁNDOR <span>Találkozunk az ösvényen.</span></figcaption></figure>
    <div class="et-guide-copy"><p class="et-kicker">AKI AZ ÚTON KÍSÉR</p><h2 id="et-guide-title">Sarkadi Sándor vagyok.</h2><p class="et-large">2014-ben résztvevőként indultam.<br> 2015 óta másokat is kísérek.</p><p>Zarándokkísérőként, Integral Tai Chi Flow-oktatóként és minősített erdei jelenlét-vezetőként dolgozom. A mozdulatnak, a kérdéseknek és a csendnek egyaránt hagyok helyet.</p><p>A személyes hátterem keresztény gyökerű. Ezeken a hétvégéken nincs külön vallásos programelem; felekezettől függetlenül várlak.</p><p class="et-guide-note">Mielőtt jelentkezel, beszélünk egymással. Te is kérdezhetsz, és közösen megnézzük, mire számíthatsz.</p>${call('Beszélgetnék Sándorral', 'et-button-outline')}</div>
  </div></section>

  <section class="et-section et-prices" id="reszvetel" aria-labelledby="et-prices-title"><div class="et-shell">
    <div class="et-section-heading"><div><p class="et-kicker">RÉSZVÉTEL</p><h2 id="et-prices-title">Egy hétvége.<br> Vagy egy teljes téli ív.</h2></div><p>Minden választott hétvége ára tartalmazza a vezetett programot, két éjszaka szállást és három étkezést.</p></div>
    <div class="et-price-feature"><div><p class="et-kicker">${first.note}</p><h3>${first.name}</h3><p>${first.label}</p><p class="et-main-price">${money(first.price)}<span>/ fő / hétvége</span></p><button class="et-button" type="button" data-et-package="one">Egy hétvége érdekel ${arrow}</button></div><div><ul class="et-inclusions">${first.features.map(feature => `<li>${check}<span>${feature}</span></li>`).join('')}</ul><p class="et-price-hint">Még nem kell időpontot választanod. A hívásban ezt is megbeszélhetjük.</p></div></div>
    <p class="et-more-heading">Ha több időt adnál ennek a folyamatnak</p>
    <div class="et-package-grid">${offer.packages.slice(1).map(pack => `<article class="et-package ${pack.id === 'plus' ? 'et-package-bonus' : ''}"><p class="et-package-note">${pack.note}</p><h3>${pack.name}</h3><p class="et-package-description">${pack.label}</p><p class="et-package-price">${money(pack.price)}<span>/ fő</span></p><ul>${pack.features.map(feature => `<li>${check}<span>${feature}</span></li>`).join('')}</ul><button class="et-text-link" type="button" data-et-package="${pack.id}">Erről beszélgetnék ${arrow}</button></article>`).join('')}</div>
    <div class="et-price-fine"><p>Az árak fejenként értendők. Az utazás és a felsorolt három étkezésen felüli étkezések külön fizetendők. A díjak bontását, a fizetés módját és a lemondási feltételeket foglalás előtt írásban megkapod.</p><p>A Télből tavaszba csomag tavaszi kedvezménye a 2027. április 29-én induló négynapos út programdíjára vonatkozik. A tavaszi szállás és étkezés feltételeit, a Tai Chi-alkalmakat és az egyéni napot előre egyeztetjük.</p></div>
  </div></section>

  <section class="et-section et-stay" id="szallas" aria-labelledby="et-stay-title"><div class="et-shell et-stay-grid"><div><p class="et-kicker">AHOVÁ VISSZAÉRKEZÜNK</p><h2 id="et-stay-title">Közös bázisunk<br> az utak között.</h2></div><div><h3>Ősfenyves Vendégházak</h3><p>Itt töltjük a hétvége két éjszakáját. A konkrét vendégházat és a szobabeosztást előre egyeztetjük. A szállás és a három étkezés költsége a hétvégi részvételi ár része.</p><a class="et-text-link" href="https://www.osfenyvesvendeghazak.hu/vendeghazak" target="_blank" rel="noopener noreferrer">Megnézem a vendégházakat ${arrow}</a></div></div></section>

  <section class="et-section et-faq" aria-labelledby="et-faq-title"><div class="et-shell et-faq-grid"><div><p class="et-kicker">HELYÜK VAN A KÉRDÉSEIDNEK</p><h2 id="et-faq-title">Ami a döntéshez<br> még fontos lehet.</h2><p>Ha más kérdésed is van, a hívásban átbeszéljük.</p></div><div class="et-faq-list">${offer.faq.map(([q,a]) => `<details><summary>${q}<span aria-hidden="true">+</span></summary><p>${a}</p></details>`).join('')}</div></div></section>

  <section class="et-section et-contact" id="kapcsolat" aria-labelledby="et-contact-title"><div class="et-shell et-contact-grid">
    <div class="et-contact-copy"><p class="et-kicker">AZ ELSŐ LÉPÉS EGY BESZÉLGETÉS</p><h2 id="et-contact-title">Nézzük meg,<br> neked szól-e ez az út.</h2><p>Hagyd meg a neved és a telefonszámod. Egy 10–15 perces beszélgetésben átbeszéljük, mivel érkeznél, a gyaloglást és a választott hétvégét.</p><p class="et-callback-promise">${offer.callback}</p><p class="et-small">Az időpontok magyarországi idő szerint értendők. Máskor érkező kérésnél a következő hétköznap 9–19 között kereslek.</p><address><span>Közvetlenül is elérsz</span><a href="tel:${offer.phone}">${offer.phoneDisplay}</a><a href="mailto:${offer.email}">${offer.email}</a></address></div>
    <div class="et-form-wrap"><form id="callback-form" class="et-form" novalidate>
      <div class="et-form-heading"><span aria-hidden="true">${leaf}</span><div><h3>Kérek egy visszahívást</h3><p>Nem foglalás. Nincs fizetési kötelezettség.</p></div></div>
      <div class="et-selection" hidden><p><span>Erről beszélgetnénk:</span> <strong id="et-selection-text"></strong></p><button type="button" id="et-clear-selection">Még átgondolom</button></div>
      <div class="et-form-row"><label for="et-name">Neved <span aria-hidden="true">*</span><input id="et-name" name="name" autocomplete="name" maxlength="120" required placeholder="Ahogy szólíthatlak" aria-describedby="et-name-help"><small id="et-name-help">A keresztneved is elég.</small></label><label for="et-phone">Telefonszámod <span aria-hidden="true">*</span><input id="et-phone" name="phone" type="tel" autocomplete="tel" maxlength="40" required placeholder="+36 …" aria-describedby="et-phone-help"><small id="et-phone-help">Amelyen visszahívhatlak.</small></label></div>
      <label for="et-reason">Mi hozott most ide? <span class="et-optional">Nem kötelező</span><textarea id="et-reason" name="reason" rows="3" maxlength="1000" placeholder="Egy mondat is elég. Telefonon is elmondhatod."></textarea></label>
      <div class="et-honey" aria-hidden="true"><label for="et-website">Weboldal<input id="et-website" name="website" type="text" tabindex="-1" autocomplete="off"></label></div>
      <label class="et-consent" for="et-consent"><input id="et-consent" name="consent" type="checkbox" required><span>Elolvastam az <a href="/eletutak-talalkozasa/adatkezeles/" target="_blank" rel="noopener noreferrer">adatkezelési tájékoztatót</a>, és hozzájárulok, hogy visszahívj. <span aria-hidden="true">*</span></span></label>
      <button class="et-button et-submit" type="submit" disabled>Kérem a visszahívást ${arrow}</button>
      <p class="et-form-availability" id="et-form-availability">Az online visszahíváskérés még nem aktív. Hívj a <a href="tel:${offer.phone}">${offer.phoneDisplay}</a> számon, vagy <a href="mailto:${offer.email}">írj e-mailt</a>.</p>
      <p id="et-form-status" class="et-form-status" role="status" aria-live="polite" tabindex="-1"></p>
      <noscript><p class="et-form-availability">Az online visszahíváskéréshez JavaScript szükséges. Telefonon és e-mailben közvetlenül is elérsz.</p></noscript>
    </form><div class="et-after-form"><span>01 <b>Megadod az elérhetőséged.</b></span><span>02 <b>Beszélgetünk.</b></span><span>03 <b>Utána döntesz.</b></span></div></div>
  </div></section>
</main>
<footer class="et-footer"><div class="et-shell"><div class="et-footer-top">${brandLogo('lazy')}<p>Életutak találkozása<br> <span>Bakony · 2027. január–március</span></p><a class="et-text-link" href="#lp-content">Az oldal tetejére ↑</a></div><div class="et-footer-bottom lp-footer-bottom"><span>© ${new Date().getFullYear()} Sarkadi Sándor</span><div><a href="/eletutak-talalkozasa/adatkezeles/">Adatvédelem</a><a href="/eletutak-talalkozasa/impresszum/">Impresszum</a></div></div><p class="et-credits">Fotók: Sarkadi Sándor gyűjteménye · Portré: szerkesztett kép · Erdei nyitókép: illusztráció</p></div></footer>
<div class="et-mobile-call" hidden><span>Életutak találkozása<small>Először beszélgetünk.</small></span>${call('Kérek egy hívást', 'et-button-small')}</div>
<dialog class="et-photo-dialog" id="et-photo-dialog" aria-label="Képek nagy méretben"><div class="et-photo-dialog-bar"><span id="et-photo-counter"></span><button type="button" data-photo-close aria-label="Képnézegető bezárása">Bezárás <span aria-hidden="true">×</span></button></div><figure><img id="et-photo-full" alt=""><figcaption id="et-photo-caption"></figcaption></figure><div class="et-photo-dialog-controls"><button type="button" data-photo-prev>← Előző kép</button><a id="et-photo-original" target="_blank" rel="noopener noreferrer">Eredeti méret ↗</a><button type="button" data-photo-next>Következő kép →</button></div></dialog>`;
  // Restore the original page's early dates and personal introduction.
  const order=['et-weekends','et-guide','et-intro','et-practice','et-prices','et-stay','et-faq','et-contact'];
  const sections=[...html.matchAll(/<section class="et-section (et-[^" ]+)[^"]*"[^>]*>/g)];
  const end=html.indexOf('</main>');
  const byName=new Map(sections.map((match,index)=>[match[1],html.slice(match.index,sections[index+1]?.index??end)]));
  if(order.length!==byName.size||order.some(name=>!byName.has(name)))throw new Error('Incomplete conversion layout');
  return html.slice(0,sections[0].index)+order.map(name=>byName.get(name)).join('')+html.slice(end);
}
