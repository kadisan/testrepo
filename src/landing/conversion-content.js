// Hungarian offer agreed with the author on 13 November 2026.
// The parked translations keep their earlier copy until a separate review.
export const conversionOffer = {
  name: 'Életutak találkozása',
  title: 'Önismereti hétvége a természetben',
  subtitle: 'Vezetett elcsendesedés gyaloglással, Tai Chival és erdei jelenléttel.',
  phone: '+36703161897',
  phoneDisplay: '+36 70 316 1897',
  email: 'kadisan@gmail.com',
  callback: 'Hétköznap 9–19 között érkező kérésedre egy órán belül visszahívlak.',
  weekends: [
    {date: '2027-01-08', label: '2027. január 8–10.', month: 'Január', title: 'A szelíd erő útjai', text: 'Megérkezni az év elejére. Figyelmet adni annak, amiből most elindulnál.', image: 'kodos-erdei-fa.webp', alt: 'Elágazó fa egy csendes, ködös erdőben', width: 497, height: 882},
    {date: '2027-02-12', label: '2027. február 12–14.', month: 'Február', title: 'Összeérő utak', text: 'Teret hagyni a saját kérdéseidnek, a közös beszélgetésnek és a csendnek.', image: 'erdei-gyokerek.webp', alt: 'Összefonódó fagyökerek az erdőben', width: 1200, height: 1604},
    {date: '2027-03-05', label: '2027. március 5–7.', month: 'Március', title: 'Csendes derű útja', text: 'Visszatekinteni a télre, és megfogalmazni, mit szeretnél továbbvinni.', image: 'marciusi-to.webp', alt: 'Fák tükröződése egy csendes tó vizében', width: 1200, height: 1605},
  ],
  packages: [
    {id: 'one', name: 'Egy hétvége', price: 60000, label: 'Egy szabadon választott alkalom', note: 'Első találkozásnak is', features: ['Vezetett hétvégi program', 'Két éjszaka szállás', 'Három étkezés', 'Tai Chi és erdei jelenlét', 'Igény szerint négyszemközti beszélgetés']},
    {id: 'two', name: 'Két hétvége', price: 100000, label: 'Két szabadon választott alkalom', note: '20 000 Ft kedvezmény', features: ['Két teljes hétvége', 'Összesen négy éjszaka és hat étkezés']},
    {id: 'series', name: 'Három hétvége', price: 160000, label: 'A teljes téli sorozat', note: '20 000 Ft kedvezmény', features: ['Mindhárom teljes hétvége', 'Összesen hat éjszaka és kilenc étkezés']},
    {id: 'plus', name: 'Bónusz', price: 200000, label: 'A teljes sorozat személyes folytatással', note: 'Több idő a saját utadra', features: ['Mindhárom teljes hétvége', 'Egy egyéni kísérési nap', 'Négyalkalmas Tai Chi-bérlet', '30% kedvezmény a megnevezett tavaszi út programdíjából']},
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
