# Tömörítés és díjbontás — szerzői jóváhagyásra

A szerző a középső szövegek tömörítését és az egyhétvégés összköltség 30 000 / 30 000 Ft-os bontását kéri. Csak külön előnézet készül; az élesítéshez új jóváhagyás kell. A november 26-i már éles weboldalt nem írjuk át automatikusan.

## A copy szerkesztése

A bevezető rövidebb, három bekezdésben mutatja a változáshelyzetet, a program szerepét és az egyedül érkezés lehetőségét. A program három elemének magyarázata rövidebb; az önálló, a főcímet és bevezetőt ismétlő eredménybekezdés kikerült. A hétvége ritmusában a felsorolás rövidült, az érkezés/táv/étkezés egyeztetésére vonatkozó gyakorlati megjegyzés megmaradt. A kísérőnél megmaradt az indulás éve, a minősítések és a személyes vallási háttér leírása; a mozdulat/csend és előzetes hívás újabb ismétlése kikerült. Összesen 321 → 216 szó, 33% tömörítés.

A három névvel vállalt idézet szövege, a GYIK, a dátumkártyák és a kapcsolatfelvételi rész HTML-je változatlan. Kép, hover-hatás és oldalrend nem változott. A gyakorlati kapaszkodók bővítése és a későbbi szépirodalmi hangolás nem ennek a körnek a része.

## A jóváhagyásra váró díjbontás

| Csomag | Szállás és étkezés | Programvezetés | Személyes folytatás | Összköltség |
|---|---:|---:|---:|---:|
| Egy hétvége | 30 000 Ft | 30 000 Ft | — | 60 000 Ft |
| Két hétvége | 60 000 Ft | 40 000 Ft | — | 100 000 Ft |
| Három hétvége | 90 000 Ft | 70 000 Ft | — | 160 000 Ft |
| Télből tavaszba | 90 000 Ft | 70 000 Ft | 40 000 Ft | 200 000 Ft |

Az egyhétvégés 30 000 + 30 000 Ft szerzői adat. A további bontás ennek következetes alkalmazása a meglévő csomagárakra: rögzített szállás/étkezés, a kedvezmény a vezetésből vonódik le. Ezt a feltételezést külön megmutatjuk az előnézetben és a szerzőnek is jelezzük. Új fizetési címzettet vagy fizetési szabályt nem találtunk ki. Az összeg fejenként értendő, a kiemelt szám teljes összköltségként szerepel.

A későbbi négynapos díjak csak privát háttéradatként szerepelnek a munkamappában; a nyilvános repóba és landingbe nem másolhatók. Új programnál vagy későbbi díjazási körnél vissza kell kérdezni az aktuális tételekre és a bontási logikára.

48/48 alapteszt, build, 32/32 érintett böngészős eset, öt helyi szélesség és kétszeres mobilos szöveg rendben. A díjbontás számtani összegeit külön üzleti szabály- és felületi elvárások is ellenőrzik. Előnézeti csomagoló: `/tmp/package_eletutak_concise_costs_preview.py`; feltöltő: `/tmp/deploy_eletutak_concise_costs_preview.py`. Csak az `eletutak-atnezes` célozható velük, `sarkadi-site` nem.


## Ellenőrzött jóváhagyási előnézet

Forrás: `1a622d2`, közös ágra feltöltve. Előnézet: https://eletutak-atnezes.kadisan.workers.dev/eletutak-talalkozasa/?v=20261126-tomorites-dijbontas#neked ; közvetlen díjbontás: ugyanez `#reszvetel` horgonnyal. Előnézeti Worker-verzió: `61702fe9-7fa2-45b6-8d1c-5dd5c83296dd`.

A tényleges HTTPS-előnézet öt szélességben (320/390/768/1440/1920 px) átment az ellenőrzésen. A négy csomag díjtételeinek összege mindenütt helyes; a kiemelt teljes költségek 60/100/160/200 ezer Ft. Az összes kép betölt, a keresztnevek megmaradtak, nincs kilógás vagy betöltési hiba. A 390 px-es kétszeres szöveg is rendben. Nem történt valódi beküldés.

Az éles `sarkadi-site` a külön előnézet feltöltése után is a korábbi `3bfa09cf-d7fc-4be6-b957-b762c8c3b184` verzión fut, a két kiadás API-azonosítója összevetve. **Élesítés nem történt; a következő lépés a szerző jóváhagyása.** A jóváhagyott változat jövőbeli élesítéséhez a teljes site-csomagolást kell használni; a mostani előnézeti feltöltőt nem szabad éles Workerre átirányítani.
