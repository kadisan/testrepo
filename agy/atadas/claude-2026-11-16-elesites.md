# Saját domaines élesítés — főoldal előbb, új Életutak utána

2026. november 16. Közös ág: `site/csendes-konyv`.

## Éles állapot

| Felület | Cím | Fogadás |
| --- | --- | --- |
| Főoldal, négy kapu | https://sarkadisandor.hu/ | A meglévő Google-űrlapon véglegesített híváskérés |
| Tai Chi | https://sarkadisandor.hu/tai-chi/ | Szerdai alkalomhoz kötött Google-űrlapos véglegesítés |
| Új magyar Életutak | https://sarkadisandor.hu/eletutak-talalkozasa/ | Saját API, igazolt táblázatmentés, tulajdonosi értesítés |

A szerző előbb a főoldalt kérte élesíteni, majd az új Életutakat. Ez megtörtént: a főoldal és a Tai Chi saját domaines ellenőrzése alatt a korábbi Életutak HTML-je még bájtra egyezett a kiinduló éles változattal. Csak ezután álltak át az Életutak útvonalai.

A mottó, a portré, a négy kapu feliratai/színei, az ajánlat és az árak nem kaptak új szerkesztői módosítást. A 60/100/160/200 ezer Ft-os új magyar ajánlat került ki. A főoldali és Tai Chi-jelzés továbbra is a Google-oldal Küldés gombjával végleges; a továbbadás nem igazolt beküldés és nem Lead.

## Hol tárolódik és hogyan kerül ki?

- **Webes fájlok:** a `sarkadi-site` Cloudflare Worker verziózott Static Assets-kötésében. Forrás: `scripts/site-domain-worker.mjs`; beállítás: `wrangler.site.jsonc`; generált feltöltés: `deploy/sarkadi-site`.
- **Aktív webes kiadás forrása:** `82dc846`. Worker-verzió: `c80192c9-dd90-4ba0-a4da-ebb18f9e749c`. A saját domain `/release-version.json` fájlja ezt mutatja. A további dokumentációs commit nem jelent új webes kiadást.
- **Visszahívási API:** külön `sarkadi-kapcsolat` Pages-projekt, Production, `main` feltöltési ág. Éles API-telepítés: `b0841be6-3c02-4a7c-84d0-757d426fa29c`, forrás: `1fa129d`. Ez közvetlen feltöltés, nem a Git `main` ágának beolvasztása.
- **Fogadólánc:** böngésző → saját Worker → `https://sarkadi-kapcsolat.pages.dev/eletutak-talalkozasa/api/callback` → tulajdonosi Google Apps Script → meglévő privát táblázat külön `Életutak-visszahívások` lapja → tulajdonosi e-mail.
- **Google-titkok:** az éles API-projekt Production környezetében. Privát célazonosító és titkos érték nem került Gitbe, statikus csomagba vagy böngészőbe. A Workeren megmaradt régi, azonos nevű kötések a gateway működéséhez nem szükségesek.
- **Domain:** továbbra is DomDom a regisztrátor, Cloudflare névszerverek. Egyetlen DNS-, MX- vagy SPF-rekord sem változott. A négy Worker-útvonal (`sarkadisandor.hu/*`, `www.sarkadisandor.hu/*`, valamint a két korábbi specifikus Életutak-minta) most `sarkadi-site`-ra mutat. A más régi útvonalak az eredeti tárhelyre jutnak.

## Megőrzött előzmények és adatkezelés

Az eredeti `eletutak-talalkozasa` Pages-projekt `b5ead318` produkciós telepítése és az `eletutak-sarkadisandor` Worker moduljainak kódja változatlan. Ezt a Cloudflare API-val is összevetettük; a Worker-letöltések eltérő multipart-határát kiszűrve a tényleges modulokat hasonlítottuk össze. A Git `main` ágát nem módosítottuk.

Az impresszum, a parkoltatott fordítások és a hozzájuk tartozó régi erőforrások továbbra is a rögzített régi telepítésről jönnek. Az adatkezelési oldal a **korábban közzétett, jóváhagyott alapból** készül (`integrations/legal/adatkezeles-jovahagyott-alap.html`). A csomagoló csak a tényleges Google-űrlapos/közvetlen mentési folyamatot, az értesítést, a technikai azonosítót és a külön marketing-hozzájáruláshoz kötött Lead-eseményt pontosítja, dátumozva. A megőrzési idő, jogalap, érintetti jogok és egyéb feltételek megmaradtak. A külön szerkesztési tervezetet nem minősítettük jóváhagyottnak; ÁSZF-link nem került ki.

