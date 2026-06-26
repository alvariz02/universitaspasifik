'use client'

import { Trophy, Award, Medal, Star, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'

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

  const getAchievementIcon = (level?: string) => {
    switch (level) {
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

  const getLevelColor = (level?: string) => {
    switch (level) {
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
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-unipas-secondary/20">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-400/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-60 h-60 bg-blue-500/5 rounded-full blur-2xl"></div>
        <div className="absolute top-20 left-1/4 w-32 h-32 bg-purple-500/5 rounded-full blur-xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-20">
          <div className="mb-6 lg:mb-0">
            <div className="inline-flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-2xl">
                <Trophy className="h-8 w-8 text-white" />
              </div>
              <div className="text-left">
                <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent leading-tight">
                  Prestasi
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mt-2">
                  Pencapaian membanggakan dari mahasiswa, dosen, dan alumni
                </p>
              </div>
            </div>
          </div>
          
          <Link href="/prestasi" className="hidden md:flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 font-bold">
            Lihat Semua
            <Trophy className="h-5 w-5" />
          </Link>
        </div>

        {/* Achievements Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {featuredAchievements.map((achievement, index) => (
            <Link
              key={achievement.id}
              href={`/prestasi/${achievement.id}`}
              className="block group relative"
              style={{ perspective: 1000 }}
            >
            <div
              className="h-full bg-white/90 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 border border-white/50 hover:border-yellow-400/30 card-item"
            >
                {/* 3D Card Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Achievement Image */}
                {achievement.imageUrl && (
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={achievement.imageUrl}
                      alt={achievement.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      quality={75}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Glass Morphism Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Level Badge */}
                    {achievement.level && (
                      <div className="absolute top-4 right-4">
                        <Badge className={`${getLevelColor(achievement.level)} px-3 py-1 rounded-full shadow-lg font-bold`}>
                          {achievement.level}
                        </Badge>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="p-6">
                  {/* Achievement Icon */}
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-2xl flex items-center justify-center mb-4">
                    <div className={`text-yellow-500`}>
                      {getAchievementIcon(achievement.level)}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-black text-gray-800 mb-3 line-clamp-2 group-hover:text-yellow-500 transition-colors duration-300">
                    {achievement.title}
                  </h3>

                  {/* Description */}
                  {achievement.description && (
                    <p className="text-muted-foreground text-sm line-clamp-3 mb-4 leading-relaxed">
                      {achievement.description}
                    </p>
                  )}

                  {/* Achiever Info */}
                  {achievement.achieverName && (
                    <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span>{achievement.achieverName}</span>
                      {achievement.achieverType && (
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                          {achievement.achieverType}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Date */}
                  {achievement.achievementDate && (
                    <div className="flex items-center gap-2 text-muted-foreground text-xs">
                      <span className="bg-gray-100 px-2 py-1 rounded-full">
                        {format(new Date(achievement.achievementDate), 'dd MMM yyyy', { locale: id })}
                      </span>
                    </div>
                  )}
                </div>

                {/* 3D Hover Effects */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400/50 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-yellow-400/50 to-orange-500 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500"></div>
            </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {featuredAchievements.length === 0 && (
          <div className="text-center py-20 bg-white/50 backdrop-blur-sm rounded-3xl border border-white/50">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trophy className="h-10 w-10 text-yellow-500" />
            </div>
            <p className="text-xl text-muted-foreground font-medium">Belum ada prestasi yang ditampilkan</p>
            <p className="text-muted-foreground mt-2">Nantikan update prestasi terbaru dari kami</p>
          </div>
        )}

        {/* Mobile View Link */}
        <div className="text-center md:hidden">
          <Link href="/prestasi">
            <Button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-orange-500 hover:to-yellow-400 font-bold px-8 py-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
              Lihat Semua Prestasi
            </Button>
          </Link>
        </div>

      </div>
    </section>
  )
}
