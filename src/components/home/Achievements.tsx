'use client'

import { Trophy, Award, Medal, Star, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { motion } from 'framer-motion'

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
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-400/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-60 h-60 bg-blue-500/5 rounded-full blur-2xl"></div>
        <div className="absolute top-20 left-1/4 w-32 h-32 bg-purple-500/5 rounded-full blur-xl"></div>
        
        {/* Floating Particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -15, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute w-2 h-2 bg-yellow-400/30 rounded-full"
            style={{
              left: `${10 + i * 11}%`,
              top: `${15 + (i % 4) * 18}%`,
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
                className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-2xl"
              >
                <Trophy className="h-8 w-8 text-white" />
              </motion.div>
              <div className="text-left">
                <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent leading-tight">
                  Prestasi Unipas
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mt-2">
                  Pencapaian membanggakan dari mahasiswa, dosen, dan alumni
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
            <Link href="/prestasi" className="hidden md:flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 font-bold">
              Lihat Semua
              <Trophy className="h-5 w-5" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Achievements Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {featuredAchievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 60, scale: 0.9, rotateY: 180 }}
              whileInView={{ opacity: 1, y: 0, scale: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ 
                delay: index * 0.2, 
                duration: 0.8, 
                ease: "easeOut",
                type: "spring"
              }}
              whileHover={{ 
                y: -15, 
                scale: 1.05,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              className="group relative"
              style={{ perspective: 1000 }}
            >
              <div className="h-full bg-white/90 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 border border-white/50 hover:border-yellow-400/30">
                {/* 3D Card Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Achievement Image */}
                {achievement.imageUrl && (
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={achievement.imageUrl}
                      alt={achievement.title}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Glass Morphism Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Level Badge */}
                    {achievement.level && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        className="absolute top-4 right-4"
                      >
                        <Badge className={`${getLevelColor(achievement.level)} px-3 py-1 rounded-full shadow-lg font-bold`}>
                          {achievement.level}
                        </Badge>
                      </motion.div>
                    )}
                  </div>
                )}
                
                <div className="p-6">
                  {/* Achievement Icon */}
                  <motion.div
                    initial={{ rotate: 0, scale: 0.8 }}
                    whileInView={{ rotate: 360, scale: 1 }}
                    transition={{ delay: index * 0.2 + 0.3, duration: 1 }}
                    className="w-12 h-12 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-2xl flex items-center justify-center mb-4"
                  >
                    <div className={`text-yellow-500`}>
                      {getAchievementIcon(achievement.level)}
                    </div>
                  </motion.div>

                  {/* Title */}
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="text-lg font-black text-gray-800 mb-3 line-clamp-2 group-hover:text-yellow-500 transition-colors duration-300"
                  >
                    {achievement.title}
                  </motion.h3>

                  {/* Description */}
                  {achievement.description && (
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="text-muted-foreground text-sm line-clamp-3 mb-4 leading-relaxed"
                    >
                      {achievement.description}
                    </motion.p>
                  )}

                  {/* Achiever Info */}
                  {achievement.achieverName && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="flex items-center gap-2 text-muted-foreground text-sm mb-4"
                    >
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span>{achievement.achieverName}</span>
                      {achievement.achieverType && (
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                          {achievement.achieverType}
                        </span>
                      )}
                    </motion.div>
                  )}

                  {/* Date */}
                  {achievement.achievementDate && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="flex items-center gap-2 text-muted-foreground text-xs"
                    >
                      <span className="bg-gray-100 px-2 py-1 rounded-full">
                        {format(new Date(achievement.achievementDate), 'dd MMM yyyy', { locale: id })}
                      </span>
                    </motion.div>
                  )}
                </div>

                {/* 3D Hover Effects */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400/50 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-yellow-400/50 to-orange-500 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {featuredAchievements.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center py-20 bg-white/50 backdrop-blur-sm rounded-3xl border border-white/50"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Trophy className="h-10 w-10 text-yellow-500" />
            </motion.div>
            <p className="text-xl text-muted-foreground font-medium">Belum ada prestasi yang ditampilkan</p>
            <p className="text-muted-foreground mt-2">Nantikan update prestasi terbaru dari kami</p>
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
          <Link href="/prestasi">
            <Button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-orange-500 hover:to-yellow-400 font-bold px-8 py-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
              Lihat Semua Prestasi
            </Button>
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
