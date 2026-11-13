/**
 * Owner-deployed Google Apps Script receiver for Életutak callbacks.
 * Configure Script Properties and run setupCallbackSheet() before deployment.
 * No credentials or lead data are written to logs.
 */
var CALLBACK_HEADERS_ = [
  'Beérkezett (budapesti idő)', 'Kérésazonosító', 'Név', 'Telefonszám',
  'Mi hozott most ide?', 'Csomag', 'Hétvégék', 'Hozzájárulás',
  'Értesítés állapota', 'Utolsó frissítés', 'Adatlenyomat'
];

function setupCallbackSheet() {
  var properties = PropertiesService.getScriptProperties();
  var secret = properties.getProperty('CALLBACK_SECRET') || '';
  if (secret.length < 32 || secret.length > 512) throw new Error('Előbb állítsd be a CALLBACK_SECRET tulajdonságot.');
  var id = properties.getProperty('CALLBACK_SPREADSHEET_ID');
  var spreadsheet;
  if (id) {
    spreadsheet = SpreadsheetApp.openById(id);
  } else {
    spreadsheet = SpreadsheetApp.create('Életutak — visszahíváskérések');
    spreadsheet.setSpreadsheetTimeZone('Europe/Budapest');
    properties.setProperty('CALLBACK_SPREADSHEET_ID', spreadsheet.getId());
  }
  var sheetName = properties.getProperty('CALLBACK_SHEET_NAME') || 'Életutak-visszahívások';
  var sheet = spreadsheet.getSheetByName(sheetName) || spreadsheet.insertSheet(sheetName);
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, CALLBACK_HEADERS_.length).setValues([CALLBACK_HEADERS_]);
    sheet.setFrozenRows(1);
  } else {
    assertCallbackHeaders_(sheet);
  }
  properties.setProperty('CALLBACK_SHEET_NAME', sheetName);
  // Authorize the notification scope during owner setup, before anonymous use.
  MailApp.getRemainingDailyQuota();
  SpreadsheetApp.flush();
  console.log('A visszahíváskérések táblázata: ' + spreadsheet.getUrl());
  return spreadsheet.getUrl();
}

function doGet() {
  return callbackJson_({ ok: false, error: 'post_required' });
}

function doPost(event) {
  var lock;
  try {
    if (!event || !event.postData || typeof event.postData.contents !== 'string' || event.postData.contents.length > 12288) {
      return callbackJson_({ ok: false, error: 'invalid_request' });
    }
    var data = JSON.parse(event.postData.contents);
    var properties = PropertiesService.getScriptProperties();
    if (!data || !sameCallbackSecret_(data.secret, properties.getProperty('CALLBACK_SECRET'))) {
      return callbackJson_({ ok: false, error: 'unauthorized' });
    }
    var lead = validateCallback_(data);
    if (!lead) return callbackJson_({ ok: false, error: 'invalid_request' });
    lock = LockService.getScriptLock();
    if (!lock.tryLock(8000)) return callbackJson_({ ok: false, error: 'busy' });
    var spreadsheetId = properties.getProperty('CALLBACK_SPREADSHEET_ID');
    var sheetName = properties.getProperty('CALLBACK_SHEET_NAME');
    if (!spreadsheetId || !sheetName) throw new Error('not_configured');
    var spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    var sheet = spreadsheet.getSheetByName(sheetName);
    if (!sheet) throw new Error('not_configured');
    assertCallbackHeaders_(sheet);
    var fingerprint = callbackFingerprint_(lead);
    var row = findCallbackRow_(sheet, lead.requestId);
    var existing = row > 0;
    var now = Utilities.formatDate(new Date(), 'Europe/Budapest', 'yyyy-MM-dd HH:mm:ss');
    if (existing) {
      if (String(sheet.getRange(row, 11).getValue()) !== fingerprint) {
        return callbackJson_({ ok: false, error: 'request_id_conflict' });
      }
    } else {
      sheet.appendRow([
        now, lead.requestId, safeCallbackCell_(lead.name), safeCallbackCell_(lead.phone),
        safeCallbackCell_(lead.reason), callbackPackage_(lead.package), callbackWeekends_(lead.weekends),
        'Hozzájárult a visszahívás célú adatkezeléshez.', 'Mentve, értesítésre vár', now, fingerprint
      ]);
      row = sheet.getLastRow();
      SpreadsheetApp.flush();
    }
    // Storage is confirmed before email. Quota/delivery problems must not turn
    // an already stored request into a false failure or append a second lead.
    var notificationSent = String(sheet.getRange(row, 9).getValue()) === 'Értesítés elküldve';
    if (!notificationSent) {
      try {
        MailApp.sendEmail({
          to: properties.getProperty('CALLBACK_NOTIFICATION_EMAIL') || 'kadisan@gmail.com',
          subject: 'Életutak — új visszahíváskérés',
          body: callbackEmail_(lead, now, spreadsheet.getUrl())
        });
        notificationSent = true;
        sheet.getRange(row, 9).setValue('Értesítés elküldve');
      } catch (_) {
        sheet.getRange(row, 9).setValue('Mentve; az e-mail-értesítés nem sikerült');
      }
      sheet.getRange(row, 10).setValue(now);
      SpreadsheetApp.flush();
    }
    return callbackJson_({ ok: true, requestId: lead.requestId, notificationSent: notificationSent, duplicate: existing });
  } catch (_) {
    return callbackJson_({ ok: false, error: 'unavailable' });
  } finally {
    if (lock && lock.hasLock()) lock.releaseLock();
  }
}

