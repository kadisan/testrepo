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
- **Az élő Életutak-oldal külön ágon fut. A szerző kérése (2026-11-14): ahhoz egyik agent se nyúljon.** Az alternatív változat a közös munkaágon készül.
- **Új szerzői élesítési kérés (2026-11-16): előbb a `sarkadisandor.hu` főoldala, utána az új Életutak.** Ez ebben a sorrendben feloldja a korábbi élesítési tilalmat. A főoldallal együtt a Tai Chi-kapu céloldala is felkerül; a főoldal ellenőrzéséig a meglévő Életutak változatlan marad. A DNS-, levelezési és más régi útvonalak megőrzendők. Új kiszolgáló: `scripts/site-domain-worker.mjs`, csomagolás: `scripts/package_site.py`, konfiguráció: `wrangler.site.jsonc`. A kiadás két fázisát a `LANDING_ENABLED` kapcsoló és az útvonalak irányítása választja el. A régi Pages-projekt és Worker megmarad visszaállítási alapként.
- Kérdéseket és indoklásokat a másik agentnek az `agy/atadas/` mappában, dátumozott fájlban hagyj; a választ ugyanabba a fájlba, külön szakaszba írjátok.
- Egy munka végén a döntésnaplóba csak a tényleges új szerzői döntést írd; az állapotfájlba az elvégzett módosítást, ellenőrzést és következő lépést.
- Az egyidejűleg szerkesztett közös dokumentumok változásait beolvasztáskor egyesítsétek, ne írjátok felül egymás bejegyzéseit.
- Más agent helyi módosításait őrizd meg. Csak az ellenőrzött, feladathoz tartozó fájlokat stage-eld. A közös munkaág nem a produkciós ág; a `main` és az éles telepítés feladathatára külön kezelendő.
- A repó nyilvános. Titkos kulcsok, `.env` fájlok, privát levelezés és a helyi `atadas/` bizonyítékai nem kerülnek commitba.

### Külön Életutak-ág — 2026. november 13-i előzmény

A szerző ebben a munkamenetben kifejezetten új ágat kért: `codex/eletutak-landing-2026-11-13`, a `site/chatgpt-figyelemvezetes` `fcdc6c5` commitjából. Ez az Életutak-feladatra felülírja a közös ágra dolgozás korábbi szabályát. A főoldal és az éles telepítés változatlan marad. A magyar landing új forrásai a `src/landing/conversion-*` fájlok; az idegen nyelvi régi változatok megmaradnak.

2026. november 16.: a szerző mobilos olvashatóságot, alkalmazkodó képeket és a visszahívási fogadó bekötését kérte, a főoldal négy kapujával. A közös változat a `site/csendes-konyv` főoldalát és az Életutak PR #1 forrását egyesíti. A PR történeti célága ettől nem változik. Útvonalak: `/` → `/tai-chi/`, `/eletutak-talalkozasa/`, `https://zarandoklat.com`, `https://fakbolcsessege.com`. A Google-fogadás aktiválását külön igazolni kell; a meglévő éles oldal és a domain útvonalai ettől nem változnak automatikusan.

## Kód és működés

- Egyszerű HTML/CSS/JavaScript és Vite, Node.js 24 ajánlott. Főoldal: `index.html`, `src/main.js`, `src/style.css`.
- Landingforrás: `src/landing/`. A `scripts/render-landing.mjs` készíti a négy nyelvi HTML-t; a generált landing-HTML helyett a forrást szerkeszd.
- A főoldal a személyt, szemléletet és tevékenységeket mutatja be; a konkrét ajánlatok külön landingekre vezetnek. **2026-11-16 óta a főoldal, a Tai Chi és az új magyar Életutak is éles a saját domainen.** A közös ág további módosítása ettől nem válik automatikusan élessé. Kiadási átadás: `agy/atadas/claude-2026-11-16-elesites.md`.
- Vizuális referencia az elfogadott első erdei változat: napsütötte erdő, finom zöld átmenetek, jól olvasható szöveg. Fontos a mobilos és nagyított szöveges nézet.
- A magyar változat az aktív szerkesztési alap. Az EN/DE/IT technikai oldalak megmaradnak, további fordításuk parkoltatva van.
- Ne találj ki véleményt, eredményt vagy programadatot. A főoldali korábbi tervezetek díjai és időpontjai nem lesznek automatikusan végleges ajánlatok.
- A régi nyelvi változatok saját felület → előre kitöltött Google Űrlap → a látogató ott véglegesít menetét ne jelöld igazolt beküldésként. Az új magyar változat saját API-n át, igazolt táblázatos rögzítést kér. Az új fogadás bekötéséig nem állíthat sikert. Meta Lead csak igazolt rögzítés és külön marketing-hozzájárulás után küldhető.
- A Meta Pixel csak külön marketing-hozzájárulás után indul; a visszavonás és az elutasítás működését őrizd meg.

## Ellenőrzés és telepítés

- Alapellenőrzés: `npm test`, `npm run build`. Interakciós vagy megjelenítési változásnál a megfelelő Playwright-tesztek is szükségesek; a helyi konfiguráció `/usr/bin/chromium`-ot használ.
- A fejlesztői `public/config.js` és az éles csomag kapcsolói különböznek. A teljes éles csomagot a `python3 scripts/package_site.py` készíti a buildből; a régi `package_landing.py` csak a történeti, külön landingcsomaghoz való. A teljes oldal kiszolgálója `sarkadi-site`, konfigurációja `wrangler.site.jsonc`.
- Az új magyar visszahívás a saját domain Workerén át a külön **`sarkadi-kapcsolat` Pages-projekt Production** API-jára jut. Ott vannak a használt Google-titkok. A `python3 scripts/package_callback_api.py` készíti a minimális API-feltöltési mappát; a `functions/` kódot a Wrangler csomagolja. A szerver legfeljebb három kísérletet tesz ugyanazzal a kérésazonosítóval. A korábbi `eletutak-talalkozasa` Pages-projekt éles telepítését és az `eletutak-sarkadisandor` Worker kódját megőriztük; a DNS és a levelezés nem változott.
- Az éles adatkezelési oldal a korábban jóváhagyott, közzétett alapból készül (`integrations/legal/adatkezeles-jovahagyott-alap.html`). A `package_site.py` csak a tényleges technikai mentési/mérési leírást pontosítja, a megőrzési időt és az érintetti jogokat megőrzi. A külön szerkesztési tervezet nem kerül automatikusan élesbe. Az impresszum és a parkoltatott fordítások az eredeti, rögzített Pages-telepítésről jönnek.
- Egy Git-commit vagy ág feltöltése önmagában nem jelent éles telepítést. A régi fődomain működését ne írd felül egy landingcsomaggal.
