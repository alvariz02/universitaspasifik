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
import { db } from '@/lib/db'

async function fetchHomeData() {
  try {
    // Sequential queries untuk prevent connection pool exhaustion
    const sliders = await db.heroSlider.findMany({
      orderBy: { orderPosition: 'asc' },
      where: { isActive: true }
    }).catch(() => [])
    
    const statistics = await db.statistic.findMany({
      orderBy: { createdAt: 'desc' },
      take: 6
    }).catch(() => [])
    
    const news = await db.news.findMany({
      orderBy: { createdAt: 'desc' },
      take: 6
    }).catch(() => [])
    
    const events = await db.event.findMany({
      orderBy: { createdAt: 'desc' },
      take: 6
    }).catch(() => [])
    
    const announcements = await db.announcement.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5
    }).catch(() => [])
    
    const achievements = await db.achievement.findMany({
      orderBy: { createdAt: 'desc' },
      take: 6
    }).catch(() => [])
    
    const faculties = await db.faculty.findMany({
      orderBy: { name: 'asc' }
    }).catch(() => [])
    
    const videos = await db.video.findMany({
      orderBy: { createdAt: 'desc' },
      take: 6
    }).catch(() => [])

    return {
      sliders: sliders as any,
      statistics: statistics as any,
      news: news as any,
      events: events as any,
      announcements: announcements as any,
      achievements: achievements as any,
      faculties: faculties as any,
      videos: videos as any
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
