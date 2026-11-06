# Sarkadi Sándor — tájékoztató tervezői brief és Claude-prompt

Dátum: 2026. november 6.

Állapot: összevetést és tervezést segítő átadási anyag. Nem teljesen jóváhagyott végleges specifikáció, nem ÁSZF és nem jogi szakvélemény.

## 1. Bemásolható prompt a Claude számára

Az alábbi brief és a rendelkezésedre bocsátott források alapján tekintsd át Sarkadi Sándor weboldalának és külön ajánlati landingjeinek tervét. Először a meglévő anyagokat vesd össze, majd javasolj aktualizált oldalszerkezetet.

Feladatod:

1. Sorold fel, mely forrásokat tudtad ténylegesen elolvasni vagy megnézni. Külön jelöld a szöveg, a képernyőkép és a futó oldal vizsgálatát. Elérhetetlen GitHub-fájl vagy hiányzó kép tartalmát ne állítsd megismertnek.
2. Készíts összevetési táblát: téma; eddigi anyag/oldal állítása; frissebb adat vagy szerzői döntés; eltérés; javasolt teendő; pontos forrás és annak dátuma.
3. Válaszd külön a személyes főoldal, a Tavaszi ív/csillagtúra, a Tai Chi, a Fák Bölcsessége és az egyéni kísérés feladatát. Az egyes ajánlatok adatait és jelentkezési folyamatait külön kezeld.
4. Adj külön főoldalvázat és külön Tavaszi ív-landingvázat. Minden blokknál írd le a látogató kérdését, a blokk feladatát, szükséges tényanyagát és a következő lépést. A többi landinghez rövid szerkezeti irány elegendő.
5. Ellenőrizd a finom, áttört zöld arculatot és a négy landingnyelv előkészítését. A tényleges fotók és fordítások hiányát jelöld.
6. A befizetési/lemondási részt tájékoztató munkaváltozatként kezeld. A foglaló, előleg, utazási csomag vagy vissza nem térítendő összeg jogi minősítését ne vezesd le pusztán a szavakból vagy a külön fizetés tényéből. A végleges szerződéses feltételt külön jogi ellenőrzésre jelöld.
7. A végén add meg az öt legfontosabb hiányzó adatot és a következő célszerű munkalépést. Ne kérdezz újra olyat, amit a szerző már egyértelműen pontosított.

A válasz magyarul készüljön. Elsőként összevetést és tervezői javaslatot kérek; ez az átadás nem kér weboldalpublikálást vagy kész jogi szabályzatot. Az ismeretlen adatokat jelöld, a feltételezéseket nevezd meg. A tartalmi jóváhagyást ne tekintsd megtörténtnek pusztán attól, hogy egy munkaszöveg szerepel a fájlokban.

Kért kimenet:
- Forrásleltár és hozzáférési korlátok.
- Eltéréslista táblázatban.
- Javasolt főoldal- és landingstruktúra.
- Rövid vizuális és négynyelvű megvalósítási irány.
- Hiánylista és következő lépés.

## 2. Projekt és cél

A `sarkadisandor.hu` Sarkadi Sándor személyes szakmai weboldala. Feladata a személy, a szemlélet és a tevékenységek bemutatása, majd továbbvezetés az adott ajánlathoz. A konkrét ajánlatok külön landinget kapnak, saját részletekkel és saját elsődleges cselekvéssel.

A főoldal–landing elkülönítés kifejezett szerzői döntés. A Tavaszi ív ne foglalja el az általános főoldal teljes szerepét. A `zarandoklat.sarkadisandor.hu` és `taichi.sarkadisandor.hu` korábbi címjavaslat, nem végleges domainstruktúra. Aldomain vagy alkönyvtár még eldöntendő.

A landingek nyelve: **magyar, angol, német, olasz**. A négy nyelv kifejezett igény. Magyar forrásszöveg, majd jóváhagyás után fordítás és nyelvi ellenőrzés javasolt. A főoldal fordításának terjedelme és a programok/visszahívás tényleges nyelve még tisztázandó.

## 3. Források és elsőbbség

GitHub: https://github.com/kadisan/testrepo/tree/docs/agy-kontextus/agy

Ág: `docs/agy-kontextus`. Ezek az anyagok ezen a külön ágon vannak; főágba olvasztásuk nincs igazolva.

Első olvasandó fájlok:
- `agy/00-iranytu.md`
- `agy/dontesnaplo.md`
- `agy/kozos/bemutatkozas.md`, `markahang.md`, `arculat.md`, `bizonyitekok.md`
- `agy/kozos/tobbnyelvuseg.md`
- `agy/weboldal/` és az adott `agy/ajanlatok/` mappa
- `agy/kozos/befizetes-es-lemondas-tervezet.md`

Eredeti, november 5-i Tavaszi ív-brief: `agy/forrasok/eredeti-brief/tavaszi-iv-tervezoi-brief.pdf`. Ebben helyfoglalók és később felülírt irányok is vannak.

