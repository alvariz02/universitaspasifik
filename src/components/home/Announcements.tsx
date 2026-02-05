'use client'

import { Bell, AlertCircle, Info, CheckCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import Link from 'next/link'

interface Announcement {
  id: number
  title: string
  content: string
  category?: string
  priority?: string
  startDate?: Date
  endDate?: Date
  isActive?: boolean
}

interface AnnouncementsProps {
  announcements: Announcement[]
}

export default function Announcements({ announcements }: AnnouncementsProps) {
  const getPriorityIcon = (priority?: string) => {
    switch (priority) {
      case 'high':
        return <AlertCircle className="h-5 w-5" />
      case 'medium':
        return <Info className="h-5 w-5" />
      case 'low':
        return <CheckCircle className="h-5 w-5" />
      default:
        return <Bell className="h-5 w-5" />
    }
  }

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-300'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'low':
        return 'bg-green-100 text-green-800 border-green-300'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const activeAnnouncements = announcements.filter(a => a.isActive !== false)

  if (activeAnnouncements.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-unipas-primary">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-linear-to-br from-unipas-primary via-unipas-accent to-unipas-primary rounded-xl p-6 inline-block mb-4 shadow-lg hover:shadow-xl transition-all duration-500 border border-white/20">
            <div className="text-white drop-shadow-lg">
              <Bell className="h-8 w-8" />
            </div>
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Pengumuman Penting
            </h2>
            <p className="text-gray-300">
              Informasi terbaru yang perlu Anda ketahui
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <ScrollArea className="h-[400px] rounded-lg border border-white/10 bg-white/5 p-4">
            <div className="space-y-4">
              {activeAnnouncements.map((announcement) => (
                <div
                  key={announcement.id}
                  className="bg-white/10 backdrop-blur rounded-lg p-4 hover:bg-white/15 transition-colors border border-white/10"
                >
                  <div className="flex items-start gap-3 mb-2">
                    <div className="text-unipas-accent shrink-0 mt-0.5">
                      {getPriorityIcon(announcement.priority)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        {announcement.priority && (
                          <Badge className={getPriorityColor(announcement.priority)}>
                            {announcement.priority}
                          </Badge>
                        )}
                        {announcement.category && (
                          <Badge variant="outline" className="text-white border-white/30 text-xs">
                            {announcement.category}
                          </Badge>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                        {announcement.title}
                      </h3>
                      <p className="text-sm text-gray-300 line-clamp-2">
                        {announcement.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Info Section */}
          <div className="bg-ui-yellow rounded-lg p-8 text-ui-navy">
            <h3 className="text-2xl font-bold mb-4">
              Informasi Penerimaan
            </h3>
            <p className="mb-6">
              Daftarkan diri Anda untuk menjadi bagian dari keluarga besar
              Universitas Pasifik melalui berbagai jalur seleksi yang tersedia.
            </p>
            <div className="space-y-3">
              <Link href="/penerimaan">
                <div className="bg-white/20 rounded-lg p-4 hover:bg-white/30 transition-colors cursor-pointer">
                  <div className="font-semibold mb-1">SNBP</div>
                  <div className="text-sm opacity-80">
                    Seleksi Nasional Berbasis Prestasi
                  </div>
                </div>
              </Link>
              <Link href="/penerimaan">
                <div className="bg-white/20 rounded-lg p-4 hover:bg-white/30 transition-colors cursor-pointer">
                  <div className="font-semibold mb-1">SNBT</div>
                  <div className="text-sm opacity-80">
                    Seleksi Nasional Berbasis Tes
                  </div>
                </div>
              </Link>
              <Link href="/penerimaan">
                <div className="bg-white/20 rounded-lg p-4 hover:bg-white/30 transition-colors cursor-pointer">
                  <div className="font-semibold mb-1">SIMAK UP</div>
                  <div className="text-sm opacity-80">
                    Seleksi Mandiri Universitas Pasifik
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
