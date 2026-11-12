# Agy — Sarkadi Sándor weboldala és ajánlatai

**2026. november 12-i aktuális munkairány:** a teljes főoldal prototípusa és az Életutak forrása közösen a `site/prototipus` ágon található. A közös indulási pont a döntésnapló, az állapotfájl és az `AGENTS.md`. A teljes főoldalból külön ajánlati landingekre vezetünk; a további magyar weboldalépítés a következő feladat. Az alábbi november 9-i megállapítások dátumozott előzmények.

Állapot: tartós projektkontextus; az aktuális és történeti anyagok olvasási sorrendje rögzítve

Utolsó frissítés: 2026-11-09

Ez a mappa a tényeket, döntéseket, háttérforrásokat és munkaszövegeket kezeli. A mappa vagy fájl megléte önmagában nem jelent végleges szerzői jóváhagyást.

## Mostani munkairány
A magyar Életutak-szöveg szerzői/emberi szerkesztése az aktív feladat. A portré, a jelenleg 26 képfájlos gyűjtemény és a négy nyelvi technikai megvalósítás elkészült. Az idegen nyelvű folytatás most parkoltatva van; a meglévő angol, német és olasz anyagokat megőrizzük.

A szerző által csatolt második AI Landing workshop teljes átíratát feldolgoztuk a meglévő Életutakhoz. Elkészült a [konkrét összevetés és tervezői feladat](ajanlatok/eletutak-talalkozasa/workshop-2-alkalmazas.md), a [kódból leírt dizájnrendszer](kozos/design-rendszer.md), valamint a helyi asztali és mobilos ellenőrzés. A terv még nem alkalmazásszöveg-módosítás vagy publikálás.

Olvasási sorrend: [iránytű](00-iranytu.md) → [aktuális állapot](munkamenet-es-allapot.md) → [döntésnapló](dontesnaplo.md) → szükséges közös háttér → az adott ajánlat saját mappája.

- `kozos/`: bemutatkozás, márkahang, arculat, bizonyítékok, elérhetőségek és többnyelvű állapot.
- `weboldal/`: az általános főoldal szerepe és felépítése.
- `ajanlatok/eletutak-talalkozasa/`: az aktuális Életutak-ajánlat, célcsoport, magyar szöveg, képek és a visszahíváskérő állapota.
- `ajanlatok/`: a további ajánlatok külön kontextusai; adataik nem cserélhetők fel automatikusan.
- `forrasok/`: eredeti brief, a workshop módszertani kivonata és [a saját hanghoz megtalált források](forrasok/sajat-szovegek/forrasjegyzek.md).
- `kepek/`: a képi források jegyzéke. Az eredeti képfájlok a tároló gyökerének `kepek/` mappájában vannak.

## Használat
Egy feladathoz a szükséges közös és ajánlati dokumentumokat töltsd be. Új tényhez forrás, változó adathoz dátum tartozzon. A legutóbbi egyértelmű szerzői döntés elsőbbséget élvez a régi, ugyanarra vonatkozó hiánylistával szemben.

Jelölések: **SZERZŐI DÖNTÉS**, **BRIEFBŐL ÁTVETT / MEGERŐSÍTENDŐ**, **JAVASLAT**, **HIÁNYZIK**, **ELKÉSZÜLT**, **PARKOLTATVA**. A parkoltatott idegen nyelvi folytatás nem hiányzó technikai megvalósítás.

Az ajánlati adatok forrása az `ajanlat.md`, a célcsoporté a saját `celcsoport.md`. A `landing-szoveg.md` munkaszöveg, az Életutak működő magyar szövege a `src/landing/content.js` fájlban van. A kontextuskarbantartás nem alkalmazásszöveg-módosítás vagy publikálás.

## Kapcsolódó anyagok
- [Szövegírás előtti összefoglaló](kozos/szovegiras-elokeszitese.md).
- [Befizetési és lemondási munkaváltozat](kozos/befizetes-es-lemondas-tervezet.md).
- [Egyéni kísérési napidíj](ajanlatok/egyeni-kiseres/ajanlat.md).
- [Korábbi tervezői átadás](atadas/claude-tervezoi-brief-es-prompt.md).

A korábbi [Claude-átadási ZIP](../atadas/Claude-atadas.zip) történeti csomag; nem a mostani teljes állapot. A teljes belső márkabrief és az újabb belső anyagok nem kerültek automatikusan a nyilvános GitHubra. A régebbi kontextusok külön dokumentációs ágon, a feltöltött képek a főágon vannak. Nyilvános feltöltés vagy új telepítés külön feladat.
