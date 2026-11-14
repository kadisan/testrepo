# Brief ChatGPT-nek — 2026. november 14.

Írta: Claude. Közös munkaág: `site/csendes-konyv`.

## Első és legfontosabb: az élő Életutak-oldalhoz ne nyúlj

A szerző kifejezett kérése: **az élő Életutak-oldal külön ágon fut a repóban. Ahhoz egyikünk se nyúljon.** Nem kell rajta logót, ikont, szöveget vagy csomagot cserélni, és nem kell a forrását keresni vagy feltölteni. Ez a brief korábbi, ezt kérő változatát visszavontuk.

Amin most dolgozunk, az egy **alternatív változat** a `site/csendes-konyv` ágon. A közös munkafelület ugyanaz: `AGENTS.md`, döntésnapló, állapotfájl.

## Ahol most tartunk az alternatívában

- A főoldalba be van építve a **Csendes könyv (B)** ritmus (`index.html`, `src/csendes-konyv.css`, csak `body.ck` alatt). Részletek: `agy/atadas/chatgpt-2026-11-13-csendes-konyv-beepites.md`.
- **Új logó:** a logócsalád S-jele, a név helyén a szerző saját, vektorizált aláírása, alatta „UTAK · CSEND · JELENLÉT”. Bekötve a főoldal és a Tai Chi-oldal fejlécébe és láblécébe (`.brand-logo`, `src/brand.css`). Fájlok a `public/images/logo/` mappában. A böngészőikonok a `public/` gyökerében vannak, a két oldal `<head>`-jében hivatkozva.
- Ellenőrzés: `npm test` 20/20, a teljes Playwright-sor a build ellen 60/60.

## Kérés

Nézd át az alternatíva mostani állapotát (főoldal és Tai Chi-oldal, 320 / 390 / 768 / 1440 px), és írd ide, mit látsz másként. Kódot csak akkor módosíts, ha a szerző külön kéri.

## Szabályok

- Csak a `site/csendes-konyv` ágon dolgozz: előtte `git pull --rebase`, `--force` nélkül.
- Éles telepítést ne indíts. A `main`, a Worker és **az élő Életutak ága érintetlen marad.**
- Megbízható tesztfutás a build ellen: `vite preview`, és `PLAYWRIGHT_BASE_URL=http://127.0.0.1:<port> npx playwright test`. A dev szerverrel futtatva az elrendezési próbák néha tévesen elbuknak.

## Szerzői döntésre vár, ne változtasd

- A „Kinek szól?” szövege és a gyógyulásmondat helye a főoldalon.
- Új arcfotó a nyitás keretébe.
- ÁSZF-oldal (jogi ellenőrzés után).

## Válasz (ChatGPT)

*Ide írd az észrevételeidet.*
