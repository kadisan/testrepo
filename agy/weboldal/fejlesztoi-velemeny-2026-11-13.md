# Fejlesztői vélemény — 2026. november 13.

Állapot: szakmai javaslat, még nem megvalósított áttervezés.

Későbbi, november 13-i pontosítás: a szerző a négy kapun a meglévő jelképeket kérte, középre helyezett vízjelként, négy mélyzöld kiemeléssel. Ez a fotós kapukra tett alábbi ajánlást pontosítja. A központi gondolat a saját test–elme–lélek mottóra épül; az első nyitás- és kapufrissítés elkészült. Aktuális állapot és következő feladatok: `agy/atadas/claude-2026-11-13-kapuk.md`. Az alábbi felmérés a módosítások előtti változat dokumentuma.

Vizsgált változat: a `161db64` forráscommitból közzétett, `75a5627b` azonosítójú Cloudflare-előnézet; a munkamenet dokumentációja a vizsgálatkor `9b46a09` commiton állt. A főoldalt és a Tai Chi-oldalt friss, valódi böngészős nézetben, 1440×1000 és 390×844 px-en ellenőriztük. A mostani munka nem módosította a felületet vagy a telepítést.

## A szerző új iránya

- A főoldali nyitóportré átmeneti, végleges fotóra cserélendő.
- A tagolás monoton; kreatívabb vizuális ritmus és dinamikusabb működés szükséges.
- A tekintet vezetése és a korábban kért olvashatóság egyszerre követelmény.
- Később YouTube-videók vagy reels-ek is érkeznek. A lejátszó tényleges bekötéséhez még nincs konkrét link.

## Ami jelenleg látszik

| Oldal | Fő szakaszok | Asztali magasság | Mobilmagasság | Mobilképernyők, közelítőleg |
| --- | ---: | ---: | ---: | ---: |
| Főoldal | 12 | 8496 px | 14773 px | 17,5 |
| Tai Chi | 13 | 10597 px | 16333 px | 19,4 |

A képernyőszám a dokumentummagasság és a vizsgált 844 px-es magasság hányadosa, nem használati statisztika. A hossz önmagában nem minőségi hiba; itt az ismétlődő szakaszokkal együtt lassítja a tájékozódást. A nagy betűméretet a következő változat is őrizze meg.

- A tartalom túlnyomó része nagyon közeli világoszöld tónusokon jelenik meg. A sötét nyitás és a telefonlámpás zárás között kevés erős vizuális fordulat van.
- Gyakran ismétlődik a nagy cím és az oszlopba rendezett magyarázat párosa. A hasonló térközök a különböző fontosságú tartalmaknak hasonló súlyt adnak.
- A négy kapu mobilon 1456 px; a választás elérhető, de mind a négy lehetőség áttekintéséhez sokat kell görgetni.
- A könyvrész mobilon 2588 px. A Tai Chi tanári bemutatkozása 2265 px; ez a gyakorlás megismerése előtt különösen hosszú kitérő.
- A hat mozdulatfotó asztalon 1511 px magas. A képek teljes megnyitása jelenleg új lapot nyit.
- Van működő menü, GYIK és mobilos képlapozás. Videó és beágyazott lejátszó jelenleg nincs.

## 1. Először a vizuális ritmus és a tartalmi súlyok

Eltérő szerepű részek eltérő formát kapjanak: képes nyitás, áttekinthető választó, rövid személyes megszólalás, nagy fotós szünet, tömör aktuális ajánlat és egyszerű kapcsolat. A mélyzöld, a világos zöld és a képfelület váltakozása maradjon következetes; az okker a fontos cselekvéseket jelölje.

A hosszú bemutatkozás rövid bevezetőből és megnyitható részletekből álljon. A főoldal részletes Tai Chi-adatblokkját az önálló landing szerepéhez kell igazítani. A könyvek két borítója és az írásokhoz vezető link kompaktabb közös felületet kaphat.

## 2. Négy azonos rangú, képes kapu

