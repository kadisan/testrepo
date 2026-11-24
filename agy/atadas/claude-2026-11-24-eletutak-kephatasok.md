# Életutak — fotóval változó árkártyák és címek

A szerző először az alsó részvételi kártyákra kért áttetsző fotót rámutatáskor, a fenti dátumcsempékkel összetartozó képekből; utána a fejlécek/címek képi változását kérte. Ez konkrét folytatási kérés a korábban megállított dizájnmunkában. Az eredeti elrendezés, a képaláírások, a szöveg, az ajánlatok és a névvel közölt idézetek megmaradnak.

Az alsó csomagok nem egy-egy rögzített dátum árai. Ezért alapból a három eredeti fotó közös képháttere jelenik meg, amelyet konkrét dátum kiválasztásakor az egyalkalmas kártyán annak fotója vált fel. Törléskor mindhárom visszatér. A két/három hétvégés és a Télből tavaszba csomag nem kap hamis egyetlen dátumhoz rendelést. A díszítő képréteg `aria-hidden`, nem vezérlő. Hover/fókusz hatására 42%-os, 55%-ra sötétített fotó jelenik meg; a legvilágosabb lehetséges képpontra számított főszöveg-kontraszt legalább 5,46:1. Az egér mozgatása nem módosít választást.

A szakaszcímek témához illő 16%-os hátteret kapnak. A felső aláírásos fejléc, a nyitó erdőkép és a meglévő szállásfotó is finoman képes állapotba vált. Nincs új szöveg, űrlapmező, új fotó, ár vagy programígéret. Nincs új dekoratív tabulátorállomás. A meglévő vezérlők fókusza is megmutatja a képeket. Érintőképernyőn minden tartalom alapból megmarad. Csökkentett mozgásnál az átmenet és a nagyítás kikapcsolt.

Forrás: `conversion-render.js`, `conversion-client.js`, új `conversion-scenes.css` és importja a `main.js`-ben; a magyar HTML a renderelőből frissült. A három új böngészős próba a passzív rámutatást/fókuszt, a dátumhoz tartozó fotót/törlést, a kontrasztkorlátot, a szövegek helyben maradását és a mozgáscsökkentést ellenőrzi. 47/47 alapteszt, build, 11/11 korábbi releváns és 3/3 végső új böngészős próba rendben. Éles saját domain helyett a külön `eletutak-atnezes` frissítendő. A korábbi próba átirányítása megmarad.

Feltöltve `d08ab90`: https://eletutak-atnezes.kadisan.workers.dev/eletutak-talalkozasa/?v=20261124-kephatasok#reszvetel . Worker-verzió `5992c617-dee4-4dc4-ae65-6f181aaf4487`. Négy helyi és HTTPS-méretben rendben vannak az árkártyák és a címek képhatásai, az eredeti feliratok és keresztnevek, nincs kilógás, böngészőhiba, mérés vagy valódi beküldés. A kétszeres mobilos szöveg és a külön érintéses mód választása is rendben. A látható szöveg változatlanságát szöveg-összehasonlítás is igazolta. A saját domain kiadása továbbra is `c80192c9-dd90-4ba0-a4da-ebb18f9e749c`; az előnézeti képhatások még nem kerültek oda.

## A szerző következő pontosítása: nincs montázs

A három fotó együttes megjelenítése félreértés volt. A javított réteg pontosan egy, teljes szélességű fotót tartalmaz. Az alsó hármas alapképei balról jobbra az első, második és harmadik hétvége képei; a kiemelt egyalkalmas ajánlaté az első. Konkrét hétvége választása minden árkártyát annak egyetlen fotójára vált, törléskor visszaáll az egyképes alap. A három kép soha nem jelenhet meg együtt egy kártyán. Ez felülírja az átadó elején leírt közös képhátteret. A szakaszcímek további hatásaihoz, az áttetszőséghez és az ajánlat szövegéhez nem nyúltunk. A meglévő tesztek a montázs tiltását, az egyes dátumok helyes fotóját és a törlés után is egyképes állapotot kérik számon.

Javított forrás: `1babadf`; https://eletutak-atnezes.kadisan.workers.dev/eletutak-talalkozasa/?v=20261124-egy-kep#reszvetel ; Worker-verzió: `d2adc08f-1cc7-4951-b514-717567e952bf`. 47/47 alapteszt, build, 3/3 célzott böngészős próba, valamint mindhárom dátum váltása 390/1440 px-en helyben és HTTPS-en is rendben. Pontosan egy fotó jelenik meg minden árkártyán; teljes szélességű, nem montázs. Nincs valódi beküldés vagy éles saját domaines változtatás.

## Következő kérés: teljes szakaszos új kép és zöld háttér

A szerző a bevezető („Nem kell tudnod előre a választ”) képernyőképén a mályvás/rózsás színt és a képi megoldást elutasította. A meglévő napsütötte erdőillusztráció, `napfenyes-erdei-hatter.webp` most az egész bevezető mögött jelenik meg 25%-os, címre mutatva 30%-os rétegként. A korábbi erdei útfotós kis címhátteret itt kikapcsoltuk; mindkét hasáb teljes hátterét ugyanaz az egy kép tölti ki. A szakasz világos zöld, a felcím is sötétzöld. A programrész és a GYIK mályvás árnyalatai is zöldre változtak. A különböző csomagzöldek, a homokszínű idézetrész, az egyetlen hétvégefotós kártyák, a szöveg és a működés megmaradtak.

