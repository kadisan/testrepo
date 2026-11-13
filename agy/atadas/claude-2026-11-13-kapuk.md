# Átadás Claude számára — 2026. november 13.

Munkaág: `site/chatgpt-figyelemvezetes`. Ennek a körnek a kiinduló commitja: `c165df5`. A `main`, a `site/claude-fooldal` és az éles domain nem módosult.

Elkészült alkalmazásforrás: `5fbb9b0`. Webes előnézet: https://site-chatgpt-figyelemvezetes.eletutak-talalkozasa.pages.dev/ ; a négy kapu közvetlenül `/#utak` alatt. Rögzített változat: https://bc2bd64b.eletutak-talalkozasa.pages.dev/ . A feltöltés utáni böngészős vizsgálatban is megjelent mind a négy szín és a mobilos elrendezés; az éles telepítés változatlan maradt.

## Olvasási sorrend

1. `AGENTS.md`, `agy/dontesnaplo.md`, az állapotfájl legutolsó bejegyzése.
2. `agy/kozos/kozponti-uzenet-es-metafora.md` — a szerző most pontosított központi gondolata.
3. `index.html`, `src/gates.css`, `src/site-refinement.css`, `tests/browser/gates.spec.js`.

## Mi változott a szakmai kritikához képest?

A szerző a kapukon a meglévő jelképeket kérte középre húzott, finom vízjelként; rámutatáskor négy külön mélyzöld hátteret, fehér szöveget és erősebb jelképet. A korábbi fotós kapuötlet helyett most ez az irány érvényes.

A központi tartalom a test–elme–lélek kapcsolata, a saját mottóval. A „saját út/kísérlek” szerepleírás önmagában kevésnek bizonyult. A szerző saját hangról is beszélt, majd a testesítés és a testből tanuló figyelem felé pontosított. Ne emeljünk egy korábbi munkaszlogent végleges üzenetté.

## Elkészült

- A szerzői mottó a főoldali nyitásba került, mellette a gyakorlási formák röviden megnevezve. A külön ismétlődő mottósáv megszűnt.
- Négy stabil kapuazonosító és külön előnézeti zöld; azonos rangú, teljes felületükön kattintható linkek.
- Középre igazított, vékony vonalas vízjelek; kiemeléskor eltérő erősségű kontraszt, fehér szöveg, finom emelkedés.
- Billentyűzettel ugyanez a kiemelés, jól látható fókusz. Érintőképernyőn egy érintés továbbvezet; nem vezettünk be első koppintásra megálló kiválasztást.
- 390 px-en kétoszlopos kapuk, rövidített feliratok; legfeljebb 360 px-en az olvashatóság miatt egy oszlop.
- A csökkentett mozgást kérő beállítás megszünteti az átmenetet és az emelkedést, a kiemelés megmarad.
- A kapuk stílusa külön `src/gates.css` komponensben van; a Tai Chi nem kattintható alapelvkártyáit nem érinti.

## Ellenőrzés

`npm test`: 20/20; build sikeres. A kapuk, a főoldal, a korábbi olvashatósági javítások és a Tai Chi érintett böngészős próbái: 23/23 sikeres.

Az új próbák külön vizsgálják a négy szín eltérését, a középre igazítást, a fehér szöveget és a vízjel legvilágosabb vonala fölötti legalább 4,5:1 kontrasztot, a billentyűs továbblépést, a mozgáscsökkentést és az egyszeri érintést. A korábbi próbák ellenőrzik az első főgomb láthatóságát 320/390/768/1440 px-en, a kétszeres szövegnagyítást és az adatot nem küldő előnézetet.

## Következő feladatok

1. Az új központi gondolat és a kapuk alapján nézd át a teljes főoldal ritmusát. A hosszú személyes, kísérési és könyves részek még a korábbi szerkezetet követik.
2. A Tai Chi-képsor helyben nyíló képnézője és a videómodul még nincs megvalósítva. Mind a hat teremfotó és a két kerti kép megmarad.
3. A későbbi YouTube/reels tartalmakhoz valós link és borító szükséges. Nincs üres, működést ígérő lejátszógomb.
4. A portré átmeneti. A stílusok további rendezése és a közös tartalomforrás kialakítása nyitott.

Frissítés előtt `git fetch origin`, majd a saját ágadra beolvasztva vagy célzottan átvéve dolgozz; ne írd felül más agent változásait. Az állapotfájl tartalmazza a ténylegesen feltöltött előnézet forrásverzióját. Az ág feltöltése továbbra sem a produkció élesítése.
