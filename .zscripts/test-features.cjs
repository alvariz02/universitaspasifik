/* eslint-disable @typescript-eslint/no-require-imports -- CommonJS Node test harness. */
const fs = require('node:fs')
const path = require('node:path')
const assert = require('node:assert/strict')
const ts = require('typescript')
const { randomUUID } = require('node:crypto')
const { PrismaClient } = require('@prisma/client')
try { process.loadEnvFile('.env') } catch {}
const realDb = new PrismaClient()
let database
let cookieToken
const modules = new Map()
function load(filename) {
  const full = path.resolve(filename)
  if (modules.has(full)) return modules.get(full).exports
  const loadedModule = { exports: {} }; modules.set(full, loadedModule)
  const source = ts.transpileModule(fs.readFileSync(full, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText
  function resolve(name) {
    if (name === '@/lib/db') return { db: new Proxy({}, { get: (_, property) => database[property] }) }
    if (name === 'next/headers') return { cookies: async () => ({ get: () => cookieToken ? { value: cookieToken } : undefined }) }
    if (name.startsWith('@/')) return load(path.join('src', name.slice(2)) + '.ts')
    return require(name)
  }
  new Function('require', 'module', 'exports', source)(resolve, loadedModule, loadedModule.exports)
  return loadedModule.exports
}
const rollback = new Error('TEST_ROLLBACK')
const suffix = randomUUID().slice(0, 12)
function request(resource, method, body, query = '') {
  return new Request(`http://localhost/api/admin/${resource}${query}`, { method, ...(body ? { headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) } : {}) })
}
async function main() {
  const { safeHtml } = load('src/lib/sanitize.ts')
  const html = safeHtml('<p>Hello</p><script>alert(1)</script><a href="javascript:alert(1)">bad</a><img src="https://example.com/photo.jpg" onerror="alert(1)">')
  assert.ok(html.includes('<p>Hello</p>')); assert.ok(!html.includes('<script')); assert.ok(!html.includes('javascript:')); assert.ok(!html.includes('onerror'))
  const { csvCell } = load('src/lib/csv.ts')
  assert.equal(csvCell('=1+1'), '"\'=1+1"'); assert.equal(csvCell('a"b'), '"a""b"')
  const { canManage } = load('src/lib/permissions.ts')
  assert.equal(canManage('editor', 'users'), false); assert.equal(canManage('humas', 'applicants'), true)
  try {
    await realDb.$transaction(async tx => {
      database = new Proxy(tx, { get(target, key) { return key === '$transaction' ? async callback => callback(target) : target[key] } })
      const sessions = load('src/lib/session.ts')
      const route = load('src/app/api/admin/[resource]/route.ts')
      const ctx = resource => ({ params: Promise.resolve({ resource }) })
      const admin = { id: 'admin', email: 'test-admin@example.invalid', name: 'Test Admin', role: 'admin' }
      cookieToken = await sessions.createSessionToken({ user: admin })
      const mutate = (resource, method, body) => route[method](request(resource, method, body), ctx(resource))
      let response = await mutate('users', 'POST', { name: 'Regression Editor', email: `editor-${suffix}@example.invalid`, password: 'Test-password-2026!', role: 'editor', isActive: true })
      assert.equal(response.status, 201)
      const editor = await response.json(); assert.equal(editor.passwordHash, undefined)
      const account = await tx.adminUser.findUnique({ where: { id: editor.id } })
      assert.ok(account.passwordHash.startsWith('scrypt:')); assert.ok(!account.passwordHash.includes('Test-password'))
      const auth = load('src/app/api/auth/login/route.ts')
      response = await auth.POST(new Request('http://localhost/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: editor.email, password: 'Test-password-2026!' }) }))
      assert.equal(response.status, 200)
      const loggedIn = await response.json(); assert.equal(loggedIn.user.role, 'editor')
      cookieToken = await sessions.createSessionToken({ user: loggedIn.user })
      response = await mutate('users', 'POST', { name: 'Forbidden', email: 'forbidden@example.invalid', password: 'Test-password-2026!', role: 'admin' })
      assert.equal(response.status, 403)
      const article = { title: `Regression article ${suffix}`, slug: `regression-${suffix}`, content: '<p>Original content</p>', status: 'published' }
      response = await mutate('news', 'POST', article); assert.equal(response.status, 403)
      response = await mutate('news', 'POST', { ...article, status: 'draft' }); assert.equal(response.status, 201)
      const draft = await response.json()
      const { publishedNews } = load('src/lib/content.ts')
      assert.equal(await tx.news.count({ where: { ...publishedNews(), id: draft.id } }), 0)
      cookieToken = await sessions.createSessionToken({ user: admin })
      response = await mutate('news', 'PATCH', { ...article, id: draft.id }); assert.equal(response.status, 200)
      assert.equal(await tx.news.count({ where: { ...publishedNews(), id: draft.id } }), 1)
      response = await mutate('news', 'PATCH', { ...article, id: draft.id, publishedDate: '2099-01-01' }); assert.equal(response.status, 200)
      assert.equal(await tx.news.count({ where: { ...publishedNews(), id: draft.id } }), 0)
      const revision = await tx.contentRevision.findFirst({ where: { resource: 'news', recordId: draft.id }, orderBy: { id: 'desc' } })
      response = await mutate('news', 'PATCH', { id: draft.id, action: 'revert', revisionId: revision.id }); assert.equal(response.status, 200)
      assert.equal(await tx.news.count({ where: { ...publishedNews(), id: draft.id } }), 1)
      response = await mutate('news', 'DELETE', { id: draft.id }); assert.equal(response.status, 200)
      assert.equal(await tx.news.count({ where: { ...publishedNews(), id: draft.id } }), 0)
      response = await mutate('news', 'PATCH', { id: draft.id, action: 'restore' }); assert.equal(response.status, 200)
      assert.equal(await tx.news.count({ where: { ...publishedNews(), id: draft.id } }), 1)
      response = await mutate('pages', 'POST', { title: `Test page ${suffix}`, slug: `regression-page-${suffix}`, content: '<h2>Managed page</h2>', isPublished: true }); assert.equal(response.status, 201)
      response = await mutate('research', 'POST', { title: `Test research ${suffix}`, slug: `regression-research-${suffix}`, abstract: 'Research searchable content', researchers: 'Example researcher' }); assert.equal(response.status, 201)
      response = await mutate('media', 'POST', { name: 'Test media', url: `https://example.invalid/${suffix}.jpg`, altText: 'Test alt' }); assert.equal(response.status, 201)
      const media = await response.json()
      response = await mutate('media', 'POST', { name: 'Updated uploaded media', url: media.url, altText: 'Updated alt' }); assert.equal(response.status, 201)
      assert.equal((await response.json()).id, media.id)
      const applicants = load('src/app/api/applicants/route.ts')
      const application = { fullName: '=Test Applicant', email: `applicant-${suffix}@example.invalid`, phone: '081234567890', admissionPath: 'simak', highSchool: 'Test school', major: 'Test major', gpa: '85.5', address: 'Test address', motivation: 'Test motivation' }
      const submit = body => applicants.POST(new Request('http://localhost/api/applicants', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }))
      response = await submit({ ...application, gpa: 101 }); assert.equal(response.status, 400)
      response = await submit(application); assert.equal(response.status, 201)
      const applicant = await response.json()
      response = await submit(application); assert.equal(response.status, 429)
      response = await mutate('applicants', 'PATCH', { ...application, id: applicant.id, status: 'verified', notes: 'Contacted by staff' }); assert.equal(response.status, 200)
      response = await route.GET(request('applicants', 'GET', null, `?export=csv&q=${suffix}`), ctx('applicants')); assert.equal(response.status, 200)
      assert.ok((await response.text()).includes("'=Test Applicant"))
      const { searchSite } = load('src/lib/site-search.ts')
      let results = await searchSite(suffix); if (results.total < 3) console.log('Search test counts:', results.groups.map(g => [g.type, g.total])); assert.ok(results.total >= 3)
      response = await mutate('news', 'DELETE', { id: draft.id }); assert.equal(response.status, 200)
      results = await searchSite(suffix, 'news'); assert.equal(results.total, 0)
      const list = await route.GET(request('users', 'GET'), ctx('users')); assert.ok(!(await list.text()).includes('passwordHash'))
      response = await mutate('users', 'PATCH', { id: editor.id, name: editor.name, email: editor.email, role: 'editor', isActive: false }); assert.equal(response.status, 200)
      cookieToken = await sessions.createSessionToken({ user: loggedIn.user })
      const { currentStaff } = load('src/lib/staff-auth.ts'); assert.equal(await currentStaff(), null)
      cookieToken = null
      response = await route.GET(request('applicants', 'GET'), ctx('applicants')); assert.equal(response.status, 401)
      console.log('PASS: accounts, password hashing, roles, draft/publish/schedule, revisions, archive/restore, pages, research, media, applicants, duplicate submission, CSV, search and session revocation')
      throw rollback
    }, { timeout: 120000, maxWait: 10000 })
  } catch (error) { if (error !== rollback) throw error }
  console.log('PASS: database tests rolled back; no test records retained')
}
main().catch(error => { console.error(error.name === 'AssertionError' ? error.stack : `${error.name}: ${error.code || 'Test failed'}`); process.exitCode = 1 }).finally(() => realDb.$disconnect())
