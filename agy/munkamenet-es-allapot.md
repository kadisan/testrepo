# Munkamenet és aktuális projektállapot

Utolsó frissítés: 2026. november 12.

## Közös kiinduló ág

Repó: https://github.com/kadisan/testrepo
Prototípuság: `site/prototipus`

A szerző kérésére ezen az ágon együtt található a teljes főoldali prototípus kódja, az Életutak landing forrása, a futtatáshoz szükséges webes képek és a közös indulási dokumentáció. Az eredeti fotók a már meglévő `main/kepek` könyvtárban maradnak. A `docs/agy-kontextus` korábbi tervezési ág változatlan.

A közös kiindulási pont: `AGENTS.md`, `agy/dontesnaplo.md`, ez az állapotfájl és `agy/00-iranytu.md`. ChatGPT és Claude saját munkaágon dolgozik, azonos megnevezett kiinduló commitból. Új tényleges szerzői döntés a döntésnaplóba, befejezett munka és ellenőrzés ide kerül. Összefésüléskor mindkét agent bejegyzéseit őrizzük meg.

Claude a szerző közlése szerint jelenleg olvasási hozzáféréssel rendelkezik. A kód áttekintéséhez ez elegendő; saját változtatás feltöltéséhez írási hozzáférés szükséges.

## A teljes weboldal feladata

A `sarkadisandor.hu` általános weboldala Sándort, a szemléletét és a tevékenységeit mutatja be, majd továbbvezet a konkrét ajánlat külön landingjére. A szerző kifejezetten ezt a főoldal–landing elkülönítést kérte.

Meglévő főoldali alap: `index.html`, `src/main.js`, `src/style.css`. Ez működő fejlesztési prototípus; a teljes oldaltérkép és az összes szolgáltatási oldal még nincs véglegesítve. A további felépítés kiinduló dokumentumai az `agy/weboldal/` alatt vannak.

## Életutak — már működő elem

- Éles cím: https://sarkadisandor.hu/eletutak-talalkozasa/ .
- A kiválasztott első erdei terv aktív: napsütötte erdő, lágy zöld áttűnés, balra zárt nyitószöveg, jól olvasható főszöveg és dátumok.
- A fekete poláros, fatörzs előtti szerkesztett portré és a havi fotók szerzői választások. A márciusi képen a tó szerepel; ezt ne jelöljük hiányzónak.
- Hétvégék: 2027. január 8–10., február 12–14., március 5–7. Alapár 50 000 Ft/fő/hétvége, két éjszakával és három étkezéssel. A további csomagadatok aktuális kódforrása `src/landing/content.js`.
- A látogató a saját űrlapról előre kitöltött Google Űrlapra jut, és ott véglegesít. A valódi próba beérkezését a szerző megerősítette; ezt nem kérjük újra hiányzóként.
- Meta Pixel `419467115532734`: csak külön marketing-hozzájárulás után indul, a választás visszavonható. A PageView beérkezését az Eseménykezelőben a szerző képernyőképpel igazolta. A Google-űrlap megnyitása nem végleges jelentkezés és nem Lead esemény.
- A saját adatkezelési és impresszumoldal éles. A marketingméréshez tartozó tájékoztatás a tényleges opcionális működést írja le.

## Futtatás és kiadás

- Node.js 24 ajánlott; `npm ci`, `npm run dev`.
- Forrásellenőrzés: `npm test`, `npm run build`.
- A landing generált HTML-jei helyett a `src/landing/` forrását szerkeszd. A generálás a dev/build előtt automatikusan fut.
- A `public/config.js` `formEnabled` és `metaPixelEnabled` kapcsolója szándékosan kikapcsolt a fejlesztői példányban. Az éles profilt a `python3 scripts/package_landing.py --production` készíti.
- Az utolsó itt igazolt éles Pages-telepítés `b5ead318-aa51-4cb9-a6ce-37cd8d598d27`, 2026. november 10. A Worker csak az Életutak alútvonalát kezeli. A teljes főoldal későbbi élesítése külön kiszolgálási tervet igényel.
- A prototípuság feltöltése nem változtat főágat, DNS-t, kampányt vagy éles weboldalt.

## Ellenőrzések

2026. november 12-én a forrásmegosztás előtt az egységteszt ismét sikeres: 18/18. A Vite build is sikeresen lefutott.

A korábbi, november 10-i alkalmazásellenőrzésben 33 böngészőteszt sikeres: mobil/asztal, 200%-os szövegnagyítás, marketing-hozzájárulás és visszavonás, Google-átadás. A külső beküldési lépéseket a tesztek elfogják; új valódi jelentkezést nem küldenek.

## Következő munka és forráskorlátok

A következő érdemi feladat a teljes magyar főoldal és a szolgáltatási útvonalak véglegesítése, majd megvalósítás saját agentágakon. Az EN/DE/IT technikai változatok megmaradnak, további szerkesztésük parkoltatva van.

A kódcommitba nem kerül privát levelezés, helyi képernyőképes audit, hitelesítési adat vagy az eredeti fotók újabb másolata. A teljes korábbi helyi pillanatkép a `site/prototipus-teljes-helyi` helyi ágon megmaradt. A régi dokumentumok hiánylistái és dátumozott munkaszövegei nem írják felül ezt az aktuális állapotot.
