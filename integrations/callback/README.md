# Egyetlen beküldéssel működő visszahíváskérés

**Az adapter elkészült, de a tulajdonosi Google-beállítás és a titkos környezeti változók nélkül nincs bekapcsolva.** Ez a dokumentum nem jelenti a fogadás élesítését. Az új oldal csak igazolt szerverválasz után mutathat sikeres beküldést; hiányzó beállításnál közvetlen telefonos kapcsolatot kínáljon.

A korábbi Google Űrlap kötelező e-mailt kér. Az új, jóváhagyott űrlap csak nevet, telefonszámot és hozzájárulást kér kötelezően. Ezért ez a megoldás a meglévő Google-fiókban **külön visszahívási munkalapot** használ. A régi Google Űrlap és válaszlap nem változik.

## Működés

`Böngésző → saját domain /eletutak-talalkozasa/api/callback → Google Apps Script → privát Google Táblázat → e-mail-értesítés a tulajdonosnak`

A kérés azonosítója ismételt beküldésnél is ugyanaz. Az Apps Script zárolás mellett ellenőrzi, hogy elmentette-e már, így egy hálózati hiba utáni újrapróbálás nem hoz létre még egy sort. Azonos azonosítóval módosított adatok külön hibát kapnak.

**A siker tartós táblázatmentést jelent.** Az e-mail csak értesítés: kvótahiba esetén a kérés megmarad, az „Értesítés állapota” oszlop jelzi a problémát. Sikeres e-mail-küldési hívás sem bizonyítja a beérkezést a postaládába. A tulajdonos a táblázatot is ellenőrizze, különösen az egyórás visszahívás vállalása mellett. Sikertelen értesítésnél azonos kérés újrapróbálása újra megkísérli az értesítést.

## Tulajdonosi beállítás a Google-fiókban

1. Nyisd meg a Google Apps Script szerkesztőjét a visszahíváskéréseket kezelő saját Google-fiókoddal. Hozz létre önálló projektet, és a `Code.gs` teljes tartalmát másold bele.
2. A projekt beállításainál a **Script Properties / Szkript tulajdonságai** között állítsd be:

   | Név | Érték |
   | --- | --- |
   | `CALLBACK_SECRET` | Legalább 32 karakteres, véletlenszerű titok. Például jelszókezelővel készített 64 karakter. Ezt ne tedd a forráskódba vagy a nyilvános konfigurációba. |
   | `CALLBACK_SPREADSHEET_ID` | Opcionális: egy meglévő saját táblázat azonosítója. Ha nincs megadva, a beállító függvény újat készít. |
   | `CALLBACK_SHEET_NAME` | Opcionális, alapérték: `Életutak-visszahívások`. A régi űrlap válaszlapjának nevét ne add meg. |
   | `CALLBACK_NOTIFICATION_EMAIL` | Opcionális; alapértelmezett tulajdonosi cím: `kadisan@gmail.com`. |

3. Futtasd egyszer a **`setupCallbackSheet`** függvényt. Add meg a saját táblázat és a saját értesítő levelek kezeléséhez kért Google-jogosultságot. Ez a lépés táblázatot és fejléceket készít; nem küld próbaérdeklődőt vagy próbaértesítést. A futtatási naplóban a táblázat linkje jelenik meg. A táblázat maradjon privát, kizárólag a szükséges szervezői hozzáféréssel.
4. **Deploy → New deployment → Web app.** A futtató legyen a tulajdonos (**Execute as: Me**), a hozzáférés pedig a nyilvános fogadáshoz **Anyone**. A titkos kulcsot csak a saját szerver küldi, a böngésző nem ismeri. Másold ki a `https://script.google.com/macros/s/…/exec` végű telepítési címet.
5. A Cloudflare Pages Functions éles környezetében add meg ezeket a titkos környezeti változókat:

   | Név | Érték |
   | --- | --- |
   | `CALLBACK_WEBHOOK_URL` | Az előző pontban kapott Apps Script `/exec` URL. |
   | `CALLBACK_SECRET` | Pontosan ugyanaz a titok, mint a Script Properties között. |

   Ha a saját domain Worker közvetlenül futtatja az adaptert, ugyanott is szükségesek ezek a titkos változók. Ha a Worker a Pages API-ját továbbítja, az eredeti kérés `Origin` ellenőrzését és a proxy célját össze kell hangolni. Titok nem kerülhet a `public/config.js` fájlba, HTML-be, naplóba vagy Gitbe.
