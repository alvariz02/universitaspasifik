import Link from 'next/link'
import { ArrowRight, GraduationCap, BookOpen, Users, Zap, Target } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

export default function CTASection() {
  const features = [
    {
      icon: <GraduationCap className="h-8 w-8" />,
      title: 'Pendidikan Berkualitas',
      description: 'Kurikulum modern dengan standar internasional'
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: 'Fasilitas Lengkap',
      description: 'Laboratorium, perpustakaan, dan fasilitas modern'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Lulusan Berkualitas',
      description: 'Alumni sukses di berbagai bidang industri'
    }
  ]

  const admissionPaths = [
    { name: 'SNBP', desc: 'Seleksi Nasional Berbasis Prestasi' },
    { name: 'SNBT', desc: 'Seleksi Nasional Berbasis Tes' },
    { name: 'SIMAK UP', desc: 'Seleksi Mandiri Universitas Pasifik' },
    { name: 'Pascasarjana', desc: 'Program Pascasarjana' }
  ]

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-unipas-primary via-unipas-accent to-unipas-primary">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-60 h-60 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute top-20 left-1/4 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
        
        {/* Floating Particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -25, 0],
              opacity: [0.2, 0.7, 0.2],
            }}
            transition={{
              duration: 5 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute w-2 h-2 bg-white/40 rounded-full"
            style={{
              left: `${3 + i * 8}%`,
              top: `${5 + (i % 6) * 15}%`,
              animationDelay: `${i * 0.2}s`
            }}
          />
        ))}

        {/* Light Beams */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute w-1 h-full bg-gradient-to-b from-transparent via-white/20 to-transparent"
            style={{
              left: `${15 + i * 25}%`,
              animationDelay: `${i * 1.5}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-5xl mx-auto text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="inline-flex items-center gap-4 mb-8"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-2xl border border-white/30"
            >
              <Target className="h-10 w-10 text-white" />
            </motion.div>
            <div className="text-left">
              <h2 className="text-5xl md:text-7xl font-black text-white leading-tight">
                Siap Bergabung dengan Keluarga Unipas?
              </h2>
            </div>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Daftarkan diri Anda sekarang dan menjadi bagian dari Universitas Pasifik Morotai,
            kampus maritim terbaik di Indonesia
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Link href="/penerimaan">
              <Button
                size="lg"
                className="group bg-white text-unipas-primary hover:bg-white/90 font-black px-12 py-6 text-xl rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-500 border-2 border-white/30 backdrop-blur-sm"
              >
                <span className="flex items-center gap-4">
                  <Zap className="h-6 w-6" />
                  Daftar Sekarang
                  <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-20"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                delay: 1 + index * 0.2, 
                duration: 0.8, 
                ease: "easeOut" 
              }}
              whileHover={{ 
                y: -15, 
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
              className="group relative"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-white/20 hover:border-white/40">
                {/* Animated Background */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10"></div>
                </div>

                <motion.div
                  initial={{ rotate: 0, scale: 0.8 }}
                  whileInView={{ rotate: 360, scale: 1 }}
                  transition={{ delay: 1.2 + index * 0.2, duration: 1 }}
                  className="bg-gradient-to-br from-white/20 to-white/10 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-xl border border-white/30"
                >
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </motion.div>
                
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 + index * 0.2 }}
                  className="text-2xl font-bold text-white text-center mb-4 group-hover:text-yellow-300 transition-colors duration-300"
                >
                  {feature.title}
                </motion.h3>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.6 + index * 0.2 }}
                  className="text-white/80 text-center leading-relaxed"
                >
                  {feature.description}
                </motion.p>

                {/* Hover Effects */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-300/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Admission Paths */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 2, duration: 0.8 }}
          className="text-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 2.2, duration: 0.8 }}
            className="text-white/80 text-lg mb-8 font-medium"
          >
            Jalur pendaftaran tersedia untuk berbagai jenjang pendidikan
          </motion.p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {admissionPaths.map((path, index) => (
              <motion.div
                key={path.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 2.4 + index * 0.1, duration: 0.6 }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
              >
                <Link href="/penerimaan">
                  <Button variant="outline" className="w-full h-20 bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20 hover:border-white/50 hover:scale-105 transition-all duration-300 rounded-2xl group">
                    <div className="flex flex-col items-center gap-2">
                      <span className="font-bold text-lg group-hover:text-yellow-300 transition-colors duration-300">
                        {path.name}
                      </span>
                      <span className="text-xs text-white/70 group-hover:text-white/90 transition-colors duration-300">
                        {path.desc}
                      </span>
                    </div>
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
