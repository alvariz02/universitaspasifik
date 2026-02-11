import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, MapPin, Users, ExternalLink, ArrowLeft, Check } from 'lucide-react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { id as localeId } from 'date-fns/locale'
import { db } from '@/lib/db'
import Link from 'next/link'
import { format } from 'date-fns'

export const dynamic = 'force-dynamic'

async function getEventBySlug(slug: string) {
  try {
    const events = await db.event.findMany({
      where: {
        slug: slug
      }
    })

    if (!events || events.length === 0) {
      return null
    }

    return events[0]
  } catch (error) {
    console.error('Error fetching event:', error)
    return null
  }
}

export default async function EventDetailPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const event = await getEventBySlug(slug)

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Event tidak ditemukan</h1>
            <Link href="/event">
              <Button className="bg-ui-yellow text-ui-navy hover:bg-yellow-400">
                Kembali ke Event
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const eventDate = new Date(event.eventDate)
  const eventDescription = event.description || ''
  const endDate = event.endDate ? new Date(event.endDate) : null
  const now = new Date()
  const isPast = eventDate < now
  const isFeatured = event.isFeatured

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Back Button */}
        <div className="bg-gray-50 border-b">
          <div className="container mx-auto px-4 py-4">
            <Link href="/event">
              <Button variant="ghost" className="gap-2 text-ui-navy hover:text-ui-navy/80">
                <ArrowLeft className="h-4 w-4" />
                Kembali ke Event
              </Button>
            </Link>
          </div>
        </div>

        {/* Event Header with Image */}
        {event.imageUrl && (
          <div className="relative h-100 md:h-125">
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 py-8">
              {isFeatured && (
                <Badge className="bg-ui-yellow text-ui-navy mb-4 text-sm font-medium">
                  Event Unggulan
                </Badge>
              )}
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                {event.title}
              </h1>
              <div className="flex items-center gap-2">
                {isPast ? (
                  <Badge variant="outline" className="border-white text-white bg-black/30">
                    Selesai
                  </Badge>
                ) : (
                  <Badge className="bg-green-500 text-white">
                    Mendatang
                  </Badge>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Event Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Event Details */}
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {/* Left: Description */}
                <div className="md:col-span-2">
                  <div className="prose prose-lg max-w-none">
                    <p className="text-lg text-muted-foreground mb-6">
                      {event.description}
                    </p>

                    <div
                      className="text-gray-800 leading-relaxed space-y-4"
                      dangerouslySetInnerHTML={{ __html: (event as any).content || event.description }}
                    />
                  </div>
                </div>

                {/* Right: Sidebar */}
                <div className="space-y-6">
                  {/* Date & Time */}
                  <div className="bg-gray-50 rounded-lg p-6 border-2">
                    <h3 className="font-bold text-ui-navy mb-4 flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-ui-yellow" />
                      Tanggal & Waktu
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-ui-yellow" />
                        <div>
                          <div className="font-medium">Tanggal</div>
                          <div className="text-muted-foreground">
                            {format(eventDate, 'dd MMMM yyyy', { locale: localeId })}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-ui-yellow" />
                        <div>
                          <div className="font-medium">Waktu</div>
                          <div className="text-muted-foreground">
                            {format(eventDate, 'HH:mm')}
                            {endDate && ` - ${format(endDate, 'HH:mm')}`}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  {event.location && (
                    <div className="bg-gray-50 rounded-lg p-6 border-2">
                      <h3 className="font-bold text-ui-navy mb-4 flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-ui-yellow" />
                        Lokasi
                      </h3>
                      <p className="text-muted-foreground">{event.location}</p>
                    </div>
                  )}

                  {/* Organizer */}
                  {event.organizer && (
                    <div className="bg-gray-50 rounded-lg p-6 border-2">
                      <h3 className="font-bold text-ui-navy mb-4 flex items-center gap-2">
                        <Users className="h-5 w-5 text-ui-yellow" />
                        Penyelenggara
                      </h3>
                      <p className="text-muted-foreground">{event.organizer}</p>
                    </div>
                  )}

                  {/* Contact */}
                  {event.contactEmail && (
                    <div className="bg-gray-50 rounded-lg p-6 border-2">
                      <h3 className="font-bold text-ui-navy mb-4">
                        Kontak
                      </h3>
                      <p className="text-muted-foreground text-sm break-all">
                        {event.contactEmail}
                      </p>
                    </div>
                  )}

                  {/* Registration Button */}
                  {event.registrationUrl && !isPast && (
                    <a
                      href={event.registrationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="w-full bg-ui-yellow text-ui-navy hover:bg-yellow-400 gap-2">
                        <ExternalLink className="h-4 w-4" />
                        Daftar Sekarang
                      </Button>
                    </a>
                  )}

                  <Link href="/event">
                    <Button variant="outline" className="w-full border-ui-navy text-ui-navy gap-2">
                      <ArrowLeft className="h-4 w-4" />
                      Event Lainnya
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Features/Highlights */}
              <div className="bg-ui-navy/5 rounded-lg p-8 border-2 border-ui-navy/10">
                <h3 className="font-bold text-ui-navy mb-6 text-xl">
                  Informasi Penting
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-ui-yellow shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-ui-navy">Gratis</div>
                      <div className="text-sm text-muted-foreground">
                        Tidak ada biaya pendaftaran
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-ui-yellow shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-ui-navy">Terbuka untuk Umum</div>
                      <div className="text-sm text-muted-foreground">
                        Semua mahasiswa dan umum dapat mengikuti
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-ui-yellow shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-ui-navy">Sertifikat</div>
                      <div className="text-sm text-muted-foreground">
                        Sertifikat kehadiran tersedia
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-ui-yellow shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-ui-navy">Snack & Makan</div>
                      <div className="text-sm text-muted-foreground">
                        Disediakan untuk peserta
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
