'use client'

import { motion } from 'framer-motion'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { 
  BookOpen, 
  GraduationCap, 
  Clock,
  Calendar,
  Award,
  Users,
  Building,
  ChevronRight,
  Anchor,
  Flag
} from 'lucide-react'

export default function SejarahPage() {
  const milestones = [
    {
      year: '2012',
      title: 'Momentum Sail Indonesia',
      description: 'Kabupaten Pulau Morotai ditunjuk sebagai penyelenggara Sail Indonesia di Morotai',
      icon: Anchor,
      color: 'from-blue-600 to-blue-800'
    },
    {
      year: '2012',
      title: 'Visi Bupati Rusli Sibua',
      description: 'Drs. Rusli Sibua, M.Si memanfaatkan momentum untuk mewujudkan masyarakat Morotai yang maju dan sejahtera melalui pendidikan',
      icon: Users,
      color: 'from-unipas-primary to-unipas-accent'
    },
    {
      year: '5 Februari 2013',
      title: 'Izin Operasional',
      description: 'Mendapat izin operasional dari Kementerian Pendidikan dan Kebudayaan RI Nomor 08/E/O/2013',
      icon: Award,
      color: 'from-green-600 to-green-800'
    },
    {
      year: '5 Februari 2013',
      title: 'Perubahan SK',
      description: 'Surat Keputusan Mendikbud RI Nomor: 45/E/O/2013 menambah 1 program studi',
      icon: Calendar,
      color: 'from-purple-600 to-purple-800'
    },
    {
      year: '2013',
      title: 'Awal Perjalanan',
      description: '6 fakultas dan 11 program studi pertama kali diselenggarakan',
      icon: GraduationCap,
      color: 'from-orange-600 to-orange-800'
    }
  ]

  const keyFigures = [
    {
      name: 'Drs. Rusli Sibua, M.Si',
      role: 'Bupati Pulau Morotai & Ketua Dewan Pembina Yayasan',
      contribution: 'Visioner pendirian UNIPAS Morotai untuk kemajuan masyarakat',
      icon: Users
    },
    {
      name: 'Alm. Sudirman',
      role: 'Ketua Yayasan',
      contribution: 'Penggerak utama dalam proses pendirian dan pengembangan',
      icon: Building
    },
    {
      name: 'Sulami Sibua',
      role: 'Rektor Pertama',
      contribution: 'Pemimpin awal yang menetapkan fondasi akademik',
      icon: GraduationCap
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
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <Clock className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Sejarah Universitas Pasifik Morotai
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Perjalanan panjang UNIPAS Morotai dari visi hingga menjadi perguruan tinggi unggul di kawasan perbatasan
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="bg-white rounded-xl shadow-lg border border-unipas-primary/20 overflow-hidden">
            <div className="p-8">
              <div className="flex items-start gap-6">
                <div className="shrink-0">
                  <div className="w-16 h-16 bg-linear-to-r from-unipas-primary to-unipas-accent rounded-xl flex items-center justify-center text-white">
                    <BookOpen className="h-8 w-8" />
                  </div>
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-unipas-primary">Awal Mula Perjuangan</h2>
                  <div className="text-unipas-text leading-relaxed space-y-4">
                    <p>
                      Pada tahun 2012 ketika Kabupaten Pulau Morotai ditunjuk sebagai penyelenggara Sail Indonesia di Morotai, <strong>Drs. Rusli Sibua, M.Si</strong> selaku Bupati Pulau Morotai memanfaatkan momentum tersebut untuk mewujudkan impian agar masyarakat Morotai dapat maju dan sejahtera setara dengan daerah lain di Indonesia melalui pendidikan.
                    </p>
                    <div className="bg-unipas-muted rounded-lg p-6 border-l-4 border-unipas-accent">
                      <h3 className="font-semibold text-unipas-primary mb-3">Latar Belakang Pendirian</h3>
                      <p>
                        Keinginan tersebut didasarkan pada keprihatinan beliau di saat itu karena tingginya angka putus sekolah dari jenjang pendidikan menengah atas (SMA) ke perguruan tinggi dan untuk menjawab permasalahan tersebut tidak ada pilihan lain yang dipilihnya terkecuali mendirikan perguruan tinggi di Kabupaten Pulau Morotai.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-unipas-primary mb-2">Perjalanan Waktu</h2>
            <p className="text-unipas-text">Milestone penting dalam sejarah UNIPAS Morotai</p>
          </div>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-linear-to-b from-unipas-primary to-unipas-accent"></div>
            
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon
              const isLeft = index % 2 === 0
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex items-center mb-8 ${isLeft ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`w-5/12 ${isLeft ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <div className="bg-white rounded-xl shadow-lg border border-unipas-primary/20 p-6 hover:shadow-xl transition-shadow">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-12 h-12 bg-linear-to-r ${milestone.color} rounded-lg flex items-center justify-center text-white`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-unipas-accent">{milestone.year}</div>
                          <div className="text-lg font-bold text-unipas-primary">{milestone.title}</div>
                        </div>
                      </div>
                      <p className="text-unipas-text">{milestone.description}</p>
                    </div>
                  </div>
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white border-4 border-unipas-accent rounded-full z-10"></div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Key Figures */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-unipas-primary mb-2">Tokoh Pendiri</h2>
            <p className="text-unipas-text">Visioner di balik berdirinya UNIPAS Morotai</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {keyFigures.map((figure, index) => {
              const Icon = figure.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg border border-unipas-primary/20 overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="bg-linear-to-r from-unipas-primary to-unipas-accent p-4 text-white">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-bold text-lg">{figure.name}</h3>
                    <p className="text-white/90 text-sm">{figure.role}</p>
                  </div>
                  <div className="p-4">
                    <p className="text-unipas-text text-sm">{figure.contribution}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Development Journey */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="bg-white rounded-xl shadow-lg border border-unipas-primary/20 overflow-hidden">
            <div className="bg-linear-to-r from-unipas-primary to-unipas-accent text-white p-6">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Flag className="h-6 w-6" />
                Perjalanan Pengembangan
              </h2>
            </div>
            <div className="p-8">
              <div className="space-y-4 text-unipas-text leading-relaxed">
                <p>
                  Dengan semangat dan keyakinan yang kuat untuk mensejahterakan warganya melalui pendidikan maka pada tanggal 5 Februari Tahun 2013 kerja keras Bupati dan Pengurus Yayasan Perguruan Morotai berhasil mendapatkan izin operasional dari Kementerian Pendidikan dan Kebudayaan Republik Indonesia Nomor 08/E/O/2013 tentang Izin Pendirian Universitas Pasifik Morotai di Kabupaten Pulau Morotai Provinsi Maluku Utara, yang diselenggarakan oleh Yayasan Perguruan Morotai.
                </p>
                <p>
                  Di awal pendirian Universitas Pasifik Morotai program pendidikan yang diselenggarakan berjumlah 6 fakultas dan 10 program studi. Namun berselang satu bulan kemudian dikeluarkan perubahan Surat Keputusan Menteri Pendidikan dan Kebudayaan Republik Indonesia Nomor: 45/E/O/2013 Tanggal 5 Februari 2013 bertambah satu program studi sehingga total program pendidikan yang diselenggarakan di Universitas Pasifik Morotai berjumlah 11 program studi.
                </p>
                <p>
                  Dalam perjalanannya UNIPAS Morotai, sebagai perguruan tinggi mengalami berbagai dinamika, akan tetapi kerja keras para tokoh, seperti Drs. Rusli Sibua sebagai ketua Dewan Pembina Yayasan, dan Alm. Sudirman sebagai Ketua Yayasan serta Sulami Sibua sebagai rektor pertama serta beberapa tokoh lainnya dan didukung oleh pemerintah daerah Kabupaten Pulau Morotai secara berkelanjutan serta konsisten memajukan UNIPAS, maka UNIPAS Morotai perlahan dan pasti menemukan jalan untuk meniti masuk sebagai perguruan tinggi yang maju dan membanggakan di masa yang akan datang.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Vision for Future */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-linear-to-r from-unipas-accent/10 to-unipas-primary/10 rounded-xl p-8 border border-unipas-primary/20">
            <div className="text-center">
                          <div className="w-16 h-16 bg-linear-to-r from-unipas-primary to-unipas-accent rounded-full flex items-center justify-center text-white mx-auto mb-6">
                <Anchor className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-bold text-unipas-primary mb-4">Visi Masa Depan</h2>
              <blockquote className="text-lg italic text-unipas-text mb-6">
                "Kami berkeyakinan UNIPAS Morotai akan dapat meretas kemajuan dan menenggelamkan ketertinggal sedalam lautan Pasifik dan menjadi pelopor serta nafigasi kedamaian serta kemajuan pendidikan tinggi di kawasan Pasifik."
              </blockquote>
              <div className="bg-white/80 rounded-lg p-6 border border-unipas-primary/20">
                <p className="text-unipas-text leading-relaxed">
                  Statuta ini menjadi dasar dalam menuntun UNIPAS Morotai menjadi perguruan tinggi yang <strong>UNGGUL</strong> di kawasan perbatasan Negara Kesatuan Republik Indonesia.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      </main>
      <Footer />
    </div>
  )
}