47/47 alapteszt, build, 12/12 érintett böngészős próba rendben. A meglévő címsoros teszt a bevezetőn már az egész szakasz hátterének erősödését ellenőrzi, nem a megszüntetett címcsíkot. Új fotó, szöveg, ár vagy űrlapváltozás nincs. Csak a külön előnézet frissítendő, az éles domain nem.

Feltöltött javítás `0db5fe9`: https://eletutak-atnezes.kadisan.workers.dev/eletutak-talalkozasa/?v=20261124-zold-bevezeto#neked ; Worker-verzió `065d3a3c-f38f-40ca-a855-c92db5c85a8c`. Négy helyi és HTTPS-méretben igazolt a teljes szakaszt fedő új kép, a két hasáb alatti folyamatos háttér, a zöld színvilág, a kikapcsolt címcsík és a kilógásmentes megjelenés. A konzervatív szövegkontraszt legalább 4,78:1. Nincs betöltési hiba vagy valódi beküldés; az éles domain változatlan.

## Új képanyag: gyaloglás és kapus változatok

A szerző a gyaloglós kép felhasználását kifejezetten kérte. A pontos eredeti az `origin/main:kepek/Springtime hike along countryside trail.png`, 1672×941 px; webes változata `public/images/eletutak/kozos-gyaloglas-illusztracio.webp`, 1440×810 px, 292 652 bájt. A kompozíció megmaradt, újragenerálás nincs. A kép a program címhátterében és „A hétvége ritmusa” teljes paneljén szerepel, alapból halványan, rámutatáskor/fókuszban sötétített képként. A lábléc illusztrációként jelöli a programhátteret. A hétvégék fotói, képaláírásai, az egyetlen képes csomagkártyák és az egyforma magas két programfotó megmaradtak.

A kapus képeket a szerző csak beágyazott chatképként adta át; megfelelő forrásfájlt a munkaállomáson és az elérhető Git-képanyagokban nem találtunk. Közvetlen fájllinket vagy repóbeli elérési utat kérdeztünk, válasz még szükséges a beépítéshez. Az ígért kapus próba ezért nyitott, nem állítható késznek. Az új gyaloglós WebP-t a külön előnézeti csomagba be kell ágyazni; az éles domainen még nem létezik.

A gyaloglós kép feltöltve `795a5f1`: https://eletutak-atnezes.kadisan.workers.dev/eletutak-talalkozasa/?v=20261124-gyaloglas#hetvege-ritmusa ; verzió: `952c83bd-98b8-46df-8d67-3544acb83fd9`. 47/47 alapteszt, build és négy helyi/HTTPS képernyőméret rendben, a halvány/hover/fókusz állapot működik, az eredeti hétvégefotók megmaradtak, nincs kilógás, hibás képkérés vagy valódi beküldés. A `/tmp/package_eletutak_walking_preview.py` az új WebP-t is beágyazza a külön csomagba. A saját domain változatlan, a kapus képhez a forrás továbbra is hiányzik.

## Következő kérés: kisebb, egységes idézetméret

A szerző a résztvevői idézetek méretét túl nagynak tartotta. Csak a `conversion-editorial.css` változott: mindhárom idézet 20–24 px-es közös skálát használ, mobilon 20 px; a vezető idézet külön nagy mérete kikerült. A Lora, a félkövér hangsúlyok, a keresztnevek és a forrásszövegek megmaradnak. Nincs új szöveg, kép vagy működésváltozás. Előnézeti csomagoláskor az új gyaloglós WebP beágyazását továbbra is meg kell tartani.

Feltöltve `98239c8`: https://eletutak-atnezes.kadisan.workers.dev/eletutak-talalkozasa/?v=20261124-idezetmeret#resztvevoi-hangok ; verzió `8c64fe53-34a0-4dcf-bd57-ef102457cd68`. A szakaszcím az áráttekintőével azonos, legfeljebb 40 px-es skálát kapott. 47/47 alapteszt, build és 9/9 olvashatósági próba sikeres; öt helyi/HTTPS szélességben egyforma idézetméret, megőrzött betűcsalád/kiemelések/nevek és hibamentes megjelenés, nagyított mobilos szövegnél is. Az éles saját domain nem változott.

## Dőlt betűk és erdőkép a résztvevői blokk mögött

A szerző dőlt idézeteket és képhátteret kért. A valódi Lora 500/700 Italic latin és latin-ext készlet bekerült a `main.js` importjai közé. A nevek és a cím álló betűsek, a kisebb betűméretek és a szövegek megmaradtak. A meglévő lombkoronakép a teljes szakasz háttere (18%, a címre mutatva 22%), az ottani kis címcsík kikapcsolt. A világos homokszín és a sötét szöveg olvasható marad. 47/47 alapteszt, build és 12/12 érintett böngészős próba rendben, öt méretben a valódi dőlt fontok betöltése is igazolt. Az előnézeti csomagolás az új nyolc `lora-*-italic-*` WOFF/WOFF2 fájlt is ágyazza be a meglévő 700-normal fontok és a gyaloglós WebP mellé; ezek az éles domainen még nincsenek. Éles kiadás nincs.