6. Telepítsd a Pages Functiont és a frissített domain Workert. A frissített forrás már külön kezeli az API-útvonalat; a régi, csak GET/HEAD kéréseket engedő éles Worker telepítés nélkül továbbra is 405-ös választ adna a POST kérésre.

Apps Script kódmódosításakor a webalkalmazás-telepítést új verzióra kell állítani. A fejlesztői `/dev` címet a szerver nem fogadja el.

## Ellenőrzés és élesítés

- A `GET /eletutak-talalkozasa/api/callback` csak `{ "enabled": true/false }` választ ad. Ez azt jelzi, hogy a szerveren szintaktikailag megfelelő a konfiguráció. **Nem bizonyítja**, hogy a Google-jogosultság, a titok vagy a táblázat-hozzáférés ténylegesen működik.
- Az egységtesztek minden külső kérést helyben helyettesítenek. Nem küldenek be valódi érdeklődőt.
- Teljes ellenőrzéshez egy egyértelműen megjelölt, a tulajdonossal egyeztetett próbakérés szükséges. Ezt csak a beállított tulajdonosi rendszerben, szándékosan küldjétek el. Ellenőrizzétek a táblázatot és az értesítést is, majd a próbabejegyzést töröljétek. Ilyen élő próbát a fejlesztés nem végzett.
- Időtúllépésnél az adat már el lehet mentve. Az oldal ugyanazzal a `requestId`-val próbálja újra, és a látogató beírt adatai maradjanak meg. Amint a látogató megváltoztatja a beküldött adatokat, új azonosító kell.
- Az API tartalom- és méretkorlátozást, eredetellenőrzést, csapdamezőt és szigorú továbbítási célkorlátozást használ. Ezek nem jelentenek teljes körű botvédelmet vagy valódi sebességkorlátozást. Nagyobb kéretlen forgalomnál Cloudflare-szabályt vagy ellenőrzött botvédelmet érdemes hozzáadni; szerverfolyamat memóriájára épülő látszatkorlátozás nincs benne.
- A felület állítson le minden további elküldést siker után. Az API azonos tárolt kérésre is sikert ad; ezt ne számoljátok új érdeklődőnek.

### API-szerződés

POST `Content-Type: application/json`, legfeljebb 12 KiB:

```json
{
  "requestId": "22d9a455-a930-42d0-912d-9127080f2f43",
  "name": "A látogató keresztneve",
  "phone": "+36 …",
  "reason": "Opcionális, legfeljebb 1000 karakter",
  "consent": true,
  "package": "one",
  "weekends": [0],
  "website": ""
}
```

A `package` értéke üres, `one`, `two`, `series` vagy `plus`; a `weekends` opcionális, a három meghirdetett időpont 0–2 indexe. A `website` a látogatótól elrejtett csapdamező, normál esetben üres. A böngésző a `crypto.randomUUID()` azonosítóját tárolja az adott beküldéshez. Nem küldünk e-mail-címet, egészségi adatot vagy hírlevél-hozzájárulást.

Siker: `{ "ok": true, "requestId": "…" }`. Hiányzó konfiguráció: HTTP 503. Nem igazolt fogadás: 502; időtúllépés: 504. Az ismételhető hiba `retryable: true` jelölést is kap. A válaszok nem tartalmaznak nevet, telefonszámot, titkot vagy upstream hibaüzenetet.

## Adatkezelési tájékoztatóhoz

A tájékoztatót a tényleges éles működéshez kell igazítani. Az új fogadásra ez a tényállítás használható:

> A visszahíváskérésben a nevedet, telefonszámodat és a kapcsolatfelvételhez adott hozzájárulásodat kérem. Opcionálisan megadhatod, mi hozott most ide, illetve melyik program vagy csomag érdekel. A saját honlap szervere a Google Apps Script szolgáltatáson keresztül egy nem nyilvános Google Táblázatba menti a kérést; a beérkezésről e-mail-értesítést kapok. A kéréshez technikai azonosító és beérkezési idő tartozik. A visszahíváskérés nem hírlevél-feliratkozás és nem foglalás.

A meglévő, jóváhagyott megőrzési időt és érintetti jogokat őrizzétek meg; zárt megkeresésnél jelenleg legfeljebb egy év szerepel. A törlésre a táblázatban **és az értesítő e-mailben** is figyelni kell. A valódi szervezői hozzáférést, a szolgáltatói feltételeket és az adatkezelés egyéb részeit a tulajdonos ellenőrizze. A marketing-hozzájárulás külön marad; a Meta nem kapja meg az űrlap mezőinek tartalmát.
