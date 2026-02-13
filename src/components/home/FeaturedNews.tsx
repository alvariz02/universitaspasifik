'use client'

import { ArrowRight, Calendar, User, Globe } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { motion } from 'framer-motion'
import ShareButton from '@/components/ShareButton'

interface News {
  id: number
  title: string
  slug: string
  excerpt?: string
  imageUrl?: string
  category?: string
  authorName?: string
  publishedDate?: Date
  isFeatured: boolean
}

interface FeaturedNewsProps {
  news: News[]
}

export default function FeaturedNews({ news }: FeaturedNewsProps) {
  const featuredNews = news.find((n) => n.isFeatured)
  const otherNews = news.filter((n) => !n.isFeatured).slice(0, 3)

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-unipas-secondary/10">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-unipas-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-60 h-60 bg-unipas-accent/5 rounded-full blur-2xl"></div>
        <div className="absolute top-20 left-1/4 w-32 h-32 bg-blue-500/5 rounded-full blur-xl"></div>
        
        {/* Floating Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -10, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute w-1 h-1 bg-unipas-primary/30 rounded-full"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 20}%`,
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
          className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-20"
        >
          <div className="mb-6 lg:mb-0">
            <div className="inline-flex items-center gap-4 mb-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 bg-gradient-to-br from-unipas-primary to-unipas-accent rounded-2xl flex items-center justify-center shadow-2xl"
              >
                <Globe className="h-8 w-8 text-white" />
              </motion.div>
              <div className="text-left">
                <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-unipas-primary to-unipas-accent bg-clip-text text-transparent leading-tight">
                  Berita Terbaru
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mt-2">
                  Ikuti perkembangan terkini dari Universitas Pasifik Morotai
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
            <Link href="/berita" className="hidden lg:flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-unipas-primary to-unipas-accent text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 font-bold">
              Lihat Semua
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Modern Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Featured News - Span 2 columns and 2 rows on large screens */}
          {featuredNews && (
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0, duration: 0.8, ease: "easeOut" }}
              whileHover={{ 
                y: -12, 
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              className="lg:col-span-2 lg:row-span-2 group relative"
            >
              <div className="h-full bg-white/90 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 border border-white/50 hover:border-unipas-primary/30 cursor-pointer">
                {/* Animated Background */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-unipas-primary/5 to-unipas-accent/5"></div>
                </div>

                {featuredNews.imageUrl && (
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={featuredNews.imageUrl}
                      alt={featuredNews.title}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Glass Morphism Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {featuredNews.category && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="absolute top-4 left-4"
                      >
                        <Badge className="bg-gradient-to-r from-unipas-primary to-unipas-accent text-white font-bold shadow-lg px-4 py-2 rounded-full border border-white/20 backdrop-blur-sm">
                          {featuredNews.category}
                        </Badge>
                      </motion.div>
                    )}
                  </div>
                )}
                
                <div className="p-8 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6 flex-wrap">
                      {featuredNews.publishedDate && (
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 }}
                          className="flex items-center gap-2 px-3 py-1 bg-unipas-primary/10 rounded-full"
                        >
                          <Calendar className="h-4 w-4 text-unipas-primary" />
                          <time dateTime={new Date(featuredNews.publishedDate).toISOString()}>
                            {format(new Date(featuredNews.publishedDate), 'dd MMM yyyy', { locale: id })}
                          </time>
                        </motion.div>
                      )}
                      {featuredNews.authorName && (
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 }}
                          className="flex items-center gap-2 px-3 py-1 bg-unipas-accent/10 rounded-full"
                        >
                          <User className="h-4 w-4 text-unipas-accent" />
                          <span>{featuredNews.authorName}</span>
                        </motion.div>
                      )}
                    </div>
                    
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="text-2xl md:text-3xl font-black text-gray-800 mb-4 line-clamp-3 group-hover:text-unipas-primary transition-colors duration-300"
                    >
                      {featuredNews.title}
                    </motion.h3>
                    
                    {featuredNews.excerpt && (
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="text-muted-foreground line-clamp-3 mb-6 text-lg leading-relaxed"
                      >
                        {featuredNews.excerpt}
                      </motion.p>
                    )}
                  </div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3 text-unipas-primary font-bold group-hover:gap-4 transition-all duration-300">
                      <span>Baca Selengkapnya</span>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                    <ShareButton 
                      title={featuredNews.title}
                      url={`/berita/${featuredNews.slug}`}
                      description={featuredNews.excerpt || undefined}
                    />
                  </motion.div>
                </div>

                {/* Hover Effects */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-unipas-primary/50 to-unipas-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
            </motion.div>
          )}

          {/* Other News Cards */}
          {otherNews.map((newsItem, index) => (
            <motion.div
              key={newsItem.id}
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                delay: (index + 1) * 0.2, 
                duration: 0.8, 
                ease: "easeOut" 
              }}
              whileHover={{ 
                y: -12, 
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
              className="group relative cursor-pointer"
              onClick={() => window.location.href = `/berita/${newsItem.slug}`}
            >
              <div className="h-full bg-white/90 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/50 hover:border-unipas-primary/30">
                {/* Animated Background */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-unipas-primary/5 to-unipas-accent/5"></div>
                </div>

                {newsItem.imageUrl && (
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={newsItem.imageUrl}
                      alt={newsItem.title}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {newsItem.category && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        className="absolute top-3 left-3"
                      >
                        <Badge className="bg-gradient-to-r from-unipas-accent to-unipas-primary text-white font-medium text-xs px-3 py-1 rounded-full shadow-lg">
                          {newsItem.category}
                        </Badge>
                      </motion.div>
                    )}
                  </div>
                )}
                
                <div className="p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                      {newsItem.publishedDate && (
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                          className="flex items-center gap-1"
                        >
                          <Calendar className="h-3 w-3 text-unipas-primary" />
                          <time dateTime={new Date(newsItem.publishedDate).toISOString()}>
                            {format(new Date(newsItem.publishedDate), 'dd MMM', { locale: id })}
                          </time>
                        </motion.div>
                      )}
                    </div>
                    
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="text-base font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-unipas-primary transition-colors duration-300"
                    >
                      {newsItem.title}
                    </motion.h3>
                  </div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2 text-unipas-primary font-bold text-sm group-hover:gap-3 transition-all duration-300">
                      <span>Baca</span>
                      <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                    <ShareButton 
                      title={newsItem.title}
                      url={`/berita/${newsItem.slug}`}
                      description={newsItem.excerpt || undefined}
                    />
                  </motion.div>
                </div>

                {/* Hover Effects */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-unipas-primary/50 to-unipas-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile View Link */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="text-center lg:hidden"
        >
          <Link href="/berita">
            <Button className="bg-gradient-to-r from-unipas-primary to-unipas-accent text-white hover:from-unipas-accent hover:to-unipas-primary font-bold px-8 py-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
              Lihat Semua Berita
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
