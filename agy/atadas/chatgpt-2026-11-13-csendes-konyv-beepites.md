# Claude → ChatGPT — a Csendes könyv (B) beépítve

Dátum: 2026. november 13. Ág: `site/csendes-konyv`.

## Mi készült el

A B ritmusa a valódi főoldalon (`index.html`) és egy új, csak a főoldalra érvényes stílusfájlban (`src/csendes-konyv.css`, `body.ck` alatt). A Tai Chi-oldalt és az ajánlati oldalakat nem érinti.

A közösen rögzített feltételek mind teljesülnek:
- **Nyitás:** sötét lombkorona, keretes portré (felirat nélkül), a teljes mottó **egyetlen `h1`-ben**, a második fele kisebb, dőlt `span`. A fő gomb az első képernyőn van: 1440 px-en 549, 390 px-en 621, 320 px-en 681 px-nél ér véget. Mobilos elrendezés 900 px-ig.
- **Négy kapu:** változatlan markup és `gates.css`.
- **Közjáték:** nagy dőlt mondat → magyarázó híd (`#test-elme-lelek`) → a fekvő kerti kép.
- **Bemutatkozás:** lenyitható „Rólam”, benne az „Így tanítom a Tai Chit” link; a jelvények egy sorban, az ErdőLét link nélkül.
- **Tai Chi:** mélyzöld sáv, középre zárt dőlt cím, világos körvonalas „A Tai Chi oldala” gomb.
- **Kísérés:** a kiemelt mondat asztalon kilép a hasábból; „Kinek szól?” lenyitható.
- **Könyvek, haiku, lépések, GYIK:** egy olvasóhasábban; a haiku külön világos sávban.
- **Záró sáv:** a „Kérek egy hívást” világos körvonalas; az okker csak a nyitás fő gombjáé.
- **Űrlap:** a meglévő markup, ellenőrzés, Google-átadás és **minden segédszöveg** megmaradt.
- **Lábléc:** Impresszum és „Adatkezelési tájékoztató” (a meglévő gombok, a meglévő oldalakra nyílnak). **ÁSZF-link nincs**, amíg az oldal nem létezik.
- **Betűk:** helyiek. Új import: Cormorant Garamond `latin-ext-300-italic`; enélkül az „ő/ű” a dőlt mondatokban más betűtípussal jelent meg.
- **Olvashatóság:** 20 px-es törzsszöveg, legalább 18 px-es segédszöveg; kétszeres szövegnagyításnál 390 px-en nincs vízszintes kilógás.

## Ellenőrzés

`npm test` 20/20. Build sikeres. A teljes Playwright-sor a build ellen (`vite preview` + `PLAYWRIGHT_BASE_URL`) **60/60**. Új tesztfájl: `tests/browser/csendes-konyv.spec.js` (egy `h1`, a híd sorrendje, egy okker gomb, nincs `/aszf/`-link és portréfelirat, 20/18 px). A `site.spec.js` két sora igazodott: a teljes mottó és az „Adatkezelési tájékoztató” gombnév.

**Megjegyzés a dev szerverhez:** a dev szerverrel futtatva néhány elrendezési próba elbukhat, mert a CSS ott késleltetve töltődik, és a mérés korábban fut. Ez a módosítás előtt is így volt (a kapuk ikonjai pillanatnyilag 390 px-re tolják az oldalt). A build elleni futás megbízható. Ha van kedved, a próbák várhatnának a `document.styleSheets` betöltésére is.

## Méretek

Asztali dokumentummagasság 9 682 px (a mentett B 9 905, a korábbi oldal 8 220). Mobilon 11 927 px (korábban 13 900). Az asztali hossz nagy része a közjáték képe és a dőlt mondatok; ha a szerző rövidebbet szeretne, a `--ck-gap` egyetlen változóval csökkenthető.

## Nyitott, a szerzőnél

- Új arcfotó a keretbe (a mostani krémszínű fallal átmeneti).
- ÁSZF-oldal jogi ellenőrzés után.
- A „Kinek szól?” és a gyógyulásmondat a te szerkesztésed szerint maradt; a szerző még nem döntött róla.

## Válasz (ChatGPT)

*Ide kérem, ha valamit másként csinálnál.*
