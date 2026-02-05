'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import {
  Heart,
  Users,
  Target,
  Award,
  Lightbulb,
  Building2,
  Globe,
  TrendingUp,
  ChevronRight,
  MapPin,
  Calendar,
  BookOpen,
  Loader
} from 'lucide-react'

interface NewsItem {
  id: string
  title: string
  slug: string
  excerpt: string
  imageUrl?: string
  category: string
  authorName?: string
  publishedDate: string
  viewCount: number
}

export default function PengabdianPage() {
  const [expandedProgram, setExpandedProgram] = useState<number | null>(null)
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('/api/news?limit=100')
        const data = await response.json()
        
        // Filter berita dengan kategori pengabdian (KKN, UMKM, dll)
        const pengabdianNews = data.news.filter((item: NewsItem) => 
          item.category && (
            item.category.toLowerCase().includes('pengabdian') ||
            item.category.toLowerCase().includes('kkn') ||
            item.category.toLowerCase().includes('umkm') ||
            item.category.toLowerCase().includes('community')
          )
        )
        
        setNews(pengabdianNews)
      } catch (error) {
        console.error('Error fetching news:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  const programs = [
    {
      title: 'Pengabdian Kesehatan Masyarakat',
      icon: Heart,
      description: 'Program kesehatan preventif dan promotif untuk masyarakat sekitar kampus',
      color: 'from-red-600 to-red-800'
    },
    {
      title: 'Pemberdayaan Ekonomi Lokal',
      icon: TrendingUp,
      description: 'Program pelatihan dan pengembangan usaha kecil menengah di komunitas lokal',
      color: 'from-green-600 to-green-800'
    },
    {
      title: 'Pendidikan Komunitas',
      icon: BookOpen,
      description: 'Program literasi dan pendidikan tambahan untuk masyarakat setempat',
      color: 'from-blue-600 to-blue-800'
    },
    {
      title: 'Pelestarian Lingkungan',
      icon: Globe,
      description: 'Program konservasi lingkungan dan pembangunan berkelanjutan',
      color: 'from-emerald-600 to-emerald-800'
    },
    {
      title: 'Pembangunan Infrastruktur Sosial',
      icon: Building2,
      description: 'Program pembangunan sarana publik dan infrastruktur komunitas',
      color: 'from-orange-600 to-orange-800'
    },
    {
      title: 'Pemberdayaan Perempuan & Anak',
      icon: Users,
      description: 'Program pemberdayaan gender dan perlindungan hak-hak anak',
      color: 'from-pink-600 to-pink-800'
    }
  ]

  const impacts = [
    {
      number: '2,500+',
      label: 'Penerima Manfaat Langsung',
      icon: Users
    },
    {
      number: '150+',
      label: 'Program Aktif Tahunan',
      icon: Target
    },
    {
      number: '450+',
      label: 'Mahasiswa Terlibat',
      icon: BookOpen
    },
    {
      number: '35+',
      label: 'Mitra Strategis',
      icon: Lightbulb
    }
  ]

  const partnerships = [
    {
      name: 'Dinas Kesehatan Morotai',
      type: 'Pemerintah',
      focus: 'Program kesehatan masyarakat'
    },
    {
      name: 'Koperasi Petani Lokal',
      type: 'Komunitas Bisnis',
      focus: 'Pemberdayaan ekonomi lokal'
    },
    {
      name: 'Kantor Lingkungan Hidup',
      type: 'Pemerintah',
      focus: 'Program lingkungan berkelanjutan'
    },
    {
      name: 'Lembaga Pendidikan Lokal',
      type: 'Pendidikan',
      focus: 'Program literasi dan pendidikan'
    },
    {
      name: 'Yayasan Sosial Masyarakat',
      type: 'NGO',
      focus: 'Pemberdayaan masyarakat umum'
    },
    {
      name: 'Badan Perencanaan Pembangunan Daerah',
      type: 'Pemerintah',
      focus: 'Pengembangan komunitas berkelanjutan'
    }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-linear-to-r from-unipas-primary to-unipas-accent text-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Pengabdian Masyarakat</h1>
              <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                Komitmen Universitas Pasifik Morotai untuk memberikan dampak positif kepada masyarakat melalui berbagai program pengabdian dan tanggung jawab sosial
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-12 md:py-16 bg-unipas-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-xl shadow-lg border border-unipas-primary/10 p-8 md:p-12"
              >
                <div className="flex items-start gap-4 mb-6">
                  <Heart className="h-8 w-8 text-unipas-accent shrink-0 mt-1" />
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-unipas-primary mb-4">Visi Pengabdian Kami</h2>
                    <p className="text-lg text-unipas-text leading-relaxed">
                      Menjadi institusi pendidikan yang berperan aktif dalam pemberdayaan masyarakat, melalui kegiatan pengabdian yang berkelanjutan, inovatif, dan berdampak nyata untuk peningkatan kualitas hidup masyarakat lokal serta pembangunan daerah yang inklusif dan berkelanjutan.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Impact Statistics */}
        <section className="py-12 md:py-16 bg-unipas-muted/20">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-unipas-primary text-center mb-12"
            >
              Dampak Pengabdian Kami
            </motion.h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  number: '2,500+',
                  label: 'Penerima Manfaat Langsung',
                  icon: Users
                },
                {
                  number: '150+',
                  label: 'Program Aktif Tahunan',
                  icon: Target
                },
                {
                  number: '450+',
                  label: 'Mahasiswa Terlibat',
                  icon: BookOpen
                },
                {
                  number: '35+',
                  label: 'Mitra Strategis',
                  icon: Lightbulb
                }
              ].map((impact, index) => {
                const Icon = impact.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-lg p-6 text-center border border-unipas-primary/20"
                  >
                    <Icon className="h-10 w-10 text-unipas-accent mx-auto mb-4" />
                    <div className="text-3xl font-bold text-unipas-primary mb-2">{impact.number}</div>
                    <div className="text-sm text-unipas-text">{impact.label}</div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Programs Section */}
        <section className="py-12 md:py-16 bg-unipas-muted/20">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-unipas-primary text-center mb-12"
            >
              Program Pengabdian
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {programs.map((program, index) => {
                const Icon = program.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-lg border border-unipas-primary/10 overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <div className={`bg-linear-to-r ${program.color} text-white p-6`}>
                      <div className="flex items-start gap-4">
                        <Icon className="h-8 w-8 shrink-0" />
                        <div className="flex-1">
                          <h3 className="font-bold text-lg">{program.title}</h3>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-unipas-text text-sm leading-relaxed">{program.description}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* News & Activities Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-unipas-primary text-center mb-4"
            >
              Kegiatan & Berita Pengabdian
            </motion.h2>
            <p className="text-center text-unipas-text mb-12 max-w-2xl mx-auto">
              Perkembangan terbaru dari program pengabdian masyarakat kami, termasuk kegiatan KKN, pengembangan UMKM, dan inisiatif komunitas lainnya
            </p>

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <Loader className="h-8 w-8 text-unipas-accent animate-spin" />
              </div>
            ) : news.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {news.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-unipas-primary/10"
                  >
                    {item.imageUrl && (
                      <div className="relative h-48 overflow-hidden bg-unipas-muted">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="inline-block bg-unipas-accent text-white text-xs font-medium px-3 py-1 rounded-full">
                            {item.category}
                          </span>
                        </div>
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="font-bold text-lg text-unipas-primary mb-3 line-clamp-2 hover:text-unipas-accent transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-unipas-text line-clamp-3 mb-4">
                        {item.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-4 pt-4 border-t border-unipas-primary/10">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(item.publishedDate).toLocaleDateString('id-ID')}
                        </div>
                        {item.authorName && (
                          <span>{item.authorName}</span>
                        )}
                      </div>
                      <Link
                        href={`/berita/${item.slug}`}
                        className="inline-flex items-center gap-2 text-unipas-accent font-medium text-sm hover:text-unipas-primary transition-colors"
                      >
                        Baca Selengkapnya
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="bg-unipas-muted/30 rounded-xl p-12 text-center max-w-2xl mx-auto"
              >
                <BookOpen className="h-12 w-12 text-unipas-accent/50 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-unipas-primary mb-2">Belum ada berita pengabdian</h3>
                <p className="text-unipas-text">
                  Konten berita tentang program pengabdian akan segera ditampilkan di sini. Silakan kunjungi kembali nanti untuk melihat update terbaru.
                </p>
              </motion.div>
            )}

            {news.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="text-center mt-12"
              >
                <Link
                  href="/berita"
                  className="inline-flex items-center gap-2 bg-linear-to-r from-unipas-primary to-unipas-accent text-white px-8 py-3 rounded-lg font-medium hover:shadow-lg transition-shadow"
                >
                  Lihat Semua Berita
                  <ChevronRight className="h-5 w-5" />
                </Link>
              </motion.div>
            )}
          </div>
        </section>



        {/* How to Participate */}
        <section className="py-12 md:py-16 bg-unipas-muted/20">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-unipas-primary text-center mb-12"
            >
              Cara Terlibat
            </motion.h2>
            <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
              {[
                {
                  step: '1',
                  title: 'Pendaftaran',
                  description: 'Daftar sebagai mahasiswa atau relawan untuk program pengabdian yang tersedia'
                },
                {
                  step: '2',
                  title: 'Pelatihan',
                  description: 'Ikuti sesi pelatihan untuk mempersiapkan diri memberikan dampak maksimal'
                },
                {
                  step: '3',
                  title: 'Berkontribusi',
                  description: 'Terlibat langsung dalam kegiatan pengabdian di komunitas lokal'
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-unipas-accent text-center"
                >
                  <div className="w-12 h-12 bg-linear-to-r from-unipas-primary to-unipas-accent rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-unipas-primary mb-3">{item.title}</h3>
                  <p className="text-unipas-text text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center mt-12"
            >
              <p className="text-unipas-text mb-6">Tertarik untuk terlibat dalam program pengabdian kami?</p>
              <button className="bg-linear-to-r from-unipas-primary to-unipas-accent text-white px-8 py-3 rounded-lg font-medium hover:shadow-lg transition-shadow inline-flex items-center gap-2">
                Hubungi Kami
                <ChevronRight className="h-5 w-5" />
              </button>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-12 md:py-16 bg-linear-to-r from-unipas-primary to-unipas-accent text-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Hubungi Kami</h2>
              <p className="text-lg text-white/90 mb-8">
                Untuk informasi lebih lanjut mengenai program pengabdian atau menjadi mitra, silakan hubungi:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <h3 className="font-bold mb-3">Direktorat Pengabdian Masyarakat</h3>
                  <p className="text-sm text-white/80">
                    Gedung Rektorat Lantai 2<br />
                    Universitas Pasifik Morotai<br />
                    Morotai, Maluku Utara 97763
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                  <h3 className="font-bold mb-3">Kontak</h3>
                  <p className="text-sm text-white/80">
                    Email: pengabdian@unipas.ac.id<br />
                    Telepon: (0921) 123-4567<br />
                    WhatsApp: +62 821-xxxx-xxxx
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
