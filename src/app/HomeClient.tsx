'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HeroSlider from '@/components/home/HeroSlider'
import QuickStats from '@/components/home/QuickStats'
import FeaturedNews from '@/components/home/FeaturedNews'
import UpcomingEvents from '@/components/home/UpcomingEvents'
import Announcements from '@/components/home/Announcements'
import Achievements from '@/components/home/Achievements'
import FacultiesGrid from '@/components/home/FacultiesGrid'
import VideoSection from '@/components/home/VideoSection'
import CTASection from '@/components/home/CTASection'
import { useCache } from '@/hooks/useCache'

async function fetchHomeData() {
  try {
    // Fetch data from API routes instead of direct database calls
    const [slidersRes, statisticsRes, newsRes, eventsRes, announcementsRes, achievementsRes, facultiesRes, videosRes] = await Promise.all([
      fetch('/api/hero-sliders?limit=10&offset=0'),
      fetch('/api/statistics'),
      fetch('/api/news?limit=6&offset=0'),
      fetch('/api/events?limit=6&offset=0'),
      fetch('/api/announcements?limit=5&offset=0'),
      fetch('/api/achievements?limit=6&offset=0'),
      fetch('/api/faculties'),
      fetch('/api/videos?limit=6&offset=0')
    ])

    const slidersData = slidersRes.ok ? await slidersRes.json() : { sliders: [] }
    const statisticsData = statisticsRes.ok ? await statisticsRes.json() : []
    const newsData = newsRes.ok ? await newsRes.json() : { news: [] }
    const eventsData = eventsRes.ok ? await eventsRes.json() : { events: [] }
    const announcementsData = announcementsRes.ok ? await announcementsRes.json() : { announcements: [] }
    const achievementsData = achievementsRes.ok ? await achievementsRes.json() : { achievements: [] }
    const facultiesData = facultiesRes.ok ? await facultiesRes.json() : []
    const videosData = videosRes.ok ? await videosRes.json() : { videos: [] }

    return {
      sliders: slidersData.sliders || [],
      statistics: statisticsData || [],
      news: newsData.news || [],
      events: eventsData.events || [],
      announcements: announcementsData.announcements || [],
      achievements: achievementsData.achievements || [],
      faculties: facultiesData || [],
      videos: videosData.videos || []
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
