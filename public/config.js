// Csak ellenőrzött, nyilvános adatokat adj meg. Titkos kulcsot soha.
window.SARKADI_CONFIG = {
  metaPixelEnabled: false, // A mérés csak a látogató engedélyével indul; éles profilban bekapcsolva.
  metaPixelId: '419467115532734',
  // Az API elérhetőségét külön ellenőrizzük; fogadó nélkül nincs beküldés.
  callbackEnabled: true,
  callbackEndpoint: '/eletutak-talalkozasa/api/callback',
  formEnabled: false, // Csak a fogadás és a végleges tájékoztató ellenőrzése után.
  formAction: 'https://docs.google.com/forms/d/e/1FAIpQLSedMILa7IZE3Jx86ikaW4asKFDW2-Z-haClJwkU46LLfIJ-ww/formResponse',
  entries: {
    name: 'entry.1151559404',
    email: 'emailAddress', // A Google beépített, bekapcsolt e-mail-gyűjtése.
    phone: 'entry.626096645',
    call_window: 'entry.2099660283',
    last_20km: 'entry.985865425',
    been_with_us: 'entry.1900771901',
    what_brought_you: 'entry.1263461103',
    silence_view: 'entry.12202686',
    consent: 'entry.1618504527',
    program: 'entry.441268117' // A tulajdonos új kérdése: „Melyik út érdekel?”
  },
  privacyUrl: '/eletutak-talalkozasa/adatkezeles/',
  imprintUrl: '/eletutak-talalkozasa/impresszum/',
  email: 'kadisan@gmail.com',
  phone: '+36703161897'
};
