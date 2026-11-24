# Életutak — külön inspirációs részletterv

**2026. november 24.: félretett kísérlet.** A szerző visszatér a kísérlet előtti teljes előnézethez; a fejlécet nem fogadta el. A fájlok történeti próbák, a `package.py` újrafuttatása nem új telepítési feladat. A korábbi tervlink a teljes előnézetre irányít át a `retired-worker.mjs` segítségével. A „kinek szól” sorok és a programbemutató tömörítése további megfontolásra javasolt, nem beépítésre jóváhagyott ötletek. A következő vizuális kör tárgya a háttérszínek átgondolása az eredeti fejléc megtartásával.

Állapot: **terv, nem végleges és nem élesítési jóváhagyás**. A szerző 2026. november 23-án kérte az erdofurdozz.hu-ról levont ötletek megmutatását tervként, majd megerősítette az indulást. A meglévő `eletutak-atnezes` előnézet és a saját domain változatlan marad.

A külön bemutató három részletet és egy rövid átvezetést mutat: saját portré és erdei útkép átfedő elrendezése; dátumkártyák „kinek szól” szövegjavaslattal; rövid jelenetek a már ismert programból; „Megérkezni. Mozdulni. Továbbindulni.” szövegjavaslat. A résztvevői idézetblokk a jelenlegi magyar buildből kerül bele változatlan szöveggel és keresztnevekkel.

Minden fotó a meglévő repóból származik. A portré a jelenlegi oldal szerkesztett képe, itt elrendezési minta. A referenciaoldalról képet vagy új programadatot nem veszünk át. Nincs új időpont, ár, eredményígéret vagy utalványfeltétel.

A terv statikus, külön kiszolgált oldal. Nem tartalmaz űrlapot, visszahívási API-t, mérőkódot vagy külső képletöltést. A jelenlegi változathoz vezető link külön lapon nyílik meg. A terv megjelölése a fejlécben és a szövegjavaslatoknál is látható.

A `package.py` a meglévő magyar build CSS-ét és idézetblokkját használja fel; a fő alkalmazás forrását és HTML-jét nem módosítja. Futása:

```sh
python3 agy/weboldal/tervek/eletutak-inspiracio/package.py /tmp/eletutak-inspiracio-terv
```

A csomag kizárólag az új `eletutak-terv` Workerhez tartozik; a korábbi előnézet és az éles `sarkadi-site` nem telepítési célja.
