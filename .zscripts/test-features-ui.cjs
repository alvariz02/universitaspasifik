/* eslint-disable @typescript-eslint/no-require-imports -- CommonJS Node test harness. */
const { chromium, expect } = require('@playwright/test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
try { process.loadEnvFile('.env') } catch {}
const base = process.env.TEST_BASE_URL || 'http://localhost:3000'
async function main() {
  const browser = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true })
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' })
  const page = await context.newPage()
  const pageErrors = []
  page.on('pageerror', error => pageErrors.push(error.message))
  fs.mkdirSync('.zscripts/artifacts', { recursive: true })
  let stage = 'login'
  try {
    await page.goto(`${base}/login`, { waitUntil: 'domcontentloaded' })
    await page.locator('#email').fill(process.env.ADMIN_EMAIL)
    await page.locator('#password').fill(process.env.ADMIN_PASSWORD)
    await page.getByRole('button', { name: 'Login', exact: true }).click()
    await page.waitForURL('**/admin', { timeout: 60000 })
    await page.goto(`${base}/admin/news/create`, { waitUntil: 'domcontentloaded' })
    await page.locator('#title').fill('UI regression title')
    assert.equal(await page.locator('#slug').inputValue(), 'ui-regression-title')
    stage = 'news-category-open'
    await page.getByRole('combobox').first().click()
    const listbox = page.getByRole('listbox')
    await listbox.waitFor()
    assert.equal(await listbox.evaluate(el => getComputedStyle(el).backgroundColor), 'rgb(255, 255, 255)')
    await expect(listbox).toHaveCSS('opacity', '1')
    await listbox.screenshot({ path: '.zscripts/artifacts/news-category-desktop.png' })
    if (!(await page.getByRole('option').first().isVisible())) await page.getByRole('combobox').first().click()
    stage = 'news-category-select'
    await page.getByRole('option').first().click()
    stage = 'media-list'
    await page.goto(`${base}/admin/manage/media`, { waitUntil: 'domcontentloaded' })
    await page.getByRole('heading', { name: 'Perpustakaan Media', exact: true }).waitFor()
    await page.getByRole('button', { name: 'Edit', exact: true }).first().waitFor({ timeout: 60000 })
    await page.screenshot({ path: '.zscripts/artifacts/media-desktop.png', fullPage: false })
    await page.getByRole('button', { name: 'Tambah Data', exact: true }).click()
    stage = 'media-picker'
    await page.getByRole('button', { name: 'Pilih dari Media' }).click()
    await page.getByRole('dialog').last().getByRole('button').filter({ has: page.locator('img') }).first().waitFor({ timeout: 60000 })
    await page.getByRole('dialog').last().getByRole('button').filter({ has: page.locator('img') }).first().click()
    await expect(page.getByRole('dialog').locator('img[alt="Preview"]')).toBeVisible({ timeout: 10000 })
    await page.keyboard.press('Escape')
    for (const resource of ['research', 'pages', 'applicants', 'users', 'history']) {
      const response = await context.request.get(`${base}/api/admin/${resource}`)
      assert.equal(response.status(), 200, `Admin ${resource} API`)
      const data = await response.json(); assert.ok(Array.isArray(data.items))
    }
    stage = 'mobile-admin'
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto(`${base}/admin/manage/media`, { waitUntil: 'domcontentloaded' })
    await page.getByRole('button', { name: 'Edit', exact: true }).first().waitFor({ timeout: 60000 })
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 2)
    assert.equal(overflow, false, 'Mobile admin must not overflow horizontally')
    await page.screenshot({ path: '.zscripts/artifacts/media-mobile.png', fullPage: false })
    await page.getByRole('button', { name: 'Buka menu admin' }).click()
    await page.locator('aside').getByRole('link', { name: 'Calon Mahasiswa' }).click()
    await page.waitForURL('**/admin/manage/applicants')
    assert.ok(await page.getByRole('button', { name: 'Buka menu admin' }).isVisible())
    stage = 'public-search'
    await page.goto(`${base}/cari?q=Universitas`, { waitUntil: 'domcontentloaded' })
    await page.getByRole('heading', { name: 'Cari di Website UNIPAS' }).waitFor()
    assert.ok(!(await page.locator('main').innerText()).includes('Pencarian belum tersedia'))
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 2), false)
    await page.screenshot({ path: '.zscripts/artifacts/search-mobile.png', fullPage: false })
    const feed = await (await context.request.get(`${base}/api/news?limit=1`)).json()
    if (feed.news.length) {
      stage = 'news-share'
      await page.goto(`${base}/berita/${feed.news[0].slug}`, { waitUntil: 'domcontentloaded' })
      await page.getByRole('button', { name: 'Bagikan', exact: true }).click()
      await page.getByRole('menu').waitFor()
      assert.equal(await page.getByRole('menu').evaluate(el => getComputedStyle(el).backgroundColor), 'rgb(255, 255, 255)')
      await expect(page.getByRole('menu')).toHaveCSS('opacity', '1')
      await page.screenshot({ path: '.zscripts/artifacts/news-share-mobile.png', fullPage: false })
    }
    assert.deepEqual(pageErrors, [], 'Browser runtime errors')
    console.log('PASS: login, news category background, title/slug form, media picker, admin APIs, mobile sidebar, horizontal overflow, search, and share menu background')
  } catch (error) {
    await page.screenshot({ path: '.zscripts/artifacts/ui-failure.png', fullPage: false })
    console.error('Failed stage:', stage)
    console.error(error.message)
    throw error
  } finally { await browser.close() }
}
main().catch(error => { console.error(error.name === 'AssertionError' ? error.stack : `${error.name}: ${error.message?.split('\n')[0]}`); process.exitCode = 1 })
