import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { db } from '@/lib/db'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

interface AdmissionDetailPageProps {
  params: Promise<{ slug: string }>
}

async function getAdmission(slug: string) {
  try {
    const admission = await db.admission.findUnique({
      where: { slug }
    })
    return admission
  } catch (error) {
    console.error('Error fetching admission:', error)
    return null
  }
}

export async function generateMetadata({ params }: AdmissionDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const admission = await getAdmission(slug)
  
  if (!admission) {
    return {
      title: 'Penerimaan Tidak Ditemukan',
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.univpasifik.ac.id'
  const imageUrl = admission.image1Url || undefined

  const formatDate = (dateStr: Date) => {
    return new Date(dateStr).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  return {
    title: `${admission.title} | Penerimaan Mahasiswa Baru - Universitas Pasifik`,
    description: `Penerimaan Mahasiswa Baru ${admission.title}. Periode: ${formatDate(admission.displayStart)} - ${formatDate(admission.displayEnd)}`,
    openGraph: {
      title: admission.title,
      description: `Penerimaan Mahasiswa Baru - Periode: ${formatDate(admission.displayStart)} - ${formatDate(admission.displayEnd)}`,
      type: 'article',
      publishedTime: admission.displayStart.toISOString(),
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 628 }] : undefined,
      siteName: 'Universitas Pasifik',
    },
    twitter: {
      card: 'summary_large_image',
      title: admission.title,
      description: `Penerimaan Mahasiswa Baru - Periode: ${formatDate(admission.displayStart)} - ${formatDate(admission.displayEnd)}`,
      images: imageUrl ? [imageUrl] : undefined,
    },
  }
}

export default async function AdmissionDetailPage({ params }: AdmissionDetailPageProps) {
  const { slug } = await params
  const admission = await getAdmission(slug)

  if (!admission) {
    notFound()
  }

  const images = [
    admission.image1Url,
    admission.image2Url,
    admission.image3Url,
  ].filter(Boolean) as string[]

  const formatDate = (dateStr: Date | string | null) => {
    if (!dateStr) return '-'
    const date = new Date(dateStr)
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  const formatTime = (dateStr: Date | string | null) => {
    if (!dateStr) return '-'
    const date = new Date(dateStr)
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Back Button */}
        <div className="bg-unipas-muted">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link
              href="/penerimaan"
              className="inline-flex items-center gap-2 text-unipas-primary hover:text-unipas-accent transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Penerimaan
            </Link>
          </div>
        </div>

        {/* Hero Section with Image */}
        <section className="bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Image Gallery */}
            {images.length > 0 ? (
              <div className="relative aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl mb-8">
                <Image
                  src={images[0]}
                  alt={admission.title}
                  fill
                  className="object-cover"
                  priority
                />
                
                {/* Status Badge */}
                <div className="absolute top-6 left-6">
                  <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                    Dibuka
                  </span>
                </div>

                {/* Image Navigation (if multiple images) */}
                {images.length > 1 && (
                  <>
                    <button className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-unipas-primary p-3 rounded-full shadow-lg transition-all hover:scale-110">
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-unipas-primary p-3 rounded-full shadow-lg transition-all hover:scale-110">
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </>
                )}

                {/* Gradient Overlay at Bottom */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            ) : (
              <div className="aspect-[21/9] rounded-3xl bg-unipas-muted flex items-center justify-center mb-8">
                <span className="text-unipas-primary/50 text-xl">Tidak ada gambar</span>
              </div>
            )}

            {/* Title Section */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-5xl font-bold text-unipas-primary mb-4">
                {admission.title}
              </h1>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-unipas-muted rounded-2xl p-6 flex items-center gap-4">
                <div className="w-12 h-12 bg-unipas-primary/10 rounded-full flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-unipas-primary" />
                </div>
                <div>
                  <p className="text-sm text-unipas-text">Mulai Tayang</p>
                  <p className="text-lg font-semibold text-unipas-primary">
                    {formatDate(admission.displayStart)}
                  </p>
                </div>
              </div>

              <div className="bg-unipas-muted rounded-2xl p-6 flex items-center gap-4">
                <div className="w-12 h-12 bg-unipas-accent/10 rounded-full flex items-center justify-center">
                  <Clock className="h-6 w-6 text-unipas-accent" />
                </div>
                <div>
                  <p className="text-sm text-unipas-text">Selesai Tayang</p>
                  <p className="text-lg font-semibold text-unipas-primary">
                    {formatDate(admission.displayEnd)}
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-linear-to-r from-unipas-primary to-unipas-accent text-white px-8 py-6 rounded-full text-lg font-semibold hover:shadow-xl transition-all hover:-translate-y-1"
              >
                Daftar Sekarang
              </Button>
              <Link href="/penerimaan">
                <Button 
                  variant="outline"
                  className="px-8 py-6 rounded-full text-lg font-semibold border-unipas-primary text-unipas-primary hover:bg-unipas-primary hover:text-white"
                >
                  Lihat Jalur Lainnya
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Additional Images Gallery */}
        {images.length > 1 && (
          <section className="bg-unipas-muted py-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-unipas-primary mb-6 text-center">
                Dokumentasi Penerimaan
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {images.map((img, idx) => (
                  <div key={idx} className="relative aspect-video rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src={img}
                      alt={`${admission.title} - ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Info Section */}
        <section className="bg-white py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-unipas-primary mb-4">
              Informasi Penerimaan
            </h2>
            <p className="text-unipas-text leading-relaxed">
              Untuk informasi lebih lanjut mengenai penerimaan mahasiswa baru, 
              silakan menghubungi bagian penerimaan mahasiswa baru Universitas Pasifik 
              atau kunjungi kampus kami langsung.
            </p>
            
            <div className="mt-8 p-6 bg-unipas-muted rounded-2xl">
              <p className="text-sm text-unipas-text mb-2">Status Pendaftaran</p>
              <div className="flex items-center justify-center gap-2">
                <span className={`w-3 h-3 rounded-full ${admission.isActive ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className="font-semibold text-unipas-primary">
                  {admission.isActive ? 'Pendaftaran Dibuka' : 'Pendaftaran Ditutup'}
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
