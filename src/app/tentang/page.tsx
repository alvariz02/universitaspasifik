'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { 
  BookOpen, 
  Target, 
  Users, 
  Lightbulb, 
  Globe, 
  Award,
  ChevronRight,
  GraduationCap,
  Microscope,
  Handshake,
  Building,
  Zap,
  Star,
  TrendingUp,
  Shield,
  Heart
} from 'lucide-react'

export default function AboutPage() {
  const [activeSection, setActiveSection] = useState('latar-belakang')

  const sections = [
    { id: 'latar-belakang', title: 'Latar Belakang', icon: BookOpen },
    { id: 'dasar-hukum', title: 'Dasar Hukum', icon: Building },
    { id: 'tujuan', title: 'Tujuan Penyusunan', icon: Target },
    { id: 'visi-misi', title: 'Visi & Misi', icon: Award },
    { id: 'nilai-inti', title: 'Nilai-Nilai Inti', icon: Lightbulb }
  ]

  const coreValues = [
    {
      title: 'Keunggulan (Excellence)',
      description: 'Komitmen untuk memberikan yang terbaik dalam setiap aspek pendidikan, riset, dan pelayanan',
      icon: Award,
      color: 'from-unipas-primary to-unipas-accent'
    },
    {
      title: 'Integritas (Integrity)',
      description: 'Menjunjung tinggi kejujuran, transparansi, dan akuntabilitas dalam setiap tindakan',
      icon: Shield,
      color: 'from-blue-600 via-cyan-600 to-teal-600'
    },
    {
      title: 'Inovasi (Innovation)',
      description: 'Berani bereksperimen, mengadopsi teknologi baru, dan menciptakan solusi kreatif',
      icon: Zap,
      color: 'from-purple-600 via-pink-600 to-rose-600'
    },
    {
      title: 'Keberlanjutan (Sustainability)',
      description: 'Mengelola sumber daya secara bijak dengan memperhatikan dampak lingkungan dan sosial jangka panjang',
      icon: Globe,
      color: 'from-green-600 via-emerald-600 to-teal-600'
    },
    {
      title: 'Keberagaman dan Inklusi (Diversity and Inclusion)',
      description: 'Menghargai keberagaman perspektif, latar belakang, dan kemampuan',
      icon: Heart,
      color: 'from-orange-600 via-amber-600 to-yellow-600'
    },
    {
      title: 'Engagement Komunitas (Community Engagement)',
      description: 'Berkomitmen untuk berkontribusi pada pembangunan masyarakat dan potensi lokal',
      icon: Handshake,
      color: 'from-red-600 via-pink-600 to-rose-600'
    }
  ]

  const missions = [
    {
      title: 'Meningkatkan Mutu Pendidikan',
      description: 'Mengembangkan kurikulum berbasis kompetensi industri 4.0 dan kebutuhan pasar kerja',
      icon: GraduationCap
    },
    {
      title: 'Memperkuat Riset dan Inovasi',
      description: 'Mendorong penelitian yang berorientasi pada pemecahan masalah dan pengembangan berbasis potensi lokal',
      icon: Microscope
    },
    {
      title: 'Menumbuhkan Jiwa Kewirausahaan',
      description: 'Mendirikan dan mengelola inkubator bisnis berbasis inovasi dan potensi lokal',
      icon: TrendingUp
    },
    {
      title: 'Memperkuat Tata Kelola',
      description: 'Mengembangkan sistem tata kelola berbasis digital untuk meningkatkan efisiensi dan transparansi',
      icon: Building
    },
    {
      title: 'Mengembangkan Kemitraan',
      description: 'Membangun jaringan kerja sama strategis dengan pemerintah, dunia usaha, industri, dan komunitas',
      icon: Handshake
    }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <Header />
      <main className="flex-1">
        {/* Modern Hero Section */}
        <div className="relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-unipas-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-32 h-32 bg-unipas-accent/10 rounded-full blur-2xl"></div>
            
            {/* Floating Particles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -15, 0],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute w-1 h-1 bg-unipas-primary/40 rounded-full"
                style={{
                  left: `${10 + i * 15}%`,
                  top: `${20 + (i % 3) * 25}%`,
                  animationDelay: `${i * 0.3}s`
                }}
              />
            ))}
          </div>

          <div className="relative bg-gradient-to-br from-unipas-primary via-cyan-600 to-unipas-accent text-white">
            <div className="container mx-auto px-4 py-20">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-center space-y-6"
              >
                <motion.h1 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight"
                >
                  <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent drop-shadow-2xl">
                    Tentang Universitas Pasifik
                  </span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-lg md:text-xl lg:text-2xl leading-relaxed max-w-4xl mx-auto"
                >
                  <span className="bg-gradient-to-r from-white/95 via-blue-50 to-cyan-100/90 bg-clip-text text-transparent drop-shadow-lg">
                    Mengenal lebih dekat visi, misi, dan komitmen UNIPAS dalam mewujudkan pendidikan unggul berbasis potensi lokal
                  </span>
                </motion.p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Modern Navigation Tabs */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-unipas-primary/20 z-40 shadow-lg">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-3 py-6">
              {sections.map((section, index) => {
                const Icon = section.icon
                return (
                  <motion.button
                    key={section.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    onClick={() => setActiveSection(section.id)}
                    className={`flex items-center gap-3 px-6 py-3 rounded-2xl transition-all duration-300 hover:scale-105 ${
                      activeSection === section.id
                        ? 'bg-gradient-to-r from-unipas-primary to-unipas-accent text-white shadow-xl border border-white/20'
                        : 'bg-gradient-to-r from-unipas-primary/10 to-unipas-accent/10 text-unipas-primary hover:from-unipas-primary/20 hover:to-unipas-accent/20 border border-unipas-primary/20'
                    }`}
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className="h-5 w-5" />
                    </motion.div>
                    <span className="font-bold">{section.title}</span>
                  </motion.button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="container mx-auto px-4 py-16">
          {/* Latar Belakang Section */}
          {activeSection === 'latar-belakang' && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-12"
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="space-y-6"
                >
                  <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-unipas-primary to-unipas-accent bg-clip-text text-transparent">
                    Latar Belakang
                  </h2>
                  <div className="space-y-4 text-lg leading-relaxed text-gray-700">
                    <p>
                      Universitas Pasifik (UNIPAS) Morotai didirikan sebagai wujud nyata komitmen pemerintah dan masyarakat dalam meningkatkan akses pendidikan tinggi di kawasan perbatasan Indonesia bagian timur.
                    </p>
                    <p>
                      Berlokasi di Morotai, Maluku Utara, UNIPAS hadir sebagai institusi pendidikan modern yang mengintegrasikan keunggulan akademik dengan pengembangan potensi lokal khas kawasan Pasifik.
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="relative"
                >
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-unipas-primary/20 to-unipas-accent/20"></div>
                    <img 
                      src="/api/placeholder/600/400?text=UNIPAS+Campus" 
                      alt="UNIPAS Campus" 
                      className="relative w-full h-96 object-cover"
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Visi & Misi Section */}
          {activeSection === 'visi-misi' && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-16"
            >
              {/* Vision */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-center space-y-6 p-12 rounded-3xl bg-gradient-to-br from-unipas-primary/10 to-unipas-accent/5 backdrop-blur-sm border border-unipas-primary/20"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 bg-gradient-to-r from-unipas-primary to-unipas-accent rounded-2xl flex items-center justify-center mx-auto mb-4"
                >
                  <Star className="h-8 w-8 text-white" />
                </motion.div>
                <h3 className="text-3xl font-black bg-gradient-to-r from-unipas-primary to-unipas-accent bg-clip-text text-transparent">
                  Visi
                </h3>
                <p className="text-xl leading-relaxed max-w-3xl mx-auto text-gray-700">
                  Menjadi universitas unggul berbasis potensi lokal yang mampu bersaing di tingkat global dan berkontribusi pada pembangunan bangsa melalui inovasi pendidikan berkelanjutan.
                </p>
              </motion.div>

              {/* Mission Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {missions.map((mission, index) => {
                  const Icon = mission.icon
                  return (
                    <motion.div
                      key={mission.title}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      className="group p-8 rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-unipas-primary/10 hover:border-unipas-accent/30 hover:shadow-xl transition-all duration-300"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-unipas-primary to-unipas-accent rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <ChevronRight className="h-5 w-5 text-unipas-accent group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                      <h4 className="font-bold text-lg mb-3 text-unipas-primary">{mission.title}</h4>
                      <p className="text-gray-600 leading-relaxed">{mission.description}</p>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          )}

          {/* Nilai Inti Section */}
          {activeSection === 'nilai-inti' && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-12"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-unipas-primary to-unipas-accent bg-clip-text text-transparent mb-4">
                  Nilai-Nilai Inti
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Enam nilai fundamental yang membentuk karakter dan budaya organisasi UNIPAS
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {coreValues.map((value, index) => {
                  const Icon = value.icon
                  return (
                    <motion.div
                      key={value.title}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      className="group p-8 rounded-3xl bg-gradient-to-br from-white to-gray-50 border border-unipas-primary/10 hover:border-unipas-accent/30 hover:shadow-2xl transition-all duration-300"
                    >
                      <div className="text-center space-y-4">
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.3 }}
                          className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center mx-auto shadow-lg`}
                        >
                          <Icon className="h-8 w-8 text-white" />
                        </motion.div>
                        <h3 className="font-bold text-lg text-unipas-primary">{value.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{value.description}</p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          )}

          {/* Other sections with similar modern styling */}
          {activeSection === 'dasar-hukum' && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-unipas-primary to-unipas-accent bg-clip-text text-transparent">
                Dasar Hukum
              </h2>
              <div className="bg-gradient-to-br from-unipas-primary/10 to-unipas-accent/5 p-8 rounded-3xl border border-unipas-primary/20">
                <p className="text-lg leading-relaxed text-gray-700">
                  Universitas Pasifik Morotai didirikan berdasarkan ketentuan perundang-undangan yang berlaku di Indonesia, dengan komitmen untuk menyelenggarakan pendidikan tinggi yang berkualitas dan akuntabel.
                </p>
              </div>
            </motion.div>
          )}

          {activeSection === 'tujuan' && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-unipas-primary to-unipas-accent bg-clip-text text-transparent">
                Tujuan Penyusunan
              </h2>
              <div className="bg-gradient-to-br from-unipas-primary/10 to-unipas-accent/5 p-8 rounded-3xl border border-unipas-primary/20">
                <p className="text-lg leading-relaxed text-gray-700">
                  Tujuan utama penyusunan Universitas Pasifik adalah untuk menciptakan institusi pendidikan yang mampu menjawab tantangan zaman dengan tetap menjaga nilai-nilai luhur bangsa.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
