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

async function getData() {
  try {
    const [
      slidersRes,
      statsRes,
      newsRes,
      eventsRes,
      announcementsRes,
      achievementsRes,
      facultiesRes,
      videosRes
    ] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/hero-sliders`, {
        cache: 'no-store'
      }),
      fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/statistics`, {
        cache: 'no-store'
      }),
      fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/news?featured=false&limit=4`, {
        cache: 'no-store'
      }),
      fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/events?upcoming=true&limit=3`, {
        cache: 'no-store'
      }),
      fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/announcements`, {
        cache: 'no-store'
      }),
      fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/achievements?limit=4`, {
        cache: 'no-store'
      }),
      fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/faculties?limit=6`, {
        cache: 'no-store'
      }),
      fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/videos?featured=true&limit=3`, {
        cache: 'no-store'
      })
    ])

    if (!slidersRes.ok || !statsRes.ok || !newsRes.ok || !eventsRes.ok ||
        !announcementsRes.ok || !achievementsRes.ok || !facultiesRes.ok || !videosRes.ok) {
      throw new Error('Failed to fetch data')
    }

    const slidersData = await slidersRes.json()
    const stats = await statsRes.json()
    const newsData = await newsRes.json()
    const events = await eventsRes.json()
    const announcements = await announcementsRes.json()
    const achievements = await achievementsRes.json()
    const faculties = await facultiesRes.json()
    const videos = await videosRes.json()

    return {
      sliders: slidersData.sliders || [],
      stats: stats.statistics || stats || [],
      news: newsData.news || [],
      events: events.events || events || [],
      announcements: announcements.announcements || announcements || [],
      achievements: achievements.achievements || achievements || [],
      faculties: faculties.faculties || faculties || [],
      videos: videos || []
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
        <VideoSection videos={videos} />
        <Announcements announcements={announcements} />
        <Achievements achievements={achievements} />
        <FacultiesGrid faculties={faculties} />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
