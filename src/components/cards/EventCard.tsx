import Link from 'next/link'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { MapPin, Clock, Calendar as CalendarIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface EventCardProps {
  slug: string
  title: string
  description?: string
  eventDate: Date
  endDate?: Date
  location?: string
  imageUrl?: string
  isFeatured?: boolean
}

export default function EventCard({
  slug,
  title,
  description,
  eventDate,
  endDate,
  location,
  imageUrl,
  isFeatured = false,
}: EventCardProps) {
  const formatDate = (date: Date) => format(date, 'dd MMM yyyy', { locale: id })
  const formatTime = (date: Date) => format(date, 'HH:mm')

  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-ui-yellow h-full flex flex-col">
      {imageUrl && (
        <div className="relative aspect-video overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 left-4 bg-ui-navy text-white p-3 rounded-lg text-center min-w-[70px]">
            <div className="text-2xl font-bold">{format(eventDate, 'dd')}</div>
            <div className="text-xs uppercase">{format(eventDate, 'MMM', { locale: id })}</div>
          </div>
          {isFeatured && (
            <div className="absolute top-4 right-4 bg-ui-yellow text-ui-navy px-3 py-1 rounded-full text-sm font-medium">
              Featured
            </div>
          )}
        </div>
      )}
      <CardContent className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-ui-navy mb-2 line-clamp-2 group-hover:text-ui-navy/80 transition-colors">
          {title}
        </h3>
        {description && (
          <p className="text-muted-foreground line-clamp-2 mb-4 flex-1">{description}</p>
        )}
        <div className="space-y-2 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 text-ui-yellow" />
            <span>
              {formatDate(eventDate)}
              {endDate && ` - ${formatDate(endDate)}`}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-ui-yellow" />
            <span>
              {formatTime(eventDate)}
              {endDate && ` - ${formatTime(endDate)}`}
            </span>
          </div>
          {location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-ui-yellow" />
              <span className="line-clamp-1">{location}</span>
            </div>
          )}
        </div>
        <Button className="w-full bg-ui-navy hover:bg-ui-navy/80 text-white">
          Info Event
        </Button>
      </CardContent>
    </Card>
  )
}
