# Főoldal – „B · Csendes könyv” irány

Dátum: 2026. november 13. Ág: `site/csendes-konyv`, a `site/chatgpt-figyelemvezetes` `4f52131` commitjából indítva.

## Szerzői döntés

A szerző a Claude Design-ban készült három ritmusirány (A · Lombkorona és tisztás, B · Csendes könyv, C · Választás előre) közül a **B · Csendes könyv** irányt választotta. Ezt viszi tovább. Indoklás a saját szavaival: a tagolás tetszik neki leginkább, a könyvek megvehetők, a Substack elérhető.

**A legutolsó szerzői döntés szerint ez az egyetlen közös munkaág: `site/csendes-konyv`, „Csendes könyv” megnevezéssel.** ChatGPT és Claude innen folytatja; a korábbi `site/chatgpt-figyelemvezetes` történeti ág.

## A fájlok

- `fooldal-csendes-konyv.html`: szkript nélküli pillanatkép, a képek beágyazva; a betűket ez a referencia Google Fonts-ról tölti. **Vizuális és ritmusbeli referencia, nem beépítendő forrás.** A megvalósítás az `index.html`, `src/` szerkezetben, a meglévő helyi betűkészletekkel történjen (`AGENTS.md`).
- `public/images/taichi/sarkadi-sandor-tai-chi-kert-szeles.webp`: a kerti Tai Chi-fotó (1000×1250 forrás) fekvő kivágása, 1000×779. A fej fölött csak egy keskeny égsáv marad, a talp alatt kevés fű; az egész alak benne van.

## Mi tér el a Claude Design eredeti B-változatától (a szerző kérésére)

1. **Négy kapu, rámutatás:** a `src/gates.css` meglévő viselkedésével azonos szándék (négy mélyzöld: `#173e31`, `#3b4d29`, `#164c49`, `#285333`; fehér szöveg; erősebb, világos jelkép; finom emelkedés; billentyűs fókusz zölddel, nem okkerrel). A Claude Design-fájlból ez hiányzott. A repóban már kész, tehát **a beépítéskor a meglévő `gates.css`-t kell megtartani**, nem a pillanatkép CSS-ét átvenni.
2. **Kerti Tai Chi-kép a „Közjáték” után:** a teljes szélességű, 380 px magas sáv helyett a fenti fekvő kivágás, legfeljebb 760 px szélesen, középre igazítva, `aspect-ratio: 1000 / 779`. A szerző indoka: túl sok felületet vett el, mobilon főleg az ég látszott, asztali nézetben pedig csak a fej és a váll.
3. **Lábléc és űrlap:** Impresszum → `/eletutak-talalkozasa/impresszum/`, Adatkezelési tájékoztató → `/eletutak-talalkozasa/adatkezeles/` (meglévő, szerkesztési tervezet). Az űrlap hozzájáruló jelölőnégyzete is ide mutat. Az „Általános szerződési feltételek” link `/aszf/` címre mutat. **Ez az oldal még nem létezik**, a szöveg alapja az `agy/kozos/befizetes-es-lemondas-tervezet.md`, jogi ellenőrzés előtt. A szerző hangsúlya: aki vele megegyezik, szóbeli szerződést köt.
4. **Rövid magyarázó híd:** a szerző döntése szerint visszakerül a nagy dőlt közjáték után, a kerti kép elé: „A test adja a jeleket. Az elme megtanul figyelni rájuk. És a figyelemben a lélek is szóhoz jut.” Ez a referenciában már szerepel; a működő főoldalba a B későbbi beépítésekor kerül át.

## Lezárt szerzői döntések

- Az **ErdőLét-megnevezés marad**, link nélkül, szakmai háttérként. A referenciában már így szerepel.
- A **rövid magyarázó híd visszakerül**, a nyitómottó mellett önálló magyarázó szereppel.
- Az egyetlen **közös munkaág `site/csendes-konyv`**. Az ág kijelölése és a referencia frissítése önmagában nem az alkalmazáskód átírása vagy éles telepítés.

## Nyitott, a szerző felé jelzett pontok

- A C változatban szerepelt egy kitalált címke („BAKONY · TÉLI HÉTVÉGÉK”); a B-ben nincs ilyen. A B minden mondata a főoldali referencia-HTML-ből való.
- A B-ben két okker gomb van (nyitás: „Megnézem…”, záró rész: „Kérek egy hívást”). A brief szerint az okker csak a fő cselekvésé, a kapcsolat másodlagos lépés, ezért a hívásgomb inkább zöld körvonalas lenne. Szerzői döntésre vár.
- A mobilnézetet a szerző telefonkeretes előnézetben látta. A mentett HTML későbbi, valódi 390×844 px-es vizsgálatában 608 px-es dokumentumszélesség és 852 px-nél kezdődő első gomb látszott. A működő beépítésnél a mobilmenüt és az első képernyőt rendezni kell; az első gomb láthatóságát 320 és 390 px-en is ellenőrizni szükséges.
- A működő változatban marad a 20 px-es törzsszöveg és a 18 px-es segédszöveg, a helyi betűk, a teljes mottó egy `h1`-ben, a meglévő űrlapellenőrzés, Google-átadás és a hozzájuk tartozó magyarázó sorok. Ezek a mentett pillanatképben még nem mind teljesülnek.
