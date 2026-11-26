# Élesítés és közvetlen kapcsolat — 2026. november 26.

A szerző a közösen elkészült aktuális változat saját domaines élesítését kéri. Ez felülírja az előző, kizárólag előnézetre szóló határt. A később csatolt „Mire számíts?” vázlat közös vizsgálata csak az élesítés után következik, a kiadásban nem szerepel.

Nyilvános kapcsolat: `melletted@sarkadisandor.hu`; fogadása a szerző által már tesztelt Cloudflare-továbbítással a Gmailbe jut. A Gmail SMTP-küldés ettől külön, szolgáltatói hozzáférésre váró feladat. Új díjas szolgáltatás, levelezési DNS-módosítás és új valódi űrlapbeküldés nincs ebben a webes kiadásban.

A három aktív magyar oldal közvetlen elérhetősége frissült. Facebook: `https://www.facebook.com/kardosiandras`; Substack: `https://belsout.substack.com/`; Instagram: `https://www.instagram.com/zarandoklat/`. Ezek a főoldal/Tai Chi elfogadott linkjei, most az Életutak láblécében is megjelennek. Az Instagram nem a zarándoklat webcímére, hanem az Instagram-fiókra mutat. A főoldalon/Tai Chi-oldalon a külön zarandoklat.com link megmaradt. A külső Substack-oldal friss gépi letöltését a proxy 403-mal visszautasította; a szerzői forrás szerinti cél maradt meg, nem kitalált profil.

A teljes aktuális magyar Életutak megy ki: helyesen nevezett idézetek, 20–24 px-es valódi dőlt fontok, zöldes-bézses alap és kizárólag hoverre 18%-os labirintusfotó; az elfogadott többi képi és ajánlati javítás is megmarad. A sötét lábléc kontrasztja, beállításgombja és mobilos logóméretezése javult.

Kiadási út: `npm run build` → `python3 scripts/package_site.py` → meglévő `sarkadi-site` Worker, `wrangler.site.jsonc`, `LANDING_ENABLED=true`, `--keep-vars`. A visszahívási API, jóváhagyott jogi alap és régi fordítások útvonalkezelése megmarad. Kiadási azonosító: `2026-11-26-kapcsolat-es-eletutak`. Visszaállítási alap: `c80192c9-dd90-4ba0-a4da-ebb18f9e749c`. A korábbi Worker teljes mentése a nyilvános repón kívül, `/workspace/artifacts/sarkadi-2026-11-26-elesites/production-before/`.

Az új szövegvázlat a `/tavaszi-iv` céloldalt és annak februári bakonyi kártyáját nevezi meg, a főoldalt kifejezetten kizárja. Dátum, bázis, napi km/szint, étkezés, vészhelyzeti kapcsolat és díj/szállás-megosztás tisztázandó. A jelenlegi, korábban jóváhagyott Életutak-ajánlat 60 000 Ft-os csomagját nem írjuk át automatikusan e nem végleges vázlat alapján. Új útvonal, ár, hitbeli megfogalmazás vagy hiányzó adat nem került nyilvánosságra.

A végső láblécjavítás után 9/9 olvashatósági próba ismét sikeres. Az éles konfigurációjú csomag mindhárom oldala 320/390/768/1440 px-en ellenőrizve (12 nézet); 390 px-en kétszeres szöveggel is kilógásmentes. A hozzájárulás elutasítása után a közösségi és e-mail-linkek, a láblécgomb és a logó képernyőképpel ellenőrizve. A jelenlegi éles visszahívási readiness API valódi GET-kérése 200 / enabled=true; új adatbeküldés nincs. A forrás mentése és a meglévő Worker frissítése következik.

## Igazolt éles kiadás — 2026. november 26.

Alkalmazásforrás: `10521c18dceae03ac9278fb1568440223aad9f4d`, közös ágra feltöltve. Éles Worker-verzió: `3bfa09cf-d7fc-4be6-b957-b762c8c3b184` (100%). A saját domain `/release-version.json` fájlja ezt a forrást és a `2026-11-26-kapcsolat-es-eletutak` kiadást adja. Címek: https://sarkadisandor.hu/ , https://sarkadisandor.hu/tai-chi/ , https://sarkadisandor.hu/eletutak-talalkozasa/ .

A tényleges éles domain három oldala 320/390/768/1440 px-en is átment a 12 nézetes ellenőrzésen: helyes mailto- és közösségi célok, betöltött képek, nincs vízszintes kilógás, 390 px-en kétszeres szöveg is rendben. Az Életutak aktív visszahívó vezérlője a valódi readiness GET alapján engedélyezett; a három helyes keresztnév, 0%-os alap- és 18%-os hover-háttér, a kisebb dőlt idézetek megmaradtak. Nincs böngészőhiba, hibás helyi erőforrás, hozzájárulás előtti Meta-kérés vagy valódi új beküldés. A lábléc hozzájárulás-elutasítás után is vizuálisan ellenőrzött.

A meglévő, nem eszközjellegű Worker-kötések változatlanul megmaradtak. Mind a négy domainútvonal továbbra is a `sarkadi-site`-ra mutat. A robots és a három fő útvonalat felsoroló sitemap éles; az adatkezelés, impresszum és megőrzött angol változat 200 választ ad. DNS- és levelezési beállítás nem változott. Az előző verzió továbbra is visszaállítási alapként elérhető, a teljes mentés a privát munkamappában.

Élesítés utáni szövegáttekintés: a csatolt „Mire számíts?” a saját megnevezése szerint a Tavaszi ív külön céloldalának bakonyi kártyája után, a Pannonhalma–Tihany kártya elé való, nem a főoldalra. A `/tavaszi-iv/` útvonal a tényleges éles ellenőrzésben jelenleg 404. Új oldal vagy nem végleges adat nem került ki. Közös tisztázás kell a programazonosság, dátum/bázis/táv, étkezés és különösen a 60 000 Ft-os díj és a szállás viszonyában, mielőtt a vázlat a végleges ajánlatba kerül. A korábban jóváhagyott, most éles ajánlati számok megmaradtak.
