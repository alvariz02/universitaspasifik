'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Play, Eye, ArrowRight } from 'lucide-react'

interface Video {
  id: number
  title: string
  description?: string
  youtubeId: string
  thumbnail?: string
  category?: string
  viewCount: number
  isFeatured: boolean
}

interface VideoSectionProps {
  videos: Video[]
}

export default function VideoSection({ videos }: VideoSectionProps) {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)

  const featuredVideos = videos.filter(video => video.isFeatured).slice(0, 3)

  if (featuredVideos.length === 0) {
    return null
  }

  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video)
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-unipas-primary mb-4">
            Video Kegiatan Kampus
          </h2>
          <p className="text-lg text-unipas-text max-w-3xl mx-auto">
            Saksikan berbagai kegiatan dan aktivitas menarik di Universitas Pasifik Morotai
          </p>
        </div>

        {/* Featured Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredVideos.map((video) => (
            <div
              key={video.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              onClick={() => handleVideoClick(video)}
            >
              {/* Thumbnail */}
              <div className="relative aspect-video bg-gray-100">
                {video.thumbnail ? (
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Play className="w-12 h-12 text-gray-400" />
                  </div>
                )}
                
                {/* Play Overlay */}
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <div className="bg-white/90 rounded-full p-4">
                    <Play className="w-8 h-8 text-unipas-primary" />
                  </div>
                </div>
                
                {/* Featured Badge */}
                <div className="absolute top-3 left-3">
                  <Badge className="bg-unipas-accent text-white">Unggulan</Badge>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <h3 className="font-bold text-xl text-unipas-primary mb-3 line-clamp-2">
                  {video.title}
                </h3>
                
                {video.description && (
                  <p className="text-unipas-text mb-4 line-clamp-3">
                    {video.description}
                  </p>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {video.category && (
                      <Badge variant="outline" className="text-xs">
                        {video.category}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Eye className="w-4 h-4" />
                    {video.viewCount}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button asChild className="bg-unipas-primary hover:bg-unipas-accent text-white px-8 py-3 text-lg">
            <Link href="/video-kegiatan">
              Lihat Semua Video
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>

        {/* Video Modal */}
        <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {selectedVideo && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold">
                    {selectedVideo.title}
                  </DialogTitle>
                </DialogHeader>
                
                <div className="space-y-4">
                  {/* YouTube Embed */}
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <iframe
                      src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                      title={selectedVideo.title}
                      className="w-full h-full"
                      allowFullScreen
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                  </div>
                  
                  {/* Video Info */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      {selectedVideo.category && (
                        <Badge variant="outline">{selectedVideo.category}</Badge>
                      )}
                      <Badge className="bg-unipas-accent text-white">Unggulan</Badge>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Eye className="w-4 h-4" />
                        {selectedVideo.viewCount} views
                      </div>
                    </div>
                    
                    {selectedVideo.description && (
                      <p className="text-gray-700 leading-relaxed">
                        {selectedVideo.description}
                      </p>
                    )}
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}