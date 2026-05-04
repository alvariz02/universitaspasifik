import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Badge } from '@/components/ui/badge'
import { Bell, AlertCircle, Info, CheckCircle, Calendar, Share2, ArrowLeft } from 'lucide-react'
import { db } from '@/lib/db'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

interface PengumumanDetailPageProps {
  params: Promise<{ id: string }>
}

async function getAnnouncement(id: string) {
  try {
    const announcement = await db.announcement.findUnique({
      where: { id: parseInt(id) }
    })
    return announcement
  } catch (error) {
    console.error('Error fetching announcement:', error)
    return null
  }
}

export async function generateMetadata({ params }: PengumumanDetailPageProps): Promise<Metadata> {
  const { id } = await params
  const announcement = await getAnnouncement(id)
  
  if (!announcement) {
    return {
      title: 'Pengumuman Tidak Ditemukan',
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.univpasifik.ac.id'
  const imageUrl = announcement.content?.includes('cloudinary') 
    ? announcement.content.match(/https:\/\/res\.cloudinary\.com\/[^"]+/)?.[0]
    : undefined

  return {
    title: `${announcement.title} | Universitas Pasifik`,
    description: `Pengumuman ${announcement.category} - ${new Date(announcement.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}`,
    openGraph: {
      title: announcement.title,
      description: `Kategori: ${announcement.category} | Prioritas: ${announcement.priority}`,
      type: 'article',
      publishedTime: announcement.createdAt.toISOString(),
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 628 }] : undefined,
      siteName: 'Universitas Pasifik',
    },
    twitter: {
      card: 'summary_large_image',
      title: announcement.title,
      description: `Pengumuman ${announcement.category} - ${new Date(announcement.createdAt).toLocaleDateString('id-ID')}`,
      images: imageUrl ? [imageUrl] : undefined,
    },
  }
}

export default async function PengumumanDetailPage({ params }: PengumumanDetailPageProps) {
  const { id } = await params
  const announcement = await getAnnouncement(id)

  if (!announcement) {
    notFound()
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertCircle className="h-5 w-5" />
      case 'medium': return <Info className="h-5 w-5" />
      case 'low': return <CheckCircle className="h-5 w-5" />
      default: return <Bell className="h-5 w-5" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-blue-500'
      default: return 'bg-gray-500'
    }
  }

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'akademik': return <Badge className="bg-blue-600">Akademik</Badge>
      case 'administrasi': return <Badge className="bg-purple-600">Administrasi</Badge>
      case 'keuangan': return <Badge className="bg-green-600">Keuangan</Badge>
      case 'umum': return <Badge className="bg-gray-600">Umum</Badge>
      default: return <Badge>{category}</Badge>
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-unipas-muted">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <Link
            href="/pengumuman"
            className="inline-flex items-center gap-2 text-unipas-primary hover:text-unipas-accent transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Pengumuman
          </Link>

          {/* Main Card */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            {/* Header */}
            <div className={`${getPriorityColor(announcement.priority || 'low')} p-6 text-white`}>
              <div className="flex items-center gap-3 mb-4">
                {getPriorityIcon(announcement.priority || 'low')}
                <span className="font-semibold uppercase tracking-wide">
                  {(announcement.priority || 'low') === 'high' ? 'PENTING' : 
                   (announcement.priority || 'low') === 'medium' ? 'INFO' : 'Pengumuman'}
                </span>
                {getCategoryBadge(announcement.category || 'umum')}
              </div>
              <h1 className="text-2xl md:text-3xl font-bold">{announcement.title}</h1>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
              {/* Meta Info */}
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 pb-6 border-b">
                <Calendar className="h-4 w-4" />
                <span>
                  Dipublikasikan: {new Date(announcement.createdAt).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>

              {/* Body Content */}
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: announcement.content }}
              />

              {/* Share Section */}
              <div className="mt-8 pt-6 border-t">
                <p className="text-sm text-gray-500 mb-4 flex items-center gap-2">
                  <Share2 className="h-4 w-4" />
                  Bagikan pengumuman ini:
                </p>
                <div className="flex gap-3">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://www.univpasifik.ac.id/pengumuman/${announcement.id}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    Facebook
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(announcement.title)}&url=${encodeURIComponent(`https://www.univpasifik.ac.id/pengumuman/${announcement.id}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors text-sm font-medium"
                  >
                    Twitter
                  </a>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(`${announcement.title} https://www.univpasifik.ac.id/pengumuman/${announcement.id}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
