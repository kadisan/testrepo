# Sarkadi Sándor — közös weboldalprototípus

Állapot: 2026. november 12. A `site/prototipus` ág együtt tartalmazza a futtatható főoldali prototípust, az Életutak landing forrását, a webes képeket és a közös indulási dokumentumokat.

## Hol kezdjünk?

- [AGENTS.md](AGENTS.md): közös munkaszabályok ChatGPT és Claude számára.
- [Döntésnapló](agy/dontesnaplo.md): tényleges szerzői döntések.
- [Aktuális állapot](agy/munkamenet-es-allapot.md): elkészült elemek, ellenőrzések és következő lépés.
- [Iránytű](agy/00-iranytu.md): tartalmi alap és forráselsőbbség.

A főoldal a személyt, szemléletet és tevékenységeket mutatja be. A konkrét ajánlatok külön landingekre vezetnek. A főoldal fejlesztési alap; az Életutak külön aloldala már éles: https://sarkadisandor.hu/eletutak-talalkozasa/ .

## Kódtérkép

| Fájl vagy mappa | Feladat |
| --- | --- |
| `index.html` | A teljes weboldal meglévő magyar főoldali prototípusa |
| `src/main.js`, `src/style.css` | Főoldali működés és megjelenítés |
| `src/contact.js`, `src/form.js` | Kapcsolati adatok, közös űrlapellenőrzés és Google-átadás |
| `src/landing/` | Életutak szöveg, felépítés, stílusok, képek, űrlap és marketing-hozzájárulás |
| `eletutak-talalkozasa/` | Generált nyelvi HTML-ek és a jogi oldalak HTML-forrásai |
| `public/` | Webes képek, konfiguráció, betűlicencek és jogi stílus |
| [Eredeti képek a főágon](https://github.com/kadisan/testrepo/tree/main/kepek) | Az eredeti fotógyűjtemény a meglévő főágon marad; itt a futáshoz szükséges webes képek vannak a `public/` alatt |
| `agy/` | Közös kontextus és dátumozott döntések |
| `scripts/` | Landinggenerálás, csomagolás, kép-export és az alútvonalas Worker forrása |
| `tests/` | Egység- és Playwright-tesztek |

## Helyi futtatás

Node.js 24 ajánlott.

```sh
npm ci
npm run dev -- --port 5173
```

Főoldal: `http://localhost:5173/`

Landing: `http://localhost:5173/eletutak-talalkozasa/`

```sh
npm test
npm run build
npm run preview -- --port 4173
```

Megjelenítési és interakciós tesztek: `npm run test:e2e`. A jelenlegi Playwright-konfiguráció a cloud környezet `/usr/bin/chromium` böngészőjét használja; más gépen az executablePath beállítást a helyi Chromiumhoz kell igazítani.

## Fejlesztői és éles konfiguráció

A `public/config.js` `formEnabled` és `metaPixelEnabled` kapcsolója szándékosan `false` a fejlesztői példányban. Ez nem az éles működés hibája. A nyilvános Google-űrlapcím és a Pixel-azonosító nem titkos kulcs.

Az éles landing előállítása:

```sh
npm run build
python3 scripts/package_landing.py --production
```

A kimenet `deploy/eles-cloudflare/`. Ez a csomag csak az Életutak aloldalt tartalmazza; a teljes főoldal kiadására önmagában nem alkalmas. A buildelt `dist/` a főoldalt is tartalmazza, ezért annak későbbi élesítéséhez külön tárhely- és útvonalterv kell. Az ág feltöltése nem indít weboldaltelepítést.

## Már működő elemek

- Életutak: 2027. január 8–10., február 12–14., március 5–7.; az alapár 50 000 Ft/fő/hétvége két éjszakával és három étkezéssel.
- A látogató a saját űrlapról előre kitöltött Google Űrlapra jut, és ott véglegesít. A tényleges próba beérkezését a szerző megerősítette.
- Meta Pixel: `419467115532734`, külön látogatói hozzájárulással, visszavonható választással. A PageView Eseménykezelő-beérkezését a szerző képernyőképpel igazolta. Google-átadás nem Lead.
- A magyar változat aktív; az EN/DE/IT technikai oldalak további szerkesztése parkoltatva.

## Közös munka

A két agent saját munkaágon dolgozik a `site/prototipus` azonos kiinduló commitjából. A repóban legyen a közös döntés és állapot; a chatelőzmény nem helyettesíti ezeket. Új tényleges döntésnél a döntésnaplót, befejezett munkánál az állapotfájlt frissítsük. Az összefésüléskor mindkét agent bejegyzéseit őrizzük meg.

A helyi képernyőképes auditok, privát átadások, munkakörnyezet-beállítások és hitelesítési adatok nem részei a forráscommitnak. A régi tervezési dokumentumok dátumozott munkaváltozatok: az aktuális állapot és a későbbi szerzői pontosítás az elsődleges.

A prototípuságra a futtatható kód, az optimalizált webes képek és a közös indulási dokumentumok kerültek. Az eredeti fotók és a részletes háttéranyagok teljes helyi pillanatképe külön helyi ágon megmarad; az eredeti fotógyűjtemény a GitHub `main/kepek` alatt már elérhető. A képek újraexportálásához szükséges eredetik innen külön átvehetők; a helyi futtatáshoz és buildhez nincs szükség az export újrafuttatására.
