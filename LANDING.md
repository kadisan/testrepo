# Életutak találkozása — aktuális technikai állapot

Utolsó frissítés: 2026. november 12. A közös prototípuság: `site/prototipus`.

Éles cím: https://sarkadisandor.hu/eletutak-talalkozasa/ . A főoldal külön fejlesztési feladat; a mostani éles kiszolgálás csak az Életutak alútvonalára vonatkozik.

## Forrás

- Szöveg és ajánlati adatok: `src/landing/content.js`.
- HTML-felépítés: `src/landing/render.js`; a `scripts/render-landing.mjs` készíti a négy nyelvi HTML-t a dev/build előtt.
- Stílusok: `style.css`, `readability.css`, `woodland.css`, `marketing.css` a `src/landing/` alatt.
- Képek: `src/landing/photos.js`, `public/images/eletutak/`; eredetik: `kepek/`.
- Működés: `src/landing/main.js`; űrlap: `src/landing/form.js` és a közös `src/form.js`.
- Hirdetési hozzájárulás és Pixel: `src/landing/marketing.js`.
- Jogi HTML-források: `eletutak-talalkozasa/adatkezeles/index.html` és `impresszum/index.html`.

## Működés

A választott első erdei terv az aktív: teljes szélességű napsütötte erdő, lágy zöld áttűnés, olvasható főszöveg és címsorok. A magyar oldal elején a három hétvége és a kísérő bemutatkozása szerepel. A fekete poláros portré és a márciusi tó a szerző választása.

A hétvégék 2027. január 8–10., február 12–14., március 5–7. Alapár 50 000 Ft/fő/hétvége, két éjszakával és három étkezéssel. A többi csomag forrása a `content.js` és az ajánlat saját dokumentuma.

A visszahíváskérés a Google Űrlapon véglegesül. A saját oldal csak az ellenőrzött, előre kitöltött átadást végzi; nem állítja, hogy a látogató ott ténylegesen beküldött. A korábbi valódi próba beérkezése szerző által megerősített.

Meta Pixel `419467115532734`: kizárólag a látogató engedélyével indul, és az oldal alján visszavonható. A PageView Eseménykezelőbe érkezése képernyőképpel igazolt. Lead esemény nincs megbízhatóan visszavezetve a Google Űrlap végleges beküldéséből.

## Build és éles csomag

```sh
npm test
npm run build
python3 scripts/package_landing.py --production
```

A fejlesztői konfiguráció kapcsolói kikapcsoltak; az éles profil készíti az aktív konfigurációt a `deploy/eles-cloudflare/` könyvtárba. A csomagolás nem publikál. Az éles Cloudflare-projekt `eletutak-talalkozasa`, a Worker `eletutak-sarkadisandor`. A teljes főoldal átépítéséhez az alútvonalas kiszolgálás önmagában nem elég.

A részletes aktuális kontextus a `agy/munkamenet-es-allapot.md`, a szerzői döntések a `agy/dontesnaplo.md` fájlban vannak. A régi privát auditképek nem kerültek a nyilvános kódcommitba.
