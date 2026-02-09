'use client'

import { ArrowRight, Calendar, MapPin, Clock, Users } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
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
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-unipas-secondary/20 via-white to-unipas-primary/10">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-unipas-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-60 h-60 bg-unipas-primary/5 rounded-full blur-2xl"></div>
        <div className="absolute top-20 right-1/4 w-32 h-32 bg-blue-500/5 rounded-full blur-xl"></div>
        
        {/* Floating Particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -15, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute w-2 h-2 bg-unipas-accent/30 rounded-full"
            style={{
              left: `${5 + i * 12}%`,
              top: `${15 + (i % 4) * 20}%`,
              animationDelay: `${i * 0.3}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-20"
        >
          <div className="mb-6 lg:mb-0">
            <div className="inline-flex items-center gap-4 mb-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 bg-gradient-to-br from-unipas-accent to-unipas-primary rounded-2xl flex items-center justify-center shadow-2xl"
              >
                <Calendar className="h-8 w-8 text-white" />
              </motion.div>
              <div className="text-left">
                <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-unipas-accent to-unipas-primary bg-clip-text text-transparent leading-tight">
                  Event Mendatang
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mt-2">
                  Jangan lewatkan acara dan kegiatan yang akan datang
                </p>
              </div>
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <Link href="/event" className="hidden md:flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-unipas-accent to-unipas-primary text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 font-bold">
              Lihat Semua Event
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                delay: index * 0.2, 
                duration: 0.8, 
                ease: "easeOut" 
              }}
              whileHover={{ 
                y: -12, 
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
              className="group relative"
            >
              <div className="h-full bg-white/90 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 border border-white/50 hover:border-unipas-accent/30">
                {/* Animated Background */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-unipas-accent/5 to-unipas-primary/5"></div>
                </div>

                {/* Event Image */}
                {event.imageUrl && (
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Glass Morphism Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Featured Badge */}
                    {event.isFeatured && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        className="absolute top-4 right-4"
                      >
                        <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold shadow-lg px-4 py-2 rounded-full border border-white/20 backdrop-blur-sm">
                          Featured
                        </Badge>
                      </motion.div>
                    )}
                  </div>
                )}
                
                <div className="p-8">
                  {/* Date & Time */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-4 mb-4"
                  >
                    <div className="flex items-center gap-2 px-3 py-2 bg-unipas-accent/10 rounded-full">
                      <Calendar className="h-4 w-4 text-unipas-accent" />
                      <span className="text-sm font-medium text-unipas-accent">
                        {format(new Date(event.eventDate), 'dd MMM yyyy', { locale: id })}
                      </span>
                    </div>
                    
                    {event.endDate && (
                      <div className="flex items-center gap-2 px-3 py-2 bg-unipas-primary/10 rounded-full">
                        <Clock className="h-4 w-4 text-unipas-primary" />
                        <span className="text-sm font-medium text-unipas-primary">
                          {format(new Date(event.endDate), 'dd MMM yyyy', { locale: id })}
                        </span>
                      </div>
                    )}
                  </motion.div>

                  {/* Title */}
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="text-xl md:text-2xl font-black text-gray-800 mb-4 line-clamp-2 group-hover:text-unipas-accent transition-colors duration-300"
                  >
                    {event.title}
                  </motion.h3>

                  {/* Description */}
                  {event.description && (
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="text-muted-foreground line-clamp-3 mb-6 leading-relaxed"
                    >
                      {event.description}
                    </motion.p>
                  )}

                  {/* Location */}
                  {event.location && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="flex items-center gap-2 text-muted-foreground mb-6"
                    >
                      <MapPin className="h-4 w-4 text-unipas-accent" />
                      <span className="text-sm">{event.location}</span>
                    </motion.div>
                  )}

                  {/* CTA Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                  >
                    <Link href={`/event/${event.slug}`}>
                      <Button className="w-full bg-gradient-to-r from-unipas-accent to-unipas-primary text-white hover:from-unipas-primary hover:to-unipas-accent font-bold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                        <span className="flex items-center justify-center gap-2">
                          <Users className="h-4 w-4" />
                          Join Event
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </span>
                      </Button>
                    </Link>
                  </motion.div>
                </div>

                {/* Hover Effects */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-unipas-accent/50 to-unipas-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {upcomingEvents.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center py-20 bg-white/50 backdrop-blur-sm rounded-3xl border border-white/50"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-unipas-accent/20 to-unipas-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="h-10 w-10 text-unipas-accent" />
            </div>
            <p className="text-xl text-muted-foreground font-medium">Belum ada event mendatang</p>
            <p className="text-muted-foreground mt-2">Nantikan update event terbaru dari kami</p>
          </motion.div>
        )}

        {/* Mobile View Link */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="text-center md:hidden"
        >
          <Link href="/event">
            <Button className="bg-gradient-to-r from-unipas-accent to-unipas-primary text-white hover:from-unipas-primary hover:to-unipas-accent font-bold px-8 py-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
              Lihat Semua Event
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
