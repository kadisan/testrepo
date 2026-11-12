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

## 2026-11-12 — Claude: főoldal-névjegy (`site/claude-fooldal`)

Kiinduló commit: `ccf0974` (`site/prototipus`).

- Tartalmi váz: `agy/weboldal/fooldal-vaz-v2.md`; magyar munkaszöveg: `agy/weboldal/fooldal-szoveg.md` (a szerző szóbeli válaszaiból, átnézve).
- `index.html` főoldal átírva: a Tavaszi ív-szekció kikerült (a döntésnapló szerint a főoldal nem ajánlati landing); új sorrend: nyitás (mottó) → bemutatkozás saját portréval → Ami összeköt → négy út → Hogyan kísérek / Kinek szól → Tai Chi (tengely és tempó) → Fák Bölcsessége → Írások, könyvek (+ haiku) → első lépés → GYIK → kapcsolat.
- Lábléc-/hero-javítások: „Erdőmerülés" → „erdei jelenlét"; „Zarándokkísérő" helyett „Utak · csend · jelenlét"; képzettség-címkék a szerzői szóhasználattal.
- Új stílusok a `src/style.css` végén (megjelölve). A visszahíváskérő űrlap logikája változatlan.
- `playwright.config.js`: a Chromium útvonala `CHROMIUM_PATH` környezeti változóval felülírható (alapértelmezés változatlan: `/usr/bin/chromium`).
- Ellenőrzés: `npm test` 18/18, `npm run build` sikeres, Playwright 39/39 (Claude környezetében, Chromium 1243).

Nyitott: könyvek ára és vásárlási linkje (a gombok most a kapcsolatra mutatnak), előrendelés, saját Tai Chi-oldal, Tai Chi időpont/ár megerősítése, a főoldali GYIK szerzői átnézése, a torii-kép joga (a haiku most kép nélkül, szövegként szerepel).

### 2026-11-12 délután — szerzői pontosítások beépítve

- Főoldal = elosztó: a Tai Chi és a Fák Bölcsessége nagy szekciója kikerült; a négy kapu visz tovább (Tai Chi → saját landing, készül; kísérés → Életutak; zarándoklat → zarandoklat.com; erdei jelenlét → fakbolcsessege.com). Amíg a Tai Chi-landing nincs kész, egy rövid gyakorlati sáv (`#tai-chi`) áll a főoldalon.
- Tai Chi: szerdánként 10:00–11:30, Kesztyűgyár Közösségi Ház, Budapest VIII., Mátyás tér 15.; adomány alapú, legalább 1 000 Ft/alkalom; egy óra piaci ára 5–6 000 Ft (így kommunikálva).
- Írások, könyvek: a borítóra kattintva lehet vásárolni (`public/images/konyvek/`, a könyvek PDF-jéből kinyert saját borítók). **A vásárlási linkek hiányoznak** — a borítók most a `#kapcsolat`-ra mutatnak, `data-buy="anatomia|otthon"` jelöléssel. „Egyéb írások" → Substack (ingyenes); **a Substack-link hiányzik** (`data-link="substack"`).
- A „Fák Bölcsessége" kikerült a főmenüből (a kapu és a testvéroldal viszi).
- Ellenőrzés: `npm test` 18/18, build, Playwright 39/39.
- 2026-11-12 14:10: linkek bekötve — A zarándoklat anatómiája: https://payhip.com/b/oSLWu · Aki otthon van az úton: https://payhip.com/b/Prb7e · Substack: https://belsout.substack.com/ (borító és „Megveszem" is a Payhipre visz, új lapon).

## 2026-11-12 — Claude: Tai Chi-landing (`/tai-chi/`)

