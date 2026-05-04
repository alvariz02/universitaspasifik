'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, ChevronLeft, Calendar } from 'lucide-react'

interface Admission {
  id: number
  title: string
  slug: string
  image1Url?: string
  image2Url?: string
  image3Url?: string
  displayStart: string
  displayEnd: string
  isActive: boolean
}

interface AdmissionsSectionProps {
  admissions: Admission[]
}

export default function AdmissionsSection({ admissions }: AdmissionsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!admissions || admissions.length === 0) {
    return null
  }

  const currentAdmission = admissions[currentIndex]

  const images = [
    currentAdmission.image1Url,
    currentAdmission.image2Url,
    currentAdmission.image3Url,
  ].filter(Boolean) as string[]

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % admissions.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + admissions.length) % admissions.length)
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  return (
    <section className="py-20 bg-unipas-muted relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-unipas-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-unipas-accent rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-unipas-primary mb-4">
            Penerimaan Mahasiswa Baru
          </h2>
          <p className="text-lg text-unipas-text max-w-2xl mx-auto">
            Daftar sekarang dan jadi bagian dari keluarga besar Universitas Pasifik
          </p>
          <div className="mt-4 w-24 h-1 bg-linear-to-r from-unipas-primary to-unipas-accent mx-auto rounded-full" />
        </motion.div>

        {/* Hero Slider Style */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentAdmission.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-unipas-primary/10"
            >
              {/* Large Image - Hero Style */}
              <div className="relative aspect-[16/9] md:aspect-[21/9] bg-unipas-muted overflow-hidden">
                {images.length > 0 ? (
                  <Image
                    src={images[0]}
                    alt={currentAdmission.title}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-unipas-primary/10">
                    <span className="text-unipas-primary/50 text-xl">No Image</span>
                  </div>
                )}

                {/* Status Badge */}
                <div className="absolute top-6 left-6">
                  <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                    Dibuka
                  </span>
                </div>

                {/* Image Navigation Dots */}
                {images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`w-3 h-3 rounded-full transition-all ${
                          idx === 0 ? 'bg-white w-8' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Title Below Image */}
              <div className="p-8 md:p-12 text-center">
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl md:text-4xl font-bold text-unipas-primary mb-4"
                >
                  {currentAdmission.title}
                </motion.h3>

                {/* Display Period */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center justify-center gap-2 text-unipas-text mb-8"
                >
                  <Calendar className="h-5 w-5" />
                  <span className="text-lg">
                    {formatDate(currentAdmission.displayStart)} - {formatDate(currentAdmission.displayEnd)}
                  </span>
                </motion.div>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Link
                    href={`/penerimaan/${currentAdmission.slug}`}
                    className="inline-flex items-center gap-3 px-10 py-4 bg-linear-to-r from-unipas-primary to-unipas-accent text-white rounded-full font-semibold text-lg hover:shadow-xl transition-all hover:-translate-y-1"
                  >
                    Lihat Detail
                    <ChevronRight className="h-6 w-6" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          {admissions.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/3 -translate-y-1/2 bg-white/90 hover:bg-white text-unipas-primary p-4 rounded-full shadow-lg transition-all hover:scale-110 z-10"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/3 -translate-y-1/2 bg-white/90 hover:bg-white text-unipas-primary p-4 rounded-full shadow-lg transition-all hover:scale-110 z-10"
              >
                <ChevronRight className="h-8 w-8" />
              </button>
            </>
          )}
        </div>

        {/* Admission Thumbnails */}
        {admissions.length > 1 && (
          <div className="flex justify-center gap-4 mt-8">
            {admissions.map((admission, index) => (
              <button
                key={admission.id}
                onClick={() => setCurrentIndex(index)}
                className={`relative w-20 h-20 rounded-xl overflow-hidden transition-all ${
                  index === currentIndex
                    ? 'ring-4 ring-unipas-primary scale-110'
                    : 'opacity-60 hover:opacity-100'
                }`}
              >
                {admission.image1Url ? (
                  <Image
                    src={admission.image1Url}
                    alt={admission.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-unipas-primary/20 flex items-center justify-center text-xs text-unipas-primary">
                    {index + 1}
                  </div>
                )}
              </button>
            ))}
          </div>
        )}

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/penerimaan"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-unipas-primary rounded-full font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-unipas-primary/20"
          >
            Lihat Semua Jalur Penerimaan
            <ChevronRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
