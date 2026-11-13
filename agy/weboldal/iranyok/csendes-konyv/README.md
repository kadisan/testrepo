# Főoldal – „B · Csendes könyv” irány

Dátum: 2026. november 13. Ág: `site/csendes-konyv`, a `site/chatgpt-figyelemvezetes` `4f52131` commitjából indítva.

## Szerzői döntés

A szerző a Claude Design-ban készült három ritmusirány (A · Lombkorona és tisztás, B · Csendes könyv, C · Választás előre) közül a **B · Csendes könyv** irányt választotta. Ezt viszi tovább. Indoklás a saját szavaival: a tagolás tetszik neki leginkább, a könyvek megvehetők, a Substack elérhető.

## A fájlok

- `fooldal-csendes-konyv.html`: önálló, szkript nélküli pillanatkép, a képek és a betűk beágyazva. Böngészőben közvetlenül megnyitható. **Vizuális és ritmusbeli referencia, nem beépítendő forrás.** A megvalósítás az `index.html`, `src/` szerkezetben történjen, a meglévő szabályok szerint (`AGENTS.md`).
- `public/images/taichi/sarkadi-sandor-tai-chi-kert-szeles.webp`: a kerti Tai Chi-fotó (1000×1250 forrás) fekvő kivágása, 1000×779. A fej fölött csak egy keskeny égsáv marad, a talp alatt kevés fű; az egész alak benne van.

## Mi tér el a Claude Design eredeti B-változatától (a szerző kérésére)

1. **Négy kapu, rámutatás:** a `src/gates.css` meglévő viselkedésével azonos szándék (négy mélyzöld: `#173e31`, `#3b4d29`, `#164c49`, `#285333`; fehér szöveg; erősebb, világos jelkép; finom emelkedés; billentyűs fókusz zölddel, nem okkerrel). A Claude Design-fájlból ez hiányzott. A repóban már kész, tehát **a beépítéskor a meglévő `gates.css`-t kell megtartani**, nem a pillanatkép CSS-ét átvenni.
2. **Kerti Tai Chi-kép a „Közjáték” után:** a teljes szélességű, 380 px magas sáv helyett a fenti fekvő kivágás, legfeljebb 760 px szélesen, középre igazítva, `aspect-ratio: 1000 / 779`. A szerző indoka: túl sok felületet vett el, mobilon főleg az ég látszott, asztali nézetben pedig csak a fej és a váll.
3. **Lábléc és űrlap:** Impresszum → `/eletutak-talalkozasa/impresszum/`, Adatkezelési tájékoztató → `/eletutak-talalkozasa/adatkezeles/` (meglévő, szerkesztési tervezet). Az űrlap hozzájáruló jelölőnégyzete is ide mutat. Az „Általános szerződési feltételek” link `/aszf/` címre mutat. **Ez az oldal még nem létezik**, a szöveg alapja az `agy/kozos/befizetes-es-lemondas-tervezet.md`, jogi ellenőrzés előtt. A szerző hangsúlya: aki vele megegyezik, szóbeli szerződést köt.

## Nyitott, a szerző felé jelzett pontok

- A C változatban szerepelt egy kitalált címke („BAKONY · TÉLI HÉTVÉGÉK”); a B-ben nincs ilyen. A B minden mondata a főoldali referencia-HTML-ből való.
- A B-ben két okker gomb van (nyitás: „Megnézem…”, záró rész: „Kérek egy hívást”). A brief szerint az okker csak a fő cselekvésé, a kapcsolat másodlagos lépés, ezért a hívásgomb inkább zöld körvonalas lenne. Szerzői döntésre vár.
- A bemutatkozó sorban szerepel az ErdőLét-minősítés neve (link nélkül, a referenciával egyezően). Szerzői döntésre vár, hogy maradjon-e.
- A mobilnézetet (390 px) a szerző telefonkeretes előnézetben látta; ott külön módosítást nem kért.
