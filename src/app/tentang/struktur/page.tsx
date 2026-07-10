'use client'

import { useScroll, useTransform, motion } from 'framer-motion'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Users, Building2, Briefcase, Shield, Award, Target, Zap, GraduationCap, BookOpen } from 'lucide-react'

export default function StrukturPage() {
  const { scrollYProgress } = useScroll()

  // ==========================================================
  // TOP LEVEL — Yayasan
  // ==========================================================
  const yayasan = {
    icon: <Building2 className="h-6 w-6" />,
    title: 'YAYASAN PERGURUAN TINGGI MOROTAI',
    description: 'Badan penyelenggara pendidikan tinggi Universitas Pasifik Morotai',
    person: 'Yayasan Perguruan Tinggi Morotai',
  }

  // ==========================================================
  // PIMPINAN UTAMA — Rektor & Senat (sejajar, di bawah Yayasan)
  // ==========================================================
  const organizationalUnits = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'REKTOR',
      description: 'Pimpinan Utama Universitas',
      person: 'Irfan Hi. Abd. Rahman, ST., MT.',
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'SENAT UNIVERSITAS',
      description: 'Badan legislatif tertinggi universitas',
      person: 'Senat Universitas',
    }
  ]

  // ==========================================================
  // WAKIL REKTOR I -> BIRO ADM. AKADEMIK & KEMAHASISWAAN -> Bagian
  // ==========================================================
  const underRektor = [
    {
      icon: <Users className="h-6 w-6" />,
      title: 'WAKIL REKTOR I',
      description: 'Bidang Akademik dan Kemahasiswaan',
      person: 'Subhan Hayun, S.Pd., M.Pd.',
    },
    {
      icon: <Building2 className="h-6 w-6" />,
      title: 'BIRO ADM. AKADEMIK & KEMAHASISWAAN',
      description: 'Pengelolaan administrasi akademik dan kemahasiswaan',
      person: 'M. Reza Kusman, ST., M.Ling.',
    }
  ]

  const underBiroAkademik = [
    {
      icon: <Briefcase className="h-6 w-6" />,
      title: 'BAGIAN ADM. AKADEMIK',
      description: 'Administrasi akademik',
      person: 'Radiatul Adawiyah Hi. Hasan, S.Pd.',
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'BAGIAN KEMAHASISWAAN',
      description: 'Administrasi kemahasiswaan',
      person: 'Surdin Hajimat, SE.',
    }
  ]

  // ==========================================================
  // WAKIL REKTOR II -> BIRO ADM. UMUM & KEUANGAN -> Bagian x3
  // ==========================================================
  const underRektorII = [
    {
      icon: <Users className="h-6 w-6" />,
      title: 'WAKIL REKTOR II',
      description: 'Bidang Administrasi Umum dan Keuangan',
      person: 'Aminullah Thaib, ST., MT.',
    },
    {
      icon: <Building2 className="h-6 w-6" />,
      title: 'BIRO ADM. UMUM & KEUANGAN',
      description: 'Pengelolaan administrasi umum dan keuangan',
      person: 'Asri Dzafar, ST.',
    }
  ]

  const underBiroUmum = [
    {
      icon: <Briefcase className="h-6 w-6" />,
      title: 'BAGIAN ADM. UMUM',
      description: 'Administrasi umum',
      person: 'Asri Dzafar, ST.',
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: 'BAGIAN ADM. KEUANGAN',
      description: 'Administrasi keuangan',
      person: 'Marwis Aswan, ST., M.Ling.',
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'BAGIAN KEPEGAWAIAN',
      description: 'Administrasi kepegawaian',
      person: 'Abd Halil Topora, ST.',
    }
  ]

  // ==========================================================
  // WAKIL REKTOR III -> BIRO KERJASAMA, ALUMNI & SISTEM INFORMASI
  // ==========================================================
  const underRektorIII = [
    {
      icon: <Users className="h-6 w-6" />,
      title: 'WAKIL REKTOR III',
      description: 'Bidang Kerjasama, Alumni, dan Sistem Informasi',
      person: 'Amrin Sbua, S.Pd., M.Si.',
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: 'BIRO KERJASAMA, ALUMNI & SISTEM INFORMASI',
      description: 'Pengelolaan kerjasama, alumni, dan sistem informasi',
      person: 'Risaldi Posu, S.Sos., M.Si.',
    }
  ]

  // ==========================================================
  // LPM & LPPM — sejajar dengan Dekan, langsung di bawah Rektor
  // ==========================================================
  const lpmLppm = [
    {
      icon: <Award className="h-6 w-6" />,
      title: 'LPM',
      description: 'Lembaga Penjaminan Mutu',
      person: 'Rizki R Sarapung',
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: 'LPPM',
      description: 'Lembaga Penelitian dan Pengabdian kepada Masyarakat',
      person: 'Sukarmin Idrus, S.Pi., M.Si.',
    }
  ]

  // ==========================================================
  // FAKULTAS: DEKAN -> SEK -> KET. PRODI (sesuai bagan foto)
  // ==========================================================
  const faculties = [
    {
      dekan: 'DEKAN FKIP',
      fakultas: 'Fakultas Keguruan dan Ilmu Pendidikan',
      prodi: ['Ket. Prodi PGSD', 'Ket. Prodi Bahasa Inggris']
    },
    {
      dekan: 'DEKAN MIPA',
      fakultas: 'Fakultas Matematika dan Ilmu Pengetahuan Alam',
      prodi: ['Ket. Prodi Matematika']
    },
    {
      dekan: 'DEKAN FAK. TEKNIK',
      fakultas: 'Fakultas Teknik',
      prodi: ['Ket. Prodi Tek. Sipil', 'Ket. Prodi Tek. Industri', 'Ket. Prodi Tek. Lingkungan', 'Ket. Prodi Tek. Informatika']
    },
    {
      dekan: 'DEKAN FISIPOL',
      fakultas: 'Fakultas Ilmu Sosial dan Ilmu Politik',
      prodi: ['Ket. Prodi Adm. Negara']
    },
    {
      dekan: 'DEKAN FAK. EKONOMI',
      fakultas: 'Fakultas Ekonomi',
      prodi: ['Ket. Prodi Akuntansi']
    },
    {
      dekan: 'DEKAN FPIK',
      fakultas: 'Fakultas Perikanan dan Ilmu Kelautan',
      prodi: ['Ket. Prodi Kelautan', 'Ket. Prodi THP']
    }
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

  // Small reusable card
  function UnitCard({ unit, colorClass }: { unit: { icon: JSX.Element; title: string; description: string; person: string }; colorClass: string }) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className={`bg-white rounded-2xl p-6 shadow-lg border ${colorClass}`}
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-unipas-primary flex-shrink-0">
            {unit.icon}
          </div>
          <div>
            <h4 className="font-bold text-unipas-primary mb-2">{unit.title}</h4>
            <p className="text-gray-600 text-sm mb-3">{unit.description}</p>
            <p className="font-bold text-unipas-accent">{unit.person}</p>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      <Header />
      <main className="flex-1">
        {/* ORGANIZATIONAL UNITS SECTION */}
        <section className="py-16 md:py-32 relative overflow-hidden">
          <motion.div
            style={{ y: useTransform(scrollYProgress, [0.2, 0.4], [0, 30]) }}
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
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-unipas-primary mb-4 md:mb-6">
                Struktur Organisasi
              </h1>
              <p className="text-base md:text-xl text-gray-600 max-w-2xl md:max-w-3xl mx-auto">
                Struktur organisasi Universitas Pasifik Morotai yang transparan dan akuntabel
              </p>
            </motion.div>

            {/* YAYASAN */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto mb-4"
            >
              <div className="bg-unipas-primary text-white rounded-2xl p-6 text-center shadow-xl">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  {yayasan.icon}
                </div>
                <h3 className="text-lg font-bold mb-1">{yayasan.title}</h3>
                <p className="text-white/80 text-sm">{yayasan.description}</p>
              </div>
            </motion.div>
            <div className="w-px h-10 bg-gray-300 mx-auto"></div>

            {/* PIMPINAN UTAMA: REKTOR + SENAT */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8"
            >
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-unipas-primary mb-4 md:mb-6">
                Pimpinan Utama
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl md:max-w-6xl mx-auto mb-16">
              {organizationalUnits.map((unit, index) => (
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
                      <h3 className="text-lg md:text-xl font-bold text-unipas-primary mb-2 md:mb-3">{unit.title}</h3>
                      <p className="text-gray-600 text-sm md:text-base mb-3 md:mb-4 leading-relaxed">{unit.description}</p>
                      <p className="text-sm md:text-base font-bold text-unipas-accent">{unit.person}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* DI BAWAH REKTOR: 3 WAKIL REKTOR */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12 md:mb-20"
            >
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-unipas-primary mb-4 md:mb-6">
                Di Bawah Rektor
              </h2>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-6 mb-16">
              {/* WAKIL REKTOR I branch */}
              <div className="bg-gradient-to-b from-blue-50 to-cyan-50 rounded-3xl p-6 border-2 border-blue-200 space-y-4">
                <h3 className="text-xl font-bold text-blue-900 text-center mb-2">WAKIL REKTOR I</h3>
                {underRektor.map((unit, i) => <UnitCard key={i} unit={unit} colorClass="border-blue-100" />)}
                <div className="pt-2 grid gap-4">
                  {underBiroAkademik.map((unit, i) => <UnitCard key={i} unit={unit} colorClass="border-blue-100" />)}
                </div>
              </div>

              {/* WAKIL REKTOR II branch */}
              <div className="bg-gradient-to-b from-green-50 to-emerald-50 rounded-3xl p-6 border-2 border-green-200 space-y-4">
                <h3 className="text-xl font-bold text-green-900 text-center mb-2">WAKIL REKTOR II</h3>
                {underRektorII.map((unit, i) => <UnitCard key={i} unit={unit} colorClass="border-green-100" />)}
                <div className="pt-2 grid gap-4">
                  {underBiroUmum.map((unit, i) => <UnitCard key={i} unit={unit} colorClass="border-green-100" />)}
                </div>
              </div>

              {/* WAKIL REKTOR III branch */}
              <div className="bg-gradient-to-b from-purple-50 to-pink-50 rounded-3xl p-6 border-2 border-purple-200 space-y-4">
                <h3 className="text-xl font-bold text-purple-900 text-center mb-2">WAKIL REKTOR III</h3>
                {underRektorIII.map((unit, i) => <UnitCard key={i} unit={unit} colorClass="border-purple-100" />)}
              </div>
            </div>

            {/* LPM, LPPM & FAKULTAS — sejajar langsung di bawah Rektor */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12 md:mb-20"
            >
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-unipas-primary mb-4 md:mb-6">
                LPM, LPPM &amp; Fakultas
              </h2>
              <p className="text-base md:text-xl text-gray-600 max-w-2xl md:max-w-3xl mx-auto">
                Unit dan fakultas yang berada langsung di bawah Rektor
              </p>
            </motion.div>

            {/* LPM & LPPM */}
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
              {lpmLppm.map((unit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-red-100"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-red-600 flex-shrink-0">
                      {unit.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-red-900 mb-2">{unit.title}</h4>
                      <p className="text-gray-600 text-sm mb-3">{unit.description}</p>
                      <p className="font-bold text-red-700">{unit.person}</p>
                      {unit.sekretaris && (
                        <p className="text-sm text-gray-500 mt-2">Sekretaris: <span className="font-semibold text-red-700">{unit.sekretaris}</span></p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* FAKULTAS: DEKAN -> SEK -> KET. PRODI */}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {faculties.map((fac, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-unipas-primary/20 p-6 flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-unipas-primary to-unipas-accent rounded-xl flex items-center justify-center text-white flex-shrink-0">
                      <GraduationCap className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-unipas-primary leading-tight">{fac.dekan}</h4>
                      <p className="text-xs text-gray-500">{fac.fakultas}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 my-2 pl-1">
                    <div className="w-6 h-6 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 flex-shrink-0">
                      <BookOpen className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-xs font-semibold text-gray-500">SEK (Sekretaris Fakultas)</span>
                  </div>

                  <div className="border-t border-dashed border-gray-200 pt-3 mt-1 grid grid-cols-1 gap-2">
                    {fac.prodi.map((p, pi) => (
                      <div key={pi} className="bg-gray-50 rounded-lg px-3 py-2 text-sm font-medium text-unipas-primary">
                        {p}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* VALUES SECTION */}
        <section className="py-16 md:py-32 bg-gradient-to-br from-unipas-primary to-unipas-accent relative overflow-hidden">
          <motion.div
            style={{ y: useTransform(scrollYProgress, [0.6, 0.8], [0, 50]) }}
            className="absolute inset-0 overflow-hidden"
          >
            <div className="absolute top-20 right-20 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-20 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -20, 0], opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-3 h-3 bg-white/30 rounded-full"
                style={{ left: `${10 + i * 15}%`, top: `${20 + (i % 3) * 30}%` }}
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
                Akuntabilitas &amp; Transparansi
              </h2>
              <p className="text-base md:text-xl text-white/90 max-w-2xl md:max-w-3xl mx-auto">
                Struktur organisasi UNIPAS Morotai dirancang untuk memastikan akuntabilitas dan transparansi
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-4xl md:max-w-6xl mx-auto">
              {values.map((value, index) => (
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
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">{value.title}</h3>
                  <p className="text-sm md:text-base text-white/80">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}