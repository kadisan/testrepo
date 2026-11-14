# Munkamenet és aktuális projektállapot

Utolsó frissítés: 2026. november 12.

**Aktuális megvalósítás ezen az ágon:** `site/chatgpt-figyelemvezetes`, kiinduló Claude-commit `3312e9a`. Az új nyitás, az előrehozott négy kapu, az olvashatóság és a célzott Tai Chi-jelzés ezen az ágon olvasható. A korábbi Claude-bejegyzések dátumozott előzmények, nem új hiánylisták.

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
- 2026-11-12 19:00: a nyitóportré háttere erdő (szerzői kérés): a szerző kivágott alakja a meglévő `napfenyes-erdei-hatter.webp` elmosott részletén, ugyanazzal a fekete-fehér tónussal; a kép 62% széles, az áttűnés később kezdődik, hogy az erdő látsszon. **Montázs** — ha a szerző készít valódi fotót erdőben ugyanebben a beállításban, azt kell betenni.
- 2026-11-12 19:15: **színes nyitóportré** (szerzői kérés): a szerző eredeti, éles fotójáról kivágva (a képen szereplő másik személy nem kerül fel, a forrásfotó nincs a repóban), háttér a szerző korábbi „Lépj be a fák közé" borítójának lombkorona-fotója, szöveg nélkül, elmosva. A póló sötétkékről finoman zöldes tónusra árnyalva. A nyitás újra sötétzöld, világos szöveggel. Továbbra is montázs (beltéri fény).
- 2026-11-12 19:05: a szerző döntése: a portré-montázsok (fekete-fehér, erdei, színes) **visszavonva**, a nyitás a 18:20-as állapotra áll vissza (eredeti portré, sötétzöld, kétoszlopos). A plakát-elrendezés ötlete él, a szerző jobb fotót keres hozzá.
- 2026-11-12 19:25: **új nyitóportré, valódi fotó** (a szerző 2026-os, természetes fényű szelfije egy fa előtt; nincs montázs, csak egy háttérben lévő ablak retusálva és a fal színével kiegészítve jobbra). Plakát-elrendezés: az arc kétharmada a bal szélen, a kép krémszínű háttérbe olvad, a szöveg ráúszik. A nyitás krémszínű, sötétzöld szöveggel. A szerző további fotói (erdei írás, fa-ölelés, csoportkép, kertes ház) még nincsenek beépítve.

## 2026-11-12 — ChatGPT: figyelemvezetés és órai jelzés

Kiinduló ág: `site/claude-fooldal`, commit: `3312e9a`. Saját munkaág: `site/chatgpt-figyelemvezetes`.

- Referenciák: Dominique Ara a szerző által küldött elemzésből; Annie P. Woods nyilvános oldala asztali és mobilos böngészőnézetben. Következetes természeti motívum, konkrét meghívás, rövid út a választásig. Nem veszünk át üzleti célcsoportot, ajánlatot vagy ügyfélvéleményt.
- Főoldali sorrend: portrés nyitás konkrét tevékenységekkel → négy kapu → rövid ráismerés → Rólam (saját Tai Chi-szövegből) → szerzői mottó → további háttér, könyvek, kapcsolat.
- A szerző közben újracsatolta a pontos háttérreferenciát: a „Lépj be a fák közé” borító sötétzöld lombkoronája. A `public/images/lombkorona-hatter.webp` ennek képalkotó eszközzel feliratmentesített változata; az eredeti borító a `main/kepek/mi vagyok.png`. A természetes fényű portré képfájlja változatlan; a méretezés és a lombkoronába futó áttűnés CSS-ben történik. A napsütötte átmeneti háttér már nincs az új nyitásokon.
- Közös, olvasható alap: `src/site-refinement.css`, 20 px törzsszöveg, 18 px segédszöveg; a díszítő címkék és a márkajelzés ettől eltérhetnek.
- Tai Chi: a nyitásban idő, hely, hozzájárulás; korábban látható próbaóra; hangsúlyos saját bemutatkozás. A nem megerősített egyéni óradíj helyett egyeztetés szerepel. A 28 napos kihívás a talonban marad, a nyitott kiküldést nem ígéri az oldal.
- Célzott jelzés: választott szerda, név, e-mail, telefon, hozzájárulás; kérdés opcionálisan. Gyaloglási kérdés és hívási idősáv nincs a saját Tai Chi-felületen. A Google fogadó űrlap kötelező elérhetőségi mezői miatt az e-mail és a telefon megmaradt. A kiválasztott óra és az egyeztetési cél automatikusan kerül a meglévő Google-űrlap megfelelő mezőibe.
- A véglegesítés továbbra is a közös Google-űrlapon történik. Annak opcionális gyaloglási kérdései ott még megjelenhetnek; új Google-űrlap nem jött létre, fiókbeállítást nem változtattunk. Az átadás nem igazolt beérkezés és nem Meta Lead.
- Az adatkezelési forrástervezet az órai jelzés dátumát és egyeztetési célját is leírja; a korábban jóváhagyott élő szöveg nem változott telepítés nélkül.
- A fejlesztői `formEnabled` és `metaPixelEnabled` kapcsolók változatlanul kikapcsoltak. A teljes főoldal és Tai Chi élesítése, valamint az ajándék Substack-kiküldése továbbra is külön beállítás. A meglévő Életutak kódja, Worker, DNS és kampány nem változik.

