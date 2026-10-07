/* eslint-disable @typescript-eslint/no-require-imports -- CommonJS browser test. */
const { chromium, expect } = require('@playwright/test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
try { process.loadEnvFile('.env') } catch {}
const base = process.env.TEST_BASE_URL || 'http://localhost:3000'
const routes = ['/berita', '/event', '/fakultas', '/fasilitas', '/jurnal', '/kontak', '/penelitian', '/penerimaan', '/pengabdian', '/pengumuman', '/prestasi', '/privasi', '/program-studi', '/sitemaps', '/syarat', '/tentang', '/tentang/galeri', '/tentang/profil', '/tentang/sejarah', '/tentang/struktur', '/tentang/visi-misi', '/video-kegiatan', '/alumni', '/alumni/tracer-study', '/kalender-akademik', '/cari', '/halaman-yang-tidak-ada']
async function main() {
  const browser = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true })
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' })
  const page = await context.newPage()
  const details = new Map()
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  fs.mkdirSync('.zscripts/artifacts', { recursive: true })
  async function overflow(route) {
    const result = await page.evaluate(() => ({ width: innerWidth, document: document.documentElement.scrollWidth }))
    assert.ok(result.document <= result.width + 2, `${route}: horizontal overflow ${JSON.stringify(result)}`)
  }
  try {
    for (const route of routes) {
      await page.goto(base + route, { waitUntil: 'domcontentloaded', timeout: 60000 })
      await expect(page.locator('main h1').first()).toBeVisible({ timeout: 30000 })
      assert.notEqual((await page.locator('main h1').first().textContent()).trim(), 'Halaman belum dapat dimuat', `${route}: server error instead of page`)
      await expect(page.locator('header')).toHaveCount(1)
      await expect(page.locator('footer')).toHaveCount(1)
      await expect(page.locator('.page-hero')).toHaveCount(1)
      await expect(page.locator('.page-hero h1')).toHaveCSS('font-size', '48px')
      await overflow(route)
      await page.setViewportSize({ width: 1024, height: 900 })
      await overflow(route)
      await page.setViewportSize({ width: 1440, height: 1000 })
      for (const href of await page.locator('main a[href]').evaluateAll(nodes => nodes.map(node => node.getAttribute('href')))) {
        const match = href?.match(new RegExp('^/(berita|event|fakultas|prestasi|pengumuman|penerimaan|penelitian|jurnal)/[^/?#]+$'))
        if (match && !details.has(match[1])) details.set(match[1], href)
      }
      if (['/kontak', '/penelitian', '/tentang/sejarah', '/cari'].includes(route)) await page.screenshot({ animations: 'disabled', path: `.zscripts/artifacts/design${route.replaceAll('/', '-')}-desktop.png` })
      await page.setViewportSize({ width: 390, height: 844 })
      await expect(page.locator('.page-hero h1')).toHaveCSS('font-size', '30px')
      await overflow(route)
      if (['/kontak', '/penelitian', '/alumni', '/cari'].includes(route)) await page.screenshot({ animations: 'disabled', path: `.zscripts/artifacts/design${route.replaceAll('/', '-')}-mobile.png` })
      await page.setViewportSize({ width: 1440, height: 1000 })
      console.log(`PASS desktop/mobile ${route}`)
    }
    await page.goto(base + '/', { waitUntil: 'domcontentloaded', timeout: 60000 })
    await expect(page.locator('main section').first()).toBeVisible({ timeout: 60000 })
    await overflow('/')
    await page.screenshot({ animations: 'disabled', path: '.zscripts/artifacts/design-home-desktop.png' })
    await page.setViewportSize({ width: 390, height: 844 })
    await overflow('/')
    await page.screenshot({ animations: 'disabled', path: '.zscripts/artifacts/design-home-mobile.png' })
    await page.setViewportSize({ width: 1440, height: 1000 })
    console.log('PASS desktop/mobile homepage')
    for (const route of details.values()) {
      await page.goto(base + route, { waitUntil: 'domcontentloaded', timeout: 60000 })
      await expect(page.locator('main h1').first()).toBeVisible({ timeout: 30000 })
      await overflow(route)
      await page.setViewportSize({ width: 390, height: 844 })
      await overflow(route)
      await page.setViewportSize({ width: 1440, height: 1000 })
      console.log('PASS detail desktop/mobile ' + route)
    }
    const login = await context.request.post(base + '/api/auth/login', { data: { email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD } })
    assert.equal(login.status(), 200, 'Admin design test login')
    for (const route of ['/admin', '/admin/news', '/admin/news/create', '/admin/hero-sliders', '/admin/manage/media', '/admin/manage/applicants']) {
      await page.goto(base + route, { waitUntil: 'domcontentloaded', timeout: 60000 })
      await expect(page.locator('main h1').first()).toBeVisible({ timeout: 30000 })
      await expect(page.locator('main h1').first()).toHaveCSS('font-size', '30px')
      await page.screenshot({ animations: 'disabled', path: `.zscripts/artifacts/design${route.replaceAll('/', '-')}-desktop.png` })
      await page.setViewportSize({ width: 390, height: 844 })
      await overflow(route)
      await expect(page.locator('main h1').first()).toHaveCSS('font-size', '24px')
      await page.screenshot({ animations: 'disabled', path: `.zscripts/artifacts/design${route.replaceAll('/', '-')}-mobile.png` })
      await page.setViewportSize({ width: 1440, height: 1000 })
      console.log(`PASS desktop/mobile ${route}`)
    }
    assert.deepEqual(errors, [], 'No browser runtime errors')
  } finally { await browser.close() }
}
main().catch(error => { console.error(error); process.exitCode = 1 })
