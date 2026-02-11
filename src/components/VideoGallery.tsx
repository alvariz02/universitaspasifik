'use client'

import { useState, useEffect } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Play, Eye, Search, Filter } from 'lucide-react'
import { format } from 'date-fns'
import { id as localeId } from 'date-fns/locale'

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

interface VideoGalleryProps {
  videos: Video[]
}

export default function VideoGallery({ videos: initialVideos }: VideoGalleryProps) {
  const [videos, setVideos] = useState<Video[]>(initialVideos)
  const [filteredVideos, setFilteredVideos] = useState<Video[]>(initialVideos)
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)

  const categories = [
    { value: 'all', label: 'Semua Kategori' },
    { value: 'kegiatan', label: 'Kegiatan Umum' },
    { value: 'akademik', label: 'Akademik' },
    { value: 'wisuda', label: 'Wisuda' },
    { value: 'seminar', label: 'Seminar/Workshop' },
    { value: 'olahraga', label: 'Olahraga' },
    { value: 'seni', label: 'Seni & Budaya' },
    { value: 'penelitian', label: 'Penelitian dan Pengembangan' },
    { value: 'kemahasiswaan', label: 'Kemahasiswaan dan Alumni' },
    { value: 'lainnya', label: 'Lainnya' }
  ]

  useEffect(() => {
    let filtered = videos

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(video =>
        video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(video => video.category === selectedCategory)
    }

    // Filter by featured
    if (showFeaturedOnly) {
      filtered = filtered.filter(video => video.isFeatured)
    }

    setFilteredVideos(filtered)
  }, [videos, searchTerm, selectedCategory, showFeaturedOnly])

  const handleVideoClick = async (video: Video) => {
    setSelectedVideo(video)
    
    // Increment view count
    try {
      await fetch(`/api/videos/${video.id}`, {
        method: 'GET'
      })
      // Update local state
      setVideos(prev => prev.map(v => 
        v.id === video.id ? { ...v, viewCount: v.viewCount + 1 } : v
      ))
    } catch (error) {
      console.error('Error updating view count:', error)
    }
  }

  const featuredVideos = filteredVideos.filter(video => video.isFeatured)
  const regularVideos = filteredVideos.filter(video => !video.isFeatured)

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Cari video..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex gap-3 items-center">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button
              variant={showFeaturedOnly ? "default" : "outline"}
              onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
              className="whitespace-nowrap"
            >
              <Filter className="w-4 h-4 mr-2" />
              Unggulan
            </Button>
          </div>
        </div>
      </div>

      {/* Featured Videos */}
      {featuredVideos.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-unipas-primary mb-6">Video Unggulan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredVideos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                onClick={() => handleVideoClick(video)}
                featured
              />
            ))}
          </div>
        </div>
      )}

      {/* Regular Videos */}
      {regularVideos.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-unipas-primary mb-6">
            {featuredVideos.length > 0 ? 'Video Lainnya' : 'Semua Video'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {regularVideos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                onClick={() => handleVideoClick(video)}
              />
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {filteredVideos.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Play className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">Tidak ada video ditemukan</h3>
          <p className="text-gray-500">Coba ubah filter atau kata kunci pencarian</p>
        </div>
      )}

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
                    {selectedVideo.isFeatured && (
                      <Badge className="bg-unipas-accent text-white">Unggulan</Badge>
                    )}
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
                  
                  <p className="text-sm text-gray-500">
                    Ditambahkan {format(new Date(selectedVideo.createdAt), 'dd MMMM yyyy', { locale: localeId })}
                  </p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

interface VideoCardProps {
  video: Video
  onClick: () => void
  featured?: boolean
}

function VideoCard({ video, onClick, featured = false }: VideoCardProps) {
  return (
    <div
      className={`bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl ${
        featured ? 'ring-2 ring-unipas-accent' : ''
      }`}
      onClick={onClick}
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
          <div className="bg-white/90 rounded-full p-3">
            <Play className="w-6 h-6 text-unipas-primary" />
          </div>
        </div>
        
        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-unipas-accent text-white">Unggulan</Badge>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {video.title}
        </h3>
        
        {video.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {video.description}
          </p>
        )}
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-3">
            {video.category && (
              <Badge variant="outline" className="text-xs">
                {video.category}
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            {video.viewCount}
          </div>
        </div>
      </div>
    </div>
  )
}