Ellenőrzés: az alább rögzített végső ellenőrzési eredmény az aktuális; a korábbi tesztszámok történetiek.

### Az új változat végső ellenőrzése

- `npm test`: **20/20 sikeres**. A naptári dátumválasztás és a Google-átadás új egységtesztet kapott.
- `npm run build`: sikeres.
- Az érintett főoldali, Tai Chi- és új regressziós böngészőtesztek végső futása: **19/19 sikeres**. Benne: 320/390/768/1440 px, látható első gomb, előrehozott kapuk, saját Tai Chi-szöveg, órai adatok, dátumellenőrzés, helyben elfogott Google-átadás, adatot nem küldő előnézet, 40 px-es gyökér-betűmérettel kétszeresre nagyított szöveg, menü és billentyűzet.
- A teljes ellenőrzési körben a meglévő 33 Életutak-, marketing- és olvashatósági próba sikeres volt. A főoldali nagyítás során talált hosszú szavas és láblécbeli kilógásokat javítottuk; az érintett 19 próbát ezután külön újrafuttattuk. Egy korábbi betűbetöltési időtúllépés a végső futásban nem ismétlődött.
- A külső Google-kéréseket a tesztek elfogták; valódi jelentkezést nem küldtünk. Éles telepítés nem történt.
- Vizuális előnézet és képek külön helyi műtermékként készültek; nem részei a nyilvános forráscommitnak.

### A pontos háttérreferencia beérkezése

A szerző a munka közben újracsatolta a sötétzöld lombkoronás borítót. A háttérből a fehér feliratokat és a betűbe épített rajzot képszerkesztő modell távolította el. Az új webes kép 1670×941 px, WebP; a portré arca nem változott. Mindkét új nyitás ezt a lombkoronát használja, világos szöveggel és sötétzöld kontrasztréteggel.

Ellenőrzés a háttércsere után: sikeres build és **19/19 sikeres érintett böngészőteszt** (a végső futás 2026-11-12 19:23 UTC-kor zárult). A friss asztali és mobilos képeken nincs hiányzó kép vagy vízszintes kilógás. A külön HTML-előnézet képei is ezt a változatot mutatják. Az élő oldal és a főág változatlan.

### 2026-11-12 — Megnyitható webes előnézet

A szerző külön webes előnézetet kért. A `f57b2d9` forráscommit tesztelt buildje a meglévő Cloudflare Pages-projekt **preview** környezetébe került, a `site/chatgpt-figyelemvezetes` ágra.

