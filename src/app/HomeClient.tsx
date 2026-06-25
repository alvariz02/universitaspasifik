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

const FeaturedNews = dynamic(() => import('@/components/home/FeaturedNews'), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse" />,
  ssr: false // Disable SSR for component with heavy animations
})

const UpcomingEvents = dynamic(() => import('@/components/home/UpcomingEvents'), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse" />,
  ssr: false
})

const Announcements = dynamic(() => import('@/components/home/Announcements'), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse" />,
  ssr: false
})

const Achievements = dynamic(() => import('@/components/home/Achievements'), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse" />,
  ssr: false
})

const FacultiesGrid = dynamic(() => import('@/components/home/FacultiesGrid'), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse" />,
  ssr: true
})

const VideoSection = dynamic(() => import('@/components/home/VideoSection'), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse" />,
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
  try {
    // Fetch data from API routes instead of direct database calls
    const [slidersRes, statisticsRes, newsRes, eventsRes, announcementsRes, achievementsRes, facultiesRes, videosRes, admissionsRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'https://www.univpasifik.ac.id'}/api/hero-sliders?limit=10&offset=0`),
      fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'https://www.univpasifik.ac.id'}/api/statistics`),
      fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'https://www.univpasifik.ac.id'}/api/news?limit=6&offset=0`),
      fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'https://www.univpasifik.ac.id'}/api/events?upcoming=true&limit=6`),
      fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'https://www.univpasifik.ac.id'}/api/announcements?limit=5&offset=0`),
      fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'https://www.univpasifik.ac.id'}/api/achievements?limit=6&offset=0`),
      fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'https://www.univpasifik.ac.id'}/api/faculties`),
      fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'https://www.univpasifik.ac.id'}/api/videos?limit=6&offset=0`),
      fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'https://www.univpasifik.ac.id'}/api/admissions?active=true&limit=3`)
    ])

    const slidersData = slidersRes.ok ? await slidersRes.json() : { sliders: [] }
    console.log('🎠 Raw sliders API response:', slidersData)
    console.log('🎠 Sliders count:', slidersData.sliders?.length || 0)
    const statisticsData = statisticsRes.ok ? await statisticsRes.json() : []
    const newsData = newsRes.ok ? await newsRes.json() : { news: [] }
    const eventsData = eventsRes.ok ? await eventsRes.json() : []
    console.log('📊 Raw events API response:', eventsData)
    console.log('📊 Events response type:', typeof eventsData)
    console.log('📊 Events is array:', Array.isArray(eventsData))
    const announcementsData = announcementsRes.ok ? await announcementsRes.json() : []
    const achievementsData = achievementsRes.ok ? await achievementsRes.json() : []
    const facultiesData = facultiesRes.ok ? await facultiesRes.json() : []
    const videosData = videosRes.ok ? await videosRes.json() : []
    const admissionsData = admissionsRes.ok ? await admissionsRes.json() : []
    console.log('📼 Raw videos API response:', videosData)
    console.log('📼 Videos response type:', typeof videosData)
    console.log('📼 Videos is array:', Array.isArray(videosData))

    return {
      sliders: slidersData.sliders || [],
      statistics: statisticsData || [],
      news: newsData.news || [],
      events: eventsData || [], // Direct array, not eventsData.events
      announcements: announcementsData || [], // Direct array, not announcementsData.announcements
      achievements: achievementsData || [],
      faculties: facultiesData || [],
      videos: videosData || [], // Direct array, not videosData.videos
      admissions: admissionsData || [] // Active admissions from API
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    return {
      sliders: [],
      statistics: [],
      news: [],
      events: [],
      announcements: [],
      achievements: [],
      faculties: [],
      videos: []
    }
  }
}

export default function HomeClient() {
  const { data, loading, error, refetch } = useCache(
    'home-page-data',
    fetchHomeData,
    [] // No dependencies, only load once
  )

  // Debug: Log current data
  console.log('🎯 Current events in home:', data?.events)
  console.log('🎯 Events count:', data?.events?.length || 0)
  console.log('📼 Current videos in home:', data?.videos)
  console.log('📼 Videos count:', data?.videos?.length || 0)

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
            <p className="text-red-500">Error: {error}</p>
            <button 
              onClick={refetch}
              className="mt-4 px-4 py-2 bg-unipas-primary text-white rounded hover:bg-unipas-accent"
            >
              Retry
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
        <FeaturedNews news={data?.news || []} />
        <UpcomingEvents events={data?.events || []} />
        <Announcements announcements={data?.announcements || []} />
        <Achievements achievements={data?.achievements || []} />
        <FacultiesGrid faculties={data?.faculties || []} />
        <VideoSection videos={data?.videos || []} />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
