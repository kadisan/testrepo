# Négy nyelv — előkészítés és munkamenet

Állapot: Munkadokumentum; a benne jelölt szerzői döntések jóváhagyottak

Utolsó frissítés: 2026-11-05

## Szerzői döntés
A landingek nyelve: magyar (`hu`), angol (`en`), német (`de`), olasz (`it`). A legutóbbi nyelvfelsorolás négy elemet tartalmaz; ezt alkalmazzuk. A főoldal fordításának terjedelme külön egyeztetendő.

## Javasolt ütemezés
1. Már a váz és a technikai felépítés tervezésekor különítsük el a szöveget a megjelenítéstől; legyenek stabil blokkok és fordítási kulcsok.
2. Készüljön és kapjon szerzői jóváhagyást a magyar ajánlat és szöveg.
3. Következzen az angol, német és olasz változat; a nyelvi ellenőrzés mellett az árakat, dátumokat, részvételi feltételeket is egyeztetni kell.
4. Teszteljük mind a négy nyelven a mobilnézetet, hosszabb feliratokat, nyelvváltást, űrlapokat, adatkezelést és siker-/hibajelzést.

## Tervezési követelmények
- Minden landingnek saját nyelvi változatai legyenek. A nyelvváltó ugyanannak az ajánlatnak a megfelelő nyelvi oldalára vezessen.
- Nyelvenként megosztható URL. Példa, nem végleges cím: `/hu/`, `/en/`, `/de/`, `/it/` az adott landing domainjén.
- A domain/aldomain/alkönyvtár döntést az URL-ek rögzítése előtt kell meghozni.
- `lang`, cím, metaleírás, Open Graph, canonical és kölcsönös hreflang jelölések nyelvenként.
- A nyelvváltóban nyelvnevek szerepeljenek: Magyar, English, Deutsch, Italiano. Billentyűzettel is használható legyen.
- Navigáció, gombok, mezőcímkék, választási lehetőségek, validációs üzenetek, jogi szöveg és visszajelzés is fordítandó.
- A kapcsolatfelvétel nyelve kerüljön az adatmodellbe és a visszahíváskérés mellé. Ez a jelenlegi tízmezős formterv módosítását és bekötési ellenőrzését igényli.
- Az oldal nyelve, a visszahívás nyelve és az út/program nyelve külön adat. Fordított oldal nem jelent automatikusan idegen nyelvű programvezetést.
- Félkész fordítást ne jelenítsünk meg kész nyelvi oldalként. Automatikus átirányítás ne írja felül a látogató választását.

## Hiányzó döntések
Végleges URL-rendszer; melyik program melyik nyelven érhető el; milyen nyelven vállalható visszahívás; fordítások ellenőrzője; a főoldal nyelvi terjedelme.

## Megvalósítás állapota
A jelenlegi HTML egy nyelven, magyarul készült. A többnyelvűség és a nyelvváltó még nincs megvalósítva.
