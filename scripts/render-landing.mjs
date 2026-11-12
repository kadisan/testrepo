import {mkdir,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {dirname,join} from 'node:path';
import {renderDocument} from '../src/landing/render.js';
import {copy,languagePath} from '../src/landing/content.js';
const root=dirname(dirname(fileURLToPath(import.meta.url)));
for(const lang of Object.keys(copy)){
 const destination=join(root,languagePath(lang),'index.html');
 await mkdir(dirname(destination),{recursive:true});
 await writeFile(destination,renderDocument(lang));
}
console.log('Életutak találkozása: 4 nyelvi oldal frissítve.');
