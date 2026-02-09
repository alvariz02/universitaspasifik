'use client'

import { Bell, AlertCircle, Info, CheckCircle, ArrowRight, Zap } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface Announcement {
  id: number
  title: string
  content: string
  category?: string
  priority?: string
  startDate?: Date
  endDate?: Date
  isActive?: boolean
}

interface AnnouncementsProps {
  announcements: Announcement[]
}

export default function Announcements({ announcements }: AnnouncementsProps) {
  const getPriorityIcon = (priority?: string) => {
    switch (priority) {
      case 'high':
        return <AlertCircle className="h-5 w-5" />
      case 'medium':
        return <Info className="h-5 w-5" />
      case 'low':
        return <CheckCircle className="h-5 w-5" />
      default:
        return <Bell className="h-5 w-5" />
    }
  }

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high':
        return 'bg-gradient-to-r from-red-500 to-red-600 text-white border-red-300 shadow-lg'
      case 'medium':
        return 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-yellow-300 shadow-lg'
      case 'low':
        return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white border-green-300 shadow-lg'
      default:
        return 'bg-gradient-to-r from-gray-500 to-gray-600 text-white border-gray-300 shadow-lg'
    }
  }

  const activeAnnouncements = announcements.filter(a => a.isActive !== false)

  if (activeAnnouncements.length === 0) {
    return null
  }

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-unipas-primary via-unipas-accent to-unipas-primary">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-60 h-60 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute top-20 left-1/4 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
        
        {/* Floating Particles */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute w-2 h-2 bg-white/30 rounded-full"
            style={{
              left: `${5 + i * 10}%`,
              top: `${10 + (i % 5) * 15}%`,
              animationDelay: `${i * 0.2}s`
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
          className="flex items-center gap-6 mb-20"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 bg-gradient-to-br from-white/20 to-white/10 rounded-2xl flex items-center justify-center shadow-2xl backdrop-blur-md border border-white/30"
          >
            <Bell className="h-10 w-10 text-white" />
          </motion.div>
          <div className="text-left">
            <h2 className="text-5xl md:text-6xl font-black text-white leading-tight">
              Pengumuman Penting
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mt-2">
              Informasi terbaru yang perlu Anda ketahui
            </p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Announcements List */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <ScrollArea className="h-[500px] rounded-3xl border border-white/20 bg-white/10 backdrop-blur-md p-6">
              <div className="space-y-6">
                {activeAnnouncements.map((announcement, index) => (
                  <motion.div
                    key={announcement.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2, duration: 0.6 }}
                    whileHover={{ 
                      scale: 1.02,
                      transition: { duration: 0.3 }
                    }}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 border border-white/20 hover:border-white/30 cursor-pointer group"
                  >
                    <div className="flex items-start gap-4">
                      <motion.div
                        initial={{ rotate: 0, scale: 0.8 }}
                        whileInView={{ rotate: 360, scale: 1 }}
                        transition={{ delay: index * 0.2 + 0.3, duration: 1 }}
                        className="text-white shrink-0 mt-1"
                      >
                        {getPriorityIcon(announcement.priority)}
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-3 flex-wrap">
                          {announcement.priority && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.2 + 0.1 }}
                            >
                              <Badge className={`${getPriorityColor(announcement.priority)} px-3 py-1 rounded-full`}>
                                {announcement.priority}
                              </Badge>
                            </motion.div>
                          )}
                          {announcement.category && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.2 + 0.2 }}
                            >
                              <Badge variant="outline" className="text-white border-white/30 text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                                {announcement.category}
                              </Badge>
                            </motion.div>
                          )}
                        </div>
                        <motion.h3
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.2 + 0.3 }}
                          className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-yellow-300 transition-colors duration-300"
                        >
                          {announcement.title}
                        </motion.h3>
                        <motion.p
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.2 + 0.4 }}
                          className="text-white/80 line-clamp-3 leading-relaxed"
                        >
                          {announcement.content}
                        </motion.p>
                      </div>
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-300/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </motion.div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="bg-gradient-to-br from-yellow-400/20 to-orange-500/20 backdrop-blur-md rounded-3xl p-8 border border-yellow-300/30 shadow-2xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg"
                  >
                    <Zap className="h-6 w-6 text-white" />
                  </motion.div>
                  <h3 className="text-3xl font-black text-white">
                    Informasi Penerimaan
                  </h3>
                </div>
                
                <p className="text-white/90 text-lg mb-8 leading-relaxed">
                  Daftarkan diri Anda untuk menjadi bagian dari keluarga besar
                  Universitas Pasifik melalui berbagai jalur seleksi yang tersedia.
                </p>
              </motion.div>

              <div className="space-y-4">
                {[
                  { name: 'SNBP', desc: 'Seleksi Nasional Berbasis Prestasi', delay: 0.5 },
                  { name: 'SNBT', desc: 'Seleksi Nasional Berbasis Tes', delay: 0.6 },
                  { name: 'SIMAK UP', desc: 'Seleksi Mandiri Universitas Pasifik', delay: 0.7 }
                ].map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: item.delay }}
                  >
                    <Link href="/penerimaan">
                      <motion.div
                        whileHover={{ 
                          scale: 1.05,
                          transition: { duration: 0.3 }
                        }}
                        className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 cursor-pointer border border-white/20 hover:border-white/40 group"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-xl font-bold text-white mb-2 group-hover:text-yellow-300 transition-colors duration-300">
                              {item.name}
                            </div>
                            <div className="text-white/80">
                              {item.desc}
                            </div>
                          </div>
                          <ArrowRight className="h-5 w-5 text-white/60 group-hover:text-white group-hover:translate-x-2 transition-all duration-300" />
                        </div>
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  )
}