function validateCallback_(data) {
  if (typeof data.requestId !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(data.requestId)) return null;
  if (typeof data.name !== 'string' || typeof data.phone !== 'string' || data.consent !== true) return null;
  var name = data.name.trim();
  var phone = data.phone.trim();
  var digits = phone.replace(/\D/g, '');
  if (!name || name.length > 120 || /[\u0000-\u001f\u007f]/.test(name)) return null;
  if (phone.length > 40 || !/^\+?[\d\s().-]+$/.test(phone) || digits.length < 7 || digits.length > 15) return null;
  var reason = data.reason === undefined ? '' : data.reason;
  if (typeof reason !== 'string' || reason.length > 1000 || /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(reason)) return null;
  var packageId = data.package === undefined ? '' : data.package;
  if (['', 'one', 'two', 'series', 'plus'].indexOf(packageId) < 0) return null;
  var weekends = data.weekends === undefined ? [] : data.weekends;
  if (!Array.isArray(weekends) || weekends.length > 3 || weekends.some(function(value) {
    return !Number.isInteger(value) || value < 0 || value > 2;
  }) || new Set(weekends).size !== weekends.length) return null;
  return { requestId: data.requestId.toLowerCase(), name: name, phone: phone,
    reason: reason.trim(), consent: true, package: packageId, weekends: weekends.slice().sort() };
}

function assertCallbackHeaders_(sheet) {
  var headers = sheet.getRange(1, 1, 1, CALLBACK_HEADERS_.length).getValues()[0];
  if (headers.join('\t') !== CALLBACK_HEADERS_.join('\t')) throw new Error('unexpected_sheet');
}

function findCallbackRow_(sheet, requestId) {
  if (sheet.getLastRow() < 2) return 0;
  var match = sheet.getRange(2, 2, sheet.getLastRow() - 1, 1)
    .createTextFinder(requestId).matchEntireCell(true).useRegularExpression(false).findNext();
  return match ? match.getRow() : 0;
}

function callbackFingerprint_(lead) {
  var value = JSON.stringify([lead.name, lead.phone, lead.reason, lead.package, lead.weekends]);
  return Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, value, Utilities.Charset.UTF_8)
    .map(function(byte) { return ('0' + ((byte + 256) % 256).toString(16)).slice(-2); }).join('');
}

function safeCallbackCell_(value) {
  // Treat visitor-supplied values as text, including international phone numbers.
  return /^[\s]*[=+\-@]/.test(value) ? "'" + value : value;
}

function sameCallbackSecret_(actual, expected) {
  if (typeof actual !== 'string' || typeof expected !== 'string' || expected.length < 32 || expected.length > 512) return false;
  var difference = actual.length ^ expected.length;
  for (var i = 0; i < expected.length; i++) difference |= (actual.charCodeAt(i) || 0) ^ expected.charCodeAt(i);
  return difference === 0;
}

function callbackPackage_(value) {
  return { one: 'Egy hétvége', two: 'Két hétvége', series: 'Három hétvége', plus: 'Télből tavaszba' }[value] || 'Telefonon egyeztetjük';
}

function callbackWeekends_(values) {
  var dates = ['2027. január 8–10.', '2027. február 12–14.', '2027. március 5–7.'];
  return values.map(function(value) { return dates[value]; }).join('; ') || 'Telefonon egyeztetjük';
}

function callbackEmail_(lead, received, spreadsheetUrl) {
  return [
    'Új visszahíváskérés érkezett az Életutak oldaláról.', '',
    'Beérkezett: ' + received + ' (budapesti idő)',
    'Név: ' + lead.name, 'Telefon: ' + lead.phone,
    'Csomag: ' + callbackPackage_(lead.package),
    'Hétvégék: ' + callbackWeekends_(lead.weekends), '',
    'Mi hozott most ide?', lead.reason || 'Telefonon szeretné átbeszélni.', '',
    'Kérésazonosító: ' + lead.requestId,
    'A kérés már el van mentve a táblázatban:', spreadsheetUrl, '',
    'A visszahíváskérés érdeklődés, nem foglalás. Hírlevélre nem iratkozott fel.'
  ].join('\n');
}

function callbackJson_(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
}
