# Google-fogadó: a cél táblázat megérkezett

Dátum: 2026. november 16. Közös ág: `site/csendes-konyv`.

A szerző megadta a meglévő Google-táblázat linkjét. A privát dokumentum azonosítója és a fogadó titka nem kerül a nyilvános repóba. A cél a meglévő táblázaton belüli külön `Életutak-visszahívások` munkalap; a régi Google Űrlap válaszlapja megmarad. Az értesítési cím a korábban megadott `kadisan@gmail.com`.

## Előkészítés

- A repó `integrations/callback/Code.gs` fogadójából készült privát, a megadott táblázatra előkészített példány. Egy `beallitVisszahivasFogadot` segédfüggvény beállítja a célazonosítót, a munkalap nevét és az értesítési címet; eltérő, már konfigurált cél esetén nem írja át a projektet.
- A titok a telepítő kódjában és HTML-útmutatójában nem szerepel. Külön privát beállításfájl tartalmazza, amelyből a tulajdonos egyetlen Apps Script-tulajdonságot másol át.
- Privát csomag: `/workspace/private/eletutak-google-bekotes/Eletutak-Google-bekotes.zip`. A csomag és tartalma nem Git-fájl és nem Pages-erőforrás. A Google Apps Scripthez a teljes, egyszerű szöveges kód másolható; nincs HTML-entitás vagy a korábbi másolásoknál gondot okozó sorvégi escape.
- A Cloudflare Pages projekt **előnézeti** környezetében a `CALLBACK_SECRET` titkos beállítás létrejött. A `CALLBACK_WEBHOOK_URL` még hiányzik. A produkció beállításai és telepítése változatlanok.

## Mihez kell még a tulajdonos?

Az ellenőrző böngésző a Google bejelentkezési oldalára jutott; nincs szerkesztői Sheets/Apps Script munkamenet, és ilyen írási csatlakozó sem érhető el. A táblázat linkje nem jelent Google-fiókengedélyt.

A tulajdonos új Apps Script-projektbe másolja a privát csomag kódját, felveszi a `CALLBACK_SECRET` tulajdonságot, egyszer futtatja a `beallitVisszahivasFogadot` függvényt, majd webalkalmazásként telepíti (futtató: ő maga; hozzáférés: bárki). Az `/exec` végű címet küldi vissza; a titkot nem a chatben adja át.

Az `/exec` cím beérkezése után lehet a Cloudflare előnézet webhook-címét beállítani, új előnézeti telepítést készíteni és egy megjelölt beérkezési próbával ellenőrizni a tartós táblázatos rögzítést és az értesítést. A Google-oldali tulajdonosi telepítés, a valódi mentési próba és az éles fogadás **még nincs kész**.

## Ellenőrzés

A személyre szabott kód JavaScriptként feldolgozható. Helyettesített tulajdonságtárral ellenőrizve: a megadott cél és az értesítés beállítható; eltérő korábbi célt nem ír felül; titok nélkül nem indul. A helyi útmutató másológombja pontosan az eredeti kódot másolja. A ZIP ép és csak a három szükséges telepítőfájlt tartalmazza. Valódi táblázatírás vagy értesítő levél nem történt. A honlap alkalmazáskódja ebben a körben nem változott.

## Folytatás: az internetes alkalmazás címe megérkezett

A tulajdonos engedélyezte és telepítette a Google-alkalmazást, majd elküldte az `/exec` végpontot. A cím a privát bekötési adatok része, nem kerül a nyilvános forrásba.

Az anonim GET sikeres JSON-választ ad: `post_required`. A privát konfigurációban tárolt összekötő kulccsal, szándékosan érvénytelen kérésazonosítóval végzett POST viszont `unauthorized` választ ad. Ez a fogadó hitelesítési ágából jön: a Google-oldali `CALLBACK_SECRET` hiányzik vagy nem egyezik az előnézethez előkészített értékkel. A próba nem jutott a táblázatkezelésig, és nem küldött értesítést.

Következő tulajdonosi lépés: a projektbeállításokban a `CALLBACK_SECRET` tulajdonság ellenőrzése/beállítása a privát `Titkos-beallitas.txt` alapján. A titkot nem kérjük a chatbe. A segédfüggvény sikeres futtatása és a cél munkalap létrejötte még nincs igazolva. Sikeres hitelesítés után jön a Cloudflare előnézeti webhook beállítása, új előnézet és egy megjelölt mentési próba.

A Cloudflare előnézetben továbbra is csak a `CALLBACK_SECRET` van beállítva; a webhook nincs aktiválva, az űrlap `enabled:false`. A produkciós környezet beállításai üresek, az éles telepítés azonosítója változatlan. A főoldal, a landingek és a Worker alkalmazáskódja nem módosult.
