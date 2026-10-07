/* eslint-disable @typescript-eslint/no-require-imports -- Node content import. */
const { request } = require('@playwright/test')
const fs = require('node:fs')
process.loadEnvFile('.env')
const base = process.env.TEST_BASE_URL || 'http://localhost:3000'
const entries = [
  {
    file: 'WhatsApp Image 2026-10-07 at 10.55.22 (1).jpeg',
    title: 'UNIPAS Sampaikan Selamat atas Ujian Promosi Doktor Dr. Balgis Husain, M.Pd.',
    slug: 'unipas-selamat-ujian-promosi-doktor-balgis-husain-2026',
    category: 'promosi-doktor',
    excerpt: 'Civitas akademika UNIPAS Morotai menyampaikan selamat dan sukses atas ujian promosi doktor Dr. Balgis Husain, M.Pd. di Universitas Pendidikan Indonesia pada 11 Agustus 2026.',
    content: '<p>Civitas akademika Universitas Pasifik Morotai menyampaikan ucapan selamat dan sukses kepada <strong>Dr. Balgis Husain, M.Pd.</strong>, dosen Program Studi Pendidikan Bahasa Inggris UNIPAS Morotai, atas ujian promosi doktor pada bidang Pendidikan Bahasa Inggris di <strong>Universitas Pendidikan Indonesia</strong>.</p><p>Berdasarkan poster ucapan resmi, ujian promosi doktor tersebut berlangsung pada <strong>Selasa, 11 Agustus 2026</strong>.</p><h2>Judul Disertasi</h2><p><em>Conceptualizing Culture and Enacting Intercultural Language Learning: A Case Study of EFL Teachers in North Maluku</em>.</p><p>Ucapan selamat ini menjadi bentuk apresiasi civitas akademika UNIPAS Morotai terhadap pencapaian akademik dosen.</p>',
  },
  {
    file: 'WhatsApp Image 2026-10-07 at 10.55.22.jpeg',
    title: 'UNIPAS Sampaikan Selamat atas Ujian Disertasi Dr. M. Rais Salim, M.Pd.',
    slug: 'unipas-selamat-ujian-disertasi-m-rais-salim-2026',
    category: 'promosi-doktor',
    excerpt: 'UNIPAS Morotai menyampaikan selamat dan sukses atas ujian disertasi Dr. M. Rais Salim, M.Pd. pada bidang Pendidikan Bahasa Indonesia di Universitas Negeri Malang, 12 Agustus 2026.',
    content: '<p>Civitas akademika Universitas Pasifik Morotai menyampaikan ucapan selamat dan sukses kepada <strong>Dr. M. Rais Salim, M.Pd.</strong>, dosen Fakultas Keguruan dan Ilmu Pendidikan (FKIP) UNIPAS Morotai, atas ujian disertasi pada bidang Pendidikan Bahasa Indonesia di <strong>Universitas Negeri Malang</strong>.</p><p>Poster ucapan resmi mencantumkan pelaksanaan ujian pada <strong>Rabu, 12 Agustus 2026</strong>.</p><h2>Judul Disertasi</h2><p><em>Gaya Berpikir Mahasiswa Generasi Z dalam Teks Argumentasi tentang Cyberbullying</em>.</p><p>Civitas akademika UNIPAS Morotai memberikan apresiasi terhadap pencapaian akademik tersebut.</p>',
  },
  {
    file: 'WhatsApp Image 2026-10-07 at 10.53.25.jpeg',
    title: 'Empat Dosen UNIPAS Morotai Lulus Sertifikasi Dosen Tahun 2026',
    slug: 'empat-dosen-unipas-morotai-lulus-sertifikasi-dosen-2026',
    category: 'prestasi',
    excerpt: 'Rektor dan civitas akademika UNIPAS Morotai memberikan ucapan selamat kepada empat dosen atas kelulusan sertifikasi dosen Kemdiktisaintek tahun 2026.',
    content: '<p>Rektor dan civitas akademika <strong>Universitas Pasifik Morotai</strong> menyampaikan ucapan selamat dan sukses kepada empat dosen atas kelulusan <strong>Sertifikasi Dosen Kemdiktisaintek Tahun 2026</strong>.</p><h2>Dosen yang Mendapatkan Ucapan Selamat</h2><ul><li><strong>Sukarmin Idrus, S.Pi., M.Si.</strong> — Dosen Teknik Lingkungan.</li><li><strong>Ledy Yanti Lessy, S.Pd., M.Pd.</strong> — Dosen PGSD.</li><li><strong>Hasrul Saleh, S.Pd., M.T.</strong> — Dosen Teknik Industri.</li><li><strong>Lukman Wangko, S.Pd., M.M.</strong> — Dosen Akuntansi.</li></ul><p>Melalui poster ucapan selamat, UNIPAS Morotai menyampaikan harapan agar pencapaian ini menjadi bukti dedikasi dan profesionalisme dalam menjalankan tugas Tridharma Perguruan Tinggi serta terus menginspirasi.</p>',
  },
  {
    file: 'WhatsApp Image 2026-10-07 at 10.53.24.jpeg',
    title: 'Muhammad Raza Kusman Terima Beasiswa Pra-Doktoral Daerah Afirmasi Kemdiktisaintek 2026',
    slug: 'muhammad-raza-kusman-beasiswa-pra-doktoral-afirmasi-2026',
    category: 'prestasi',
    excerpt: 'Ir. Muhammad Raza Kusman, S.T., M.Ling., dosen Teknik Lingkungan UNIPAS Morotai, menjadi penerima Beasiswa Pra-Doktoral Daerah Afirmasi Kemdiktisaintek 2026 dengan perguruan tinggi tujuan UGM.',
    content: '<p><strong>Ir. Muhammad Raza Kusman, S.T., M.Ling.</strong>, dosen Teknik Lingkungan Universitas Pasifik Morotai, menjadi penerima <strong>Beasiswa Pra-Doktoral Daerah Afirmasi Kemdiktisaintek Tahun 2026</strong>.</p><p>Poster ucapan selamat mencantumkan <strong>Universitas Gadjah Mada</strong> sebagai perguruan tinggi tujuan.</p><p>Universitas Pasifik Morotai menyampaikan ucapan selamat atas pencapaian tersebut.</p>',
  },
]

