'use client'

import { Bell, AlertCircle, Info, CheckCircle, ArrowRight, Zap, Share2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'

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

function ShareButton({ announcement }: { announcement: Announcement }) {
  const [copied, setCopied] = useState(false)
  const shareUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/pengumuman/${announcement.id}` 
    : `/pengumuman/${announcement.id}`

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const shareLinks = [
    {
      name: 'Facebook',
      icon: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      color: 'text-blue-600'
    },
    {
      name: 'Twitter',
      icon: 'Twitter', 
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(announcement.title)}&url=${encodeURIComponent(shareUrl)}`,
      color: 'text-sky-500'
    },
    {
      name: 'WhatsApp',
      icon: 'WhatsApp',
      url: `https://wa.me/?text=${encodeURIComponent(`${announcement.title} ${shareUrl}`)}`,
      color: 'text-green-600'
    },
    {
      name: 'Copy Link',
      icon: copied ? 'Check' : 'Link',
      action: handleCopyLink,
      color: copied ? 'text-green-600' : 'text-gray-600'
    }
  ]

  const handleShare = (link: typeof shareLinks[0]) => {
    if (link.action) {
      link.action()
    } else {
      window.open(link.url, '_blank', 'width=600,height=400')
    }
  }

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Facebook': return <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
      case 'Twitter': return <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
      case 'WhatsApp': return <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.955L0 24l6.335-1.652a11.88 11.88 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      case 'Check': return <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
      case 'Link': return <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>
      default: return null
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white"
        >
          <Share2 className="h-4 w-4" />
          Bagikan
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {shareLinks.map((link) => (
          <DropdownMenuItem
            key={link.name}
            onClick={() => handleShare(link)}
            className="cursor-pointer"
          >
            <span className={`mr-2 ${link.color}`}>{getIcon(link.icon)}</span>
            {copied && link.name === 'Copy Link' ? 'Tersalin!' : link.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
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
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.2 + 0.4 }}
                          className="text-white/80 line-clamp-3 leading-relaxed prose prose-invert prose-sm max-w-none mb-4"
                          dangerouslySetInnerHTML={{ __html: announcement.content }}
                        />
                        <ShareButton announcement={announcement} />
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
