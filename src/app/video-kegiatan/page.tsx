import { Metadata } from 'next'
import VideoGallery from '@/components/VideoGallery'

export const metadata: Metadata = {
  title: 'Video Kegiatan - Universitas Pasifik Morotai',
  description: 'Kumpulan video kegiatan dan aktivitas kampus Universitas Pasifik Morotai',
}

async function getVideos() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/videos?limit=50`, {
      next: { revalidate: 300 } // Revalidate every 5 minutes
    })
    if (!res.ok) throw new Error('Failed to fetch videos')
    return await res.json()
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
        <VideoGallery videos={videos} />
      </div>
    </div>
  )
}