async function main() {
  const requestedSlug = process.argv[2]
  const selected = requestedSlug ? entries.filter(entry => entry.slug === requestedSlug) : entries
  if (!selected.length) throw new Error('Unknown article slug')
  const context = await request.newContext({ baseURL: base, timeout: 120000, extraHTTPHeaders: { Origin: base } })
  const receipt = '.zscripts/news-posters-receipt.json'
  const results = requestedSlug && fs.existsSync(receipt) ? JSON.parse(fs.readFileSync(receipt, 'utf8')).filter(item => !item.url.endsWith('/' + requestedSlug)) : []
  try {
    const login = await context.post('/api/auth/login', { data: { email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD } })
    if (!login.ok()) throw new Error(`Login failed: ${login.status()}`)
    for (const entry of selected) {
      const response = await context.get(`/api/admin/news?q=${encodeURIComponent(entry.slug)}`)
      if (!response.ok()) throw new Error(`Duplicate check failed: ${response.status()}`)
      const existing = (await response.json()).items.find(item => item.slug === entry.slug)
      if (existing) {
        if (existing.status !== 'published') throw new Error(`Existing article is ${existing.status}: ${entry.slug}`)
        results.push({ id: existing.id, title: existing.title, category: existing.category, url: `${base}/berita/${existing.slug}`, existing: true })
      } else {
        const media = await context.get(`/api/admin/media?q=${encodeURIComponent(entry.file)}`)
        if (!media.ok()) throw new Error(`Media lookup failed: ${media.status()}`)
        let asset = (await media.json()).items.find(item => item.name === entry.file)
        if (!asset) {
          const upload = await context.post('/api/upload', { multipart: { file: { name: entry.file, mimeType: 'image/jpeg', buffer: fs.readFileSync(`C:/Users/asus/Downloads/${entry.file}`) } } })
          asset = await upload.json()
          if (!upload.ok() || !asset.url) throw new Error(`Upload failed: ${upload.status()} ${asset.error || ''}`)
        }
        const poster = `<h2>Poster Ucapan Selamat</h2><p><img src="${asset.url}" alt="${entry.title}" /></p>`
        const { file, ...data } = entry
        const created = await context.post('/api/admin/news', { data: { ...data, content: entry.content + poster, imageUrl: asset.url, authorName: 'Universitas Pasifik Morotai', publishedDate: new Date().toISOString(), isFeatured: false, status: 'published' } })
        const record = await created.json()
        if (!created.ok()) throw new Error(`Create failed: ${created.status()} ${JSON.stringify(record)}`)
        results.push({ id: record.id, title: record.title, category: record.category, url: `${base}/berita/${record.slug}`, imageUrl: record.imageUrl })
      }
      fs.writeFileSync(receipt, JSON.stringify(results, null, 2))
      console.log('Published:', results.at(-1).title, '|', results.at(-1).category)
    }
    for (const item of results) {
      const page = await context.get(item.url)
      const html = await page.text()
      if (page.status() !== 200 || !html.includes(item.title)) throw new Error(`Public verification failed: ${item.url}`)
      console.log('Verified:', item.url)
    }
  } finally { await context.dispose() }
}
main().catch(error => { console.error(error); process.exitCode = 1 })
