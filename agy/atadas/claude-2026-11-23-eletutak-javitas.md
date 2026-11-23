# Életutak — a november 23-i szerzői brief megvalósítása

Közös ág: `site/csendes-konyv`. A kiinduló forrás `88807d1`; az élő saját domaines kiadás továbbra is `82dc846`. A főoldal, a Tai Chi, a videó és a parkoltatott fordítások tartalma nem változott. **Éles kiadás nem történt; a szerző az előnézetet nézi át.**

Előnézet: https://eletutak-atnezes.kadisan.workers.dev/eletutak-talalkozasa/

## Tényleges állapot a briefhez képest

- Az élő oldalon 390 és 1440 px-en is aktív a visszahívó gomb, a fogadó GET-válasza `enabled:true`. A „még nem aktív” mondat a régi statikus tartalék HTML-ben szerepelt, az aktív böngészős nézetben rejtve. A saját domaint ellenőriztük, nem a korábbi fejlesztési előnézetből indultunk ki.
- A korábbi, megjelölt technikai kérés azonos azonosítóval és adatokkal ismételve 200-as, azonosítóval egyező visszaigazolást kapott, kb. 3,3 másodperc alatt. A nyilvános API az idempotencia belső részleteit nem adja vissza; az egyező korábbi azonosító használatát külön feljegyeztük. Privát adat és azonosító nem kerül ebbe az átadóba.
- A saját domainen és a forrásban **hét GYIK-kérdés** található, a briefben nyolc szerepel. A meglévő hét tartalmát megőriztük, nyolcadikat nem találtunk ki.

## Elkészült

- Az új cím és első bekezdés a szerző pontos szövege. Az alcím, felcím és programadatok megmaradtak.
- A kért meglévő, aláírásos logó világos zöldes fejlécet kapott. A lábléc logóját nem cseréltük le.
- A visszahívási és ajánlatválasztó vezérlők **statikus alapja valódi telefonlink**. Csak a fogadó aktív visszajelzése után váltanak űrlapra. JavaScript nélkül, hibás konfigurációval, nem JSON-os vagy inaktív fogadóval is elérhető marad a telefon. A fő nézetben külön telefonhívó link is látszik.
- Az ajánlatválasztók linkek: aktív fogadónál a csomagot és hétvégét az űrlapba viszik, a kiválasztást `aria-current` jelzi. A három dátumhoz külön próba tartozik. A visszaigazolt beküldés, az azonosító-egyezés, a megőrzött hibás beküldés és a Meta-hozzájárulás szabályai megmaradtak.
- A két és három hétvége összehasonlító ára áthúzva, „Külön-külön” magyarázattal jelenik meg. A fizetendő ár 100 000 és 160 000 Ft. Egyetlen sötétzöld ajánlott kártya a 200 000 Ft-os Télből tavaszba, a kért ajánló mondattal.
- Ajándékozási jelölés a kártyákon, a Részvétel alatt külön ajándékutalvány-kérő rész és előre megadott tárgyú e-mail-link. Ez egyeztetést indít; nem állít automatikus kiállítást, fizetést vagy kitalált érvényességet. A korábban használt nyilvános kapcsolati e-mail megmaradt.
- Három névtelen részlet a szerző most kapott visszajelzéseiből, a programbemutató után, **korábbi zarándokutak** visszajelzéseiként megjelölve. Csak központozás/szóköz-tipográfia igazodott; a mondanivaló nem változott. A teljes, neveket is tartalmazó chatforrást nem másoltuk a nyilvános repóba.

## Ellenőrzés

- `npm test`: 47/47; `npm run build`: sikeres.
- Build elleni Playwright: a visszahívási, mobilos, olvashatósági és marketing-sor együtt 52/52. A végső, mobilon is látható közvetlen telefonlink után az érintett visszahívási és olvashatósági sor újra 26/26.
- 320×568, 390×844, 768×1024 és 1440×900: nincs vízszintes kilógás, az első főgomb belefér a képernyőbe; a 20/18 px-es alap és a kétszeres szövegnagyítás megmaradt.
- A böngészős tesztek beküldései helyettesítettek. A valódi fogadópróba a korábban már használt, külön megjelölt technikai azonosítót ismételte.

## Előnézet kiszolgálása

Külön Cloudflare Worker: `eletutak-atnezes`. Nem az élő `sarkadi-site` és nem a régi Pages-projekt változott. A Worker a build új HTML/JS/CSS-fájljait adja, a változatlan képeket és fontokat a saját domainről kéri. A jogi oldalak a közzétett saját domaines változatra vezetnek. A callback ugyanazon előnézeti eredetről, szigorúan rögzített szerveroldali célon át a meglévő, saját domaines fogadóba jut; nincs új Google-kulcs, külön táblázat vagy értesítési cím. Az előnézet nem küld Meta-kérést, keresőindexelése tiltott; a link ismeretében elérhető, nem jelszavas oldal.

