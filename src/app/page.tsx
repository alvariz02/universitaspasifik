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
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

async function getData() {
  try {
    const [
      sliders,
      statistics,
      news,
      events,
      announcements,
      achievements,
      faculties,
      videos
    ] = await Promise.all([
      db.heroSlider.findMany({
        orderBy: { orderPosition: 'asc' },
        where: { isActive: true }
      }),
      db.statistic.findMany({
        orderBy: { createdAt: 'desc' },
        take: 6
      }),
      db.news.findMany({
        orderBy: { createdAt: 'desc' },
        take: 6
      }),
      db.event.findMany({
        orderBy: { createdAt: 'desc' },
        take: 6
      }),
      db.announcement.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5
      }),
      db.achievement.findMany({
        orderBy: { createdAt: 'desc' },
        take: 6
      }),
      db.faculty.findMany({
        orderBy: { name: 'asc' }
      }),
      db.video.findMany({
        orderBy: { createdAt: 'desc' },
        take: 6
      })
    ])

    return {
      sliders,
      stats: statistics,
      news,
      events,
      announcements,
      achievements,
      faculties,
      videos
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    return {
      sliders: [],
      stats: [],
      news: [],
      events: [],
      announcements: [],
      achievements: [],
      faculties: [],
      videos: []
    }
  }
}

export default async function Home() {
  const {
    sliders,
    stats,
    news,
    events,
    announcements,
    achievements,
    faculties,
    videos
  } = await getData()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSlider slides={sliders} />
        <QuickStats statistics={stats} />
        <FeaturedNews news={news} />
        <UpcomingEvents events={events} />
        <Announcements announcements={announcements} />
        <Achievements achievements={achievements} />
        <FacultiesGrid faculties={faculties} />
        <VideoSection videos={videos} />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
