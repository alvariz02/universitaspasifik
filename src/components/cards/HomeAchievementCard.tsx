'use client'

import { Badge } from '@/components/ui/badge'
import { Trophy, Award, Medal, Star } from 'lucide-react'
import Link from 'next/link'
import { format } from 'date-fns'
import { id as localeId } from 'date-fns/locale'





export interface HomeAchievementCardProps {
  id: number
  title: string
  description?: string
  achieverName?: string
  achieverType?: string
  achievementDate?: Date
  category?: string
  level?: string
  imageUrl?: string
}

export default function HomeAchievementCard({
  id,
  title,
  description,
  achieverName,
  achieverType,
  achievementDate,
  category,
  level,
  imageUrl
}: HomeAchievementCardProps) {
  const getAchievementIcon = (levelValue?: string) => {
    switch (levelValue) {
      case 'international':
        return <Trophy className="h-6 w-6" />
      case 'national':
        return <Award className="h-6 w-6" />
      case 'regional':
        return <Medal className="h-6 w-6" />
      default:
        return <Star className="h-6 w-6" />
    }
  }

  const getLevelColor = (levelValue?: string) => {
    switch (levelValue) {
      case 'international':
        return 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white'
      case 'national':
        return 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
      case 'regional':
        return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
      default:
        return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
    }
  }

  return (
    <Link
      href={`/prestasi/${id}`}
      className="block group relative"
      style={{ perspective: 1000 }}
    >
      <div
        className="h-full bg-white/90 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 border border-white/50 hover:border-yellow-400/30"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {imageUrl && (
          <div className="relative aspect-video overflow-hidden">
            <img
              src={imageUrl}
              alt={title}
              className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {level && (
              <div className="absolute top-4 right-4">
                <Badge className={`${getLevelColor(level)} px-3 py-1 rounded-full shadow-lg font-bold`}>
                  {level}
                </Badge>
              </div>
            )}

            {!level && category && (
              <div className="absolute top-4 right-4">
                <Badge variant="secondary" className="bg-unipas-primary/10 text-unipas-primary font-bold px-3 py-1 rounded-full">
                  {category}
                </Badge>
              </div>
            )}
          </div>
        )}

        <div className="p-6">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-2xl flex items-center justify-center mb-4">
            <div className="text-yellow-500">{getAchievementIcon(level)}</div>
          </div>

          <h3 className="text-lg font-black text-gray-800 mb-3 line-clamp-2 group-hover:text-yellow-500 transition-colors duration-300">
            {title}
          </h3>

          {description && (
            <div
              className="text-muted-foreground text-sm line-clamp-3 mb-4 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}

          {achieverName && (
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
              <div className="w-2 h-2 bg-yellow-400 rounded-full" />
              <span className="line-clamp-1">{achieverName}</span>
              {achieverType && (
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                  {achieverType}
                </span>
              )}
            </div>
          )}

          {achievementDate && (
            <div className="flex items-center gap-2 text-muted-foreground text-xs">
              <span className="bg-gray-100 px-2 py-1 rounded-full">
                {format(new Date(achievementDate), 'dd MMM yyyy', { locale: localeId as any })}
              </span>
            </div>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400/50 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-yellow-400/50 to-orange-500 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500" />
      </div>
    </Link>
  )
}