- Új oldal: `tai-chi/index.html` (Vite multi-page bejegyzés: `taichi`), közös `src/main.js` és `src/style.css`, azonos visszahíváskérő űrlappal.
- Szerkezet: nyitás (TAI CHI · Tengely és tempó, „Figyelmet használj, erő helyett.") → Ismerős? (ülőmunka, a szerző saját tapasztalataként) → három alapelv a szerző fordításában → egy óra menete (mindig a nyitással kezd) → tanulási út → tudnivalók → a tanár → GYIK → kapcsolat.
- A főoldali Tai Chi-kapu és -sáv a `/tai-chi/` oldalra visz.
- Új teszt: `tests/browser/taichi.spec.js` (360/768/1440 px, kapu → landing). Összesen 43/43 Playwright, 18/18 egységteszt, build sikeres.

**Szerzői megerősítésre vár (a Tai Chi-oldalon most így szerepel):**
- az óra négy lépése (nyitás · bemelegítés és alapok · forma · csendes zárás) — a szerző naptárbejegyzéseiből és gyakorlási szokásaiból összerakva;
- a tanulási út három szakasza (első hetek / első hónapok / hosszabb távon, 48-as forma) — a szerző oktatói vizsgaanyagából levezetve, nem tőle szó szerint;
- „Hozd magaddal: kényelmes, réteges ruha, lapos talpú cipő, egy kis víz" — általános javaslat;
- „Egyéni óra: egyeztetés szerint, 5–6 000 Ft / óra" — a szerző piaci óradíj-közléséből;
- „Az első alkalom előtt írj vagy hívj, hogy tudjak rólad" — szervezési javaslat;
- a „tanár" blokk képe most a téli Tai Chi-fotó (`tai-chi-telen.webp`).
- 2026-11-12 14:30: a Tai Chi-oldal „A tanár" blokkja a szerző saját bemutatkozó szövegéből (Sarkadi_Sandor_bemutatkozas_1.docx) és kerti Tai Chi-fotójából (`public/images/taichi/`) készült. Szándékosan kimaradt a szerző szövegéből: „gyógyulás", „energia harmonizálása" (tiltólista), „Erdőmerülő vezető" (szerzői döntés: nem használjuk). Facebook: Kardosi András (facebook.com/kardosiandras).

### 2026-11-12 14:45 — Tai Chi-ajánlat és bérletrendszer (MUNKAVÁLTOZAT, szerzői jóváhagyásra vár)

Szerzői irány: landing → látszódjon, mit kap; első alkalom jelképes, kötelezettség nélkül; bérletek a Fák Bölcsessége mintájára, látványos árcsökkentés nélkül (~10%), hozzáadott értékkel a szerző meglévő eszközeiből.

| Bérlet | Alkalom | Ár | Helyett | Hozzáadott érték |
|---|---|---|---|---|
| Próbaóra | 1 | min. 1 000 Ft | — | kötelezettség nélkül |
| Alkalmi jegy | 1 | 5 000 Ft | — | — |
| Havi | 4 | 18 000 Ft | 20 000 Ft | 1 e-könyv |
| Negyedéves | 12 | 54 000 Ft | 60 000 Ft | 1 e-könyv, 1 egyéni óra |
| Féléves | 24 | 108 000 Ft | 120 000 Ft | 2 e-könyv, 2 egyéni óra, 15% Fák Bölcsessége |
| Háromnegyed éves | 36 | 162 000 Ft | 180 000 Ft | 2 e-könyv, 3 egyéni óra, 15% Fák, 10% zarándokút (vezetői díj) |
| Éves | 48 | 216 000 Ft | 240 000 Ft | 2+következő e-könyv, 4 egyéni óra, 15% Fák, 15% zarándokút (vezetői díj) |

A szerző példája: 5 000 Ft/alkalom, havi 18 000 Ft. A korábbi „adomány alapú, min. 1 000 Ft" közlés helyére ez lépett (a főoldali sávon is). **Nyitott:** érvényességi idő (javaslat: alkalomszám + ráhagyás), a zarándokút-kedvezmény pontos alapja (csak Sándor vezetői díja, a zarandoklat.com-os szerződés Zsolttal), a „következő e-könyv" vállalása, a Kesztyűgyár mint helyszín elfogadja-e a fizetős bérletet.
- 2026-11-12 15:00: **szerzői döntés** — a bérletrendszer talonba került ([tervek-talonban](ajanlatok/taichi/tervek-talonban.md)); a Tai Chi-oldalon a „Próbáld ki egyszer. Aztán döntsd el." próbaóra marad, adomány alapon (min. 1 000 Ft, piaci ár 5–6 000 Ft); a fő gomb „Jelzem, hogy jövök", hogy a szerző számíthasson a résztvevőre. Több helyszín és online előfizetés: terv, nem került az oldalra.
- 2026-11-12 15:40: a Foldal Homepage Draftból átvéve (szerzői jóváhagyással): bizalmi sor az űrlap alatt („Életkort, egészségi adatot, számlacímet nem kérek.") mindkét oldalon; „Máshol is együtt járhatunk" sáv a Tai Chi-oldal alján; „Ha valami nem úgy alakul, azt is én oldom meg, nem te." a főoldal Hogyan kísérek blokkjában; közösségi linkek a láblécben (Facebook: Kardosi András, Substack, zarandoklat.com); a Google Űrlap visszaigazoló szövege: `agy/kozos/visszaigazolo-uzenet.md`. Instagram (zarándoklat): https://www.instagram.com/zarandoklat/ — bekötve.
- 2026-11-12 16:15: Tai Chi-oldal — a mester megnevezése (Sápi Ádám, taichiflow.hu, szerzői jóváhagyással); „Bármelyik szerdán bekapcsolódhatsz." (szerzői jóváhagyással); ajándék-sáv: letölthető egyoldalas PDF „Öt perc reggel – a nyitás" (`public/letoltes/`), a szerző nyitás-konvenciója és három alapelv-fordítása alapján, Claude szövegezése — szerzői átnézésre vár. Talonba: célzott órák (irodai, rehab, szenior), online klub árviszonyítás.
- 2026-11-12 16:30: ajándék PDF végleges (A változat: a szerző kakasállás-sziluettje lapközépen); a Tai Chi-oldalon a PDF feliratkozásért jár (Substack), közvetlen letöltés nincs; új fotó a Tanulási útnál; oklevél-link a tanár blokkban; GYIK: „Nem késő elkezdeni?". Szerzői anyagok (oktatói trükkök, 28 napos kihívás) a Drive-on, összefoglaló: `agy/ajanlatok/taichi/tervek-talonban.md`.
- 2026-11-12 16:45: talonba (szerzői jóváhagyással): sétáló beszélgetés mint belépő formátum, „Miért kint?" magyarázó blokk, hangsorozat Szilvivel — `agy/kozos/otletek-talonban.md`.
- 2026-11-12 17:50: **főoldal-frissítés** (szerzői kérés, minta: anniepwoods.com): portrés, kétoszlopos nyitás („Lassíts. / Érkezz meg. / Lépj be a fák közé." + okker ecsetvonás-aláhúzás, mottó); egyetlen meleg kiemelőszín (okker `--accent:#d9a441`) minden elsődleges gombon (a Tai Chi-oldalon is); új „Azért találtál ide, mert…" blokk a bemutatkozás előtt; záró sáv a kapcsolat előtt („A változás a tiéd. Egy beszélgetéssel kezdődik."); lekerekített fotósarkok. A bemutatkozás képe a kerti Tai Chi-fotó lett (a portré a nyitásba került). A `site.spec.js` h1-ellenőrzése az új címhez igazítva.
- 2026-11-12 18:00: a záró sáv kétoszlopos lett: balra mélyzöld szövegpanel, jobbra a szerző által választott türkiz tárcsás telefon fotója (`public/images/telefon-tarcsas.webp`). **Nyitott:** a fotó forrása és licence (stockfotó — a szerzőtől).
- 2026-11-12 18:10: a záró sáv végleges képe a szerző választása: réz tárcsás telefonból készült lámpa (`public/images/telefon-lampa.webp`, a bal oldal a fotó színeiből elmosott háttérrel kiegészítve, hogy a szöveg alá illeszkedjen). A türkiz és a piros változat kikerült. Valószínű forrás: Johnny Briggs, „Upcycled vintage telephone lamp", Unsplash (Unsplash License) — a szerző erősítse meg.
- 2026-11-12 18:20: a forrás megerősítve (szerző: „az egyest"), a láblécben: „Telefonlámpa-fotó: Johnny Briggs, Unsplash". Előnézet: privát Claude-artifact a `site/claude-fooldal` buildjéből (az élő oldalt nem érinti).
- 2026-11-12 18:45: **nyitókép plakát-elrendezésben** (szerzői kérés, minta: a szerző régi Facebook-borítója és craigwhitementoring.com): új, frissebb portré (`public/images/sarkadi-sandor-arc.webp`), fekete-fehér, meleg tónussal és finom szemcsével, mert a forrásfotó felnagyított, lágy. Az arc kétharmada látszik a bal szélen, a kép jobbra áttűnéssel (CSS mask) olvad a világos háttérbe, a szöveg a kép harmadába belelóg. Mobilon a kép felül, a szöveg alulról ráúszik. A nyitás világos lett (eddig mélyzöld). A régi portré (`images/eletutak/sarkadi-sandor-portre.webp`) marad a repóban.