- Főoldal: https://site-chatgpt-figyelemvezetes.eletutak-talalkozasa.pages.dev/
- Tai Chi: https://site-chatgpt-figyelemvezetes.eletutak-talalkozasa.pages.dev/tai-chi/
- Rögzített változat: https://78550be2.eletutak-talalkozasa.pages.dev/
- A feltöltött csomagban a fogadás és a Meta Pixel kikapcsolva maradt. Külön `robots.txt` és `X-Robots-Tag` tiltja az előnézet keresőindexelését; ezek csak az előnézeti csomag kiegészítései.
- Valódi böngészős ellenőrzés a webes címen: 1440 és 390 px, nincs vízszintes kilógás, hiányzó kép, JavaScript-hiba vagy hibás erőforrás. A főgomb teljesen látszik, a főoldal → Tai Chi navigáció működik; a próbaűrlap nem küld adatot.
- A Cloudflare API igazolta, hogy a produkciós telepítés továbbra is `b5ead318-aa51-4cb9-a6ce-37cd8d598d27`. A sarkadisandor.hu, a Worker és a DNS nem változott.

### 2026-11-12 — A Tai Chi-fotók közös kerti háttere

A szerző a két mozdulatfotó hátterének egységesítését kérte. A széles állást mutató kép egyszerű, füves kertje lett a referencia. Ehhez készült az egylábas mozdulat háttércseréje képszerkesztő modellel: `public/images/taichi/sarkadi-sandor-tai-chi-kert-egyseges.webp`. A modell a két saját forrásfotót kapta, a mozdulat, az arc és a ruházat megőrzésére szóló utasítással. Az eredeti képfájlok megmaradtak; a széles állás képét nem kellett újragenerálni.

Csak a Tai Chi-oldal használja az új képet. A főoldalon maradt az eredeti kerti fotó. A `#tanar` portrékerete követi a kép teljes arányát, hogy a kéz és a mezítlábas állás mobilon se vágódjon le.

Ellenőrzés: `npm test` 20/20, build sikeres, a Tai Chi böngészőtesztek 4/4 sikeresek. Külön asztali és mobilos képméret- és megjelenésellenőrzés is készült. A `f1d703b` forráscommit frissítése felkerült a már ismert külön Cloudflare-előnézeti ágra. A webes címen 390 és 1440 px-en is betölt a két teljes alakos kép, nincs képkivágás, vízszintes kilógás vagy hibás erőforrás. A Cloudflare API igazolta az éles telepítés változatlanságát; a főág és a fogadási beállítások nem változtak.

Frissített Tai Chi-előnézet: https://site-chatgpt-figyelemvezetes.eletutak-talalkozasa.pages.dev/tai-chi/#tanar . Rögzített változat: https://f57bab33.eletutak-talalkozasa.pages.dev/tai-chi/ .

### 2026-11-12 — Külön hatképes mozdulatsor

A szerző új ZIP-et küldött (`tai_chi_6_valogatott_kep.zip`): hat gyakorlási pillanat, mindegyikhez közeli kivágás és teljes képkocka. A szerző a külön képsort választotta, a két kerti kép mellett.

- Új `#mozdulatsor` blokk az óra menete után: asztalon három-, tableten kétoszlopos galéria; mobilon egy sorban, oldalra lapozható képek. Nincs automatikus lejátszás vagy új JavaScript.
- A hat közeli kép maradt az eredeti sorrendben. A teljes képkocka kattintásra új lapon nyílik. Nincsenek kitalált mozdulatnevek vagy résztvevői állítások.
- Webes képek: `public/images/taichi/mozdulatsor/`; 480×600 px bélyegképek és 720×1280 px teljes képek, WebP-formátumba kódolva. Nem történt új képkivágás, fényelés vagy generatív átalakítás. A hat bélyegkép összesen kb. 201 KiB, késleltetett betöltéssel.
- Mindkét kerti fotó és a főoldal tartalma változatlan maradt. A fogadás és a Meta Pixel továbbra is kikapcsolt előnézeti beállítás.

