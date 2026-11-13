# Életutak találkozása — új magyar landingváltozat

Frissítve: 2026. november 13.
Munkaág: `codex/eletutak-landing-2026-11-13`. Kiindulás: `site/chatgpt-figyelemvezetes`, `fcdc6c5`.

A szerző szabad kezet adott az új érdeklődőknek szóló landing átalakításához, majd kifejezetten külön ágat kért. Ez a változat **nem éles telepítés**, nem módosítja a főoldalt és nem írja felül a közös munkaágat.

## Ajánlat és cél

- Önismereti hétvége a természetben, vezetett elcsendesedéssel, gyaloglással, Tai Chival és erdei jelenléttel.
- Elsődleges közönség: új érdeklődő, aki változásban van, és még nem látja a következő lépést.
- Elsődleges cél: visszahíváskérés, utána személyes döntés a részvételről.
- 2027. január 8–10., február 12–14., március 5–7.; legfeljebb 12 fő; Ősfenyves Vendégházak.
- Egy hétvége 60 000 Ft/fő, kettő 100 000 Ft/fő, három 160 000 Ft/fő, Bónusz 200 000 Ft/fő.
- Egy hétvége tartalma: program, két éjszaka szállás és három étkezés.
- Bónusz: mindhárom hétvége, egy egyéni kísérési nap, négy Tai Chi-alkalom és 30% kedvezmény a megnevezett tavaszi út programdíjából.
- Négyszemközti beszélgetésre az igénylőknek külön idő jut. Nincs külön vallásos programelem; a keresztény háttér személyes bemutatkozási adat.
- A gyalogtáv hétvégénként eltér, a konkrét távot és terepet Sándor előre megadja. A 15–30 km értelmezését nem találtuk ki napi vagy teljes hétvégi távként.
- Hétköznap 9–19 között érkező kérésre a szerző egy órán belüli visszahívást vállalt.

## Források

| Feladat | Fájl |
| --- | --- |
| Aktív magyar ajánlati adatok | `src/landing/conversion-content.js` |
| Magyar HTML-felépítés | `src/landing/conversion-render.js` |
| Magyar megjelenés | `src/landing/conversion.css` |
| Magyar interakció és visszahívás | `src/landing/conversion-client.js` |
| Dokumentumgenerálás, metaadatok | `src/landing/render.js`, `scripts/render-landing.mjs` |
| Régi EN/DE/IT változat | `src/landing/content.js` és a régi renderelési útvonal |
| Visszahívási API | `src/callback-api.js` |
| Cloudflare Pages Function | `functions/eletutak-talalkozasa/api/callback.js` |
| Saját domain Worker | `scripts/domain-worker.mjs` |
| Tulajdonosi Google-fogadó és beállítás | `integrations/callback/Code.gs`, `integrations/callback/README.md` |

A generált HTML helyett a forrást szerkeszd. A négy nyelvi dokumentumot a dev/build automatikusan frissíti. Az idegen nyelvi oldalak történeti változatként megmaradnak; a magyar landing nem irányít új érdeklődőt a régi árazású fordításokra.

## Egyetlen beküldés és mérés

A magyar űrlap csak nevet, telefonszámot és hozzájárulást kér kötelezően; a „Mi hozott most ide?” opcionális. A dátum- és csomagválasztás a gombokról megőrizhető, de nem előfeltétel. E-mailt nem kérünk kötelezően.

A régi Google Űrlap kötelező e-mailt kér, ezért az új folyamat elkülönített Google-táblázatot és tulajdonosi e-mail-értesítést használ. A fogadó beállításához a tulajdonosnak a Google Apps Script webalkalmazást és a két Cloudflare-titkot kell megadnia. A pontos lépések az integráció README-jében vannak. Ezekhez a fiókműveletekhez ebben a környezetben nincs végrehajtási hozzáférés.

**Bekötés nélkül az online beküldés inaktív**, telefon és e-mail elérhető. Nincs látszatbeküldés, második Google-űrlapos lépés vagy kitalált e-mail-cím. Siker csak igazolt táblázatos rögzítés után jelenhet meg. Bizonytalan hálózati eredménynél ugyanaz a technikai azonosító védi a látogatót a többszörös rögzítéstől.

A Meta Pixel csak külön marketing-hozzájárulással indul. Az új magyar űrlap igazolt rögzítésekor Lead esemény küldhető; a mezők tartalma nem kerül a Metához. A régi Google-átadás továbbra sem Lead. A mérési döntés visszavonható.

A szerzőnek van engedéllyel használható, korábbi zarándokútról szóló visszajelzése, de a pontos idézetet még nem adta át. Az oldalon ezért nincs kitalált idézet vagy mintavélemény.

## Futtatás és kiadás

```sh
npm ci
npm test
npm run build
```

A statikus landingcsomagolás továbbra is rendelkezésre áll; önmagában a ZIP nem telepíti az API-t vagy a tulajdonosi Google-fogadót. Élesítéshez az integráció README-jét is követni kell. A `public/config.js` régi `formEnabled` és `metaPixelEnabled` kapcsolói fejlesztői állapotban maradnak; az új callback saját API-ellenőrzést végez.

A külön ág feltöltése nem változtatja meg az élő oldalt, a DNS-t vagy a hirdetéseket.
