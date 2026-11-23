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
