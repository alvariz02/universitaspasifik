'use client'

import PageHero from '@/components/layout/PageHero'


import { useState, useEffect } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { motion } from 'framer-motion'
import { PlayCircle, Eye } from 'lucide-react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import Image from 'next/image'

interface Video {
  id: number
  title: string
  description?: string
  youtubeUrl: string
  youtubeId: string
  thumbnail?: string
  category?: string
  viewCount: number
  isFeatured: boolean
  createdAt: string
}

export default function ProfilUnipaPage() {
  const [videos, setVideos] = useState<Video[]>([])
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('/api/videos')
        const data = await response.json()
        
        // Filter video dengan judul "profil unipas morotai"
        const profilVideos = data.filter((video: Video) =>
          video.title.toLowerCase().includes('profil') && 
          video.title.toLowerCase().includes('unipas')
        )
        
        setVideos(profilVideos)
      } catch (error) {
        console.error('Error fetching videos:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchVideos()
  }, [])

  const handleVideoClick = async (video: Video) => {
    setSelectedVideo(video)
    
    // Increment view count
    try {
      await fetch(`/api/videos/${video.id}`, {
        method: 'GET'
      })
    } catch (error) {
      console.error('Error updating view count:', error)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-unipas-muted">
      <Header />
      <main className="public-page flex-1">
        {/* Hero Section */}
        <PageHero title={<>Profil Universitas Pasifik Morotai</>} description={<>Saksikan video profil lengkap tentang Universitas Pasifik Morotai</>} />

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-unipas-primary/20 rounded-full mb-4">
                  <div className="w-8 h-8 border-4 border-unipas-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
                <p className="text-gray-500">Memuat video...</p>
              </div>
            </div>
          ) : videos.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-unipas-primary/10 rounded-full mb-4">
                <PlayCircle className="w-8 h-8 text-unipas-primary" />
              </div>
              <h2 className="section-title font-bold text-gray-800 mb-2">Video tidak ditemukan</h2>
              <p className="text-gray-500 mb-6">
                Video profil UNIPAS Morotai sedang dipersiapkan
              </p>
              <a 
                href="/video-kegiatan" 
                className="inline-block px-6 py-3 bg-unipas-primary text-white rounded-xl font-semibold hover:bg-unipas-accent transition-colors"
              >
                Lihat Video Kegiatan Lainnya
              </a>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => handleVideoClick(video)}
                  className="group cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-2xl bg-gray-200 aspect-video mb-4 shadow-lg hover:shadow-xl transition-shadow">
                    <Image
                      src={video.thumbnail || '/logo-unipas02.png'}
                      alt={video.title}
                      fill
                      className={`${video.thumbnail ? 'object-cover' : 'object-contain p-8 bg-white'} group-hover:scale-105 transition-transform duration-300`}
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                      <PlayCircle className="w-16 h-16 text-white group-hover:scale-110 transition-transform" />
                    </div>
                  </div>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-unipas-primary transition-colors line-clamp-2">
                    {video.title}
                  </h3>
                  {video.description && (
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {video.description}
                    </p>
                  )}
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{video.viewCount.toLocaleString('id-ID')} views</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Video Modal */}
      <Dialog open={!!selectedVideo} onOpenChange={(open) => !open && setSelectedVideo(null)}>
        <DialogContent className="max-w-4xl w-full">
          {selectedVideo && (
            <div className="space-y-4">
              <h2 className="section-title font-bold">{selectedVideo.title}</h2>
              <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}`}
                  title={selectedVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg"
                ></iframe>
              </div>
              {selectedVideo.description && (
                <div>
                  <h3 className="font-semibold mb-2">Deskripsi:</h3>
                  <p className="text-gray-600">{selectedVideo.description}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  )
}
