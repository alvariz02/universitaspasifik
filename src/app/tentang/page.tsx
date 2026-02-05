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
  Building
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
      icon: Users,
      color: 'from-blue-600 to-blue-800'
    },
    {
      title: 'Inovasi (Innovation)',
      description: 'Berani bereksperimen, mengadopsi teknologi baru, dan menciptakan solusi kreatif',
      icon: Lightbulb,
      color: 'from-purple-600 to-purple-800'
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
    <div className="min-h-screen flex flex-col bg-unipas-muted">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-linear-to-br from-unipas-primary via-unipas-accent to-unipas-primary text-white">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Tentang Universitas Pasifik Morotai
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Mengenal lebih dekat visi, misi, dan komitmen UNIPAS Morotai dalam mewujudkan pendidikan unggul berbasis potensi lokal di kawasan Pasifik
            </p>
          </motion.div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="sticky top-0 bg-white border-b border-unipas-primary/20 z-40 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 py-4">
            {sections.map((section) => {
              const Icon = section.icon
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    activeSection === section.id
                      ? 'bg-linear-to-r from-unipas-primary to-unipas-accent text-white shadow-lg'
                      : 'bg-unipas-muted text-unipas-primary hover:bg-unipas-primary/10'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{section.title}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="container mx-auto px-4 py-12">
        {/* Latar Belakang */}
        {activeSection === 'latar-belakang' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-xl shadow-lg border border-unipas-primary/20 overflow-hidden">
                <div className="bg-linear-to-r from-unipas-primary to-unipas-accent text-white p-6">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <BookOpen className="h-6 w-6" />
                  1.1 Latar Belakang
                </h2>
              </div>
              <div className="p-8 space-y-6 text-unipas-text leading-relaxed">
                <p className="text-lg">
                  Universitas Pasifik Morotai (UNIPAS) Morotai merupakan perguruan tinggi yang berlokasi di Provinsi Maluku Utara, khususnya di Kabupaten Pulau Morotai yang merupakan kawasan kepulauan dan perbatasan yang memiliki posisi penting dalam dinamika perkembangan kawasan Pasifik.
                </p>
                <p>
                  Selaras dengan visi universitas, yaitu <strong>"Unggul dalam Ilmu Pengetahuan, Teknologi, dan Seni di Kawasan Pasifik Berbasis Potensi Lokal"</strong>, UNIPAS Morotai diarahkan untuk menjadi pusat pengembangan sumber daya manusia dan pengetahuan yang relevan dengan karakteristik wilayah kepulauan serta tantangan pembangunan daerah.
                </p>
                <p>
                  Sebagai institusi pendidikan tinggi di kawasan perbatasan, UNIPAS Morotai memikul tanggung jawab strategis dalam menyiapkan sumber daya manusia yang unggul, adaptif, dan berdaya saing, serta mampu mengintegrasikan ilmu pengetahuan, teknologi, dan seni dalam pengelolaan potensi lokal secara berkelanjutan.
                </p>
                <div className="bg-unipas-muted rounded-lg p-6 border-l-4 border-unipas-accent">
                  <h3 className="font-semibold text-unipas-primary mb-3">Potensi Lokal Morotai</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-4 w-4 text-unipas-accent mt-1 shrink-0" />
                      <span>Sektor kelautan dan perikanan</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-4 w-4 text-unipas-accent mt-1 shrink-0" />
                      <span>Pariwisata bahari</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-4 w-4 text-unipas-accent mt-1 shrink-0" />
                      <span>Pertanian</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-4 w-4 text-unipas-accent mt-1 shrink-0" />
                      <span>Ekonomi kreatif berbasis kearifan lokal</span>
                    </li>
                  </ul>
                </div>
                <p>
                  Di sisi lain, UNIPAS Morotai masih menghadapi sejumlah tantangan strategis, antara lain keterbatasan infrastruktur kampus, perlunya peningkatan kualitas dan daya saing publikasi ilmiah dosen, keterbatasan sumber daya dosen, serta tantangan dalam meningkatkan daya tarik institusi bagi mahasiswa dari luar daerah.
                </p>
                <p>
                  Sebagai respons atas peluang dan tantangan tersebut, UNIPAS Morotai menyusun Rencana Strategis (Renstra) Tahun 2025–2030 sebagai dokumen perencanaan komprehensif yang menjadi pedoman pengembangan universitas secara berkelanjutan.
                </p>
                <div className="bg-linear-to-r from-unipas-accent/10 to-unipas-primary/10 rounded-lg p-6 border border-unipas-primary/20">
                  <h3 className="font-semibold text-unipas-primary mb-3">Konsep Kampus Berdampak</h3>
                  <p>
                    Renstra ini dirancang dengan mengadopsi konsep Kampus Berdampak, yaitu paradigma pengelolaan perguruan tinggi yang menekankan bahwa keunggulan akademik tidak hanya diukur dari capaian administratif dan publikasi ilmiah, tetapi juga dari dampak nyata ilmu pengetahuan, teknologi, dan seni terhadap peningkatan kesejahteraan masyarakat, penguatan tata kelola daerah, serta pembangunan ekonomi lokal berbasis potensi wilayah.
                  </p>
                </div>
                <p className="text-lg font-semibold text-unipas-primary">
                  Melalui pendekatan Kampus Berdampak yang berlandaskan visi keunggulan di kawasan Pasifik, UNIPAS Morotai menempatkan dosen dan mahasiswa sebagai agen perubahan yang berperan aktif dalam menjawab persoalan-persoalan strategis daerah.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Dasar Hukum */}
        {activeSection === 'dasar-hukum' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-xl shadow-lg border border-unipas-primary/20 overflow-hidden">
              <div className="bg-linear-to-r from-unipas-primary to-unipas-accent text-white p-6">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <Building className="h-6 w-6" />
                  1.2 Dasar Hukum dan Kebijakan
                </h2>
              </div>
              <div className="p-8">
                <p className="text-unipas-text mb-6">
                  Rencana Strategis UNIPAS Morotai 2025–2030 disusun berdasarkan:
                </p>
                <div className="space-y-3">
                  {[
                    'Undang-Undang Nomor 20 Tahun 2003 tentang Sistem Pendidikan Nasional',
                    'Peraturan Pemerintah Nomor 19 Tahun 2005 tentang Standar Nasional Pendidikan (sebagaimana diubah)',
                    'Peraturan Pemerintah Nomor 17 Tahun 2010 tentang Pengelolaan dan Penyelenggaraan Pendidikan',
                    'Peraturan Menteri Pendidikan, Kebudayaan, Riset, dan Teknologi terkait Sistem Penjaminan Mutu Internal Perguruan Tinggi',
                    'Rencana Pembangunan Jangka Menengah Nasional (RPJMN) 2020–2024 dan pengembangannya',
                    'Kebijakan Pemerintah Daerah Maluku Utara dan Kabupaten Morotai tentang Pengembangan Pendidikan Tinggi dan SDM',
                    'Standar akreditasi institusi dan program studi dari Badan Akreditasi Nasional Perguruan Tinggi (BAN-PT)',
                    'Statuta Universitas Pasifik',
                    'Visi dan Misi Rektor Universitas Pasifik Morotai'
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-unipas-muted rounded-lg hover:bg-unipas-primary/5 transition-colors">
                      <span className="shrink-0 w-6 h-6 bg-unipas-accent text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </span>
                      <span className="text-unipas-text">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tujuan Penyusunan */}
        {activeSection === 'tujuan' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-xl shadow-lg border border-unipas-primary/20 overflow-hidden">
              <div className="bg-linear-to-r from-unipas-primary to-unipas-accent text-white p-6">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <Target className="h-6 w-6" />
                  1.3 Tujuan Penyusunan Renstra
                </h2>
              </div>
              <div className="p-8">
                <p className="text-unipas-text mb-6">
                  Renstra UNIPAS Morotai 2025–2030 disusun dengan tujuan:
                </p>
                <div className="grid gap-4">
                  {[
                    {
                      title: 'Positioning Strategis',
                      description: 'Menetapkan arah pengembangan dan positioning UNIPAS Morotai sebagai pusat pendidikan unggul berbasis potensi lokal dalam kurun waktu 2025–2030.'
                    },
                    {
                      title: 'Pedoman Strategis',
                      description: 'Memberikan pedoman strategis bagi seluruh pimpinan, dosen, tenaga kependidikan, dan mahasiswa dalam melaksanakan peran dan tanggung jawab masing-masing.'
                    },
                    {
                      title: 'Rujukan Perencanaan',
                      description: 'Menjadi rujukan bagi penyusunan Rencana Kerja Tahunan (RKT) dan Rencana Operasional (ROP) setiap tahun dalam periode Renstra.'
                    },
                    {
                      title: 'Koordinasi dan Sinergi',
                      description: 'Meningkatkan koordinasi dan sinergi antar unit kerja, fakultas, dan program studi dalam mencapai target bersama.'
                    },
                    {
                      title: 'Monitoring dan Evaluasi',
                      description: 'Menjadi instrumen monitoring, evaluasi, dan pelaporan kinerja pencapaian target Renstra kepada pemangku kepentingan internal dan eksternal.'
                    }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-linear-to-r from-unipas-muted to-white p-6 rounded-lg border-l-4 border-unipas-accent hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start gap-4">
                        <div className="shrink-0 w-8 h-8 bg-unipas-accent text-white rounded-full flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-semibold text-unipas-primary mb-2">{item.title}</h3>
                          <p className="text-unipas-text">{item.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Visi & Misi */}
        {activeSection === 'visi-misi' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto space-y-8"
          >
            {/* Visi */}
            <div className="bg-white rounded-xl shadow-lg border border-unipas-primary/20 overflow-hidden">
              <div className="bg-linear-to-r from-unipas-primary to-unipas-accent text-white p-6">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <Award className="h-6 w-6" />
                  2.1 Visi
                </h2>
              </div>
              <div className="p-8">
                <div className="bg-linear-to-r from-unipas-accent/10 to-unipas-primary/10 rounded-lg p-6 border border-unipas-primary/20">
                  <p className="text-xl font-semibold text-unipas-primary text-center italic">
                    "Pada tahun 2030, Universitas Pasifik Morotai menjadi pusat pendidikan unggul berbasis potensi lokal yang inovatif dan berdaya saing di kawasan Pasifik."
                  </p>
                </div>
                <p className="text-unipas-text mt-6 leading-relaxed">
                  Visi ini mencerminkan aspirasi jangka panjang UNIPAS Morotai untuk menjadi institusi pendidikan terkemuka yang tidak hanya menyediakan pendidikan berkualitas tinggi, tetapi juga mampu memanfaatkan potensi lokal Morotai dalam setiap aspek akademik, riset, dan pengabdian kepada masyarakat. Penekanan pada <strong>"inovatif dan berdaya saing"</strong> mengindikasikan komitmen terhadap modernisasi, pemanfaatan teknologi, dan kemampuan bersaing di tingkat nasional dan regional.
                </p>
              </div>
            </div>

            {/* Misi */}
            <div className="bg-white rounded-xl shadow-lg border border-unipas-primary/20 overflow-hidden">
              <div className="bg-linear-to-r from-unipas-primary to-unipas-accent text-white p-6">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <Target className="h-6 w-6" />
                  2.2 Misi
                </h2>
              </div>
              <div className="p-8">
                <p className="text-unipas-text mb-6">
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
                          <h3 className="font-semibold text-unipas-primary mb-2">
                            {index + 1}. {mission.title}
                          </h3>
                          <p className="text-unipas-text">{mission.description}</p>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Tujuan Strategis */}
            <div className="bg-white rounded-xl shadow-lg border border-unipas-primary/20 overflow-hidden">
              <div className="bg-linear-to-r from-unipas-primary to-unipas-accent text-white p-6">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <Target className="h-6 w-6" />
                  2.3 Tujuan Strategis
                </h2>
              </div>
              <div className="p-8">
                <p className="text-unipas-text mb-6">
                  Dalam periode 2025–2030, UNIPAS Morotai menetapkan tujuan strategis sebagai berikut:
                </p>
                <div className="grid gap-4">
                  {[
                    'Meningkatkan mutu, relevansi, dan daya saing pendidikan melalui penyempurnaan kurikulum, peningkatan akreditasi, dan penguatan kapasitas dosen',
                    'Meningkatkan kuantitas dan kualitas riset serta publikasi ilmiah yang berdampak pada pembangunan daerah dan berkontribusi pada pengetahuan nasional-global',
                    'Meningkatkan kompetensi dan employability lulusan melalui pelatihan kewirausahaan, magang, dan penguatan soft skills',
                    'Mengembangkan infrastruktur kampus yang modern, berkelanjutan, dan mendukung pembelajaran inovatif',
                    'Memperkuat sistem tata kelola berbasis good governance dan budaya mutu di seluruh level organisasi',
                    'Memperluas dan memperkuat jejaring kemitraan strategis dengan berbagai stakeholder nasional dan internasional'
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 border-l-4 border-unipas-accent bg-unipas-muted rounded-r-lg">
                      <span className="shrink-0 w-6 h-6 bg-unipas-accent text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </span>
                      <span className="text-unipas-text">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Nilai-Nilai Inti */}
        {activeSection === 'nilai-inti' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-xl shadow-lg border border-unipas-primary/20 overflow-hidden">
              <div className="bg-linear-to-r from-unipas-primary to-unipas-accent text-white p-6">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <Lightbulb className="h-6 w-6" />
                  2.4 Nilai-Nilai Inti (Core Values)
                </h2>
              </div>
              <div className="p-8">
                <p className="text-unipas-text mb-8">
                  Dalam menjalankan visi dan misi, UNIPAS Morotai berpedoman pada nilai-nilai inti:
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
                        <div className={`w-16 h-16 bg-linear-to-r ${value.color} rounded-xl flex items-center justify-center text-white mb-4`}>
                          <Icon className="h-8 w-8" />
                        </div>
                        <h3 className="font-bold text-unipas-primary mb-3">{value.title}</h3>
                        <p className="text-unipas-text leading-relaxed">{value.description}</p>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
      </main>
      <Footer />
    </div>
  )
}
