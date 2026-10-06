import assert from 'node:assert/strict'
import fs from 'node:fs'
import vm from 'node:vm'
import ts from 'typescript'
import { fileURLToPath } from 'node:url'

let now = 0
const context = { exports: {}, Date: { now: () => now }, Map, Promise }
const source = fs.readFileSync(fileURLToPath(new URL('../src/lib/cache.ts', import.meta.url)), 'utf8')
vm.runInNewContext(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, context)
const cache = context.exports.cache

async function run() {
  let requests = 0
  let complete
  const fetcher = () => { requests++; return new Promise(resolve => { complete = resolve }) }
  const first = cache.fetch('home', fetcher)
  const second = cache.fetch('home', fetcher)
  await Promise.resolve()
  assert.equal(requests, 1, 'Concurrent loads share one request')
  complete('first')
  assert.equal(await first, 'first')
  assert.equal(await second, 'first')
  assert.equal(await cache.fetch('home', fetcher), 'first')
  assert.equal(requests, 1, 'Fresh cache avoids network requests')
  now = 30_000
  assert.equal(cache.get('home'), null, 'Cached data expires after 30 seconds')

  await assert.rejects(cache.fetch('failed', async () => { throw Error('offline') }))
  assert.equal(await cache.fetch('failed', async () => 'recovered'), 'recovered', 'Failures can be retried')
  cache.set('other', 'preserved')
  assert.equal(await cache.fetch('home', async () => 'fresh', true), 'fresh')
  assert.equal(cache.get('other'), 'preserved', 'Refresh does not clear unrelated data')

  let finishOld
  const old = cache.fetch('race', () => new Promise(resolve => { finishOld = resolve }))
  await Promise.resolve()
  await cache.fetch('race', async () => 'new', true)
  finishOld('stale')
  await old
  assert.equal(cache.get('race'), 'new', 'An older request cannot overwrite a forced refresh')
  console.log('Cache checks passed: deduplication, cache hits, expiry, retry, targeted refresh, and stale request protection.')
}
run().catch(error => { console.error(error); process.exitCode = 1 })
