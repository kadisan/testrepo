import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { runInNewContext } from 'node:vm';

const requestId = '22d9a455-a930-42d0-912d-9127080f2f43';
const env = { CALLBACK_SECRET: 'a-test-secret-at-least-thirty-two-characters-long' };
const lead = { requestId, name: 'Teszt Elek', phone: '+36 30 123 4567', consent: true };

function scriptHarness({ failMail = false } = {}) {
  const rows = [[
    'Beérkezett (budapesti idő)', 'Kérésazonosító', 'Név', 'Telefonszám',
    'Mi hozott most ide?', 'Csomag', 'Hétvégék', 'Hozzájárulás',
    'Értesítés állapota', 'Utolsó frissítés', 'Adatlenyomat',
  ]];
  const messages = [];
  let held = false;
  const sheet = {
    getLastRow: () => rows.length,
    appendRow: values => rows.push([...values]),
    getRange(row, column, count = 1, columns = 1) {
      return {
        getValues: () => rows.slice(row - 1, row - 1 + count).map(values => values.slice(column - 1, column - 1 + columns)),
        getValue: () => rows[row - 1][column - 1],
        setValue(value) { rows[row - 1][column - 1] = value; },
        createTextFinder(value) {
          return {
            matchEntireCell() { return this; }, useRegularExpression() { return this; },
            findNext() {
              const index = rows.findIndex((values, index) => index >= row - 1 && values[column - 1] === value);
              return index >= 0 ? { getRow: () => index + 1 } : null;
            },
          };
        },
      };
    },
  };
  const properties = new Map([
    ['CALLBACK_SECRET', env.CALLBACK_SECRET], ['CALLBACK_SPREADSHEET_ID', 'owner-sheet'],
    ['CALLBACK_SHEET_NAME', 'Életutak-visszahívások'],
  ]);
  const context = {
    PropertiesService: { getScriptProperties: () => ({ getProperty: key => properties.get(key) }) },
    LockService: { getScriptLock: () => ({ tryLock() { held = true; return true; }, hasLock: () => held, releaseLock() { held = false; } }) },
    SpreadsheetApp: { openById: () => ({ getSheetByName: () => sheet, getUrl: () => 'https://docs.google.com/spreadsheets/d/owner-sheet' }), flush() {} },
    MailApp: { sendEmail(message) { if (failMail) throw new Error('quota'); messages.push(message); } },
    Utilities: {
      formatDate: () => '2026-11-13 12:00:00',
      DigestAlgorithm: { SHA_256: 'sha256' }, Charset: { UTF_8: 'utf8' },
      computeDigest: (algorithm, value, charset) => Array.from(createHash(algorithm).update(value, charset).digest()),
    },
    ContentService: { MimeType: { JSON: 'application/json' }, createTextOutput: text => ({ text, setMimeType() { return this; } }) },
    console: { log() { assert.fail('no runtime logs'); } },
  };
  runInNewContext(readFileSync(new URL('../integrations/callback/Code.gs', import.meta.url), 'utf8'), context);
  return {
    rows, messages,
    submit: body => JSON.parse(context.doPost({ postData: { contents: JSON.stringify({ ...body, secret: env.CALLBACK_SECRET }) } }).text),
  };
}

test('Apps Script durably stores once and sends one owner notification across identical retries', () => {
  const script = scriptHarness();
  const first = script.submit(lead);
  const second = script.submit(lead);
  assert.equal(first.ok, true);
  assert.equal(first.notificationSent, true);
  assert.equal(second.ok, true);
  assert.equal(second.duplicate, true);
  assert.equal(script.rows.length, 2);
  assert.equal(script.messages.length, 1);
  assert.equal(script.messages[0].to, 'kadisan@gmail.com');
  assert.equal(script.rows[1][3], "'+36 30 123 4567");
});

test('Apps Script confirms stored lead even when owner email quota fails', () => {
  const script = scriptHarness({ failMail: true });
  const result = script.submit(lead);
  assert.equal(result.ok, true);
  assert.equal(result.notificationSent, false);
  assert.equal(script.rows.length, 2);
  assert.match(script.rows[1][8], /nem sikerült/);
  assert.equal(script.submit(lead).ok, true);
  assert.equal(script.rows.length, 2);
});

test('Apps Script rejects request-ID reuse with changed data and neutralizes spreadsheet formulas', () => {
  const script = scriptHarness();
  assert.equal(script.submit({ ...lead, name: '=IMPORTDATA("example")', reason: '@formula' }).ok, true);
  assert.equal(script.rows[1][2], '\'=IMPORTDATA("example")');
  assert.equal(script.rows[1][4], "'@formula");
  const conflict = script.submit({ ...lead, name: 'Changed data' });
  assert.equal(conflict.ok, false);
  assert.equal(conflict.error, 'request_id_conflict');
  assert.equal(script.rows.length, 2);
  assert.equal(script.messages.length, 1);
});
