# sarkadisandor.hu — brief a Claude Design számára

Dátum: 2026. november 13. Forrás: a közös munkaág (`site/chatgpt-figyelemvezetes`), a döntésnapló és a szerző aznapi válaszai.
Mellékelt referencia: `sarkadisandor-fooldal-referencia.html` és `sarkadisandor-tai-chi-referencia.html`. Mindkettő önálló, szkript nélküli pillanatkép a mai állapotról; a menü és az űrlap nem működik bennük, a megjelenés valós.

## 1. A feladat egy mondatban

A főoldal ma rendezett, de **monoton**: hasonló súlyú, világoszöld szakaszok követik egymást, és mobilon kb. 16–17 képernyőnyi a hossz. Dinamikusabb, a tekintetet tudatosan vezető **ritmust** kérünk a meglévő tartalomra. A nagy betűket és a jó olvashatóságot közben meg kell tartani.

Kérünk **2–3 irányt** a főoldal ritmusára, asztali (1440 px) és mobil (390 px) nézetben. A Tai Chi-oldal másodlagos: ha marad idő, egy irány arra is.

## 2. Ki ő, és mi a központi gondolat

Sarkadi Sándor zarándokkísérő (2015 óta), Integral Tai Chi Flow-oktató (II. szint), erdei jelenlét-vezető és lelki kísérő. A főoldal a **digitális névjegye**: bemutatja őt, és négy egyenrangú útra vezet tovább.

**Központi mondat (a szerzőé, szó szerint):**
> Hagyd, hogy a tested tanítsa az elmédet, és az elméd megtanuljon figyelni a lelkedre.

Tervezői munkaértelmezés: *a test mint tanító*. A tapasztalati ív: testi tapasztalat → figyelem és észrevétel → belső megértés. A kísérés ehhez ad teret. Ez belső fogalom, a felületen nem kell kiírni.

Három szó, amit egy volt résztvevő mondana róla: **hiteles, mély, csendes.**

## 3. Kinek szól

Felnőttek, akik
- évek óta ők tartják a többieket: otthon, a munkában, sokszor mindkettőben;
- sokat ülnek, és a testük egyre hangosabban szól;
- régóta hordoznak egy kérdést, amire a hétköznapokban nem jut idő;
- keresnek valamit, de nem gyors megoldást.

Az első látogató először rendszerint azt keresi, mit csinál ő, és melyik út való neki.

## 4. A négy út (azonos rangú kapuk)

| Kapu | Cél | Jelkép |
| --- | --- | --- |
| Tai Chi – *Tengely és tempó* | `/tai-chi/` (saját aloldal) | levél |
| Életutak találkozása | `/eletutak-talalkozasa/` (már élő ajánlati oldal, bakonyi hétvégék) | ösvény |
| Zarándoklat | zarandoklat.com (külső, partneroldal) | nap |
| A Fák Bölcsessége | fakbolcsessege.com (külső, Molnár Szilviával közös) | fa |

## 5. „Tengely és tempó” — a Claude Design kérdéseire

**Mi ez?** A heti csoportos Tai Chi-óra ajánlata. Szerdánként 10:00–11:30, Kesztyűgyár Közösségi Ház, Budapest VIII., Mátyás tér 15. Adomány alapú, alkalmanként legalább 1 000 Ft; a piaci ár 5–6 000 Ft lenne. Kezdőknek is, előzetes tapasztalat nélkül, bármelyik szerdán be lehet kapcsolódni.

**Kinek szól?** Aki sokat ül, testben szeretne lelassulni, tartást és figyelmet tanulni. Nem edzés és nem teljesítmény.

**Mi a fő lépés?** **Jelzés:** „Jelzem, hogy jövök”. A látogató kiválaszt egy szerdát, megadja az elérhetőségét, és jelzi, hogy jön. Nem helyfoglalás, nem fizetés, nem vásárlás; a hozzájárulást a helyszínen adja. Másodlagos lépések: feliratkozás az írásokra (ajándék: „Öt perc reggel” egyoldalas PDF), illetve telefon vagy e-mail.

**Külön landing vagy szakasz?** Mindkettő, két szinten. A Tai Chi saját aloldalt kapott (`sarkadisandor.hu/tai-chi/`), ez a fő ajánlati oldal. A főoldalon a négy kapu egyike és egy rövid adatsáv vezet oda. A Tai Chi-oldal **nem a főoldal elé** kerül.

## 6. Kötött döntések (ezeken ne változtass)

