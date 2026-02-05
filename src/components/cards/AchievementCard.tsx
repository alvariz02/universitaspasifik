import { Award, Trophy, Medal } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'

interface AchievementCardProps {
  title: string
  description?: string
  achieverName?: string
  achieverType?: string
  achievementDate?: Date
  category?: string
  level?: string
  imageUrl?: string
}

export default function AchievementCard({
  title,
  description,
  achieverName,
  achieverType,
  achievementDate,
  category,
  level,
  imageUrl,
}: AchievementCardProps) {
  const getLevelColor = (level?: string) => {
    switch (level?.toLowerCase()) {
      case 'internasional':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'nasional':
        return 'bg-blue-100 text-blue-800 border-blue-300'
      case 'regional':
        return 'bg-green-100 text-green-800 border-green-300'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const getCategoryIconName = (category?: string) => {
    switch (category?.toLowerCase()) {
      case 'akademik':
        return 'trophy'
      case 'olahraga':
        return 'medal'
      default:
        return 'award'
    }
  }

  const iconName = getCategoryIconName(category)

  return (
    <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-ui-yellow overflow-hidden">
      {imageUrl && (
        <div className="aspect-video overflow-hidden relative">
          <img
            src={imageUrl}
            alt={title}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-linear-to-t from-ui-navy/80 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            {level && (
              <Badge className={getLevelColor(level)}>
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </Badge>
            )}
          </div>
        </div>
      )}
      <CardContent className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="h-12 w-12 bg-ui-yellow/10 rounded-lg flex items-center justify-center shrink-0">
            {iconName === 'trophy' && <Trophy className="h-6 w-6 text-ui-yellow" />}
            {iconName === 'medal' && <Medal className="h-6 w-6 text-ui-yellow" />}
            {iconName === 'award' && <Award className="h-6 w-6 text-ui-yellow" />}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-ui-navy mb-1 line-clamp-2">{title}</h3>
            {achievementDate && (
              <p className="text-sm text-muted-foreground">
                {format(achievementDate, 'dd MMMM yyyy', { locale: id })}
              </p>
            )}
          </div>
        </div>

        {achieverName && (
          <div className="mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-ui-yellow uppercase">
                {achieverType}
              </span>
              <span className="text-sm font-semibold text-ui-navy line-clamp-1">
                {achieverName}
              </span>
            </div>
          </div>
        )}

        {description && (
          <p className="text-sm text-muted-foreground line-clamp-3">
            {description}
          </p>
        )}

        {category && (
          <div className="mt-3">
            <Badge variant="outline" className="text-xs">
              {category}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
