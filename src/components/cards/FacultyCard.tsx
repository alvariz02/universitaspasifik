import Link from 'next/link'
import { Building2, Users, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface FacultyCardProps {
  slug: string
  name: string
  description?: string
  deanName?: string
  location?: string
  establishedYear?: number
  imageUrl?: string
}

export default function FacultyCard({
  slug,
  name,
  description,
  deanName,
  location,
  establishedYear,
  imageUrl,
}: FacultyCardProps) {
  return (
    <Link href={`/fakultas/${slug}`}>
      <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-ui-yellow h-full flex flex-col">
        {imageUrl && (
          <div className="aspect-video overflow-hidden">
            <img
              src={imageUrl}
              alt={name}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <CardContent className="p-6 flex flex-col flex-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 bg-ui-yellow/10 rounded-lg flex items-center justify-center">
              <Building2 className="h-6 w-6 text-ui-yellow" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-ui-navy line-clamp-2">{name}</h3>
              {location && (
                <p className="text-sm text-muted-foreground">{location}</p>
              )}
            </div>
          </div>

          {deanName && (
            <div className="space-y-2 text-sm mb-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-4 w-4 text-ui-yellow" />
                <span className="line-clamp-1">{deanName}</span>
              </div>
            </div>
          )}

          {description && (
            <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1">
              {description}
            </p>
          )}

          {establishedYear && (
            <div className="mb-4">
              <span className="text-xs font-medium text-muted-foreground bg-gray-100 px-2 py-1 rounded">
                Berdiri sejak {establishedYear}
              </span>
            </div>
          )}

          <Button className="w-full bg-ui-yellow hover:bg-yellow-400 text-ui-navy group-hover:gap-3 transition-all">
            <span>Lihat Detail</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </Link>
  )
}
