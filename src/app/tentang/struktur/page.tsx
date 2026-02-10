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
      title: 'Rektor',
      description: 'Pemimpin tertinggi universitas yang bertanggung jawab atas seluruh aktivitas akademik dan non-akademik UNIPAS Morotai',
      person: 'Prof. Dr. H. M. Thamrin Ali, M.Si.'
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Wakil Rektor',
      description: 'Membantu rektor dalam bidang akademik, kemahasiswaan, dan kerjasama institusi',
      person: 'Dr. Ir. H. Abdul Gafur, M.Pd.'
    },
    {
      icon: <Building2 className="h-6 w-6" />,
      title: 'Dekan Fakultas',
      description: 'Memimpin dan mengelola setiap fakultas sesuai bidang keahlian dan visi universitas',
      person: '6 Dekan Fakultas'
    },
    {
      icon: <Briefcase className="h-6 w-6" />,
      title: 'Direktur Unit Kerja',
      description: 'Mengelola unit kerja pendukung akademik dan non-akademik',
      person: 'Direktur Unit Kerja'
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
        {/* HERO SECTION WITH PARALLAX */}
        <section className="relative min-h-[80vh] md:min-h-[90vh] overflow-hidden">
          {/* Animated Background Elements */}
          <motion.div
            style={{
              y: useTransform(scrollYProgress, [0, 0.3], [0, 50])
            }}
            className="absolute inset-0 overflow-hidden"
          >
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-unipas-primary/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-20 -left-20 w-32 h-32 bg-unipas-accent/10 rounded-full blur-xl"></div>
            
            {/* Floating Particles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute w-1 h-1 bg-unipas-primary/30 rounded-full"
                style={{
                  left: `${5 + i * 12}%`,
                  top: `${10 + (i % 4) * 20}%`,
                  animationDelay: `${i * 0.3}s`
                }}
              />
            ))}
          </motion.div>

          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-center max-w-5xl mx-auto"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="w-24 h-24 md:w-32 md:h-32 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl"
                >
                  <Building2 className="h-12 w-12 md:h-16 md:w-16 text-white" />
                </motion.div>
                
                <motion.h1
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 1 }}
                  className="text-3xl md:text-5xl lg:text-7xl xl:text-9xl font-black leading-tight mb-6 px-4"
                >
                  <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent drop-shadow-2xl">
                    Struktur Organisasi
                  </span>
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="text-lg md:text-xl lg:text-2xl leading-relaxed max-w-4xl lg:max-w-5xl mx-auto mb-8 px-4"
                >
                  <span className="bg-gradient-to-r from-white/98 via-blue-100 to-cyan-200/95 bg-clip-text text-transparent drop-shadow-xl">
                    Struktur organisasi Universitas Pasifik yang transparan dan akuntabel
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
                    className="bg-white/20 backdrop-blur-sm text-white px-6 md:px-8 py-3 md:py-4 rounded-full border border-white/30 hover:bg-white/30 transition-all duration-300 font-semibold text-sm md:text-base"
                  >
                    Jelajahi Struktur
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-unipas-primary via-cyan-600 to-unipas-accent"></div>
        </section>

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
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-unipas-primary to-unipas-accent bg-clip-text text-transparent mb-4 md:mb-6">
                Satuan Organisasi
              </h2>
              <p className="text-base md:text-xl text-gray-600 max-w-2xl md:max-w-3xl mx-auto">
                Struktur kepemimpinan yang solid dan profesional
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl md:max-w-6xl mx-auto">
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