Ellenőrzés: `npm test` 20/20; build sikeres; az érintett meglévő böngészőtesztek 13/13 sikeresek. Külön galériaellenőrzés 320/390/768/1440 px-en: hat betöltött fotó, nincs teljes oldalas vízszintes kilógás, mobilon a hatodik fotó billentyűzettel is elérhető, a teljes kép új lapon megnyílik, kétszeres szövegnagyításnál is helyben marad a tartalom. Valódi jelentkezés nem ment ki.

A `161db64` forráscommit webes előnézete elkészült, ugyanezekkel a galériaellenőrzésekkel a nyilvános címen is: https://site-chatgpt-figyelemvezetes.eletutak-talalkozasa.pages.dev/tai-chi/#mozdulatsor . Rögzített változat: https://75a5627b.eletutak-talalkozasa.pages.dev/tai-chi/ . A Cloudflare API igazolta, hogy a produkciós telepítés az előnézeti feltöltés alatt változatlan maradt. A DNS, a Worker és a főág nem módosult.

### 2026-11-13 — Fejlesztői kritika, dinamikusabb vizuális irány

A szerző változatosabb tagolást és dinamikusabb weboldalt kér, a tekintet tudatos vezetésével. Rögzítve a döntésnaplóban: a nyitóportré átmeneti; később YouTube-videók vagy reels-ek érkezhetnek. Konkrét videólink még nincs.

Friss, valódi böngészős vizsgálat a főoldalon és a Tai Chi-oldalon, asztalon és mobilon. Eredmény és megvalósítási javaslat: `agy/weboldal/fejlesztoi-velemeny-2026-11-13.md`. A főoldal 12, a Tai Chi 13 fő szakasz; 390×844 px-en körülbelül 17,5 és 19,4 képernyőnyi tartalom. A felület fő problémája az ismétlődő elrendezés és a hasonló vizuális súly, különösen a bemutatkozásnál és könyveknél.

Javaslati sorrend: új vizuális ritmus → képes, azonos rangú négy kapu → rövidebb személyes rész → célzott mozgás, helyben nyíló képek és cserélhető videómodul. Ezek fejlesztői ajánlások; a mostani körben kizárólag a dokumentáció frissült. A felület, a meglévő előnézet és az éles telepítés nem módosult; ezért buildet vagy regressziós teszteket nem futtattunk újra.

A saját domain friss, böngészős ellenőrzése: főoldal és `/tai-chi/` 404; `/eletutak-talalkozasa/` 200. A kritika a működő külön előnézet alapján készült. Helyi képernyőképek és mérések: `/workspace/artifacts/fejlesztoi-attekintes-2026-11-13/` (nem része a nyilvános commitnak).

### 2026-11-13 — Központi mottó és működő, jelképes kapuk

A szerző a fejlesztés megkezdését kérte. Közben pontosította a központi üzenetet: saját/belső hang, majd a testesítés és a saját mottó test–elme–lélek kapcsolata. A szerzői alap és a tervezői értelmezés külön rögzítve: `agy/kozos/kozponti-uzenet-es-metafora.md`. A tervezői munkamegnevezés „a test mint tanító”; a nyilvános nyitás a saját mottót használja.

Elkészült első kör:

- Mottó a nyitásban, külön sorban a Tai Chi, gyaloglás és erdei jelenlét; a korábbi külön mottósáv ismétlése megszűnt. A portré továbbra is átmeneti.
- A négy kapu közepén a meglévő, vékony vonalas jelkép vízjelként. Rámutatáskor négy külön mélyzöld háttér, fehér felirat és erősebb jelkép; finom emelkedés. A szerző konkrétan ezt kérte a korábbi fotós kapujavaslat helyett.
- Billentyűs kijelöléskor ugyanaz a kiemelés és jól látható fókusz. Telefonon egy érintés továbbvezet; a rámutatásra épülő állapot nem akadályozza a linket. A csökkentett mozgást kérő beállítás érvényesül.
- Mobilon két oszlop, a legkeskenyebb nézetben egy. 390 px-en a kapurész 1456-ról 931 px-re rövidült; a teljes főoldal a mért nézetben 14773-ról 13900 px-re, a fő szakaszok száma 12-ről 11-re. A teljes ritmus-áttervezés még nincs lezárva.
- A kapuk önálló stílusa `src/gates.css`; csak a főoldali `path-gates` elemeket érinti. Az ajánlati céloldalak, a Tai Chi-képek, a hatképes sor és a fogadás beállításai megmaradtak.

