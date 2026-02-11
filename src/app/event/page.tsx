import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import EventCard from '@/components/cards/EventCard'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { format } from 'date-fns'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

async function getEvents(page: number = 1) {
  try {
    const limit = 12
    const offset = (page - 1) * limit
    
    const [events, total] = await Promise.all([
      db.event.findMany({
        orderBy: {
          createdAt: 'desc'
        },
        skip: offset,
        take: limit
      }),
      db.event.count()
    ])

    return {
      events,
      total,
      totalPages: Math.ceil(total / limit)
    }
  } catch (error) {
    console.error('Error fetching events:', error)
    return {
      events: [],
      total: 0,
      totalPages: 0
    }
  }
}

export default async function EventPage({
  searchParams
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const params = await searchParams
  const page = parseInt(params.page || '1')
  const { events } = await getEvents(page)

  // Split events into upcoming and past
  const now = new Date()
  const upcomingEvents = events.filter((e: any) => new Date(e.eventDate) >= now)
  const pastEvents = events.filter((e: any) => new Date(e.eventDate) < now)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-ui-navy py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Event & Kegiatan Universitas Pasifik
            </h1>
            <p className="text-xl text-gray-300">
              Jangan lewatkan berbagai acara dan kegiatan menarik di Universitas Pasifik
            </p>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-ui-navy mb-2">
                Event Mendatang
              </h2>
              <div className="h-1 w-20 bg-ui-yellow"></div>
            </div>

            {upcomingEvents.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg mb-8">
                <p className="text-muted-foreground text-lg">Belum ada event mendatang</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {upcomingEvents.map((item: any) => (
                  <EventCard
                    key={item.id}
                    slug={item.slug}
                    title={item.title}
                    description={item.description}
                    eventDate={new Date(item.eventDate)}
                    endDate={item.endDate ? new Date(item.endDate) : undefined}
                    location={item.location}
                    imageUrl={item.imageUrl}
                    isFeatured={item.isFeatured}
                  />
                ))}
              </div>
            )}

            {/* Past Events */}
            {pastEvents.length > 0 && (
              <>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-ui-navy mb-2">
                    Event Selesai
                  </h2>
                  <div className="h-1 w-20 bg-ui-yellow"></div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {pastEvents.map((item: any) => (
                    <EventCard
                      key={item.id}
                      slug={item.slug}
                      title={item.title}
                      description={item.description}
                      eventDate={new Date(item.eventDate)}
                      endDate={item.endDate ? new Date(item.endDate) : undefined}
                      location={item.location}
                      imageUrl={item.imageUrl}
                      isFeatured={item.isFeatured}
                    />
                  ))}
                </div>
              </>
            )}

            {events.length === 0 && (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-muted-foreground text-lg">Belum ada event tersedia</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