## Működés és ellenőrzés

- `npm test`: **46/46**, benne a kétlépcsős útvonalkezelés, eredetellenőrzés, bizalmas fejlécek elhagyása és az azonos kérés automatikus újrapróbálása. Vite build sikeres.
- Beküldés/marketing regresszió: **25/25 a build ellen**. Az első dev-futtatás symlinkelt fontokra vonatkozó Vite-korlátozása miatt a sort a tényleges build ellen is megismételtük. A végső időhatár-módosításokat valódi éles próbával ellenőriztük.
- Főoldal és Tai Chi: 320×568, 390×844, 768×1024, 1440×1000, előbb technikai címen, majd a saját domainen. Működő menü, első főgomb, négy kapu, helyi betűk; nincs oldalirányú kilógás, hiányzó kép vagy JavaScript-hiba. A Google-átadásokat elfogtuk: a szükséges mezők és a szerdai alkalom átkerülnek, új végleges Google-beküldés nem történt.
- Új Életutak: négy nézetben a saját domainen is ellenőrizve, helyes árak, képek, megosztási kép és aktív űrlap. A végső saját domaines valós beküldés **első gombnyomásra 200**, egyező kérésazonosító, kb. **3,5 másodperc**, sikeres felületi visszaigazolás.
- Egyetlen, egyértelmű TECHNIKAI PRÓBA-rekordot használtunk újra. A Google a tartós mentést és az értesítés elküldését igazolta; a tulajdonos a megérkezést is visszajelezte. Nem keletkezett új tesztsor vagy újabb értesítő minden ellenőrzésből.
- Google-kapcsolati időtúllépések miatt az API most automatikusan, ugyanazzal az azonosítóval próbál újra. Első két kísérlet: 8 és 16 s; teljes keret: 45 s. Gateway: 50 s, böngésző: 55 s. Nem igazolt mentésnél nincs siker vagy Lead. Az átirányítások eldobott törzsét felszabadítjuk; a gateway a Cloudflare által támogatott `manual` módot használja (`error` ott nem támogatott).
- A Pixel éles kapcsolója az Életutakon aktív, de csak külön engedély után töltődik. A tényleges technikai próbák elutasított méréssel futottak: **0 Meta-kérés**. A főoldali/Tai Chi-kódban nincs Pixel-indítás; a Google-átadás nem Lead.
- Végső `www`/HTTPS/perjel- és UTM-megőrzés, API-readiness, kanonikus cím, robots és a ténylegesen betöltött helyi fontok is ellenőrizve. Képek és mérések helyben: `/workspace/artifacts/sarkadi-2026-11-16-elesites/`.

## Következő kiadás / visszaállítás

Ne töltsd a teljes oldalt a régi Életutak Pages-projekt `main` produkciójára. A közös ág commitja önmagában nem telepít. A jelenlegi éles folyamat Wrangler 4-gyel:

```sh
npm test
npm run build
python3 scripts/package_callback_api.py
wrangler pages deploy deploy/callback-api --project-name=sarkadi-kapcsolat --branch=main
python3 scripts/package_site.py
wrangler deploy --config wrangler.site.jsonc --keep-vars
```

Csak a változó összetevőt kell újratelepíteni; a titkok maradjanak a szolgáltatói beállításban. A `functions/` csomagolásához a repó gyökeréből fusson a Pages-feltöltés. Ellenőrzéskor a külső beküldéseket helyettesítsd; új valódi próbát egyeztess a tulajdonossal. A korábbi közös Pages-előnézet a régebbi forrásváltozatot mutatja; az aktuális, `noindex` technikai felület: https://sarkadi-site.kadisan.workers.dev/ . **Ez is a valódi fogadóhoz csatlakozik.**

Ideiglenes visszaállításnál a `LANDING_ENABLED=false` és a Worker újratelepítése visszahozza a régi Életutak-oldalt, miközben a főoldal/Tai Chi megmarad; ilyenkor a korábbi ajánlat árai is visszatérnek. A specifikus Életutak-útvonalak az eredeti Workerre is visszaállíthatók. A DNS-t és a levelezést ehhez sem kell módosítani. A kiinduló konfiguráció és visszaállítási bizonyítékok privát munkamappában megvannak, nem nyilvános Git-anyagok.
