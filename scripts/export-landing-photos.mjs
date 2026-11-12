// Preserve originals. Gallery copies keep their dimensions; card copies are at
// most 1200px wide. No crop, retouching or generated changes.
import {mkdir, readFile, writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {join} from 'node:path';

const root=fileURLToPath(new URL('../',import.meta.url));
const sources={
  'sarkadi-sandor-portre.webp':'Portré.png',
  'erdei-ut.webp':'ChatGPT Image Nov 6, 2026, 08_22_16 PM.jpg',
  'szalagok.webp':'ChatGPT Image Nov 6, 2026, 08_22_09 PM.jpg',
  'tai-chi-telen.webp':'tai_chi_kapd_el_a_madar_tollat.jpg',
  'labirintus.webp':'1767447707480.jpg',
  'kodos-erdei-fa.webp':'tree in the bakony.jpg',
  'erdei-gyokerek.webp':'1767447707975.jpg',
  'marciusi-to.webp':'1771412884226 (2).jpg',
};
const destination=join(root,'public/images/eletutak');
const cardOutputs=new Set(['kodos-erdei-fa.webp','erdei-gyokerek.webp','marciusi-to.webp']);
await mkdir(destination,{recursive:true});
const provenance=[];
for(const [output,name] of Object.entries(sources)){
  const source=join(root,'kepek',name);
  const before=await readFile(source);
  const resize=cardOutputs.has(output)?['-resize','1200x>']:[];
  execFileSync('magick',[source,'-auto-orient','-strip',...resize,'-quality','86',join(destination,output)]);
  const after=await readFile(source);
  if(!before.equals(after))throw new Error(`The original changed: ${name}`);
  provenance.push({source:`kepek/${name}`,output:`images/eletutak/${output}`,sourceSha256:createHash('sha256').update(before).digest('hex'),bytes:(await readFile(join(destination,output))).length});
}
await writeFile(join(root,'agy/ajanlatok/eletutak-talalkozasa/kepforrasok.json'),JSON.stringify({repository:'kadisan/testrepo',revision:'ceaee97409bd9b04412b17ece77cdd5a1a017e88',processing:'Originals preserved. WebP encoding, auto-orientation and metadata removal. Gallery copies keep their dimensions; card copies have a maximum width of 1200px without upscaling. No crop, retouching or generated edits.',photos:provenance},null,2)+'\n');
console.log(`Exported ${provenance.length} supplied images; ${provenance.reduce((n,p)=>n+p.bytes,0)} bytes in total. Originals preserved.`);