A helyi csomag és ellenőrzési bizonyítékok: `/workspace/artifacts/eletutak-2026-11-23/`. Ezek, valamint minden privát fogadóadat kívül maradnak a repón.

## Még szerzői adat vagy jóváhagyás kell

- A januári jelentkezési határidő és a tényleges szabad helyek száma, ha megjelenítendő.
- Az ajándékutalvány érvényessége és kiállításának módja. Addig kizárólag személyes egyeztetést kínál az oldal.
- Az előnézet megjelenésének és az idézetválasztásnak az átnézése, majd az élő kiadás jóváhagyása. Az előnézeti feltöltés nem élesítette az új változatot a saját domainen.

## Folytatás — a Zen–Hormozi javaslatok megvalósítása és ellenőrzése

A szerző elfogadta a hat javaslat megvalósítását, és alig látható lombkoronahátteret kért a csatolt borító alapján. Alkalmazásforrás: `4cc0fcb`, közös ág változatlan. Friss előnézet: https://eletutak-atnezes.kadisan.workers.dev/eletutak-talalkozasa/?v=20261123-zen . Külön Worker-verzió: `302161e8-1ea3-48b4-bcc5-eb31d6369107`.

- A borító meglévő, felirat nélküli lombkoronaképe nagyon halványan szerepel. Nem változott a főoldal vagy a Tai Chi.
- A nyitás után négy rövid árkártya vezet a megfelelő részletes csomaghoz; a személyes helyzetet tisztázó blokk is korábbra került, a dátumképek rövidebbek. A teljes oldal a kiegészítésekkel hosszabb; az árak megtalálása lett közvetlenebb.
- A 200 000 Ft-os ajánlás a személyes folytatást hangsúlyozza, a 160 000 Ft-hoz képest +40 000 Ft magyarázattal. A csomag tartalma és ára változatlan.
- A nyitógomb alatt 10–15 perces beszélgetés és a foglalási/fizetési kötelezettség hiánya. A programvázlat csak a már ismert pénteki megérkezést és szombat–vasárnapi programot állítja. A konkrét órák és étkezések továbbra is szerzői adatra várnak.
- Az idézetek között előre került a szkeptikus résztvevő tapasztalata, az általános hálamondatot a beküldött „Ez nyugtatta a lelkemet, tehermentesített.” részlet váltotta fel. Három névtelen, korábbi zarándokúti részlet marad.
- Az ajándék főgomb az aktív űrlapra vezet; választható témamező jelöli a szándékot. A meglévő API-séma `reason` mezőjében marad a jelölés, 1000 karakteren belül. Hiba/újrapróbálás megőrzi a szándékot, a csomagot és azonos tartalomnál a kérésazonosítót. Inaktív fogadónál telefon, másodlagos lehetőségként e-mail. Nincs kitalált utalványfeltétel.

Ellenőrzés: 47/47 alapteszt, sikeres build, 55/55 érintett böngészős próba, a feltöltött HTTPS-oldal négy méretben hibamentes. Ajándékfelületi próba megtörtént, valódi új beküldés nem. A korábban igazolt Google-fogadó sémája és értesítése nem változott. A kiadáslekérdezés szerint a saját domain éles verziója továbbra is a november 16-i `c80192c9-dd90-4ba0-a4da-ebb18f9e749c`. Az előnézeti jóváhagyás és a hiányzó program-/utalványadatok továbbra is nyitottak.

## Újabb szerzői pontosítás — keresztnevek és idézettipográfia

A későbbi kérés felülírja a névtelen közlést: az idézetek saját mondatok, külső idézőjelben, közvetlenül alattuk a keresztnevükkel. A három megjelenő részlet neve Ildikó, Éva és Eika (utóbbi a kapott forrás szerinti írásmód). A mondatok megmaradtak; Eika közvetlenül megelőző „No Para” mondata is szerepel. Éva beágyazott idézete tipográfiai »…« jelet kap a teljes mondat „…” jelein belül. Az alapteszt a mondatot és a nevet ugyanazon idézetblokkon belül párosítja.

A konkrét későbbi inspiráció https://magyarnemzet.hu/ — csak az idézetekhez. A megadott oldalt/cikkeket megnéztük: nagyobb, félkövér kiemelés és erős oldalsó vonal adta az alapot. A saját oldal Lora-betűje, zöldje és eltérő hasábszélességű kompozíciója maradt. Új scoped stílus: `conversion-editorial.css`. A főoldal négy kapuszínéből eltérő, alapállapotban is látható zöldek kerültek az ár-áttekintésre, a csomagokra és a három dátumkártyára. A háttér lefelé erdőzöldig sötétedik; a későbbi olvasóhasábok világos felületet kapnak.

