'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import {
  GraduationCap,
  Clock,
  Calendar,
  Award,
  Users,
  Building,
  Anchor,
  TrendingUp,
  Star,
  Target,
  Zap,
  Heart
} from 'lucide-react'

export default function SejarahPage() {
  const { scrollYProgress } = useScroll()

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  const milestones = [
    {
      year: '2012',
      title: 'Momentum Sail Indonesia',
      description:
        'Kabupaten Pulau Morotai ditunjuk sebagai penyelenggara Sail Indonesia di Morotai',
      icon: Anchor,
    },
    {
      year: '5 Februari 2013',
      title: 'Izin Operasional',
      description:
        'Mendapat izin operasional dari Kemendikbud RI Nomor 08/E/O/2013',
      icon: Award,
    },
    {
      year: '2013',
      title: 'Awal Perjalanan',
      description:
        '6 fakultas dan 11 program studi pertama kali diselenggarakan',
      icon: GraduationCap,
    },
  ]

  const keyFigures = [
    {
      name: 'Drs. Rusli Sibua, M.Si',
      role: 'Ketua Dewan Pembina Yayasan',
      icon: Users,
    },
    {
      name: 'Alm. Sudirman',
      role: 'Ketua Yayasan',
      icon: Building,
    },
    {
      name: 'Sulami Sibua',
      role: 'Rektor Pertama',
      icon: GraduationCap,
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <Header />
      <main className="flex-1">
        {/* HERO SECTION WITH PARALLAX */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Animated Background Elements */}
          <motion.div
            style={{
              y: useTransform(scrollYProgress, [0, 1], [0, -100])
            }}
            className="absolute inset-0 overflow-hidden"
          >
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-unipas-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-32 h-32 bg-unipas-accent/10 rounded-full blur-2xl"></div>
            
            {/* Floating Particles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.3, 0.7, 0.3],
                  x: [0, 25, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 5 + i * 0.4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute w-2 h-2 bg-unipas-primary/40 rounded-full"
                style={{
                  left: `${5 + i * 12}%`,
                  top: `${10 + (i % 4) * 20}%`,
                  animationDelay: `${i * 0.3}s`,
                  boxShadow: `0 0 ${10 + i * 2}px 0 0 rgba(59, 130, 246, 0.3)`
                }}
              />
            ))}
            
            {/* Floating Geometric Shapes */}
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute top-20 right-20 w-32 h-32 border-4 border-unipas-accent/30 rounded-2xl"
            />
            <motion.div
              animate={{
                rotate: -360,
                scale: [1.1, 1, 1.1],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute bottom-20 left-20 w-24 h-24 border-4 border-unipas-primary/30 rounded-2xl"
            />
          </motion.div>

          {/* Hero Content */}
          <motion.div
            style={{
              y: useTransform(scrollYProgress, [0, 1], [0, -50])
            }}
            className="relative z-10 text-center px-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="mb-8"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-24 h-24 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl"
              >
                <Clock className="h-12 w-12 text-white" />
              </motion.div>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="text-3xl md:text-5xl lg:text-7xl xl:text-9xl font-black leading-tight mb-6 px-4"
            >
              <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent drop-shadow-2xl">
                Sejarah Universitas Pasifik
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-lg md:text-xl lg:text-2xl leading-relaxed max-w-4xl lg:max-w-5xl mx-auto mb-8 px-4"
            >
              <span className="bg-gradient-to-r from-white/98 via-blue-100 to-cyan-200/95 bg-clip-text text-transparent drop-shadow-xl">
                Perjalanan panjang UNIPAS Morotai dari visi hingga menjadi perguruan tinggi unggul di kawasan perbatasan
              </span>
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex justify-center gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('milestone')}
                className="bg-white/20 backdrop-blur-sm text-white px-6 md:px-8 py-3 md:py-4 rounded-full border border-white/30 hover:bg-white/30 transition-all duration-300 font-semibold text-sm md:text-base"
              >
                Jelajahi Sejarah
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-unipas-primary via-cyan-600 to-unipas-accent"></div>
        </section>

        {/* NAVIGATION WITH PARALLAX */}
        <motion.div
          style={{
            y: useTransform(scrollYProgress, [0, 0.1], [0, -20])
          }}
          className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-unipas-primary/20 z-40 shadow-lg"
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-2 md:gap-3 py-4 md:py-6">
              {[
                { id: 'milestone', label: 'Milestone', icon: Calendar },
                { id: 'tokoh', label: 'Tokoh', icon: Users },
                { id: 'perjalanan', label: 'Perjalanan', icon: TrendingUp },
                { id: 'visi', label: 'Visi', icon: Star }
              ].map((tab, index) => {
                const Icon = tab.icon
                return (
                  <motion.button
                    key={tab.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    onClick={() => scrollToSection(tab.id)}
                    className="flex items-center gap-2 md:gap-3 px-3 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl transition-all duration-300 hover:scale-105 bg-gradient-to-r from-unipas-primary/10 to-unipas-accent/10 text-unipas-primary hover:from-unipas-primary/20 hover:to-unipas-accent/20 border border-unipas-primary/20 text-xs md:text-sm font-bold"
                  >
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className="h-4 w-4 md:h-5 md:w-5" />
                    </motion.div>
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="sm:hidden">{tab.label.slice(0, 3)}</span>
                  </motion.button>
                )
              })}
            </div>
          </div>
        </motion.div>

        {/* MILESTONE SECTION WITH PARALLAX */}
        <section id="milestone" className="py-16 md:py-32 relative overflow-hidden">
          {/* Background Pattern */}
          <motion.div
            style={{
              y: useTransform(scrollYProgress, [0.2, 0.4], [0, 50])
            }}
            className="absolute inset-0 opacity-5"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-unipas-primary to-unipas-accent"></div>
          </motion.div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12 md:mb-20"
            >
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-unipas-primary to-unipas-accent bg-clip-text text-transparent mb-4 md:mb-6">
                Perjalanan Waktu
              </h2>
              <p className="text-base md:text-xl text-gray-600 max-w-2xl md:max-w-3xl mx-auto">
                Milestone penting dalam sejarah UNIPAS Morotai
              </p>
            </motion.div>

            {/* Timeline with Enhanced Design */}
            <div className="relative max-w-4xl md:max-w-6xl mx-auto">
              {/* Animated Timeline Line - Hidden on Mobile */}
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                transition={{ duration: 1.5 }}
                className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-unipas-primary via-unipas-accent to-transparent"
              />

              <div className="space-y-16 md:space-y-32">
                {milestones.map((milestone, index) => {
                  const Icon = milestone.icon
                  const isLeft = index % 2 === 0
                  
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: index * 0.2 }}
                      className={`relative flex items-center ${isLeft ? 'justify-start' : 'justify-end'}`}
                    >
                      <div className={`w-full md:w-5/12 ${isLeft ? 'text-right pr-4 md:pr-16' : 'text-left pl-4 md:pl-16'}`}>
                        <motion.div
                          whileHover={{ scale: 1.05, rotateY: 5 }}
                          transition={{ duration: 0.3 }}
                          className="bg-white rounded-2xl md:rounded-3xl shadow-2xl border border-unipas-primary/20 p-4 md:p-10 hover:shadow-3xl transition-all duration-300"
                        >
                          <div className="flex flex-col md:flex-row items-center md:items-start gap-3 md:gap-6 mb-3 md:mb-6">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                              className="w-12 h-12 md:w-20 md:h-20 bg-gradient-to-r from-unipas-primary to-unipas-accent rounded-2xl flex items-center justify-center text-white shadow-lg flex-shrink-0"
                            >
                              <Icon className="h-6 w-6 md:h-10 md:w-10" />
                            </motion.div>
                            <div className="text-center md:text-left">
                              <div className="text-xs md:text-sm font-bold text-unipas-accent mb-1 md:mb-2">{milestone.year}</div>
                              <div className="text-lg md:text-3xl font-bold text-unipas-primary">{milestone.title}</div>
                            </div>
                          </div>
                          <p className="text-gray-600 leading-relaxed text-sm md:text-lg">{milestone.description}</p>
                        </motion.div>
                      </div>
                      
                      {/* Enhanced Timeline Dot - Hidden on Mobile */}
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className={`hidden md:block absolute ${isLeft ? 'left-1/2 transform -translate-x-1/2 -ml-6' : 'right-1/2 transform translate-x-1/2 -mr-6'} top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white border-4 border-unipas-accent rounded-full z-10 shadow-xl`}
                        style={{
                          boxShadow: `0 0 ${15 + index * 3}px 0 0 rgba(59, 130, 246, 0.4)`
                        }}
                      />
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* TOKOH SECTION WITH PARALLAX */}
        <section id="tokoh" className="py-16 md:py-32 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
          {/* Background Elements */}
          <motion.div
            style={{
              y: useTransform(scrollYProgress, [0.4, 0.6], [0, 30])
            }}
            className="absolute inset-0 overflow-hidden"
          >
            <div className="absolute top-10 right-10 w-40 h-40 bg-unipas-accent/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 left-10 w-32 h-32 bg-unipas-primary/10 rounded-full blur-2xl"></div>
          </motion.div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12 md:mb-20"
            >
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-unipas-primary to-unipas-accent bg-clip-text text-transparent mb-4 md:mb-6">
                Tokoh Pendiri
              </h2>
              <p className="text-base md:text-xl text-gray-600 max-w-2xl md:max-w-3xl mx-auto">
                Visioner di balik pendirinya UNIPAS Morotai
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 md:gap-10 max-w-4xl md:max-w-6xl mx-auto">
              {keyFigures.map((figure, index) => {
                const Icon = figure.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    whileHover={{ y: -10 }}
                    className="bg-white/90 backdrop-blur-sm rounded-2xl md:rounded-3xl shadow-2xl border border-unipas-primary/20 overflow-hidden hover:shadow-3xl transition-all duration-300"
                  >
                    <div className="bg-gradient-to-r from-unipas-primary to-unipas-accent p-6 md:p-10 text-white relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent"></div>
                      <div className="relative z-10">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                          className="w-16 h-16 md:w-20 md:h-20 bg-white/30 rounded-full flex items-center justify-center mb-4 md:mb-6"
                        >
                          <Icon className="h-8 w-8 md:h-10 md:w-10" />
                        </motion.div>
                        <h3 className="font-bold text-base md:text-xl mb-2 md:mb-3">{figure.name}</h3>
                        <p className="text-white/90 text-sm md:text-base">{figure.role}</p>
                      </div>
                    </div>
                    <div className="p-4 md:p-8">
                      <div className="flex items-center gap-2 mb-3 md:mb-4">
                        <Heart className="h-3 w-3 md:h-4 md:w-4 text-red-500" />
                        <span className="text-xs md:text-sm text-gray-500">Kontribusi Utama</span>
                      </div>
                      <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                        Visioner pendirian UNIPAS Morotai untuk kemajuan masyarakat
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* PERJALANAN SECTION WITH PARALLAX */}
        <section id="perjalanan" className="py-16 md:py-32 relative overflow-hidden">
          {/* Background Pattern */}
          <motion.div
            style={{
              y: useTransform(scrollYProgress, [0.6, 0.8], [0, 40])
            }}
            className="absolute inset-0 opacity-5"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-unipas-accent to-unipas-primary"></div>
          </motion.div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12 md:mb-20"
            >
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-unipas-primary to-unipas-accent bg-clip-text text-transparent mb-4 md:mb-6">
                Perjalanan Pengembangan
              </h2>
            </motion.div>

            <div className="max-w-4xl md:max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="bg-white/90 backdrop-blur-sm rounded-2xl md:rounded-3xl shadow-2xl border border-unipas-primary/20 p-6 md:p-12"
              >
                <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
                  <div className="flex items-start gap-4">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                      className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-unipas-primary to-unipas-accent rounded-2xl flex items-center justify-center text-white flex-shrink-0"
                    >
                      <Calendar className="h-6 w-6 md:h-8 md:w-8" />
                    </motion.div>
                    <div>
                      <h3 className="font-bold text-lg md:text-xl mb-2 text-unipas-primary">5 Februari 2013</h3>
                      <p className="text-gray-600 text-sm md:text-base">
                        UNIPAS Morotai resmi memperoleh izin operasional dari Kemendikbud RI Nomor 08/E/O/2013
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                      className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-unipas-accent to-unipas-primary rounded-2xl flex items-center justify-center text-white flex-shrink-0"
                    >
                      <GraduationCap className="h-6 w-6 md:h-8 md:w-8" />
                    </motion.div>
                    <div>
                      <h3 className="font-bold text-lg md:text-xl mb-2 text-unipas-primary">6 Fakultas</h3>
                      <p className="text-gray-600 text-sm md:text-base">
                        Awalnya terdapat 6 fakultas dan 10 program studi, kemudian bertambah menjadi 11 program studi
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-unipas-primary/10 to-unipas-accent/10 rounded-2xl p-4 md:p-8 border border-unipas-primary/20">
                  <p className="text-gray-700 leading-relaxed text-sm md:text-lg text-center">
                    Dalam perjalanannya, UNIPAS Morotai mengalami berbagai dinamika, namun dengan kerja keras para tokoh dan dukungan pemerintah daerah, UNIPAS Morotai perlahan dan pasti menemukan jalan untuk menjadi perguruan tinggi yang maju dan membanggakan.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* VISI SECTION WITH PARALLAX */}
        <section id="visi" className="py-16 md:py-32 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
          {/* Background Elements */}
          <motion.div
            style={{
              y: useTransform(scrollYProgress, [0.8, 1], [0, 50])
            }}
            className="absolute inset-0 overflow-hidden"
          >
            <div className="absolute top-20 right-20 w-48 h-48 bg-unipas-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-20 w-40 h-40 bg-unipas-accent/10 rounded-full blur-2xl"></div>
            
            {/* Floating Elements */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 4 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute w-3 h-3 bg-unipas-primary/30 rounded-full"
                style={{
                  left: `${10 + i * 15}%`,
                  top: `${20 + (i % 3) * 30}%`,
                  animationDelay: `${i * 0.3}s`
                }}
              />
            ))}
          </motion.div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12 md:mb-20"
            >
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-unipas-primary to-unipas-accent bg-clip-text text-transparent mb-4 md:mb-6">
                Visi Masa Depan
              </h2>
            </motion.div>

            <div className="max-w-4xl md:max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="bg-white/90 backdrop-blur-sm rounded-2xl md:rounded-3xl shadow-2xl border border-unipas-primary/20 p-8 md:p-16"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-r from-unipas-primary to-unipas-accent rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8"
                >
                  <Target className="h-8 w-8 md:h-12 md:w-12 text-white" />
                </motion.div>

                <motion.blockquote
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-lg md:text-2xl italic text-gray-700 mb-8 md:mb-12 leading-relaxed text-center"
                >
                  "Kami berkeyakinan UNIPAS Morotai akan dapat meretas kemajuan dan menenggelamkan ketertinggalan selama lautan Pasifik dan menjadi pelopor serta navigasi kedamaian serta kemajuan pendidikan tinggi di kawasan Pasifik."
                </motion.blockquote>

                <div className="bg-gradient-to-r from-unipas-primary/10 to-unipas-accent/10 rounded-2xl p-6 md:p-10 border border-unipas-primary/20">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="text-center"
                  >
                    <Zap className="h-8 w-8 md:h-12 md:w-12 text-unipas-primary mx-auto mb-3 md:mb-4" />
                    <p className="text-lg md:text-2xl font-bold text-unipas-primary mb-2">
                      Menjadi Perguruan Tinggi UNGGUL
                    </p>
                    <p className="text-base md:text-lg text-gray-600">
                      Di kawasan perbatasan Negara Kesatuan Republik Indonesia
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
