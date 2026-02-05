'use client'

import { ArrowRight, Calendar, User } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import NewsCard from '@/components/cards/NewsCard'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { motion } from 'framer-motion'

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
    <section className="py-16 bg-unipas-muted">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-unipas-primary mb-2">
              Berita Terbaru
            </h2>
            <p className="text-unipas-text/70">
              Ikuti perkembangan terkini dari Universitas Pasifik Morotai
            </p>
          </div>
          <Link href="/berita" className="hidden lg:flex items-center gap-2 text-unipas-accent hover:text-unipas-primary font-semibold transition-colors">
            Lihat Semua
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        {/* Improved Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Featured News - Span 2 columns and 2 rows on large screens */}
          {featuredNews && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
              className="lg:col-span-2 lg:row-span-2"
            >
              <div className="h-full rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-unipas-primary/20 group cursor-pointer bg-white" onClick={() => window.location.href = `/berita/${featuredNews.slug}`}>
                {featuredNews.imageUrl && (
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={featuredNews.imageUrl}
                      alt={featuredNews.title}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                    />
                    {featuredNews.category && (
                      <Badge className="absolute top-4 left-4 bg-unipas-primary text-white font-semibold shadow-lg">
                        {featuredNews.category}
                      </Badge>
                    )}
                  </div>
                )}
                <div className="p-6 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center gap-4 text-sm text-unipas-text/60 mb-4 flex-wrap">
                      {featuredNews.publishedDate && (
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <time dateTime={new Date(featuredNews.publishedDate).toISOString()}>
                            {format(new Date(featuredNews.publishedDate), 'dd MMM yyyy', { locale: id })}
                          </time>
                        </div>
                      )}
                      {featuredNews.authorName && (
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>{featuredNews.authorName}</span>
                        </div>
                      )}
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-unipas-primary mb-3 line-clamp-3 group-hover:text-unipas-accent transition-colors">
                      {featuredNews.title}
                    </h3>
                    {featuredNews.excerpt && (
                      <p className="text-unipas-text/70 line-clamp-3 mb-4 text-sm md:text-base">
                        {featuredNews.excerpt}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-unipas-accent font-semibold group-hover:gap-3 transition-all">
                    Baca Selengkapnya
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Other News Cards */}
          {otherNews.map((newsItem, index) => (
            <motion.div
              key={newsItem.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (index + 1) * 0.1 }}
              className="group cursor-pointer"
              onClick={() => window.location.href = `/berita/${newsItem.slug}`}
            >
              <div className="h-full rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-unipas-primary/10 hover:border-unipas-primary/30 bg-white">
                {newsItem.imageUrl && (
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={newsItem.imageUrl}
                      alt={newsItem.title}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                    />
                    {newsItem.category && (
                      <Badge className="absolute top-3 left-3 bg-unipas-accent text-white font-medium text-xs">
                        {newsItem.category}
                      </Badge>
                    )}
                  </div>
                )}
                <div className="p-4 flex flex-col justify-between h-32">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-unipas-text/50 mb-2">
                      {newsItem.publishedDate && (
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <time dateTime={new Date(newsItem.publishedDate).toISOString()}>
                            {format(new Date(newsItem.publishedDate), 'dd MMM', { locale: id })}
                          </time>
                        </div>
                      )}
                    </div>
                    <h3 className="text-sm font-bold text-unipas-primary mb-2 line-clamp-2 group-hover:text-unipas-accent transition-colors">
                      {newsItem.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1 text-unipas-accent font-semibold text-xs group-hover:gap-2 transition-all">
                    Baca
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile View Link */}
        <div className="text-center lg:hidden">
          <Link href="/berita">
            <Button className="bg-unipas-primary text-white hover:bg-unipas-accent transition-colors font-semibold">
              Lihat Semua Berita
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
