# „Mire számíts?” — rövid Életutak-előnézet

A szerző a Tavaszi ívhez címzett vázlat kritikus értékelését kérte, majd az értékelésben javasolt rövid megoldás elkészítésére mondta: „Ez esetben tedd meg, kérlek”. A meglévő Életutak „A hétvége ritmusa” paneljét bővítettük; a külön Tavaszi ív oldal nem készült el és nem olvadt össze az Életutakkal. Az új konkrét szöveg a korábbi szerzői sorrend szerint jóváhagyásra vár; a saját domain most nem módosítható.

## Tartalom és megjelenés

111 szó, a címekkel és a két kapcsolódó hivatkozással együtt. A panel a pénteki megérkezést és szombat–vasárnapi programot, a már ismert közös bázist és ellátást, a téli körülményeket, a személyes megosztás szabadságát és a hívásban egyeztetett terhelhetőséget foglalja össze. Az ismétlődő általános megosztási mondat a programfejlécből átkerült ide. A díjak, idézetek, dátumok, vallási háttér és kapcsolat maradtak. A GYIK szövege nem változott; a gyalogtáv-kérdés látható címsora kapott stabil horgonyt.

A vázlat nem megerősített távját, bázisválasztását, vészhelyzeti telefonszámát, digitális csendjét, bármikori házba-visszatérését és fizetési ígéreteit nem állítjuk. A 30 000 / 30 000 Ft-os bontás változatlanul a részvételi kártyákon szerepel.

A meglévő világos panel, gyaloglós háttér, rámutatásos sötétzöld állapot és saját betűk maradtak. A „Mire számíts?” felirat a sötét képes állapotban is világos. A gyalogtáv-hivatkozás JavaScripttel kinyitja a választ, ismételt kattintás és közvetlen hivatkozás esetén is. JavaScript nélkül a látható, kézzel is megnyitható kérdéshez visz. A közvetlen horgony újratöltésekor észlelt görgetési eltérés a betűk beérkezése után korrigálva.

## Ellenőrzés és kiadási határ

48/48 alapteszt, build. A buildelt változaton az érintett 34 böngészős esetből 33 elsőre sikeres; a közvetlen GYIK-megnyitás javítása után az érintett két próba külön ismételve 2/2 sikeres. Öt helyi szélesség, kétszeres mobilos szöveg, betöltött képek, helyes árak és nevek, kilógás- és erőforráshiba-mentesség igazolva. A megőrzött tartalmi blokkok összehasonlítása és a négy panelkép a privát `/workspace/artifacts/eletutak-2026-11-26-mire-szamits/` mappában.

Az előnézeti csomagoló `/tmp/package_eletutak_expectations_preview.py`; a feltöltő `/tmp/deploy_eletutak_expectations_preview.py`, célja kizárólag `eletutak-atnezes`. A saját domain változatlanságát feltöltés után is igazolni kell; előtte a jelenlegi éles verzió `a7818d42-f800-4258-b257-a79c8759d85c`. Új valódi űrlapbeküldés nem történt.

## Feltöltött és ellenőrzött előnézet

Forrás: `94a346e1f957be7adcb658b24bd488abf22f9744`, közös ágra feltöltve. Link: https://eletutak-atnezes.kadisan.workers.dev/eletutak-talalkozasa/?v=20261126-mire-szamits#hetvege-ritmusa . Worker-verzió: `9cc25176-91d3-402d-b3df-7c047fc4326d`. A HTTPS-metaadat forrása és a `practical-weekend-expectations` változatjelölés egyezik.

A közvetlen GYIK-horgony a betűk beérkezése és az oldal betöltése utáni képkockában igazodik a kérdéshez; így a böngésző görgetés-visszaállítása után is megfelelő helyen marad. A javítás utáni két célzott próba 2/2, az öt helyi és öt HTTPS-nézet is sikeres. A HTTPS-próba a mobilos közvetlen újratöltést, a JavaScript nélküli megnyitható kérdést, a kétszeres szöveget, képeket, neveket és valamennyi díjbontást is ellenőrizte. Nincs kilógás, hibás erőforrás, böngészőhiba vagy valódi adatbeküldés. A szerzőnek küldött panelhorgony mobilos megérkezése külön képpel igazolva; a HTTPS asztali panelkép vizuálisan ellenőrizve.

Az API-összevetés szerint az éles saját domain változatlanul `a7818d42-f800-4258-b257-a79c8759d85c` verzión fut. **A kész konkrét szöveg jóváhagyásra vár.** A későbbi élesítéshez a teljes `scripts/package_site.py` csomagolás és `sarkadi-site` Worker szükséges; az előnézeti feltöltő éles célra nem használható.
