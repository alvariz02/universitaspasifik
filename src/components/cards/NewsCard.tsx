'use client'

import { useRouter } from 'next/navigation'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { Calendar, User, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import ShareButton from '@/components/ShareButton'

interface NewsCardProps {
  slug: string
  title: string
  excerpt?: string
  imageUrl?: string
  category?: string
  authorName?: string
  publishedDate?: Date
  isFeatured?: boolean
}

export default function NewsCard({
  slug,
  title,
  excerpt,
  imageUrl,
  category,
  authorName,
  publishedDate,
  isFeatured = false,
}: NewsCardProps) {
  const router = useRouter()

  return (
    <Card
      className="group overflow-hidden h-full hover:shadow-xl transition-all duration-300 cursor-pointer border border-unipas-primary/20 hover:border-unipas-primary/40"
      onClick={() => router.push(`/berita/${slug}`)}
    >
      {imageUrl && (
        <div className="relative aspect-video overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
          />
          {category && (
            <Badge className="absolute top-4 left-4 bg-unipas-primary text-white font-semibold shadow-md">
              {category}
            </Badge>
          )}
        </div>
      )}
      <CardContent className="p-6 flex flex-col justify-between h-full">
        <div>
          <div className="flex items-center gap-4 text-sm text-unipas-text/60 mb-3 flex-wrap">
            {publishedDate && (
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <time dateTime={publishedDate.toISOString()}>
                  {format(publishedDate, 'dd MMM yyyy', { locale: id })}
                </time>
              </div>
            )}
            {authorName && (
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{authorName}</span>
              </div>
            )}
          </div>
          <h3 className="text-lg font-bold text-unipas-primary mb-3 line-clamp-2 group-hover:text-unipas-accent transition-colors">
            {title}
          </h3>
          {excerpt && (
            <p className="text-unipas-text/70 line-clamp-3 mb-4 text-sm">{excerpt}</p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-unipas-accent font-semibold group-hover:gap-3 transition-all">
            Baca Selengkapnya
            <ArrowRight className="h-4 w-4" />
          </div>
          <ShareButton 
            title={title}
            url={`/berita/${slug}`}
            description={excerpt || undefined}
          />
        </div>
      </CardContent>
    </Card>
  )
}
