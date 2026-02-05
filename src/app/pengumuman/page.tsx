import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Bell, AlertCircle, Info, CheckCircle, Calendar } from 'lucide-react'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

async function getAnnouncements() {
  try {
    const announcements = await db.announcement.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      take: 50,
      where: {
        isActive: true
      }
    })

    return announcements
  } catch (error) {
    console.error('Error fetching announcements:', error)
    return []
  }
}

export default async function PengumumanPage() {
  const announcements = await getAnnouncements()

  const getPriorityIcon = (priority?: string) => {
    switch (priority) {
      case 'high':
        return <AlertCircle className="h-6 w-6" />
      case 'medium':
        return <Info className="h-6 w-6" />
      case 'low':
        return <CheckCircle className="h-6 w-6" />
      default:
        return <Bell className="h-6 w-6" />
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

  const getPriorityLabel = (priority?: string) => {
    switch (priority) {
      case 'high':
        return 'Tinggi'
      case 'medium':
        return 'Sedang'
      case 'low':
        return 'Rendah'
      default:
        return 'Normal'
    }
  }

  const formatDate = (date?: Date | string) => {
    if (!date) return ''
    const d = new Date(date)
    return d.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-ui-navy py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3">
              <div className="bg-ui-yellow rounded-lg p-3">
                <Bell className="h-8 w-8 text-ui-navy" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                  Pengumuman UI
                </h1>
                <p className="text-xl text-gray-300">
                  Informasi penting yang perlu Anda ketahui
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Announcements List */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {announcements.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <Bell className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground text-lg">Belum ada pengumuman tersedia</p>
              </div>
            ) : (
              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg border-2">
                  <div className="p-6 border-b bg-gray-50">
                    <div className="flex items-center gap-3">
                      <Bell className="h-5 w-5 text-ui-yellow" />
                      <h2 className="text-xl font-bold text-ui-navy">
                        Semua Pengumuman
                      </h2>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Menampilkan {announcements.length} pengumuman
                    </p>
                  </div>

                  <ScrollArea className="h-[800px]">
                    <div className="divide-y">
                      {announcements.map((announcement: any, index: number) => (
                        <div
                          key={announcement.id}
                          className="p-6 hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-start gap-4">
                            {/* Priority Icon */}
                            <div className={`shrink-0 p-2 rounded-lg ${getPriorityColor(announcement.priority)}`}>
                              <div className="text-current">
                                {getPriorityIcon(announcement.priority)}
                              </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              {/* Badges */}
                              <div className="flex items-center gap-2 mb-3 flex-wrap">
                                {announcement.priority && (
                                  <Badge className={getPriorityColor(announcement.priority)}>
                                    {getPriorityLabel(announcement.priority)}
                                  </Badge>
                                )}
                                {announcement.category && (
                                  <Badge variant="outline" className="text-sm">
                                    {announcement.category}
                                  </Badge>
                                )}
                                {announcement.startDate && (
                                  <Badge variant="outline" className="text-sm flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    {formatDate(announcement.startDate)}
                                  </Badge>
                                )}
                              </div>

                              {/* Title */}
                              <h3 className="text-xl font-bold text-ui-navy mb-3 hover:text-ui-navy/80 transition-colors">
                                {announcement.title}
                              </h3>

                              {/* Description */}
                              <div className="prose max-w-none mb-4">
                                <p className="text-gray-700 leading-relaxed">
                                  {announcement.content}
                                </p>
                              </div>

                              {/* Date Range */}
                              {announcement.startDate && announcement.endDate && (
                                <div className="text-sm text-muted-foreground mt-3">
                                  <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    <span>
                                      {formatDate(announcement.startDate)} - {formatDate(announcement.endDate)}
                                    </span>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>

                {/* Info Box */}
                <div className="mt-8 bg-ui-navy/5 rounded-lg p-6 border-2 border-ui-navy/10">
                  <h3 className="font-bold text-ui-navy mb-4 flex items-center gap-2">
                    <Info className="h-5 w-5 text-ui-yellow" />
                    Tentang Pengumuman
                  </h3>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <p>
                      Pengumuman disajikan berdasarkan tingkat prioritas: <span className="font-medium text-red-600">Tinggi</span>, <span className="font-medium text-yellow-600">Sedang</span>, dan <span className="font-medium text-green-600">Rendah</span>.
                    </p>
                    <p>
                      Pengumuman dengan prioritas <strong>Tinggi</strong> memerlukan perhatian khusus dan mungkin memerlukan tindakan segera.
                    </p>
                    <p>
                      Pastikan untuk selalu memeriksa pengumuman secara berkala untuk mendapatkan informasi terbaru mengenai akademik, kemahasiswaan, dan kegiatan kampus.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
