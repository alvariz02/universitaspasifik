import PageHero from '@/components/layout/PageHero'
import { publishedNews } from '@/lib/content'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import GalleryPhotoGrid from '@/components/GalleryPhotoGrid'
import { db } from '@/lib/db'
import { Image as ImageIcon } from 'lucide-react'

export const dynamic = 'force-dynamic'

async function getGalleryItems() {
  const [news, events, achievements] = await db.$transaction([
    db.news.findMany({
      where: { ...publishedNews(), imageUrl: { not: null } },
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
      <main className="public-page flex-1">
        <PageHero title={<>Galeri Foto UNIPAS</>} description={<>Koleksi foto terbaik dari berita, event, dan prestasi Universitas Pasifik Morotai.</>} />

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
