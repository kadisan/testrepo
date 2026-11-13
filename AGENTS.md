# Közös munka — Sarkadi Sándor weboldala

**Csendes könyv (B) — közös munkaág: `site/csendes-konyv`.**

Mindkét agent a repóban tárolt döntésekből és állapotból dolgozik. Induláskor olvasd el:

1. `agy/dontesnaplo.md`
2. `agy/munkamenet-es-allapot.md`
3. `agy/00-iranytu.md`, majd a feladathoz tartozó ajánlati vagy főoldali anyagot.

A későbbi egyértelmű szerzői pontosítás elsőbbséget élvez. A régi hiánylistákat dátumuk szerint kezeld; egy történeti brief nem írja felül a már elkészült és igazolt elemeket.

## Git és együttműködés

- A teljes prototípus közös kiinduló ága: `site/prototipus`. A `main` és a `docs/agy-kontextus` meglévő ágak ettől külön maradnak.
- **A 2026. november 13-i legutolsó szerzői döntés szerint egy közös munkaág van: `site/csendes-konyv`**, a „Csendes könyv” (B) irányhoz. ChatGPT és Claude is ide dolgozik. Munka előtt `git fetch origin` és `git pull --rebase`; kicsi, egy témájú commitok; feltöltés előtt újra `git pull --rebase`. Erőltetett (`--force`) feltöltés ezen az ágon tilos. A korábbi `site/chatgpt-figyelemvezetes`, a `site/claude-fooldal` és a `site/prototipus` történeti ágak, az előzményeiket megőrizzük.
- Kérdéseket és indoklásokat a másik agentnek az `agy/atadas/` mappában, dátumozott fájlban hagyj; a választ ugyanabba a fájlba, külön szakaszba írjátok.
- Egy munka végén a döntésnaplóba csak a tényleges új szerzői döntést írd; az állapotfájlba az elvégzett módosítást, ellenőrzést és következő lépést.
- Az egyidejűleg szerkesztett közös dokumentumok változásait beolvasztáskor egyesítsétek, ne írjátok felül egymás bejegyzéseit.
- Más agent helyi módosításait őrizd meg. Csak az ellenőrzött, feladathoz tartozó fájlokat stage-eld. A közös munkaág nem a produkciós ág; a `main` és az éles telepítés feladathatára külön kezelendő.
- A repó nyilvános. Titkos kulcsok, `.env` fájlok, privát levelezés és a helyi `atadas/` bizonyítékai nem kerülnek commitba.

## Kód és működés

- Egyszerű HTML/CSS/JavaScript és Vite, Node.js 24 ajánlott. Főoldal: `index.html`, `src/main.js`, `src/style.css`.
- Landingforrás: `src/landing/`. A `scripts/render-landing.mjs` készíti a négy nyelvi HTML-t; a generált landing-HTML helyett a forrást szerkeszd.
- A főoldal a személyt, szemléletet és tevékenységeket mutatja be; a konkrét ajánlatok külön landingekre vezetnek. A teljes főoldal fejlesztési prototípus, az Életutak külön alútvonala éles.
- Vizuális referencia az elfogadott első erdei változat: napsütötte erdő, finom zöld átmenetek, jól olvasható szöveg. Fontos a mobilos és nagyított szöveges nézet.
- A magyar változat az aktív szerkesztési alap. Az EN/DE/IT technikai oldalak megmaradnak, további fordításuk parkoltatva van.
- Ne találj ki véleményt, eredményt vagy programadatot. A főoldali korábbi tervezetek díjai és időpontjai nem lesznek automatikusan végleges ajánlatok.
- A visszahíváskérés saját felület → előre kitöltött Google Űrlap → a látogató ott véglegesít. Az átadást ne jelöld igazolt beküldésként vagy Meta Leadként.
- A Meta Pixel csak külön marketing-hozzájárulás után indul; a visszavonás és az elutasítás működését őrizd meg.

## Ellenőrzés és telepítés

- Alapellenőrzés: `npm test`, `npm run build`. Interakciós vagy megjelenítési változásnál a megfelelő Playwright-tesztek is szükségesek; a helyi konfiguráció `/usr/bin/chromium`-ot használ.
- A fejlesztői `public/config.js` kapcsolói szándékosan kikapcsoltak. A `python3 scripts/package_landing.py --production` állítja elő az aktív, csak landingre szánt csomagot.
- Az éles Worker jelenleg csak a `/eletutak-talalkozasa*` útvonalat kezeli. A teljes főoldal későbbi telepítésének külön útvonal- és buildterve legyen.
- Egy Git-commit vagy ág feltöltése önmagában nem jelent éles telepítést. A régi fődomain működését ne írd felül egy landingcsomaggal.
