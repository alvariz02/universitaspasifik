import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import GalleryPhotoGrid from '@/components/GalleryPhotoGrid'
import { db } from '@/lib/db'
import { Image as ImageIcon } from 'lucide-react'

export const dynamic = 'force-dynamic'

async function getGalleryItems() {
  const [news, events, achievements] = await Promise.all([
    db.news.findMany({
      where: { imageUrl: { not: null } },
      orderBy: { publishedDate: 'desc' }
    }),
    db.event.findMany({
      where: { imageUrl: { not: null } },
      orderBy: { eventDate: 'desc' }
    }),
    db.achievement.findMany({
      where: { imageUrl: { not: null } },
      orderBy: { achievementDate: 'desc' }
    }),
  ])

  const newsItems = news.map((item) => ({
    id: `news-${item.id}`,
    title: item.title,
    imageUrl: item.imageUrl!,
    source: 'Berita',
    caption: item.excerpt || item.category || 'Berita Universitas Pasifik',
    href: `/berita/${item.slug}`,
    date: item.publishedDate?.toISOString() ?? item.createdAt.toISOString(),
  }))

  const eventItems = events.map((item) => ({
    id: `event-${item.id}`,
    title: item.title,
    imageUrl: item.imageUrl!,
    source: 'Event',
    caption: item.description || item.location || 'Kegiatan Universitas Pasifik',
    href: `/event/${item.slug}`,
    date: item.eventDate.toISOString(),
  }))

  const achievementItems = achievements.map((item) => ({
    id: `achievement-${item.id}`,
    title: item.title,
    imageUrl: item.imageUrl!,
    source: 'Prestasi',
    caption: item.description || item.achieverName || 'Prestasi mahasiswa dan dosen',
    href: `/prestasi/${item.id}`,
    date: item.achievementDate?.toISOString() ?? item.createdAt.toISOString(),
  }))

  return [...newsItems, ...eventItems, ...achievementItems].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export default async function GaleriPage() {
  const galleryItems = await getGalleryItems()

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-1">
        <section className="bg-linear-to-r from-unipas-primary via-unipas-accent to-unipas-primary text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <div className="mx-auto inline-flex items-center justify-center rounded-full bg-white/15 p-5 text-white shadow-lg shadow-unipas-primary/20">
                <ImageIcon className="h-8 w-8" />
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight">
                Galeri Foto UNIPAS
              </h1>
              <p className="text-lg text-white/90 leading-relaxed">
                Koleksi foto terbaik dari berita, event, dan prestasi Universitas Pasifik Morotai.
              </p>
            </div>
          </div>
        </section>

        <GalleryPhotoGrid items={galleryItems.map((item) => ({
          id: item.id,
          title: item.title,
          imageUrl: item.imageUrl,
          source: item.source,
          href: item.href,
        }))} />
      </main>
      <Footer />
    </div>
  )
}
