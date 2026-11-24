// Hungarian offer; photo locations clarified by the author on 24 November 2026.
// The parked translations keep their earlier copy until a separate review.
export const conversionOffer = {
  name: 'Életutak találkozása',
  title: 'Változásban vagy, és még nem látod a következő lépést?',
  subtitle: 'Vezetett elcsendesedés gyaloglással, Tai Chival és erdei jelenléttel.',
  introduction: 'Hagyj időt arra, hogy ránézz, mi fontos most neked.',
  gift: 'Bármelyik hétvége és a Télből tavaszba ajándékba is adható. Írj, és küldöm az utalványt.',
  // Publish only author-supplied, permission-cleared quotations.
  testimonials: [
    {name: 'Ildikó', text: 'Úgy éreztem, nem várt felismerések birtokosa lettem, pedig bevallom őszintén, e tekintetben kissé szkeptikusan indultam neki, inkább a csavargó lelkem vitt.', emphasis: 'nem várt felismerések birtokosa lettem'},
    {name: 'Éva', text: 'A zarándoklat most is, mint az eddigieknél is, átmosott, újraindította a „rendszert”.', emphasis: 'átmosott, újraindította a „rendszert”'},
    {name: 'Erika', text: 'No Para érzésekkel jöttem hazafelé. Ez nyugtatta a lelkemet, tehermentesített.', emphasis: 'Ez nyugtatta a lelkemet, tehermentesített.'},
  ],
  phone: '+36703161897',
  phoneDisplay: '+36 70 316 1897',
  email: 'kadisan@gmail.com',
  callback: 'Hétköznap 9–19 között érkező kérésedre egy órán belül visszahívlak.',
  weekends: [
    {date: '2027-01-08', label: '2027. január 8–10.', month: 'Január', title: 'A szelíd erő útjai', text: 'Megérkezni az év elejére. Figyelmet adni annak, amiből most elindulnál.', image: 'kodos-erdei-fa.webp', alt: 'Ősöreg bükkfa a ködben, Ráktanyán', caption: 'Ráktanya · Ősöreg bükkfa a ködben.', width: 497, height: 882},
    {date: '2027-02-12', label: '2027. február 12–14.', month: 'Február', title: 'Összeérő utak', text: 'Teret hagyni a saját kérdéseidnek, a közös beszélgetésnek és a csendnek.', image: 'erdei-gyokerek.webp', alt: 'Tündérkút egy fa tövénél, a Bakonybél fölötti erdei ösvényen', caption: 'Tündérkút · A Bakonybél fölötti erdei ösvényen.', captionNote: 'Vízzel telt faüreg: dendrotelma.', width: 1200, height: 1604},
    {date: '2027-03-05', label: '2027. március 5–7.', month: 'Március', title: 'Csendes derű útja', text: 'Visszatekinteni a télre, és megfogalmazni, mit szeretnél továbbvinni.', image: 'marciusi-to.webp', alt: 'A bakonybéli Borostyánkút kevésbé fotózott oldala télen', caption: 'Bakonybél · A Borostyánkút kevésbé fotózott oldala, télen.', width: 1200, height: 1605},
  ],
  packages: [
    {id: 'one', name: 'Egy hétvége', price: 60000, label: 'Egy szabadon választott alkalom', note: 'Első találkozásnak is', features: ['Vezetett hétvégi program', 'Két éjszaka szállás', 'Három étkezés', 'Tai Chi és erdei jelenlét', 'Igény szerint négyszemközti beszélgetés']},
    {id: 'two', name: 'Két hétvége', price: 100000, comparisonPrice: 120000, label: 'Két szabadon választott alkalom', note: 'Két külön hétvége árához képest', features: ['Két teljes hétvége', 'Összesen négy éjszaka és hat étkezés']},
    {id: 'series', name: 'Három hétvége', price: 160000, comparisonPrice: 180000, label: 'A teljes téli sorozat', note: 'Három külön hétvége árához képest', features: ['Mindhárom teljes hétvége', 'Összesen hat éjszaka és kilenc étkezés']},
    {id: 'plus', name: 'Télből tavaszba', price: 200000, label: 'A teljes téli sorozat személyes folytatással.', note: 'Ha a hétvégék után is szeretnél kísérést.', recommended: true, features: ['Mindhárom teljes hétvége', 'Egy egyéni kísérési nap', 'Négyalkalmas Tai Chi-bérlet', '30% kedvezmény a megnevezett tavaszi út programdíjából']},
  ],
  faq: [
    ['Egyedül is érkezhetek?', 'Igen. Akkor is csatlakozhatsz, ha most találkozol velem először. A közös programban és a saját csendedben is lehet helyed. A szobabeosztást előre egyeztetjük.'],
    ['Mennyit gyaloglunk? Bírni fogom?', 'A hétvégék gyalogtávja eltér; a konkrét távot, terepet és téli körülményeket előre megadom. A telefonbeszélgetésben átbeszéljük a gyaloglási tapasztalataidat és a felkészültségedet.'],
    ['Kell Tai Chi-tapasztalat?', 'Nem. Egyszerű mozdulatokkal dolgozunk, előképzettség nem szükséges.'],
    ['Kell beszélnem a személyes dolgaimról?', 'Te döntöd el, mennyit osztasz meg. Nem kell kész kérdéssel érkezned. Ha négyszemközt is szeretnél beszélgetni, biztosítok rá külön időt.'],
    ['Van vallásos része a programnak?', 'Ezen a hétvégén nincs külön vallásos programelem. A személyes hátterem keresztény gyökerű; felekezettől függetlenül várlak.'],
    ['Mindhárom hétvégét vállalnom kell?', 'Nem. Egy, két vagy mindhárom alkalmat választhatod. Minden hétvége önálló program.'],
    ['Hogyan lesz a visszahíváskérésből jelentkezés?', 'Először beszélgetünk. Átbeszéljük, mivel érkeznél, és hogy neked való-e ez az út. Foglalás előtt írásban megkapod a program részleteit, a díjak bontását, a fizetési és lemondási feltételeket. A visszahíváskérés nem foglalás, és nem jár fizetési kötelezettséggel.'],
  ],
};

export const conversionMoney = value => new Intl.NumberFormat('hu-HU').format(value) + ' Ft';
