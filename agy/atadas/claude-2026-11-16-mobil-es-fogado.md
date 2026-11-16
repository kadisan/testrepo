# Mobilos olvashatóság és Életutak-fogadó — 2026. november 16.

Kiindulópontok: a közös főoldal `3f7382e` és az Életutak PR #1 `b5c5053` forrása.

## Szerzői kérés és megvalósítás

A szerző alkalmazkodó mobilos megjelenítést, olvasható betűméreteket és képeket kért, valamint az Életutak visszahívási fogadójának bekötését. Megerősítette az általános főoldal négy kapuját: Tai Chi – Tengely és tempó, Életutak találkozása, zarándoklat.com, Fák Bölcsessége.

A közös változatban a Csendes könyv főoldal és az új magyar Életutak-landing együtt fut. A két ág döntései és állapotbejegyzései megmaradtak. A régi generált magyar landing helyett a PR `conversion-*` forrása érvényes; a fordítások továbbra is parkoltatottak. A PR GitHubon beállított történeti célágát nem írtuk át.

Új közös stílus: `src/responsive.css`, mindkét alkalmazásbelépőből importálva. A főoldal és az Életutak főszövege 20 px, a magyarázatok 18 px. A rácsok és az árkártyák tartalmának minimális szélessége nem tolhatja szét a nézetet. A korábban nagyításkor a menü elé lógó ugrólink a saját teljes magasságával kerül képernyőn kívülre, és fókuszkor elérhető marad.

Rövid telefonon a főoldal mottója, a tények és a főgomb kerülnek előre, a portré utánuk következik. A Tai Chi-nyitásban az időpont, helyszín és jelzőgomb megelőzi a hosszabb bevezetőt. Az Életutak címének mérete és térközei igazodnak a kis képernyőmagassághoz. Szöveget nem töröltünk és a nagyított szöveget nem zsugorítottuk vissza. Táblagépen a főoldali portré keskenyebb oszlopot kapott, nem alacsony, széles képcsíkot.

A négy kapu meglévő jelképe, színei és célcímei megmaradtak. Az Életutak láblécéből `/#utak` vezet vissza a négy lehetőséghez. A két eltérő logót, a szerzői mottót, az ajánlat szövegét és árait nem terveztük át.

## A fogadó állapota

A saját API, a Google Apps Script, az ismételt kérés védelme és az igazolt mentéshez kötött visszajelzés a PR-ból együtt került a közös forrásba. A fogadóhoz szükséges Cloudflare-projekt és Worker olvasása sikeres. A Pages éles/előnézeti környezetében és a meglévő Workerben jelenleg nincsenek callback-beállítások.

Google Drive/Sheets/Apps Script írási kapcsolat nem érhető el ebben a munkamenetben. A szerzőtől a meglévő táblázat linkjét kértem; a korábban ismert tulajdonosi értesítési cím `kadisan@gmail.com`. A táblázatot a `CALLBACK_SPREADSHEET_ID` beállítással lehet használni, a korábbi Google-űrlap válaszlapjától elkülönített munkalappal. A fogadó tulajdonosi telepítése és `/exec` címe után állítható be a Cloudflare-oldali `CALLBACK_WEBHOOK_URL` és `CALLBACK_SECRET`. Titkot nem kérünk chatben és nem tárolunk Gitben.

Az online beküldés csak a beállított, ténylegesen ellenőrzött fogadó után válhat aktívvá. Az egység- és böngészőtesztek külső kérés helyettesítésével működnek; valódi visszahíváskérés vagy értesítő levél nem ment ki.

## Feltöltés és élesítés

A munkakörnyezet GitHub-tokenje a vizsgálatkor érvénytelen volt; a nyilvános repó olvasása anonim HTTPS-en működött. A szerzőtől újrahitelesítést kértem, titkos kulcs bekérése nélkül. Feltöltés előtt a távoli közös ág friss állapotát újra ellenőrizni kell; nincs force push.

A saját domain, az éles Életutak, a `main`, a DNS és az éles Worker ebben a javításban nem változik. A teljes főoldal saját domain alatti élesítéséhez a root, a Tai Chi és az erőforrások útvonalai külön kiadási feladatot alkotnak; a jelenlegi Worker csak az Életutak alútvonalat szolgálja ki.

## Ellenőrzés

Az eredmények az állapotfájl azonos dátumú bejegyzésében szerepelnek. Új próba: `tests/browser/responsive.spec.js`; kis telefonok, valódi 200%-os alapszöveg, használható menü, négy kapu és Életutak-visszalink.
