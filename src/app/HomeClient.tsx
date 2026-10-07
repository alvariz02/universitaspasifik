'use client'

import dynamic from 'next/dynamic'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { useCache } from '@/hooks/useCache'

// Dynamic imports for heavy components with animations
const HeroSlider = dynamic(() => import('@/components/home/HeroSlider'), {
  loading: () => (
    <div className="relative w-full h-[400px] md:h-[500px] lg:h-[400px] bg-gradient-to-br from-unipas-primary/10 to-unipas-accent/10 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-unipas-primary"></div>
    </div>
  ),
  ssr: true
})

const QuickStats = dynamic(() => import('@/components/home/QuickStats'), {
  loading: () => <div className="h-32 bg-gray-100 animate-pulse" />,
  ssr: true
})

const CampusMagazine = dynamic(() => import('@/components/home/CampusMagazine'), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse" />,
  ssr: false
})

const AdmissionsSection = dynamic(() => import('@/components/home/AdmissionsSection'), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse" />,
  ssr: false
})

const CTASection = dynamic(() => import('@/components/home/CTASection'), {
  loading: () => <div className="h-32 bg-gray-100 animate-pulse" />,
  ssr: true
})

async function fetchHomeData() {
  const response = await fetch('/api/home')
  if (!response.ok) {
    throw new Error('Data kampus belum dapat dimuat. Silakan coba lagi dalam beberapa saat.')
  }
  return response.json()
}
export default function HomeClient() {
  const { data, loading, error, refetch } = useCache(
    'home-page-data-v2',
    fetchHomeData,
    [] // No dependencies, only load once
  )

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-unipas-primary"></div>
            <p className="mt-4 text-unipas-primary">Loading...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-500">{error}</p>
            <button 
              onClick={refetch}
              className="mt-4 px-4 py-2 bg-unipas-primary text-white rounded hover:bg-unipas-accent"
            >
              Coba Lagi
            </button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSlider slides={data?.sliders || []} />
        <QuickStats statistics={data?.statistics || []} />
        <AdmissionsSection admissions={data?.admissions || []} />
        <CampusMagazine
          news={data?.news || []}
          categoryCounts={data?.categoryCounts || []}
          events={data?.events || []}
          announcements={data?.announcements || []}
          achievements={data?.achievements || []}
          faculties={data?.faculties || []}
          videos={data?.videos || []}
        />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
