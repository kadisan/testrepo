import '@fontsource/source-sans-3/latin-ext-200.css';
import '@fontsource/source-sans-3/latin-200.css';
import '@fontsource/source-sans-3/latin-ext-400.css';
import '@fontsource/source-sans-3/latin-400.css';
import '@fontsource/source-sans-3/latin-ext-600.css';
import '@fontsource/source-sans-3/latin-600.css';
import '@fontsource/lora/latin-ext-500.css';
import '@fontsource/lora/latin-500.css';
import '@fontsource/cormorant-garamond/latin-ext-300-italic.css';
import '@fontsource/cormorant-garamond/latin-300-italic.css';
import './style.css';
import './readability.css';
import './woodland.css';
import './marketing.css';
import {initMarketing} from './marketing.js';
import {copy,packageIds,packagePrices} from './content.js';
import {money,arrow} from './render.js';
import {enquiryValues} from './form.js';
import {isConfigured,validPhone,validEmail,prefilledFormUrl} from '../form.js';
const lang=document.documentElement.lang;
const t=copy[lang],f=t.form;
const toggle=document.querySelector('.lp-menu'),nav=document.querySelector('#lp-nav');
function closeMenu(){toggle.setAttribute('aria-expanded','false');nav.classList.remove('is-open')}
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));nav.classList.toggle('is-open',open)});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('click',e=>{if(!e.target.closest('.lp-header'))closeMenu()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&toggle.getAttribute('aria-expanded')==='true'){closeMenu();toggle.focus()}});
// Retain campaign attribution and the selected package when changing language.
document.querySelectorAll('.lp-languages a').forEach(a=>{const url=new URL(a.href);url.search=location.search;url.hash=location.hash;a.href=url.href});
const config=window.SARKADI_CONFIG||{};
initMarketing(config,lang);
const form=document.querySelector('#callback-form'),pack=form.querySelector('[name=package]'),summary=document.querySelector('.lp-selection');
const checkboxes=[...form.querySelectorAll('[name=weekend]')];
function selectionChanged(){const i=packageIds.indexOf(pack.value);summary.hidden=i<0;summary.textContent=i>=0?`${f.selection} ${t.priceNames[i]} · ${money(packagePrices[i],lang)}`:'';document.querySelectorAll('.lp-price-card').forEach((el,index)=>el.classList.toggle('is-selected',index===i));}
function selectPackage(id,trip){if(!packageIds.includes(id))return;pack.value=id;checkboxes.forEach((el,i)=>{el.checked=Number.isInteger(trip)?trip===i:['series','plus'].includes(id)});selectionChanged();document.querySelector('#kapcsolat').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});pack.focus({preventScroll:true})}
document.querySelectorAll('.lp-package-select').forEach(b=>b.addEventListener('click',()=>selectPackage(b.dataset.package)));
document.querySelectorAll('.lp-trip-select').forEach(b=>b.addEventListener('click',()=>selectPackage('one',Number(b.dataset.trip))));
pack.addEventListener('change',()=>{if(['series','plus'].includes(pack.value))checkboxes.forEach(el=>el.checked=true);selectionChanged()});
const initial=new URL(location.href).searchParams.get('pack');if(packageIds.includes(initial)){pack.value=initial;selectionChanged();if(['series','plus'].includes(initial))checkboxes.forEach(el=>el.checked=true)}
const dialog=document.querySelector('#lp-legal-dialog');
function legal(type){const url=type==='privacy'?config.privacyUrl:config.imprintUrl;if(url&&(/^https:\/\//.test(url)||/^\/(?![\/\\])/.test(url))){window.open(url,'_blank','noopener,noreferrer');return}document.querySelector('#lp-legal-title').textContent=t.legal[type];document.querySelector('#lp-legal-text').textContent=t.legal[`${type}Text`];dialog.showModal()}
document.querySelectorAll('[data-legal]').forEach(b=>b.addEventListener('click',()=>legal(b.dataset.legal)));
document.querySelector('#lp-privacy-link').addEventListener('click',e=>{e.preventDefault();legal('privacy')});
document.querySelectorAll('.lp-dialog-close,.lp-dialog-done').forEach(b=>b.addEventListener('click',()=>dialog.close()));
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
const status=document.querySelector('#lp-form-status'),submit=form.querySelector('[type=submit]');
if(isConfigured(config)){const notice=document.querySelector('.lp-demo-note');if(notice)notice.hidden=true;}
form.addEventListener('input',e=>{if(e.target.classList.contains('lp-invalid')){e.target.classList.remove('lp-invalid');e.target.removeAttribute('aria-invalid')}});
form.addEventListener('submit',e=>{
 e.preventDefault();status.textContent='';status.classList.remove('is-error');form.querySelectorAll('.lp-invalid').forEach(el=>{el.classList.remove('lp-invalid');el.removeAttribute('aria-invalid')});
 const required=[...form.querySelectorAll('[required]')];const invalid=required.filter(el=>el.type==='checkbox'?!el.checked:!el.value.trim()||(el.name==='phone'&&!validPhone(el.value))||(el.name==='email'&&!validEmail(el.value)));
 if(invalid.length){invalid.forEach(el=>{el.classList.add('lp-invalid');el.setAttribute('aria-invalid','true')});status.textContent=f.error;status.classList.add('is-error');invalid[0].focus();return}
 if(!isConfigured(config)){status.textContent=f.demoStatus;status.classList.add('is-error');status.focus();return}
 submit.disabled=true;submit.textContent=f.opening;
 try{location.assign(prefilledFormUrl(config,enquiryValues(new FormData(form),lang),lang))}
 catch{status.textContent=f.failed;status.classList.add('is-error');status.focus()}
 finally{submit.disabled=false;submit.innerHTML=`${f.submit}${arrow}`}
});
