import '@fontsource/source-sans-3/latin-ext-200.css';
import '@fontsource/source-sans-3/latin-200.css';
import '@fontsource/source-sans-3/latin-ext-400.css';
import '@fontsource/source-sans-3/latin-ext-600.css';
import '@fontsource/source-sans-3/latin-400.css';
import '@fontsource/source-sans-3/latin-600.css';
import '@fontsource/lora/latin-ext-500.css';
import '@fontsource/lora/latin-500.css';
import '@fontsource/cormorant-garamond/latin-ext-300.css';
import '@fontsource/cormorant-garamond/latin-300.css';
import '@fontsource/cormorant-garamond/latin-300-italic.css';
import './style.css';
import './site-refinement.css';
import {isConfigured, validPhone, validEmail, prefilledFormUrl} from './form.js';
import {initTaiChiForm} from './taichi-form.js';
const icons = {
  leaf:'<path d="M34 6C16 5 6 15 9 29c16 6 28-3 25-23Z"/><path d="M7 38 28 16M17 28l-1-9m7 2 8-1"/>',
  path:'<path d="M9 39c0-12 23-8 23-19S15 12 19 4M7 33l4 3-1 4M29 11l4 3-1 4"/><circle cx="22" cy="6" r="2"/>',
  sun:'<circle cx="22" cy="21" r="10"/><path d="M22 3v4m0 28v5M4 21h4m28 0h4M9 8l3 3m20 21 3 3M9 35l3-3M32 11l3-3M16 39h12"/>',
  tree:'<path d="M22 39V19m0 11-8-7m8 1 7-6M10 29C1 25 6 17 11 16c-2-10 10-15 15-8 9-3 16 6 12 12 7 9-5 17-12 12M16 40h12"/>'
};
document.querySelectorAll('[data-icon]').forEach(el=>{el.innerHTML=`<svg viewBox="0 0 44 44" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[el.dataset.icon]}</svg>`});
document.querySelectorAll('span').forEach(el=>{if(el.textContent.trim()==='↗' && !el.children.length){el.setAttribute('aria-hidden','true');el.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:22px;height:22px;display:block"><path d="M5 19 19 5M5 5h14v14"/></svg>'}});
const toggle=document.querySelector('.menu-toggle'),nav=document.querySelector('nav');
function closeMenu(){toggle.setAttribute('aria-expanded','false');nav.classList.remove('is-open')}
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));nav.classList.toggle('is-open',open)});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&toggle.getAttribute('aria-expanded')==='true'){closeMenu();toggle.focus()}});
document.addEventListener('click',e=>{if(!e.target.closest('.header'))closeMenu()});
const config=window.SARKADI_CONFIG||{},dialog=document.querySelector('#legal-dialog');
function legal(type){const url=type==='privacy'?config.privacyUrl:config.imprintUrl;if(url&&(/^https:\/\//.test(url)||/^\/(?![\/\\])/.test(url))){window.open(url,'_blank','noopener,noreferrer');return}document.querySelector('#legal-title').textContent=type==='privacy'?'Adatvédelem':'Impresszum';document.querySelector('#legal-text').textContent=type==='privacy'?'A végleges adatkezelési tájékoztató még nem érhető el, ezért ez a bemutató oldal nem küld személyes adatot. Nem használunk analitikai vagy hirdetési követőkódot. A betűkészletek helyben töltődnek be.':'A kiadó és a tárhelyszolgáltató ellenőrzött adatai a véglegesítéskor kerülnek ide. Ez a bemutató oldal még nem fogad jelentkezést.';dialog.showModal()}
document.querySelectorAll('[data-legal]').forEach(b=>b.addEventListener('click',()=>legal(b.dataset.legal)));
document.querySelector('#privacy-link').addEventListener('click',e=>{e.preventDefault();legal('privacy')});
document.querySelectorAll('.dialog-close,.dialog-done').forEach(b=>b.addEventListener('click',()=>dialog.close()));
dialog.addEventListener('click',e=>{if(e.target===dialog){const b=dialog.getBoundingClientRect();if(e.clientX<b.left||e.clientX>b.right||e.clientY<b.top||e.clientY>b.bottom)dialog.close()}});
const form=document.querySelector('#callback-form'),status=document.querySelector('.form-status'),submit=form.querySelector('[type=submit]');
if(isConfigured(config)){document.querySelector('.draft-note').hidden=true;}
if(form.dataset.program==='tai-chi') initTaiChiForm(form,config);
else form.addEventListener('submit',e=>{e.preventDefault();status.classList.remove('error');status.textContent='';form.querySelectorAll('.invalid').forEach(el=>{el.classList.remove('invalid');el.removeAttribute('aria-invalid')});
 const required=[...form.querySelectorAll('[required]')];const invalid=required.filter(el=>el.type==='checkbox'?!el.checked:!el.value.trim()||(el.name==='phone'&&!validPhone(el.value))||(el.name==='email'&&!validEmail(el.value)));
 if(invalid.length){invalid.forEach(el=>{el.classList.add('invalid');el.setAttribute('aria-invalid','true')});status.textContent='Kérlek, töltsd ki a jelölt mezőket, adj meg érvényes telefonszámot és e-mail-címet, és jelezd, hogy kéred a visszahívást.';status.classList.add('error');invalid[0].focus();return}
 if(!isConfigured(config)){status.textContent='A visszahíváskérés még nem aktív. Az adataidat nem küldtük el és nem mentettük. Addig a megadott telefonon vagy e-mailben elérsz.';status.classList.add('error');return}
 const values=Object.fromEntries(new FormData(form));submit.disabled=true;submit.textContent='Űrlap megnyitása…';
 try {location.assign(prefilledFormUrl(config,values));}
 catch {status.textContent='Nem sikerült megnyitni az űrlapot. Az adataid ezen az oldalon megmaradtak, újra megpróbálhatod.';status.classList.add('error')}
 finally {submit.disabled=false;submit.innerHTML='Tovább a beküldéshez <span aria-hidden="true">→</span>'}
});
document.querySelector('#year').textContent=new Date().getFullYear();
