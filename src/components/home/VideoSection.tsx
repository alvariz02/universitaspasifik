'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Play, Eye, ArrowRight, Video, Volume2 } from 'lucide-react'
import { motion } from 'framer-motion'

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
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-60 h-60 bg-red-500/10 rounded-full blur-2xl"></div>
        <div className="absolute top-20 left-1/4 w-32 h-32 bg-red-400/10 rounded-full blur-xl"></div>
        
        {/* Floating Particles */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute w-2 h-2 bg-red-500/30 rounded-full"
            style={{
              left: `${5 + i * 10}%`,
              top: `${10 + (i % 5) * 15}%`,
              animationDelay: `${i * 0.2}s`
            }}
          />
        ))}

        {/* Cinematic Light Beams */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute w-1 h-full bg-gradient-to-b from-transparent via-red-500/20 to-transparent"
            style={{
              left: `${20 + i * 30}%`,
              animationDelay: `${i * 1}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-4 mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-500 rounded-2xl flex items-center justify-center shadow-2xl"
            >
              <Video className="h-8 w-8 text-white" />
            </motion.div>
            <div className="text-left">
              <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent leading-tight">
                Video Kegiatan Kampus
              </h2>
              <p className="text-xl text-white/80 max-w-2xl mt-2">
                Saksikan berbagai kegiatan dan aktivitas menarik di Universitas Pasifik Morotai
              </p>
            </div>
          </div>
        </motion.div>

        {/* Featured Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredVideos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                delay: index * 0.2, 
                duration: 0.8, 
                ease: "easeOut" 
              }}
              whileHover={{ 
                y: -15, 
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
              className="group relative cursor-pointer"
              onClick={() => handleVideoClick(video)}
            >
              <div className="h-full bg-white/10 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 border border-white/20 hover:border-red-500/30">
                {/* Cinematic Thumbnail */}
                <div className="relative aspect-video bg-gray-900">
                  {video.thumbnail ? (
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
                      <Video className="w-16 h-16 text-gray-600" />
                    </div>
                  )}
                  
                  {/* Cinematic Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Play Button with Animation */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0.8 }}
                    whileHover={{ scale: 1.1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="bg-gradient-to-br from-red-600 to-red-500 rounded-full p-6 shadow-2xl border-4 border-white/20 backdrop-blur-sm">
                      <Play className="w-12 h-12 text-white ml-1" />
                    </div>
                  </motion.div>
                  
                  {/* Featured Badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="absolute top-4 left-4"
                  >
                    <Badge className="bg-gradient-to-r from-red-600 to-red-500 text-white font-bold shadow-lg px-4 py-2 rounded-full border border-white/20 backdrop-blur-sm">
                      Unggulan
                    </Badge>
                  </motion.div>

                  {/* View Count */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="absolute bottom-4 right-4 flex items-center gap-2 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full"
                  >
                    <Eye className="w-4 h-4 text-white" />
                    <span className="text-white text-sm font-medium">{video.viewCount}</span>
                  </motion.div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="text-xl font-black text-white mb-4 line-clamp-2 group-hover:text-red-400 transition-colors duration-300"
                  >
                    {video.title}
                  </motion.h3>
                  
                  {video.description && (
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="text-white/70 line-clamp-3 mb-4 leading-relaxed"
                    >
                      {video.description}
                    </motion.p>
                  )}
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      {video.category && (
                        <Badge variant="outline" className="text-white border-white/30 text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                          {video.category}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 text-white/60 text-sm">
                      <Volume2 className="w-4 h-4" />
                      <span>HD</span>
                    </div>
                  </motion.div>
                </div>

                {/* Hover Effects */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500/50 to-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-red-500/50 to-red-600 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="text-center"
        >
          <Button asChild className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white px-10 py-4 text-lg font-bold rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 border border-white/20 backdrop-blur-sm">
            <Link href="/video-kegiatan">
              <span className="flex items-center gap-3">
                Lihat Semua Video
                <ArrowRight className="h-5 w-5" />
              </span>
            </Link>
          </Button>
        </motion.div>

        {/* Video Modal */}
        <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-gray-900 border border-white/20 backdrop-blur-md">
            {selectedVideo && (
              <>
                <DialogHeader className="border-b border-white/10 pb-4">
                  <DialogTitle className="text-2xl font-bold text-white">
                    {selectedVideo.title}
                  </DialogTitle>
                </DialogHeader>
                
                <div className="space-y-6">
                  {/* YouTube Embed */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="aspect-video rounded-2xl overflow-hidden bg-black"
                  >
                    <iframe
                      src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                      title={selectedVideo.title}
                      className="w-full h-full"
                      allowFullScreen
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                  </motion.div>
                  
                  {/* Video Info */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 flex-wrap">
                      {selectedVideo.category && (
                        <Badge variant="outline" className="text-white border-white/30 px-4 py-2 rounded-full">
                          {selectedVideo.category}
                        </Badge>
                      )}
                      <Badge className="bg-gradient-to-r from-red-600 to-red-500 text-white font-bold px-4 py-2 rounded-full">
                        Unggulan
                      </Badge>
                      <div className="flex items-center gap-2 text-white/80">
                        <Eye className="w-5 h-5" />
                        <span className="font-medium">{selectedVideo.viewCount} views</span>
                      </div>
                    </div>
                    
                    {selectedVideo.description && (
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-white/80 leading-relaxed text-lg"
                      >
                        {selectedVideo.description}
                      </motion.p>
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
