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
      <main className="flex-1 bg-gray-50 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-unipas-accent">
              Akademik
            </p>
            <h1 className="mt-3 text-3xl font-black text-unipas-primary md:text-5xl">
              Kalender Akademik 2026/2027
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Kalender akademik Universitas Pasifik Morotai untuk tahun akademik 2026/2027.
            </p>

            <a
              href={calendarImage}
              download="Kalender-Akademik-Unipas-Morotai-2026-2027.png"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-unipas-primary px-5 py-3 font-bold text-white shadow-lg transition-colors hover:bg-unipas-accent"
            >
              <Download className="h-5 w-5" />
              Download Kalender Akademik
            </a>

            <div className="relative mx-auto mt-10 min-h-[70vh] overflow-hidden rounded-2xl bg-white p-3 shadow-xl ring-1 ring-unipas-primary/10 md:p-6">
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
