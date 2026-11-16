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
