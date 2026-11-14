# Főoldal: az átnézés beépítése — 2026. november 14.

Közös ág: `site/csendes-konyv`. Alkalmazásforrás: `8b174e0`.

## Megvalósítás

- A nyitó mottó fölött a szerep szerepel: **ZARÁNDOKKÍSÉRŐ · TAI CHI-OKTATÓ**. Alatta Budapest, a Bakony, valamint a megerősített 1 000 Ft-os minimum-hozzájárulás és a 60 000 Ft-os hétvégi díj is olvasható. A teljes test–elme–lélek mottó egyetlen címsor maradt; az aláírásos logó és a fa alatti portré megmaradt.
- Mind a négy kapu konkrétabb leírást kapott. A Tai Chi-kártyán az időpont, helyszín és hozzájárulás; az Életutak-kártyán a három dátum, a bakonyi szállás és a hétvégi ár szerepel. A Fák Bölcsességénél a korábbi szerzői szövegből igazolt havi gyakoriság és Budapest környéki helyszín jelenik meg. A két külső program hiányzó dátumait és díjait nem pótoltam kitalált adattal; a link megmondja, hol találhatók a részletek.
- A kapuk alatt külön, kattintható híváskérés segít választani: **Nem tudod, melyik a tiéd? Egy 10–15 perces, ingyenes beszélgetésben megnézzük.**
- A négy lépés közvetlenül a kapuk után, a személyes történet és a könyvek elé került. A szöveg kimondja, hogy a beszélgetés ingyenes, és a részvételről utána dönt a látogató.
- A záró cím most: **Beszéljünk arról, ami most foglalkoztat.** Az eredményígéretként félreérthető korábbi mondat helyett konkrét következő lépést ad.
- Mobilon a kapuk egy hasábban olvashatók; az időpontok nem törnek ketté a számtartomány közepén. A négy külön zöld, a vízjel, a billentyűs fókusz és az egy érintéses megnyitás megmaradt. A meglévő színteszt az új ténysorokra is kiterjed.

## Ellenőrzés

`npm test`: 20/20. Build sikeres. A teljes Playwright-sor 60/60; az utolsó dátumtördelés és szövegegyensúly után az érintett sor újra 22/22 sikeres. A 200%-os szövegméret, a mobilmenü, a színkontraszt, a navigáció és a tesztcélra elfogott űrlapátadás is ellenőrizve.

| Nézet | A nyitó tények alja | Első gomb alja | A négy lépés kezdete |
| --- | ---: | ---: | ---: |
| 320 × 720 px | 613 px | 711 px | 3 041 px |
| 390 × 844 px | 551 px | 626 px | 2 685 px |
| 768 × 1 024 px | 502 px | 577 px | 2 020 px |
| 1 440 × 1 000 px | 481 px | 564 px | 1 584 px |

A helyszínek, árak és az első gomb mind a négy nézetben az első képernyőre férnek. A korábbi 390 px-es mérésnél a négy lépés 7 627 px-nél kezdődött; most 2 685 px-nél. Vízszintes túlcsordulás, hiányzó kép és JavaScript-hiba nem jelentkezett. A kapuk alatti híváskérő gomb a kapcsolatfelvételhez vezet.

## Megnyitható előnézet

- Főoldal: https://eletutak-uj-oldal-elonezet.kadisan.chatgpt.site/fooldal/
- Tai Chi: https://eletutak-uj-oldal-elonezet.kadisan.chatgpt.site/tai-chi/
- A korábban javított Életutak-előnézet: https://eletutak-uj-oldal-elonezet.kadisan.chatgpt.site/eletutak-talalkozasa/

A privát Sites-feltöltés sikeres. A főoldal külön `/fooldal/` útvonalon jelenik meg; a Tai Chi-oldal visszamutató linkjei erre vezetnek. Az előnézet korábbi gyökéroldala, a javított Életutak-oldal, a feljavított képek és a kikapcsolt fejlesztői konfiguráció változatlan maradt. Az erőforrás-hivatkozások és a visszamutató linkek külön ellenőrizve. Az élő Életutak ága, a `main`, a domain és a Worker nem változott.

## Ténylegesen hiányzó tartalom

Résztvevői idézet nem került be: a korábbi zarándokútról közölhető visszajelzés pontos szövege és névmegjelenítése még nincs a feladathoz átadva. Helykitöltő vélemény vagy kitalált eredmény nem jelenik meg. A „Kinek szól?” és a gyógyulásmondat helye nem változott.
