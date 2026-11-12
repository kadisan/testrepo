import {defineConfig} from 'vite';
import {resolve} from 'node:path';
export default defineConfig({build:{rollupOptions:{input:{home:resolve('index.html'),landing:resolve('eletutak-talalkozasa/index.html'),en:resolve('eletutak-talalkozasa/en/index.html'),de:resolve('eletutak-talalkozasa/de/index.html'),it:resolve('eletutak-talalkozasa/it/index.html'),privacy:resolve('eletutak-talalkozasa/adatkezeles/index.html'),imprint:resolve('eletutak-talalkozasa/impresszum/index.html')}}}});
