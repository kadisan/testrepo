import {test} from 'node:test';
import assert from 'node:assert/strict';
import {budapestToday, nextWednesday, validClassDate, taiChiPrefilledUrl} from '../src/taichi-form.js';

test('class dates use the Budapest calendar and keep Wednesdays across month/year boundaries', () => {
  assert.equal(budapestToday(new Date('2026-11-11T23:30:00Z')), '2026-11-12');
  assert.equal(nextWednesday('2026-11-12'), '2026-11-18');
  assert.equal(nextWednesday('2026-11-18'), '2026-11-18');
  assert.equal(nextWednesday('2026-12-31'), '2027-01-06');
  assert.equal(validClassDate('2026-11-18', '2026-11-12'), true);
  for (const value of ['2026-11-11', '2026-11-19', '2026-02-31', 'not-a-date']) {
    assert.equal(validClassDate(value, '2026-11-12'), false);
  }
});

test('the Google handoff carries the selected class and consent without requiring walking answers', () => {
  const config = {
    formEnabled: true, privacyUrl: '/eletutak-talalkozasa/adatkezeles/',
    formAction: 'https://docs.google.com/forms/d/e/test/formResponse',
    entries: {name:'entry.1', email:'emailAddress', phone:'entry.2', call_window:'entry.3', last_20km:'entry.4', been_with_us:'entry.5', what_brought_you:'entry.6', silence_view:'entry.7', consent:'entry.8', program:'entry.9'},
  };
  const values = {name:'Próba', email:'proba@example.com', phone:'+36300000000', class_date:'2026-11-18', note:'Kezdő vagyok.'};
  const url = new URL(taiChiPrefilledUrl(config, values, '2026-11-12'));
  assert.equal(url.pathname, '/forms/d/e/test/viewform');
  assert.match(url.searchParams.get('entry.9'), /Tai Chi.*november 18.*10:00–11:30/);
  assert.match(url.searchParams.get('entry.6'), /Kezdő vagyok/);
  assert.match(url.searchParams.get('entry.3'), /Tai Chi-órával kapcsolatos egyeztetést/);
  assert.match(url.searchParams.get('entry.8'), /Tai Chi-órával kapcsolatos egyeztetéshez/);
  assert.equal(url.searchParams.has('entry.4'), false);
  assert.equal(url.searchParams.has('entry.7'), false);
  assert.throws(() => taiChiPrefilledUrl(config, {...values, class_date:'2026-11-19'}, '2026-11-12'));
  assert.throws(() => taiChiPrefilledUrl({...config, formEnabled:false}, values, '2026-11-12'));
});
