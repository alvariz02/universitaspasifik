import { Metadata } from 'next'
import VideoGallery from '@/components/VideoGallery'
import { db } from '@/lib/db'

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
    <div className="min-h-screen bg-unipas-muted">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-unipas-primary to-unipas-accent text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Video Kegiatan Kampus
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Saksikan berbagai kegiatan dan aktivitas menarik di Universitas Pasifik Morotai
            </p>
          </div>
        </div>
      </div>

      {/* Video Gallery */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <VideoGallery videos={videos as any} />
      </div>
    </div>
  )
}