Ellenőrzés: `npm test` 20/20; build sikeres; az érintett böngészős próbák 23/23 sikeresek. Az új négy próba a különböző színeket, a fehér szöveget, a középre igazított vízjelet, a vízjel fölötti legalább 4,5:1 kontrasztot, a billentyűs továbblépést, a mozgáscsökkentést és az egy érintéses megnyitást ellenőrzi. A korábbi próbákban 320/390/768/1440 px, látható első gomb, kétszeres szöveg és adatot nem küldő próbaűrlap is szerepel.

Claude számára külön átadás készült: `agy/atadas/claude-2026-11-13-kapuk.md`. A további ritmusjavítás, helyben nyíló képnéző, videómodul és szerkeszthető tartalomforrás feladatai ott szerepelnek; működő videóbekötés még nincs. Helyi képernyőképek: `/workspace/artifacts/kapuk-2026-11-13/` (nem része a nyilvános forráscommitnak).

A `5fbb9b0` alkalmazásforrás előnézete feltöltve és a webes címen is megvizsgálva: https://site-chatgpt-figyelemvezetes.eletutak-talalkozasa.pages.dev/ ; közvetlenül a kapuk: https://site-chatgpt-figyelemvezetes.eletutak-talalkozasa.pages.dev/#utak . Rögzített változat: https://bc2bd64b.eletutak-talalkozasa.pages.dev/ . A négy külön zöld és a fehér szöveg, valamint a mobilos elrendezés a feltöltött változatban is megjelent. A Cloudflare API igazolta az éles telepítés változatlanságát. A `main`, a DNS és a Worker nem módosult.

### 2026-11-13 — Claude: közös ág, kérdések ChatGPT-nek, szerdai szünetek

A szerző döntése: egy közös munkaág (`site/chatgpt-figyelemvezetes`), az `AGENTS.md` Git-szabályai frissítve. Claude átnézte a `86fb617` állapotot: build sikeres, `npm test` 20/20, a teljes Playwright-sor a build ellen 56/56. A szerző Claude privát előnézetén látja a közös ág állapotát. Kód nem változott.

Claude kérdései és a szerző válaszai: `agy/atadas/chatgpt-2026-11-13-kerdesek.md`. Ebben szerepel a portré-ködfolt (pihen, új arcfotó jön), a kettévágott mottócím, a kivett „Test. Elme. Lélek” rész, az űrlapmezők, és hogy a kihívások nem kerülnek a weboldalra. Szerdai szünetek: törvényes ünnep 2027 végéig nem esik szerdára. A Kesztyűgyár zárva tartása (2026. 12. 23. és 30.) a szerzőtől várható. Megvalósítási javaslat: adatlista + a választó kizárja ezeket a dátumokat.

Következő lépés: ChatGPT válasza a kérdésfájlban; utána közös vázlat a főoldal ritmusáról, és csak azután HTML.

### 2026-11-13 — Claude: brief a Claude Design számára

A szerző Claude Designnal dolgozik a főoldal ritmusán. Brief: `agy/weboldal/claude-design-brief.md`. Benne van a „Tengely és tempó” kérdéseire adott válasz is: a fő lépés a szerdai jelzés, a Tai Chi saját aloldal, nem a főoldal elé kerülő landing. Mellé két önálló, szkript nélküli HTML-pillanatkép készült a főoldalról és a Tai Chi-oldalról; ezek nem részei a repónak. Kód nem változott.

### 2026-11-13 — Csendes könyv: a három szerzői döntés lezárva

Az egyetlen közös munkaág mostantól **`site/csendes-konyv` — Csendes könyv (B)**. A már meglévő referenciaág kapta ezt a szerepet; a korábbi `site/chatgpt-figyelemvezetes` történeti ág. A helyi ág az új távoli ágat követi. Az `AGENTS.md`, az iránytű, a referencia README-je és a döntésnapló ezt az állapotot rögzíti.

