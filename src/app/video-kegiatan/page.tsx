import PageHero from '@/components/layout/PageHero'
import { Metadata } from 'next'
import VideoGallery from '@/components/VideoGallery'
import { db } from '@/lib/db'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Video Kegiatan - Universitas Pasifik Morotai',
  description: 'Kumpulan video kegiatan dan aktivitas kampus Universitas Pasifik Morotai',
}

export const dynamic = 'force-dynamic'

async function getVideos() {
  try {
    const videos = await db.video.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      take: 50
    })

    return videos
  } catch (error) {
    console.error('Error fetching videos:', error)
    return []
  }
}

export default async function VideoKegiatanPage() {
  const videos = await getVideos()

  return (
    <div className="min-h-screen flex flex-col bg-unipas-muted">
      <Header />
      <main className="public-page flex-1">
        {/* Hero Section */}
        <PageHero title={<>Video Kegiatan Kampus</>} description={<>Saksikan berbagai kegiatan dan aktivitas menarik di Universitas Pasifik Morotai</>} />

        {/* Video Gallery */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <VideoGallery videos={videos as any} />
        </div>
      </main>
      <Footer />
    </div>
  )
}