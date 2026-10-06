import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  const now = new Date()
  try {
    // Article bodies and unused relations stay on detail pages.
    const [sliders, statistics, news, events, announcements, achievements, faculties, videos, admissions] = await Promise.all([
      db.heroSlider.findMany({ where: { isActive: true }, orderBy: { orderPosition: 'asc' }, take: 10, select: { id: true, title: true, subtitle: true, imageUrl: true, linkUrl: true, linkText: true } }),
      db.statistic.findMany({ where: { isActive: true }, orderBy: { orderPosition: 'asc' }, select: { id: true, label: true, value: true, icon: true } }),
      db.news.findMany({ orderBy: { publishedDate: 'desc' }, take: 16, select: { id: true, title: true, slug: true, excerpt: true, imageUrl: true, category: true, authorName: true, publishedDate: true, isFeatured: true } }),
      db.event.findMany({ where: { eventDate: { gte: now } }, orderBy: { eventDate: 'asc' }, take: 3, select: { id: true, title: true, slug: true, eventDate: true, location: true } }),
      db.announcement.findMany({ where: { isActive: true, AND: [{ OR: [{ startDate: null }, { startDate: { lte: now } }] }, { OR: [{ endDate: null }, { endDate: { gte: now } }] }] }, orderBy: [{ priority: 'desc' }, { createdAt: 'desc' }], take: 4, select: { id: true, title: true, category: true, priority: true, isActive: true } }),
      db.achievement.findMany({ orderBy: { achievementDate: 'desc' }, take: 4, select: { id: true, title: true, imageUrl: true, achieverName: true, level: true, category: true } }),
      db.faculty.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true, slug: true, departments: { select: { id: true } } } }),
      db.video.findMany({ where: { isActive: true }, orderBy: [{ isFeatured: 'desc' }, { createdAt: 'desc' }], take: 4, select: { id: true, title: true, description: true, youtubeId: true, thumbnail: true, category: true, viewCount: true, isFeatured: true } }),
      db.admission.findMany({ where: { isActive: true, displayStart: { lte: now }, displayEnd: { gte: now } }, orderBy: { displayStart: 'desc' }, take: 3, select: { id: true, title: true, slug: true, image1Url: true, image2Url: true, image3Url: true, displayStart: true, displayEnd: true, isActive: true } }),
    ])
    return NextResponse.json({ sliders, statistics, news, events, announcements, achievements, faculties, videos, admissions }, { headers: { 'Cache-Control': 'no-store' } })
  } catch (error) {
    console.error('Error fetching homepage data:', error)
    return NextResponse.json({ error: 'Data kampus belum dapat dimuat. Silakan coba lagi.' }, { status: 500 })
  }
}