A november 6-i „Sarkadi Sándor – márka- és ügyfélút brief” külön beszélgetésben feltöltött forrás. Teljes szövege nincs feltöltve a GitHubra; az összevetéshez külön csatolható. A lényeges eltéréseket ez az átadás összefoglalja. A korábbi ügyfélkézikönyv és utánkövetési naptár létezésére ez a brief hivatkozik, azokat itt nem vizsgáltuk és nem mellékeltük.

A workshopképek módszertani kivonata: `agy/forrasok/workshop-kepernyokepek/README.md`. A nyers képfájlok nincsenek a tárolóban. Az erdős vizuális referenciakép is a beszélgetésben látható; a pontos képi összevetéshez külön csatolandó.

Elsőbbségi szabály: az egyértelmű, későbbi szerzői pontosítás felülírja az arra vonatkozó régebbi adatot. Az új forrás nem teszi automatikusan véglegessé minden saját állítását. Ellentmondást jelezz, ne simítsd el. A tároló egyes korábbi fájljai még frissítendő munkaváltozatok.

## 4. Kifejezetten megerősített adatok és döntések

- Hivatalos nevek: **Molnár Szilvia és Sarkadi Sándor**. A hangátirat eltérő névírásai nem névváltozatok.
- Sándor 2014-ben résztvevőként kezdett zarándokolni; 2015 óta vezet utakat. A „tizenöt éve kísérek” mondat ennek megfelelően javítandó.
- Egyéni kísérési napidíj: **20 000 Ft / nap**. A korábbi 12–20 ezer Ft / két óra változat felülírt. A nap időkerete és további költségei még tisztázandók.
- Csillagtúrán **15–20 km-es körök** lehetségesek. A fizikai követelményt programonként kell meghatározni.
- A csillagtúra szállását és étkezését a résztvevő külön, közvetlenül a szolgáltatónak fizeti. Ez a díjak bemutatásakor lényeges, de a jogi besorolást önmagában nem rendezi.
- Vizuális irány: erdő, légies feliratok, finom áttört/áttetsző hatású zöldek. Papírszínt a szerző nem kér.
- A Vikingo-vázépítő elhagyott referencia; nem része a feladatnak.

## 5. Mit pontosít a november 6-i márkabrief?

Az új brief négy önálló főoldali szolgáltatási területet vázol: Tai Chi / Chi Kung, csillagtúra, Fák Bölcsessége, egyéni lelki kísérés. A zarándoklat egy-két mondatos említést és a `zarandoklat.com` oldalra vezető linket kapna. Ezt a korábbi főoldalvázhoz képest eltérésként vizsgáld, és készíts indokolt szerkezeti javaslatot. A Tavaszi ív két útjának közös bemutatását a saját csillagtúra és a partneroldal zarándoklata közötti szerepmegosztással is össze kell hangolni.

Új brief szerinti terminológia:
- „ErdőLét minősített erdei jelenlét-vezető”; a korábbi „programvezető” megnevezés javítandó.
- Nyilvánosan „vezetett erdei jelenlétprogram”; az „erdőmerülés” belső munkanév.
- A Fák Bölcsessége társfacilitálás Szilvivel; „üzlettárs” helyett a tényleges szerep megnevezése.
- A közvetlen márkaszöveg becenévhasználata és a hivatalos névhasználat külön kérdés; a hivatalos nevek fent megerősítve.

A Tai Chi membership/előfizetés és az erdei program prémium fejlesztési ága még tervek, ne jelenjenek meg kész ajánlatként. Az egyéni kísérés teljes szolgáltatási kerete és szakmai szerephatárai is kidolgozásra várnak.

Az új brief leírja a jelentkezés → telefon → befizetés → felkészülés → esemény folyamatot és az utókövetési kapcsolatállapotokat. Ezek belső tervezési inputok. A saját és partnerprogramok ügyfélútját, valamint az egyéni kísérés belépési folyamatát külön kell kezelni. Kapcsolattartási kategóriákból nem következik automatikusan hírlevél-hozzájárulás.

## 6. Ajánlati állapot

**Tavaszi ív / csillagtúra:** a februári bakonyi út 2027-re tervezett, 2,5–3 napos formátum. Pontos dátum, bázis, terep, végleges ár és díjtartalom hiányzik. Az 55–60 ezer Ft célár, nem jóváhagyott végleges ár. A 2027. április 29. – május 2-i Pannonhalma–Tihany út és 17–31 km-es napjai a briefből átvett, publikálás előtt megerősítendő adatok. Partnerprogram feltételeit ne keverjük a saját csillagtúrával.

**Tai Chi:** a régi brief Kesztyűgyár Közösségi Házat és szerda 10:30-at ír; az új budapesti és bakonyi oktatást is említ. Aktuális helyszín, időpont, ár, próbaalkalom, célcsoport és jelentkezési mód megerősítendő.

