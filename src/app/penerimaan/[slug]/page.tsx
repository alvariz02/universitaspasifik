import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AdmissionDetailClient from './AdmissionDetailClient'
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
      images: imageUrl ? [{ 
        url: imageUrl, 
        width: 1200, 
        height: 628,
        alt: admission.title
      }] : undefined,
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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <AdmissionDetailClient admission={admission} />
      <Footer />
    </div>
  )
}