A szerző jóváhagyta az ErdőLét-megnevezés megtartását link nélkül, illetve a rövid test–elme–lélek magyarázó híd visszahelyezését. Az ErdőLét-sor a referenciában már szerepelt. A híd most a nagy dőlt közjáték és a kerti kép közé került a referencia-HTML-ben: „A test adja a jeleket. Az elme megtanul figyelni rájuk. És a figyelemben a lélek is szóhoz jut.”

Claude korábbi kérdéseire a válaszok az eredeti `agy/atadas/chatgpt-2026-11-13-kerdesek.md` fájlba kerültek, külön válaszszakaszba. A referencia betűiről szóló README-pontosítás is megtörtént: a képek beágyazottak, a betűk Google Fonts-ról jönnek; a működő változatban a meglévő helyi betűk maradnak.

A működő `index.html`, `src/`, űrlaplogika és az ajánlati oldalak ebben a körben nem módosultak; a B beépítése a következő fejlesztési feladat. A korábban feltöltött webes előnézet és a produkció változatlan. A mobilmenü, az első gomb láthatósága, a teljes mottó egy `h1`-ben, a 20/18 px-es olvashatósági alap és az űrlap segédszövegei a beépítés megőrzendő/javítandó feltételei.

Ellenőrzés: a híd egyszer szerepel, a közjáték után és a kerti kép előtt; 1440 és 390 px-en 20 px-es, a saját hasábján belül maradó szövegként jelenik meg. A hat beágyazott kép változatlan. Az alkalmazásforrás diffje üres; buildet és alkalmazás-regressziós tesztet ehhez a dokumentációs/referenciafrissítéshez nem futtattunk. A referencia korábban jelzett teljes mobilos elrendezési gondjai a későbbi beépítéskor javítandók.

### 2026-11-13 — Claude: a Csendes könyv (B) beépítve a főoldalba

A B ritmusa az `index.html`-ben és az új `src/csendes-konyv.css`-ben (`body.ck`, csak a főoldal). Megtartva: a négy kapu (`gates.css`), az űrlap logikája és segédszövegei, a mobilmenü, az ugrólink, a helyi betűk. Teljes mottó egy `h1`-ben. A fő gomb az első képernyőn van 320/390/768/1440 px-en. A záró hívásgomb világos körvonalas. ÁSZF-link nincs. A Cormorant dőlt latin-ext készlet bekerült (ő/ű). Ellenőrzés: `npm test` 20/20, Playwright a build ellen 60/60, új `csendes-konyv.spec.js`. Claude privát előnézete frissítve. Átadás: `agy/atadas/chatgpt-2026-11-13-csendes-konyv-beepites.md`.

### 2026-11-14 — Claude: új logó a főoldalon és a Tai Chi-oldalon

A szerző logócsaládja (S-jel + név + tagline) a név helyén a szerző kézzel írt, vektorizált aláírásával. Fájlok: `public/images/logo/fejlec-logo-sotetzold.webp` (fejléc/lábléc, világos háttér), `fejlec-logo-kremszin.webp` (sötét háttérre), `sarkadi-sandor-logo.png` (2000×667, zöld háttér, megosztási kép alapja). Böngészőikon: `public/favicon.ico`, `favicon-16/32.png`, `apple-touch-icon.png`, `icon-192/512.png`; a `<head>` hivatkozásai a főoldalon és a Tai Chi-oldalon. A szöveges márkajel (⌁) mindkét oldal fejlécében és láblécében lecserélve; méret: 64 / 58 / 50 px, láblécben 52 px. Ellenőrzés: `npm test` 20/20, Playwright a build ellen 60/60.

**Nyitott:** az Életutak-landing (`src/landing/conversion-render.js`, `scripts/render-landing.mjs`) logó- és faviconcseréje még nem történt meg; az a landing éles csomagját is érinti, külön lépésben (a szerző Codexnek írt átadása szerint: `<br>` előtti szóközök javítása is ott).