- A nyitásban a szerző mottója. A háttér **sötét, felülnézeti lombkorona** (a szerző „Lépj be a fák közé” borítójáról).
- A **portré átmeneti**: új arcfotó készül, mert a mostani nem illik a sötét lombkoronához (a fej körül halvány folt látszik). Tervezz neki **cserélhető helyet**; a mostani képet ne retusáld és ne montírozd.
- **Négy egyenrangú kapu**, középen halvány, vékony vonalas vízjel-jelképpel. Rámutatáskor négy különböző mélyzöld háttér, fehér szöveg és erősebb jelkép. A kapuk zöldjei: `#173e31`, `#3b4d29`, `#164c49`, `#285333`.
- **Okker (`#d9a441`) csak a fő cselekvésé** (elsődleges gomb, kiemelő ecsetvonás).
- A könyvek a **borítóra kattintva** megvásárolhatók (Payhip); a további írások a Substackon vannak.
- Záró sáv a kapcsolat előtt: tárcsás telefonból készült rézlámpa a teljes szélességben, rajta: „A változás a tiéd. Egy beszélgetéssel kezdődik.”
- A kapcsolatfelvétel másodlagos, könnyen elérhető lépés („Kérek egy hívást”); a főoldal elsődleges feladata az út kiválasztása.

## 7. Tiltólista és hang

- Tegező, első személy, rövid mondatok. Hiteles, mély, csendes.
- **Nincs** gyógyulás- vagy változásígéret, terápiás nyelv, wellness-szótár („feltöltődés”, „energiák”), kitalált sürgetés vagy hiány.
- **Ne** találj ki véleményt, ajánlást, számot, időpontot vagy árat. Csak a referencia-HTML szövegét és adatait használd; ahol szöveg hiányzik, jelöld helyőrzőként.
- Az „erdőmerülés” szó nem szerepelhet; helyette „vezetett erdei jelenlét”. Az ErdőLét nevű szervezetre nem linkelünk.
- A szerző kifejezetten **unalmasnak és sablonosnak** tartja a földszínű, általános „Claude-dizájn” hatást. Erdő, mélyzöld, fény; nem bézs.

## 8. Arculati alap

| Elem | Érték |
| --- | --- |
| Háttér / lágy háttér | `#eef5ef` / `#e3eee5` |
| Szöveg / tompa szöveg | `#203e32` / `#516c5c` |
| Fő zöld | `#305b40` |
| Kiemelő okker / rajta a szöveg | `#d9a441` / `#1d3426` |
| Címek | Lora 500 |
| Kenyérszöveg | Source Sans 3 (200/400/600), alap 18 px |
| Idézetek, mottó | Cormorant Garamond 300, dőlt |
| Ikonok | vékony vonalas: levél, ösvény, nap, fa |
| Motívum | kézzel húzott ecsetvonás-aláhúzás |

## 9. A főoldal mai sorrendje és a javasolt ritmus

Mai sorrend: nyitás (mottó + portré) → négy kapu → „Azért találtál ide, mert…” (lista + ködös fa) → bemutatkozás (kerti Tai Chi-fotó, jelvények) → Tai Chi-adatsáv → „Hogyan kísérek” (szöveg + idézet) → írások és könyvek (két borító + Substack + haiku) → első lépés (négy lépés) → GYIK → záró sáv (telefonlámpa) → kapcsolat és űrlap.

Fejlesztői javaslat (még nem szerzői döntés): **személyes nyitás → négy kapu → rövid személyes vagy videós rész → aktuális lehetőségek → tömör írások és könyvek → kapcsolat.** Közé illeszthető egy szemléleti mondat és egy nagy fotós szünet. A szakaszok eltérő magasságúak és formájúak legyenek; a mélyzöld, a világos zöld és a képfelület következetesen váltakozzon.

Konkrét hosszproblémák: mobilon a könyvrész kb. 2 600 px, a bemutatkozás hosszú. A személyes rész legyen rövid bevezető, megnyitható részletekkel.

## 10. Jövőbeli elemek, amiknek legyen helye

- **Videó:** később YouTube-videó vagy álló reels. Tervezz fekvő és álló képarányú, borítóképes, a látogató által indított lejátszót. Valódi link még nincs: **működést ígérő, üres lejátszógomb nem kerülhet ki.**
- **Képsor:** a Tai Chi-oldalon hat mozdulatfotó (tükrös teremben; a szerző háttal áll, a tükör mutatja a mozdulatot) és két kerti kép. Helyben nyíló képnéző kell, nem új lap.

## 11. Akadálymentesség és technika

- Kontraszt legalább 4,5:1, a vízjelek fölött is. Kétszeres szövegnagyításnál is olvasható. Kényelmes érintési felületek. A csökkentett mozgást kérő beállítás kikapcsolja az animációt.
- Mozgás csak célzottan, egyszer lefutva; olvasott szöveg mögött ne mozogjon semmi.
- A megvalósítás egyszerű HTML/CSS/JS (Vite), két agent építi be a repóba. Olyan megoldást kérünk, ami tisztán CSS-sel és kevés JS-sel megvalósítható.

## 12. Amit kérünk vissza

2–3 főoldali irány, asztali és mobil nézetben, mindegyikhez egy-két mondat arról, mit old meg a monotóniából. Ne írj új szöveget a meglévő helyett; ha egy rész rövidítését javaslod, jelöld, mi maradna ki.