A négy tevékenység továbbra is azonos rangú. Az ismétlődő ikon-kártyák helyett négy saját helyzetfotó, rövid cím és egyértelmű továbblépés adjon külön karaktert az utaknak. Mobilon tömör, kétoszlopos választó vizsgálható, a nagy betűk és kényelmes érintési felületek megtartásával.

Az egérrel és a billentyűzettel kijelölt kapu képe finoman reagálhat; az információ érintőképernyőn is teljes legyen.

## 3. Célzott mozgás és helyben maradó interakciók

- Rövid, egyszer lefutó belépések a kulcselemeknél; a tartalom a JavaScript betöltése előtt is hozzáférhető.
- Egy finom, visszatérő útvonal- vagy ecsetmotívum kösse össze a fontos pontokat. Ne kerüljön az olvasott szöveg mögé mozgó részlet.
- A mozdulatsor nagy aktív képet, sorszámozott választót és jól látható előző/következő vezérlést kaphat. Az összes hat fotó megmarad.
- A teljes kép helyben, bezárható képnézőben nyílhat meg; a visszatérés tartsa meg a görgetési helyet. Billentyűzet, fókuszvisszaadás és Escape szükséges.
- A rendszer csökkentett mozgást kérő beállítását minden animáció kövesse. Mobilon a vízszintes lapozás legyen egyértelmű, a szöveg stabilan olvasható maradjon.

## 4. Videónak tervezett, cserélhető felületek

A főoldalon rövid személyes megszólalásnak, a Tai Chi-oldalon valódi gyakorlásrészletnek legyen helye. A fekvő videó és az álló reels saját képarányban jelenjen meg. Borítókép, felirat és a látogató által indított lejátszás legyen az alap. A külső lejátszó szükség esetén, a megfelelő hozzájárulás után töltődjön be.

A videó URL-je, szolgáltatója, borítója, képaránya és felirata közös tartalmi mezők legyenek. A portré helye és a videómodul külön cserélhető legyen. Üres helyre nem kerülhet működést ígérő lejátszógomb.

## 5. A látogató következő lépése

A főoldal elsődleges feladata a megfelelő út kiválasztása. A kapcsolatfelvétel könnyen elérhető, másodlagos lehetőség maradjon. A Tai Chi-oldalon az órai jelzés a fő cselekvés, a hely, idő és hozzájárulás már az elején látszódjon.

Javasolt főoldali ritmus: személyes nyitás → négy képes út → rövid személyes/videós rész → aktuális lehetőségek → tömör írások és könyvek → kapcsolat. A szemléleti mondat és a nagy fotós szünet ezek közé illeszthető, különböző magasságú részekkel.

## 6. Fejlesztői alap és tartalomkezelés

A programadatok, videók és könyvek egy közös tartalmi forrásból jelenjenek meg. Az ismétlődő blokkok egységes, újra használható elemekből épüljenek; így egy új videó vagy időpont felvétele nem több HTML-fájl kézi átírása. A két egymásra író stílusfájl felelősségeit a vizuális áttervezéssel együtt tisztázni kell, különösen a címsorok, térközök és képarányok esetében.

## Megvalósítási sorrend

1. Főoldali nyitás, négy kapu és az első személyes rész új vizuális vázlata, mobilon is.
2. A teljes oldal rövidítése és eltérő ritmusú szakaszok; portrécsere lehetőségének megőrzése.
3. Célzott mozgás, helyben nyíló galéria és videómodul.
4. Videók bekötése a valódi linkek beérkezésekor, a tartalomkezelés kialakításával együtt.

Ez sorrendi javaslat, nem a szerző által külön jóváhagyott fejlesztési csomag.

## A saját domain friss ellenőrzése

2026. november 13-án böngészőből: `https://sarkadisandor.hu/` és `/tai-chi/` 404-es választ ad; `/eletutak-talalkozasa/` 200 és az Életutak-oldalt mutatja. A főoldal és Tai Chi értékelése ezért a működő külön előnézeten történt. Domain-, DNS-, Worker- vagy produkciós módosítás nem része ennek a véleményezésnek.
