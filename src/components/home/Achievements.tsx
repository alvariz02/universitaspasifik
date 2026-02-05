'use client'

import { Trophy } from 'lucide-react'
import Link from 'next/link'
import AchievementCard from '@/components/cards/AchievementCard'
import { Button } from '@/components/ui/button'

interface Achievement {
  id: number
  title: string
  slug?: string
  description?: string
  achieverName?: string
  achieverType?: string
  achievementDate?: Date
  category?: string
  level?: string
  imageUrl?: string
}

interface AchievementsProps {
  achievements: Achievement[]
}

export default function Achievements({ achievements }: AchievementsProps) {
  const featuredAchievements = achievements.slice(0, 4)

  return (
    <section className="py-16 bg-unipas-secondary">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-unipas-primary mb-2">
              Prestasi Unipas
            </h2>
            <p className="text-muted-foreground">
              Pencapaian membanggakan dari mahasiswa, dosen, dan alumni
            </p>
          </div>
          <Link href="/prestasi" className="hidden md:flex items-center gap-2 text-unipas-accent hover:text-unipas-primary font-medium">
            Lihat Semua
            <Trophy className="h-5 w-5" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredAchievements.map((achievement) => (
            <AchievementCard
              key={achievement.id}
              {...achievement}
              achievementDate={achievement.achievementDate ? new Date(achievement.achievementDate) : undefined}
            />
          ))}
        </div>

        {featuredAchievements.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg border">
            <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Belum ada prestasi yang ditampilkan</p>
          </div>
        )}

        <div className="text-center mt-8 md:hidden">
          <Link href="/prestasi">
            <Button className="bg-ui-navy text-white hover:bg-ui-navy/80">
              Lihat Semua Prestasi
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