**Fák Bölcsessége:** az új briefben Megérkezés / Elmélyülés / Végigjárni az év útját szintek, 13–18 ezer Ft közötti alkalmi árak, szenior és aktív korú napok szerepelnek. Konkrét ajánlatként csak a pontos, megerősített alkalmakat és feltételeket mutassuk be.

**Egyéni kísérés:** 20 000 Ft / nap megerősítve. A korábbi kétórás csúszóskálás ajánlatot ne ismételd meg. Időkeret, szolgáltatási tartalom, járulékos költségek és az ismerkedő alkalom feltételei még pontosítandók.

## 7. Befizetés és lemondás — tájékoztató munkaváltozat

A szerző bevált mondata: **„Helyedet […] Ft befizetésével foglalhatod le.”**

Munkamegnevezés: „a részvételi díj első részlete”. Ez közérthető szövegezés, a jogi minősítést nem helyettesíti. A „foglaló” vagy „előleg” szót ne kezeld már eldöntött szerződéses jogcímként.

A szerző szándéka:
- Az indulás előtt két nappal lejáró határidőig visszafizetés.
- Ezután átvitel a következő szezon egyeztetett alkalmára.
- Éveken át nyitva tartott átvitel helyett végső felhasználási határidő.
- A fel nem használt összeg későbbi elvesztése kívánt szabály, jogszerűsége és elszámolása még ellenőrizendő.

A pontos dátum, óra, visszafizetési idő, érintett díjrész, választási lehetőségek és szervezői lemondás következményei még hiányoznak. A saját díj feltételei nem vonatkoznak automatikusan a közvetlenül fizetett szállás- és étkezési szolgáltatásra.

A hatályos jogszabályok élő ellenőrzését hálózati tiltás akadályozta. A jogi jegyzet hivatkozásai ellenőrzési célpontok, nem most végigolvasott források. A tervezőtől közérthető elhelyezést és a nyitott kérdések felismerését kérjük; végleges ÁSZF megalkotását vagy jogi megfelelőség igazolását nem.

## 8. Tartalmi és vizuális elvek

Meleg, pontos, tegező, kontemplatív hang, első személyben. A lelkiség kimondható vendégszeretően; kötelező imát és terápiás eredményt ne sugalljunk. Visszafogott önirónia; sérülékeny helyzetekben különösen figyelmes szöveg. Kitalált visszajelzés, szám, sürgetés vagy eredményígéret ne kerüljön az oldalra.

A workshopképekből:
1. Minden blokk segítsen egy valós döntési kérdésben.
2. Előbb a váz és a blokkok feladata, utána a teljes szöveg.
3. A szolgáltatásoldal-recept kiindulópont, a sorrend az adott ajánlathoz igazodik.
4. Egy landingnek legyen egy világos fő cselekvése. A Tavaszi ív briefje szerint ez „Kérek egy hívást”; más ajánlatnak saját lépése lehet.

Mobilon is kényelmes olvasás, megfelelő kontraszt, látható fókusz és nyelvváltó, visszafogott mozgás. A nyelvi változatok szöveghosszát és az űrlap teljes felületét is tervezzük meg. A helyben szolgáltatott betűk és a saját, engedélyezett fotók előnyben. A nyitó referencia erdőfotó; a prototípus jelenlegi erdőképe illusztráció.

## 9. Jelenlegi technikai állapot és átadás

Az első HTML/CSS/JavaScript oldalváltozat elkészült Vite-tal. Korábban 4 logikai teszt, 6 böngészős teszt és a build sikeres volt; ez korábbi mérés, nem ennek az átadásnak új tesztje.

Az első változat még magyar nyelvű, egyetlen oldalon mutatja a tevékenységeket és a Tavaszi ívet. A főoldal és landingek szétválasztása, a négynyelvű működés és a végleges űrlapbekötés még hiányzik. A bemutató űrlap nincs Google Formhoz bekötve, személyes adatot nem küld.

Fontos hozzáférési különbség: a dokumentációs Git-commitok csak az `agy/` tartalmát tartalmazzák. Az oldal prototípusának `index.html`, `src/`, `public/`, `package.json` és további fájljai a közös munkakörnyezetben léteznek, de a dokumentációs ágra nincsenek commitolva. Claude GitHub-linkből önmagában ezeket nem fogja látni. A kódot külön csomagban vagy megfelelő hozzáféréssel kell átadni, ha tényleges kódösszevetést kérünk.

Claude-nak átadandó csomag:
- Ez a brief/prompt.
- Az `agy/` mappa a megfelelő ágról vagy letöltött másolatban.
- Az eredeti márka- és ügyfélút-brief, ha annak teljes szövegét is össze kell vetni.
- Az erdős referenciakép és a releváns képernyőképek.
- A jelenlegi prototípus kódja vagy képei a kívánt összevetési mélység szerint.

Az oldal élesítését vagy a környezet publikálását ez az átadás nem igazolja és nem kéri.
