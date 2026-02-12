'use client'

import { useState } from 'react'
import { useScroll, useTransform, motion } from 'framer-motion'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Users, Building2, Briefcase, Shield, Award, Target, Zap, Star } from 'lucide-react'

export default function StrukturPage() {
  const { scrollYProgress } = useScroll()

  const organizationalUnits = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'REKTOR',
      description: 'Pimpinan Utama Universitas',
      person: 'Irfan Hi. Abd. Rahman, ST., MT.',
      level: 'main'
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'SENAT UNIVERSITAS',
      description: 'Badan legislatif tertinggi universitas',
      person: 'Senat Universitas',
      level: 'main'
    }
  ]

  const underRektor = [
    {
      icon: <Users className="h-6 w-6" />,
      title: 'WAKIL REKTOR I',
      description: 'Bidang Akademik dan Kemahasiswaan',
      person: 'Subhan Hayun, S.Pd., M.Pd.',
      level: 'vice'
    },
    {
      icon: <Building2 className="h-6 w-6" />,
      title: 'BIRO ADM. AKADEMIK',
      description: 'Pengelolaan administrasi akademik',
      person: 'M. Reza Kusman, ST., M.Ling.',
      level: 'bureau'
    }
  ]

  const underBiroAkademik = [
    {
      icon: <Briefcase className="h-6 w-6" />,
      title: 'BAGIAN ADM. AKADEMIK',
      description: 'Administrasi akademik',
      person: 'Radiatul Adawiyah Hi. Hasan, S.Pd.',
      level: 'section'
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'BAGIAN KEMAHASISWA',
      description: 'Administrasi kemahasiswaan',
      person: 'Surdin Hajimat, SE.',
      level: 'section'
    }
  ]

  const underRektorII = [
    {
      icon: <Users className="h-6 w-6" />,
      title: 'WAKIL REKTOR II',
      description: 'Bidang Administrasi Umum dan Keuangan',
      person: 'Aminullah Thaib, ST., MT.',
      level: 'vice'
    },
    {
      icon: <Building2 className="h-6 w-6" />,
      title: 'BIRO ADM. UMUM &',
      description: 'Pengelolaan administrasi umum',
      person: 'Asri Dzafar, ST.',
      level: 'bureau'
    }
  ]

  const underBiroUmum = [
    {
      icon: <Briefcase className="h-6 w-6" />,
      title: 'BAGIAN ADM. UMUM',
      description: 'Administrasi umum',
      person: 'Asri Dzafar, ST.',
      level: 'section'
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: 'BAGIAN ADM. KEUANGAN',
      description: 'Administrasi keuangan',
      person: 'Marwis Aswan, ST., M.Ling.',
      level: 'section'
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'BAGIAN KEPEGAWAIAN',
      description: 'Administrasi kepegawaian',
      person: 'Abd Halil Topora, ST.',
      level: 'section'
    }
  ]

  const underRektorIII = [
    {
      icon: <Users className="h-6 w-6" />,
      title: 'WAKIL REKTOR III',
      description: 'Bidang Kerjasama, Alumni, dan Sistem Informasi',
      person: 'Amrin Sbua, S.Pd., M.Si.',
      level: 'vice'
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: 'BIRO KERJASAMA, ALUMNI & SISTEM INFORMASI',
      description: 'Pengelolaan kerjasama, alumni, dan sistem informasi',
      person: 'Risaldi Posu, S.Sos., M.Si.',
      level: 'bureau'
    }
  ]

  const lppmUnit = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: 'LPPM',
      description: 'Lembaga Penelitian dan Pengabdian kepada Masyarakat',
      person: 'Sukarmin Idrus, S.Pi., M.Si.',
      level: 'institute'
    }
  ]

  const additionalUnits = [
    {
      icon: <Users className="h-6 w-6" />,
      title: 'SEKRETARIS LPPM',
      description: 'Sekretaris Lembaga Penelitian dan Pengabdian kepada Masyarakat',
      person: 'Rizki R Sarapung',
      level: 'section'
    },
    {
      icon: <Building2 className="h-6 w-6" />,
      title: 'KEPALA PERPUSTAKAAN',
      description: 'Kepala Perpustakaan Universitas',
      person: 'Idhan Dominggus, S.IP., M.IP.',
      level: 'section'
    },
    {
      icon: <Briefcase className="h-6 w-6" />,
      title: 'KEPALA LABORATORIUM',
      description: 'Kepala Laboratorium Universitas',
      person: 'Elfira Resti Mulya, ST., M.Eng.',
      level: 'section'
    }
  ]

  const faculties = [
    'Fakultas Ilmu Sosial dan Ilmu Politik',
    'Fakultas Ekonomi dan Bisnis',
    'Fakultas Hukum',
    'Fakultas Keguruan dan Ilmu Pendidikan',
    'Fakultas Teknik',
    'Fakultas Pertanian'
  ]

  const values = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Good Governance',
      description: 'Penerapan tata kelola yang baik dan transparan'
    },
    {
      icon: <Briefcase className="h-6 w-6" />,
      title: 'Profesional',
      description: 'Profesionalisme dalam setiap aktivitas akademik'
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Kolaboratif',
      description: 'Kerjasama yang erat antar unit kerja dan stakeholder'
    }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <Header />
      <main className="flex-1">
        {/* ORGANIZATIONAL UNITS SECTION */}
        <section className="py-16 md:py-32 relative overflow-hidden">
          {/* Background Pattern */}
          <motion.div
            style={{
              y: useTransform(scrollYProgress, [0.2, 0.4], [0, 30])
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
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-unipas-primary to-unipas-accent bg-clip-text text-transparent mb-4 md:mb-6">
                Struktur Organisasi
              </h1>
              <p className="text-base md:text-xl text-gray-600 max-w-2xl md:max-w-3xl mx-auto">
                Struktur organisasi Universitas Pasifik yang transparan dan akuntabel
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12 md:mb-20"
            >
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-unipas-primary to-unipas-accent bg-clip-text text-transparent mb-4 md:mb-6">
                Pimpinan Utama
              </h2>
              <p className="text-base md:text-xl text-gray-600 max-w-2xl md:max-w-3xl mx-auto">
                Struktur kepemimpinan tertinggi universitas
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl md:max-w-6xl mx-auto mb-16">
              {organizationalUnits.map((unit, index) => {
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -10 }}
                    className="bg-white/90 backdrop-blur-sm rounded-2xl md:rounded-3xl shadow-2xl border border-unipas-primary/20 p-6 md:p-8 hover:shadow-3xl transition-all duration-300"
                  >
                    <div className="flex items-start gap-4 md:gap-6">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-unipas-primary to-unipas-accent rounded-2xl flex items-center justify-center text-white shadow-lg flex-shrink-0"
                      >
                        {unit.icon}
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="text-lg md:text-xl font-bold text-unipas-primary mb-2 md:mb-3">
                          {unit.title}
                        </h3>
                        <p className="text-gray-600 text-sm md:text-base mb-3 md:mb-4 leading-relaxed">
                          {unit.description}
                        </p>
                        <p className="text-sm md:text-base font-bold text-unipas-accent">
                          {unit.person}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* WAKIL REKTOR I SECTION */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12 md:mb-20"
            >
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-unipas-primary to-unipas-accent bg-clip-text text-transparent mb-4 md:mb-6">
                Di bawah Rektor
              </h2>
            </motion.div>

            <div className="space-y-16 mb-16">
              {/* WAKIL REKTOR I */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-3xl p-8 border-2 border-blue-200">
                <h3 className="text-2xl font-bold text-unipas-primary mb-8 text-center">WAKIL REKTOR I</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {underRektor.map((unit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                          {unit.icon}
                        </div>
                        <div>
                          <h4 className="font-bold text-blue-900 mb-2">{unit.title}</h4>
                          <p className="text-gray-600 text-sm mb-3">{unit.description}</p>
                          <p className="font-bold text-blue-700">{unit.person}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* BIRO AKADEMIK */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl p-8 border-2 border-indigo-200">
                <h3 className="text-2xl font-bold text-indigo-900 mb-8 text-center">BIRO ADM. AKADEMIK</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {underBiroAkademik.map((unit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="bg-white rounded-2xl p-6 shadow-lg border border-indigo-100"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
                          {unit.icon}
                        </div>
                        <div>
                          <h4 className="font-bold text-indigo-900 mb-2">{unit.title}</h4>
                          <p className="text-gray-600 text-sm mb-3">{unit.description}</p>
                          <p className="font-bold text-indigo-700">{unit.person}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* WAKIL REKTOR II */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 border-2 border-green-200">
                <h3 className="text-2xl font-bold text-green-900 mb-8 text-center">WAKIL REKTOR II</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {underRektorII.map((unit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="bg-white rounded-2xl p-6 shadow-lg border border-green-100"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                          {unit.icon}
                        </div>
                        <div>
                          <h4 className="font-bold text-green-900 mb-2">{unit.title}</h4>
                          <p className="text-gray-600 text-sm mb-3">{unit.description}</p>
                          <p className="font-bold text-green-700">{unit.person}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* BIRO UMUM */}
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-3xl p-8 border-2 border-yellow-200">
                <h3 className="text-2xl font-bold text-yellow-900 mb-8 text-center">BIRO ADM. UMUM &</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {underBiroUmum.map((unit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="bg-white rounded-2xl p-6 shadow-lg border border-yellow-100"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center text-yellow-600">
                          {unit.icon}
                        </div>
                        <div>
                          <h4 className="font-bold text-yellow-900 mb-2">{unit.title}</h4>
                          <p className="text-gray-600 text-sm mb-3">{unit.description}</p>
                          <p className="font-bold text-yellow-700">{unit.person}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* WAKIL REKTOR III */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl p-8 border-2 border-purple-200">
                <h3 className="text-2xl font-bold text-purple-900 mb-8 text-center">WAKIL REKTOR III</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {underRektorIII.map((unit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
                          {unit.icon}
                        </div>
                        <div>
                          <h4 className="font-bold text-purple-900 mb-2">{unit.title}</h4>
                          <p className="text-gray-600 text-sm mb-3">{unit.description}</p>
                          <p className="font-bold text-purple-700">{unit.person}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* LPPM */}
              <div className="bg-gradient-to-r from-red-50 to-rose-50 rounded-3xl p-8 border-2 border-red-200">
                <h3 className="text-2xl font-bold text-red-900 mb-8 text-center">LPPM</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {lppmUnit.map((unit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="bg-white rounded-2xl p-6 shadow-lg border border-red-100"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-red-600">
                          {unit.icon}
                        </div>
                        <div>
                          <h4 className="font-bold text-red-900 mb-2">{unit.title}</h4>
                          <p className="text-gray-600 text-sm mb-3">{unit.description}</p>
                          <p className="font-bold text-red-700">{unit.person}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  {additionalUnits.filter(unit => unit.title === 'SEKRETARIS LPPM').map((unit, index) => (
                    <motion.div
                      key={`secretary-${index}`}
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: (index + 1) * 0.1 }}
                      className="bg-white rounded-2xl p-6 shadow-lg border border-red-100"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-red-600">
                          {unit.icon}
                        </div>
                        <div>
                          <h4 className="font-bold text-red-900 mb-2">{unit.title}</h4>
                          <p className="text-gray-600 text-sm mb-3">{unit.description}</p>
                          <p className="font-bold text-red-700">{unit.person}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* UNIT PENDUKUNG */}
              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-3xl p-8 border-2 border-teal-200">
                <h3 className="text-2xl font-bold text-teal-900 mb-8 text-center">UNIT PENDUKUNG</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {additionalUnits.filter(unit => unit.title !== 'SEKRETARIS LPPM').map((unit, index) => (
                    <motion.div
                      key={`support-${index}`}
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="bg-white rounded-2xl p-6 shadow-lg border border-teal-100"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center text-teal-600">
                          {unit.icon}
                        </div>
                        <div>
                          <h4 className="font-bold text-teal-900 mb-2">{unit.title}</h4>
                          <p className="text-gray-600 text-sm mb-3">{unit.description}</p>
                          <p className="font-bold text-teal-700">{unit.person}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FACULTIES SECTION */}
        <section className="py-16 md:py-32 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
          {/* Background Elements */}
          <motion.div
            style={{
              y: useTransform(scrollYProgress, [0.4, 0.6], [0, 40])
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
                6 Fakultas UNIPAS Morotai
              </h2>
              <p className="text-base md:text-xl text-gray-600 max-w-2xl md:max-w-3xl mx-auto">
                Berbagai bidang ilmu untuk kemajuan bangsa
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl md:max-w-6xl mx-auto">
              {faculties.map((faculty, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/90 backdrop-blur-sm rounded-xl md:rounded-2xl shadow-xl border border-unipas-primary/20 p-4 md:p-6 hover:shadow-2xl transition-all duration-300 text-center"
                >
                  <motion.div
                    animate={{ rotate: [0, 5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-unipas-primary to-unipas-accent rounded-lg flex items-center justify-center mx-auto mb-3 md:mb-4"
                  >
                    <Award className="h-4 w-4 md:h-5 md:w-5 text-white" />
                  </motion.div>
                  <p className="font-bold text-sm md:text-base text-unipas-primary">
                    {faculty}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* VALUES SECTION */}
        <section className="py-16 md:py-32 bg-gradient-to-br from-unipas-primary to-unipas-accent relative overflow-hidden">
          {/* Background Elements */}
          <motion.div
            style={{
              y: useTransform(scrollYProgress, [0.6, 0.8], [0, 50])
            }}
            className="absolute inset-0 overflow-hidden"
          >
            <div className="absolute top-20 right-20 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-20 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
            
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
                className="absolute w-3 h-3 bg-white/30 rounded-full"
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
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-white mb-4 md:mb-6">
                Akuntabilitas & Transparansi
              </h2>
              <p className="text-base md:text-xl text-white/90 max-w-2xl md:max-w-3xl mx-auto">
                Struktur organisasi UNIPAS Morotai dirancang untuk memastikan akuntabilitas dan transparansi
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-4xl md:max-w-6xl mx-auto">
              {values.map((value, index) => {
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -10 }}
                    className="bg-white/20 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-8 text-center hover:bg-white/30 transition-all duration-300"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="w-16 h-16 md:w-20 md:h-20 bg-white/30 rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6"
                    >
                      {value.icon}
                    </motion.div>
                    <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">
                      {value.title}
                    </h3>
                    <p className="text-sm md:text-base text-white/80">
                      {value.description}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
