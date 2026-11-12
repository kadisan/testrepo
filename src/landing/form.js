import {copy,packageIds,languageNames} from './content.js';
export function enquiryValues(formData,lang) {
 const t=copy[lang];
 const pack=packageIds.indexOf(formData.get('package'));
 const weeks=formData.getAll('weekend').map(Number).filter(i=>Number.isInteger(i)&&i>=0&&i<3);
 const windowRaw=formData.get('call_window');
 const windowIndex=windowRaw===null||windowRaw===''?NaN:Number(windowRaw);
 const program=['Életutak találkozása',`Csomag: ${pack>=0?copy.hu.priceNames[pack]:'Egyeztetendő'}`,`Hétvégék: ${weeks.map(i=>`${copy.hu.tripDates[i]} – ${copy.hu.tripTitles[i]}`).join('; ')||'Egyeztetendő'}`].join('\n');
 const reason=[String(formData.get('what_brought_you')||'').trim(),`Érdeklődés nyelve: ${languageNames[lang]}`,program].join('\n');
 return {name:String(formData.get('name')||'').trim(),email:String(formData.get('email')||'').trim(),phone:String(formData.get('phone')||'').trim(),call_window:Number.isInteger(windowIndex)&&windowIndex>=0&&windowIndex<4?copy.hu.form.windows[windowIndex]:'',what_brought_you:reason,program,consent:formData.get('consent')?'Hozzájárulok a visszahívás célú adatkezeléshez.':''};
}
