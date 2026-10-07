import { MetadataRoute } from 'next'
import { db } from '@/lib/db'
import { publishedNews } from '@/lib/content'
export const dynamic = 'force-dynamic'
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://www.univpasifik.ac.id'
  const urls: MetadataRoute.Sitemap = ['', '/tentang', '/tentang/profil', '/tentang/sejarah', '/tentang/visi-misi', '/fakultas', '/program-studi', '/berita', '/pengumuman', '/event', '/jurnal', '/penelitian', '/penerimaan', '/kontak'].map(path => ({ url: base + path, changeFrequency: 'weekly', priority: path ? 0.7 : 1 }))
  try {
    const [news, research, pages] = await Promise.all([db.news.findMany({ where: publishedNews(), select: { slug: true, updatedAt: true } }), db.research.findMany({ where: { deletedAt: null }, select: { slug: true, updatedAt: true } }), db.page.findMany({ where: { deletedAt: null, isPublished: true }, select: { slug: true, updatedAt: true } })])
    for (const record of news) urls.push({ url: `${base}/berita/${record.slug}`, lastModified: record.updatedAt })
    for (const record of research) urls.push({ url: `${base}/penelitian/${record.slug}`, lastModified: record.updatedAt })
    for (const record of pages) if (!['profil', 'sejarah', 'visi-misi'].includes(record.slug)) urls.push({ url: `${base}/halaman/${record.slug}`, lastModified: record.updatedAt })
  } catch (error) { console.error('Sitemap data unavailable:', error) }
  return urls
}