Alkalmazásforrás: `631cd84`. Előnézet: https://eletutak-atnezes.kadisan.workers.dev/eletutak-talalkozasa/?v=20261123-idezetek#resztvevoi-hangok . Worker-verzió: `c2c3dc52-6b74-473a-8690-00578abaf2a7`. Az új 700-as magyar Lora-fontot az előnézeti csomag maga szolgálja ki. 47/47 alapteszt, sikeres build, 45/45 érintett böngészős próba, a végső idézetvonal után 9/9 olvashatósági próba. Négy HTTPS-nézetben ellenőrzött keresztnevek, szövegek, font, színkülönbség, legalább 8,28:1 árkártya-kontraszt és hibamentes betöltés. Éles kiadás, valódi beküldés vagy új mérés nem történt. Az éles `sarkadi-site` változatlanul a november 16-i verzión fut.

## Legutóbbi vizuális korrekció — szakaszritmus és vendégház

A szerző erősebb nyitó erdőképet, kevésbé homogén szakaszokat, a zöldet kiegészítő színeket, azonos magasságú programképeket, képre váltó „Hétvége ritmusa” panelt és az Ősfenyves saját oldaláról származó halvány szállásfotót kért. A lombkorona láthatóbb, a bevezető agyagos-rózsás, a program mályvás, az idézetrész homokszínű, az ajánlat zöld tónusban váltakozik. A korábbi négy csomagzöld és a névvel közölt idézetek megmaradtak.

A két programfotó egyező 9:16 keretben van, a Tai Chi teljes alakja megmarad. A ritmuspanel képes állapota egérrel és a belső szálláslink billentyűzetes fókuszával is elérhető, a szövege végig hozzáférhető. A vendégházfotó változatlan, 1920×1080-as eredeti JPEG, kifejezett szerzői kérésre letöltve: https://www.osfenyvesvendeghazak.hu/images/stories/galleries/sziklahaz/szikla-01.jpg . A képnél az Ősfenyves forrása meg van nevezve; a konkrét ház továbbra is előre egyeztetendő. Helyi fájl: `public/images/eletutak/osfenyves-szikla-kulso.jpg`.

Forrás `82b31f4`; előnézet https://eletutak-atnezes.kadisan.workers.dev/eletutak-talalkozasa/?v=20261123-ritmus ; Worker-verzió `4ec555fb-2872-41a1-b8a0-40b482759869`. A csomag maga adja az új fotót, nem az éles domainen még nem létező fájlt kéri. 47/47 alapteszt, sikeres build, 29/29 érintett böngészős próba, négy HTTPS-méretben egyező képmagasság, rámutatás/fókusz és hibamentes betöltés. A saját domain, a fogadó és az értesítés nem módosult; élesítési jóváhagyás továbbra sincs az új változatra.

## Külön inspirációs terv — nem végleges

A következő szerzői kérés az erdofurdozz.hu-ról levont ötletek külön tervként megmutatása, nem a fenti előnézet felülírása. A forrás az `agy/weboldal/tervek/eletutak-inspiracio/` mappában: HTML, külön CSS és önálló csomagoló. A saját portré/erdei útkép, a „kinek szól” szövegjavaslatok, a már ismert program rövid jelenetei és egy átvezető sor próbája. A keresztneves idézetek a jelenlegi buildből jönnek változatlanul. Az új szövegek és az oldal tervként vannak megjelölve; a fotók a meglévő repóból származnak.

Az új telepítési cél kizárólag `eletutak-terv`, nem `eletutak-atnezes` és nem `sarkadi-site`. Nincs űrlap, szkript, mérés vagy fogadóbinding. A `package.py` a build CSS-ét/fontjait saját statikus csomagba teszi; a már meglévő képeket a saját domainről szolgálja ki. Helyi ellenőrzés: 47/47 alapteszt, build; négy méretben működő képek és hivatkozások, kilógás és böngészőhiba nélkül; kétszeres szöveg 390 és 1440 px-en is rendben. A szerzői átnézéshez külön HTTPS-link készül, az eredeti teljes előnézet megmarad összehasonlításnak.

Feltöltött terv: https://eletutak-terv.kadisan.workers.dev/ . Forrás `4035f9f`, Worker-verzió `beb15d8a-dd23-468f-bb3a-71525b580366`. Négy HTTPS-nézetben is átment a kép-, belső hivatkozás-, keresztnév-, böngészőhiba- és kilógásellenőrzés; 390/1440 px-en a kétszeres szöveg is rendben. A külön terv nem küld adatot a fogadónak és nem mér. A korábbi előnézet és az éles domain változatlan verzióját a telepítés után külön lekérdezés igazolta. Ez a terv továbbra is szerzői átnézésre szolgál, nem jóváhagyott végleges változat.
