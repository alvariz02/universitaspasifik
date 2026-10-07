import { PrismaClient } from '@prisma/client'
try { process.loadEnvFile('.env') } catch {}
const db = new PrismaClient()
try {
  const definitions = [
    ['news', 'title', ['imageUrl']], ['research', 'title', ['imageUrl']], ['faculty', 'name', ['imageUrl']],
    ['department', 'name', ['imageUrl']], ['event', 'title', ['imageUrl']], ['achievement', 'title', ['imageUrl']],
    ['gallery', 'title', ['imageUrl']], ['heroSlider', 'title', ['imageUrl']], ['staff', 'name', ['photoUrl']],
    ['facility', 'name', ['imageUrl']], ['video', 'title', ['thumbnail']], ['admission', 'title', ['image1Url', 'image2Url', 'image3Url']],
  ]
  let imported = 0
  for (const [model, label, fields] of definitions) {
    const records = await db[model].findMany()
    for (const record of records) for (const field of fields) {
      const url = record[field]
      if (typeof url !== 'string' || !/^https?:\/\//.test(url)) continue
      await db.mediaAsset.upsert({ where: { url }, create: { url, name: record[label] || 'Gambar website' }, update: {} })
      imported++
    }
  }
  console.log(`Media existing processed: ${imported}`)
} catch (error) {
  console.error(`Media import failed (${error.code || 'database unavailable'}). No existing content was removed.`)
  process.exitCode = 1
} finally { await db.$disconnect() }
