/* eslint-disable @typescript-eslint/no-require-imports */
const { chromium } = require('@playwright/test');
const assert = require('node:assert/strict');
(async () => {
 const browser = await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
 try {
 const page = await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
 const stories = Array.from({length:4},(_,i)=>({id:i+1,title:`Berita Kerja Sama ${i+1}`,slug:`kerja-sama-${i+1}`,category:'kerjasama',publishedDate:'2026-08-01'}));
 await page.route('**/api/home',route=>route.fulfill({json:{news:[stories[0]],categoryCounts:[{category:'kerjasama',total:4}],sliders:[],statistics:[],events:[],announcements:[],achievements:[],faculties:[],videos:[],admissions:[]}}));
 await page.goto('http://localhost:3000',{waitUntil:'domcontentloaded'});
 const sidebar = page.locator('aside').filter({has:page.getByRole('heading',{name:'Jelajahi Kategori'})});
 const button = sidebar.getByRole('button',{name:'Kerja Sama 4',exact:true});
 await button.waitFor({timeout:90000});
 await page.route('**/api/news?*',async route=>{await new Promise(r=>setTimeout(r,500));await route.fulfill({json:{news:stories,total:4,limit:16,offset:0}})});
 await button.click();
 await page.getByRole('status').filter({hasText:'Memuat berita Kerja Sama'}).waitFor();
 const feed = page.locator('[aria-live="polite"][aria-busy]');
 await page.waitForFunction(()=>document.querySelector('[aria-live="polite"][aria-busy]')?.getAttribute('aria-busy')==='false',{},{timeout:90000});
 assert.equal(await feed.locator('article').count(),4);
 assert.equal(await sidebar.getByRole('button').filter({hasText:'Kerja Sama'}).getAttribute('aria-pressed'),'true');
 const archive = page.getByRole('link',{name:'Jelajahi semua berita Kerja Sama'});
 assert.equal(await archive.getAttribute('href'),'/berita?category=kerjasama');
 await page.setViewportSize({width:390,height:844});
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2));
 console.log('PASS: total 4, loading feedback, all four articles, category archive link, mobile overflow (controlled API fixture)');
 } finally { await browser.close() }
})().catch(error=>{console.error(error);process.exit(1)});
