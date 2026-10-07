import PageHero from '@/components/layout/PageHero'
import Image from 'next/image'
import { Download } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const calendarImage = '/Kalender%20%20Akademik%20Unipas%20Morotai%2020262027.png'

export const metadata = {
  title: 'Kalender Akademik 2026/2027 - Universitas Pasifik',
  description: 'Kalender akademik Universitas Pasifik Morotai tahun akademik 2026/2027.',
}

export default function KalenderAkademikPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="public-page flex-1">
        <PageHero title="Kalender Akademik 2026/2027" description="Kalender kegiatan akademik Universitas Pasifik Morotai untuk tahun akademik 2026/2027." /><div className="site-container py-12">
          <div className="mx-auto max-w-6xl text-center">
            <a
              href={calendarImage}
              download="Kalender-Akademik-Unipas-Morotai-2026-2027.png"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-unipas-primary px-5 py-3 font-bold text-white shadow-lg transition-colors hover:bg-unipas-accent"
            >
              <Download className="h-5 w-5" />
              Download Kalender Akademik
            </a>

            <div className="site-card relative mx-auto mt-10 min-h-[70vh] overflow-hidden bg-white p-3 ring-1 ring-unipas-primary/10 md:p-6">
              <Image
                src={calendarImage}
                alt="Kalender Akademik Universitas Pasifik Morotai tahun 2026/2027"
                fill
                sizes="(max-width: 768px) 100vw, 1152px"
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
