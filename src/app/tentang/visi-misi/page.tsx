'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import {
  Target,
  Eye,
  Award,
  Lightbulb,
  Globe,
  Users,
  GraduationCap,
  Microscope,
  Handshake,
  Building,
  ChevronRight
} from 'lucide-react'

export default function VisiMisiPage() {
  const [activeTab, setActiveTab] = useState('visi')

  const coreValues = [
    {
      title: 'Keunggulan (Excellence)',
      description: 'Komitmen untuk memberikan yang terbaik dalam setiap aspek pendidikan, riset, dan pelayanan',
      icon: Award,
      color: 'from-blue-600 to-blue-800'
    },
    {
      title: 'Integritas (Integrity)',
      description: 'Menjunjung tinggi kejujuran, transparansi, dan akuntabilitas dalam setiap tindakan',
      icon: Users,
      color: 'from-purple-600 to-purple-800'
    },
    {
      title: 'Inovasi (Innovation)',
      description: 'Berani bereksperimen, mengadopsi teknologi baru, dan menciptakan solusi kreatif',
      icon: Lightbulb,
      color: 'from-yellow-600 to-yellow-800'
    },
    {
      title: 'Keberlanjutan (Sustainability)',
      description: 'Mengelola sumber daya secara bijak dengan memperhatikan dampak lingkungan dan sosial jangka panjang',
      icon: Globe,
      color: 'from-green-600 to-green-800'
    },
    {
      title: 'Keberagaman dan Inklusi (Diversity and Inclusion)',
      description: 'Menghargai keberagaman perspektif, latar belakang, dan kemampuan',
      icon: Handshake,
      color: 'from-orange-600 to-orange-800'
    },
    {
      title: 'Engagement Komunitas (Community Engagement)',
      description: 'Berkomitmen untuk berkontribusi pada pembangunan masyarakat dan potensi lokal',
      icon: Building,
      color: 'from-red-600 to-red-800'
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
      icon: Target
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
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-linear-to-br from-unipas-primary via-unipas-accent to-unipas-primary text-white py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Visi & Misi UNIPAS Morotai
              </h1>
              <p className="text-xl text-white/90">
                Komitmen kami dalam membangun pendidikan unggul berbasis potensi lokal di kawasan Pasifik
              </p>
            </motion.div>
          </div>
        </section>

        {/* Tab Navigation */}
        <div className="sticky top-16 bg-white border-b border-unipas-primary/20 z-30 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-2 py-4">
              {[
                { id: 'visi', label: 'Visi', icon: Eye },
                { id: 'misi', label: 'Misi', icon: Target },
                { id: 'nilai', label: 'Nilai Inti', icon: Award }
              ].map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 font-medium ${
                      activeTab === tab.id
                        ? 'bg-linear-to-r from-unipas-primary to-unipas-accent text-white shadow-lg'
                        : 'bg-unipas-muted text-unipas-primary hover:bg-unipas-primary/10'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="container mx-auto px-4 py-12">
          {/* Visi Section */}
          {activeTab === 'visi' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white rounded-xl shadow-lg border border-unipas-primary/20 overflow-hidden">
                <div className="bg-linear-to-r from-unipas-primary to-unipas-accent text-white p-8">
                  <div className="flex items-start gap-4">
                    <Eye className="h-10 w-10 shrink-0" />
                    <div>
                      <h2 className="text-3xl font-bold">Visi</h2>
                      <p className="text-white/90 mt-2">Pandangan jangka panjang UNIPAS Morotai</p>
                    </div>
                  </div>
                </div>
                <div className="p-8 space-y-6">
                  <div className="bg-linear-to-r from-unipas-accent/10 to-unipas-primary/10 rounded-lg p-8 border-2 border-unipas-primary/20">
                    <p className="text-2xl font-semibold text-unipas-primary text-center italic leading-relaxed">
                      "Pada tahun 2030, Universitas Pasifik Morotai menjadi pusat pendidikan unggul berbasis potensi lokal yang inovatif dan berdaya saing di kawasan Pasifik."
                    </p>
                  </div>
                  <p className="text-unipas-text leading-relaxed">
                    Visi ini mencerminkan aspirasi jangka panjang UNIPAS Morotai untuk menjadi institusi pendidikan terkemuka yang tidak hanya menyediakan pendidikan berkualitas tinggi, tetapi juga mampu memanfaatkan potensi lokal Morotai dalam setiap aspek akademik, riset, dan pengabdian kepada masyarakat.
                  </p>
                  <div className="space-y-4 pt-4">
                    <h3 className="font-semibold text-unipas-primary">Elemen Kunci Visi UNIPAS:</h3>
                    {[
                      'Pusat pendidikan unggul di kawasan Pasifik',
                      'Berbasis potensi lokal Morotai',
                      'Inovatif dan berdaya saing',
                      'Fokus pada pendidikan, riset, dan pengabdian masyarakat'
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 bg-unipas-muted rounded-lg">
                        <ChevronRight className="h-5 w-5 text-unipas-accent shrink-0 mt-0.5" />
                        <span className="text-unipas-text">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Misi Section */}
          {activeTab === 'misi' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white rounded-xl shadow-lg border border-unipas-primary/20 overflow-hidden">
                <div className="bg-linear-to-r from-unipas-primary to-unipas-accent text-white p-8">
                  <div className="flex items-start gap-4">
                    <Target className="h-10 w-10 shrink-0" />
                    <div>
                      <h2 className="text-3xl font-bold">Misi</h2>
                      <p className="text-white/90 mt-2">Komitmen operasional untuk mewujudkan visi</p>
                    </div>
                  </div>
                </div>
                <div className="p-8 space-y-6">
                  <p className="text-unipas-text">
                    UNIPAS Morotai berkomitmen melaksanakan misi sebagai berikut:
                  </p>
                  <div className="space-y-6">
                    {missions.map((mission, index) => {
                      const Icon = mission.icon
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="flex gap-4 p-4 bg-unipas-muted rounded-lg hover:bg-unipas-primary/5 transition-colors"
                        >
                          <div className="shrink-0 w-12 h-12 bg-linear-to-r from-unipas-primary to-unipas-accent rounded-lg flex items-center justify-center text-white">
                            <Icon className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-unipas-primary mb-1">
                              {index + 1}. {mission.title}
                            </h3>
                            <p className="text-unipas-text text-sm">{mission.description}</p>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Nilai Inti Section */}
          {activeTab === 'nilai' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white rounded-xl shadow-lg border border-unipas-primary/20 overflow-hidden">
                <div className="bg-linear-to-r from-unipas-primary to-unipas-accent text-white p-8">
                  <div className="flex items-start gap-4">
                    <Award className="h-10 w-10 shrink-0" />
                    <div>
                      <h2 className="text-3xl font-bold">Nilai-Nilai Inti</h2>
                      <p className="text-white/90 mt-2">Fondasi budaya dan etika UNIPAS Morotai</p>
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-unipas-text mb-8">
                    Dalam menjalankan visi dan misi, UNIPAS Morotai berpedoman pada nilai-nilai inti berikut:
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    {coreValues.map((value, index) => {
                      const Icon = value.icon
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="bg-linear-to-br from-white to-unipas-muted rounded-xl p-6 border border-unipas-primary/20 hover:shadow-lg transition-shadow"
                        >
                          <div className={`w-14 h-14 bg-linear-to-r ${value.color} rounded-lg flex items-center justify-center text-white mb-4`}>
                            <Icon className="h-7 w-7" />
                          </div>
                          <h3 className="font-bold text-unipas-primary mb-3">{value.title}</h3>
                          <p className="text-unipas-text text-sm leading-relaxed">{value.description}</p>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Call to Action Section */}
        <section className="bg-linear-to-r from-unipas-primary to-unipas-accent text-white py-16 mt-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Bersama Mewujudkan Visi UNIPAS</h2>
              <p className="text-lg text-white/90 mb-8">
                Kami mengajak seluruh stakeholder untuk bersama-sama mewujudkan visi UNIPAS Morotai menjadi pusat pendidikan unggul berbasis potensi lokal di kawasan Pasifik.
              </p>
              <a
                href="/kontak"
                className="inline-block bg-white text-unipas-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Hubungi Kami
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
