# Brief ChatGPT-nek — logó és ikon az Életutak-oldalon

Dátum: 2026. november 14. Írta: Claude. Közös ág: `site/csendes-konyv` (utolsó commit: `6e1ec80`).

## Ahol most tartunk

- A főoldalba be van építve a **Csendes könyv (B)** ritmus (`index.html`, `src/csendes-konyv.css`, csak `body.ck` alatt). Részletek: `agy/atadas/chatgpt-2026-11-13-csendes-konyv-beepites.md`.
- **Új logó** a szerző döntése szerint: a logócsalád S-jele, a betűs név helyén **a szerző saját, vektorizált aláírása**, alatta „UTAK · CSEND · JELENLÉT”. Döntésnapló: 2026. november 14.
  - Bekötve: főoldal és Tai Chi-oldal, fejléc és lábléc (`.brand-logo`, `src/brand.css`: 64 / 58 / 50 px, láblécben 52 px).
  - Fájlok: `public/images/logo/fejlec-logo-sotetzold.webp` (világos háttérre), `fejlec-logo-kremszin.webp` (sötét háttérre), `sarkadi-sandor-logo.png` (2000×667, zöld háttér).
  - Böngészőikon: `public/favicon.ico`, `favicon-16.png`, `favicon-32.png`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`.
- Ellenőrzés: `npm test` 20/20, a teljes Playwright-sor a build ellen 60/60.

## A feladatod

1. **Életutak-landing: logó és ikon.**
   - A szöveges márkajel helyére: `<img class="brand-logo" src="…/fejlec-logo-sotetzold.webp" width="566" height="163" alt="Sarkadi Sándor – utak, csend, jelenlét">` a fejlécben és a láblécben. A link maradjon legalább 48 px magas.
   - A `<head>`-be a favicon-hivatkozások: `favicon.ico`, a 16 és 32 px-es PNG, `apple-touch-icon`.
   - A logó új mérete 1131×326 (2×), **nem** 1052×252, ahogy a Codexnek szóló korábbi átadás írta. Ne a régi, betűs változatot használd.
2. **Éles csomag.** Az éles Worker csak a `/eletutak-talalkozasa*` útvonalat szolgálja ki. Ellenőrizd, hogy a `scripts/package_landing.py` a logót és a faviconokat is a csomagba másolja, és hogy a hivatkozások az előtaggal együtt működnek. A csomag végi ellenőrzés jelenleg csak az `images/eletutak/` útvonalakat írja át és vizsgálja.
3. **Összeragadó szavak mobilon** („hétvégea”, „tudnodelőre”, „hétvége.Vagy”): a címekben minden `<br>` elé szóköz kell, mert mobilon a `br` rejtve van.

## Fontos: a forrás helye

A szerző Codexnek írt átadása `src/landing/conversion-render.js` és `src/landing/conversion.css` fájlokra hivatkozik. **Ezek egyik távoli ágon sincsenek meg** (`main`, `site/prototipus`, `site/csendes-konyv`); a repóban `src/landing/render.js` van, `lp-brand` osztállyal. Ha az élő Életutak-oldal forrása nálad helyben van, előbb töltsd fel a közös ágra, és írd be az állapotfájlba, honnan származik. Ha a mostani `render.js` a forrás, abban dolgozz.

## Szabályok

- Csak a `site/csendes-konyv` ágon dolgozz: előtte `git pull --rebase`, `--force` nélkül.
- **Éles telepítést ne indíts.** A `main` és a Worker maradjon érintetlen.
- A generált landing-HTML-t ne kézzel szerkeszd, hanem a forrást.
- A végén: `npm test`, `npm run build`, és a landing Playwright-próbái. Ha egy teszt a régi `SARKADI SÁNDOR` szöveget keresi, igazítsd az `alt`-szöveghez. Rögzítsd a 320, 390, 768 és 1440 px-es ellenőrzést is.
- Az állapotfájlba írj rövid bejegyzést. A döntésnaplóba csak új szerzői döntés kerül.

## Megjegyzés a tesztekhez

A dev szerverrel futtatva az elrendezési próbák néha tévesen elbuknak, mert a CSS ott késleltetve töltődik be (a kapuk ikonjai átmenetileg kilógnak). Megbízható a build elleni futás: `vite preview`, és `PLAYWRIGHT_BASE_URL=http://127.0.0.1:<port> npx playwright test`.

## Szerzői döntésre vár, ne változtasd

- A „Kinek szól?” szövege és a gyógyulásmondat helye a főoldalon.
- Új arcfotó a nyitás keretébe.
- ÁSZF-oldal (jogi ellenőrzés után).

## Válasz (ChatGPT)

*Ide írd, mit csináltál, és ha valamit másként oldottál meg.*
