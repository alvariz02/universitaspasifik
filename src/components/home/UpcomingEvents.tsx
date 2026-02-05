'use client'

import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import EventCard from '@/components/cards/EventCard'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

interface Event {
  id: number
  title: string
  slug: string
  description?: string
  eventDate: Date
  endDate?: Date
  location?: string
  imageUrl?: string
  isFeatured: boolean
}

interface UpcomingEventsProps {
  events: Event[]
}

export default function UpcomingEvents({ events }: UpcomingEventsProps) {
  const upcomingEvents = events.slice(0, 3)

  return (
    <section className="py-16 bg-unipas-secondary">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-unipas-primary mb-2">
              Event Mendatang
            </h2>
            <p className="text-muted-foreground">
              Jangan lewatkan acara dan kegiatan yang akan datang
            </p>
          </div>
          <Link href="/event" className="hidden md:flex items-center gap-2 text-unipas-accent hover:text-unipas-primary font-medium">
            Lihat Semua Event
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-linear-to-br from-white via-unipas-secondary/50 to-unipas-muted rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 border border-unipas-accent/20"
            >
              <EventCard
                {...event}
                eventDate={new Date(event.eventDate)}
                endDate={event.endDate ? new Date(event.endDate) : undefined}
              />
            </motion.div>
          ))}
        </div>

        {upcomingEvents.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-muted-foreground">Belum ada event mendatang</p>
          </div>
        )}

        <div className="text-center mt-8 md:hidden">
          <Link href="/event">
            <Button className="bg-ui-navy text-white hover:bg-ui-navy/80">
              Lihat Semua Event
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
