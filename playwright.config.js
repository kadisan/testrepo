import {defineConfig} from '@playwright/test';
const externalBase=process.env.PLAYWRIGHT_BASE_URL;
export default defineConfig({testDir:'./tests/browser',workers:1,use:{baseURL:externalBase||'http://127.0.0.1:5173',launchOptions:{executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']},headless:true},webServer:externalBase?undefined:{command:'npm run dev -- --port 5173 --strictPort',url:'http://127.0.0.1:5173',reuseExistingServer:true}});
