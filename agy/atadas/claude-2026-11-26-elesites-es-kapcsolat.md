# Élesítés és közvetlen kapcsolat — 2026. november 26.

A szerző a közösen elkészült aktuális változat saját domaines élesítését kéri. Ez felülírja az előző, kizárólag előnézetre szóló határt. A később csatolt „Mire számíts?” vázlat közös vizsgálata csak az élesítés után következik, a kiadásban nem szerepel.

Nyilvános kapcsolat: `melletted@sarkadisandor.hu`; fogadása a szerző által már tesztelt Cloudflare-továbbítással a Gmailbe jut. A Gmail SMTP-küldés ettől külön, szolgáltatói hozzáférésre váró feladat. Új díjas szolgáltatás, levelezési DNS-módosítás és új valódi űrlapbeküldés nincs ebben a webes kiadásban.

A három aktív magyar oldal közvetlen elérhetősége frissült. Facebook: `https://www.facebook.com/kardosiandras`; Substack: `https://belsout.substack.com/`; Instagram: `https://www.instagram.com/zarandoklat/`. Ezek a főoldal/Tai Chi elfogadott linkjei, most az Életutak láblécében is megjelennek. Az Instagram nem a zarándoklat webcímére, hanem az Instagram-fiókra mutat. A főoldalon/Tai Chi-oldalon a külön zarandoklat.com link megmaradt. A külső Substack-oldal friss gépi letöltését a proxy 403-mal visszautasította; a szerzői forrás szerinti cél maradt meg, nem kitalált profil.

A teljes aktuális magyar Életutak megy ki: helyesen nevezett idézetek, 20–24 px-es valódi dőlt fontok, zöldes-bézses alap és kizárólag hoverre 18%-os labirintusfotó; az elfogadott többi képi és ajánlati javítás is megmarad. A sötét lábléc kontrasztja, beállításgombja és mobilos logóméretezése javult.

Kiadási út: `npm run build` → `python3 scripts/package_site.py` → meglévő `sarkadi-site` Worker, `wrangler.site.jsonc`, `LANDING_ENABLED=true`, `--keep-vars`. A visszahívási API, jóváhagyott jogi alap és régi fordítások útvonalkezelése megmarad. Kiadási azonosító: `2026-11-26-kapcsolat-es-eletutak`. Visszaállítási alap: `c80192c9-dd90-4ba0-a4da-ebb18f9e749c`. A korábbi Worker teljes mentése a nyilvános repón kívül, `/workspace/artifacts/sarkadi-2026-11-26-elesites/production-before/`.

Az új szövegvázlat a `/tavaszi-iv` céloldalt és annak februári bakonyi kártyáját nevezi meg, a főoldalt kifejezetten kizárja. Dátum, bázis, napi km/szint, étkezés, vészhelyzeti kapcsolat és díj/szállás-megosztás tisztázandó. A jelenlegi, korábban jóváhagyott Életutak-ajánlat 60 000 Ft-os csomagját nem írjuk át automatikusan e nem végleges vázlat alapján. Új útvonal, ár, hitbeli megfogalmazás vagy hiányzó adat nem került nyilvánosságra.

A végső láblécjavítás után 9/9 olvashatósági próba ismét sikeres. Az éles konfigurációjú csomag mindhárom oldala 320/390/768/1440 px-en ellenőrizve (12 nézet); 390 px-en kétszeres szöveggel is kilógásmentes. A hozzájárulás elutasítása után a közösségi és e-mail-linkek, a láblécgomb és a logó képernyőképpel ellenőrizve. A jelenlegi éles visszahívási readiness API valódi GET-kérése 200 / enabled=true; új adatbeküldés nincs. A forrás mentése és a meglévő Worker frissítése következik.
