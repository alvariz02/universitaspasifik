'use client'

import { Building2, ArrowRight, GraduationCap, Users, Calendar } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'

interface Faculty {
  id: number
  name: string
  slug: string
  description?: string
  deanName?: string
  location?: string
  establishedYear?: number
  imageUrl?: string
}

interface FacultiesGridProps {
  faculties: Faculty[]
}

export default function FacultiesGrid({ faculties }: FacultiesGridProps) {
  const featuredFaculties = faculties.slice(0, 6)

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-unipas-secondary/10">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-60 h-60 bg-unipas-accent/5 rounded-full blur-2xl"></div>
        <div className="absolute top-20 left-1/4 w-32 h-32 bg-unipas-primary/5 rounded-full blur-xl"></div>
        
        {/* Floating Particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -12, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute w-2 h-2 bg-blue-500/30 rounded-full"
            style={{
              left: `${8 + i * 12}%`,
              top: `${15 + (i % 4) * 18}%`,
              animationDelay: `${i * 0.3}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-20"
        >
          <div className="mb-6 lg:mb-0">
            <div className="inline-flex items-center gap-4 mb-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 bg-gradient-to-br from-blue-500 to-unipas-accent rounded-2xl flex items-center justify-center shadow-2xl"
              >
                <Building2 className="h-8 w-8 text-white" />
              </motion.div>
              <div className="text-left">
                <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-500 to-unipas-accent bg-clip-text text-transparent leading-tight">
                  Fakultas Unipas
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mt-2">
                  14 fakultas dengan program studi berkualitas
                </p>
              </div>
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <Link href="/fakultas" className="hidden md:flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-unipas-accent text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 font-bold">
              Lihat Semua Fakultas
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Modern Grid Layout */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredFaculties.map((faculty, index) => (
            <motion.div
              key={faculty.id}
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                delay: index * 0.15, 
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
              <div className="h-full bg-white/90 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 border border-white/50 hover:border-blue-500/30">
                {/* Animated Background */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-unipas-accent/5"></div>
                </div>

                {/* Faculty Image */}
                {faculty.imageUrl && (
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={faculty.imageUrl}
                      alt={faculty.name}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Glass Morphism Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Floating Icon */}
                    <motion.div
                      initial={{ rotate: 0, scale: 0.8 }}
                      whileInView={{ rotate: 360, scale: 1 }}
                      transition={{ delay: index * 0.2 + 0.3, duration: 1 }}
                      className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/30"
                    >
                      <Building2 className="h-6 w-6 text-white" />
                    </motion.div>
                  </div>
                )}
                
                <div className="p-8">
                  {/* Faculty Name */}
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="text-xl md:text-2xl font-black text-gray-800 mb-4 line-clamp-2 group-hover:text-blue-500 transition-colors duration-300"
                  >
                    {faculty.name}
                  </motion.h3>

                  {/* Description */}
                  {faculty.description && (
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="text-muted-foreground line-clamp-3 mb-6 leading-relaxed"
                    >
                      {faculty.description}
                    </motion.p>
                  )}

                  {/* Faculty Info */}
                  <div className="space-y-3 mb-6">
                    {faculty.deanName && (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        className="flex items-center gap-3 text-muted-foreground text-sm"
                      >
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <GraduationCap className="h-4 w-4 text-blue-500" />
                        </div>
                        <span>{faculty.deanName}</span>
                      </motion.div>
                    )}

                    {faculty.location && (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                        className="flex items-center gap-3 text-muted-foreground text-sm"
                      >
                        <div className="w-8 h-8 bg-unipas-accent/10 rounded-full flex items-center justify-center">
                          <Building2 className="h-4 w-4 text-unipas-accent" />
                        </div>
                        <span>{faculty.location}</span>
                      </motion.div>
                    )}

                    {faculty.establishedYear && (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                        className="flex items-center gap-3 text-muted-foreground text-sm"
                      >
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <Calendar className="h-4 w-4 text-green-500" />
                        </div>
                        <span>Didirikan {faculty.establishedYear}</span>
                      </motion.div>
                    )}
                  </div>

                  {/* CTA Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                  >
                    <Link href={`/fakultas/${faculty.slug}`}>
                      <Button className="w-full bg-gradient-to-r from-blue-500 to-unipas-accent text-white hover:from-unipas-accent hover:to-blue-500 font-bold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                        <span className="flex items-center justify-center gap-2">
                          <Users className="h-4 w-4" />
                          Jelajahi Fakultas
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </span>
                      </Button>
                    </Link>
                  </motion.div>
                </div>

                {/* Hover Effects */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-unipas-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {featuredFaculties.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center py-20 bg-white/50 backdrop-blur-sm rounded-3xl border border-white/50"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-unipas-accent/20 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Building2 className="h-10 w-10 text-blue-500" />
            </motion.div>
            <p className="text-xl text-muted-foreground font-medium">Belum ada fakultas yang ditampilkan</p>
            <p className="text-muted-foreground mt-2">Nantikan update fakultas terbaru dari kami</p>
          </motion.div>
        )}

        {/* Mobile View Link */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="text-center md:hidden"
        >
          <Link href="/fakultas">
            <Button className="bg-gradient-to-r from-blue-500 to-unipas-accent text-white hover:from-unipas-accent hover:to-blue-500 font-bold px-8 py-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
              Lihat Semua Fakultas
            </Button>
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
