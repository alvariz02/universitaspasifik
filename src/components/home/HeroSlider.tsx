'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

interface HeroSlide {
  id: number
  title?: string
  subtitle?: string
  imageUrl: string
  linkUrl?: string
  linkText?: string
}

interface HeroSliderProps {
  slides: HeroSlide[]
}

export default function HeroSlider({ slides }: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return
    if (!slides.length) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isPaused, slides.length])

  if (slides.length === 0) {
    return (
      <div className="relative w-full h-[400px] md:h-[500px] lg:h-[400px] flex items-center justify-center bg-gradient-to-br from-unipas-primary/10 to-unipas-accent/10">
        <div className="text-center">
          <Globe className="h-8 w-8 text-white" />
          <p className="text-gray-500 text-lg">Tidak ada slide tersedia</p>
        </div>
      </div>
    )
  }

  const currentSlide = slides[currentIndex]
  const isFirstSlide = currentIndex === 0

  return (
    <section className="relative w-full h-[400px] md:h-[500px] lg:h-[400px] overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-unipas-primary/10 rounded-full"></div>
        <div className="absolute -bottom-20 -left-20 w-32 h-32 bg-unipas-accent/10 rounded-full"></div>

        {/* Floating Particles (keep lightweight) */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -16, 0],
              opacity: [0.2, 0.45, 0.2],
            }}
            transition={{
              duration: 5 + i * 0.6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute w-2 h-2 bg-unipas-primary/20 rounded-full"
            style={{
              left: `${6 + i * 11}%`,
              top: `${12 + (i % 3) * 22}%`,
              animationDelay: `${i * 0.25}s`,
            }}
          />
        ))}
      </div>

      <div
        className="relative w-full h-full"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Background image: use next/image for better optimization + LCP */}
        <div className="absolute inset-0">
          <Image
            src={currentSlide.imageUrl}
            alt={currentSlide.title || 'Hero Slide'}
            fill
            priority={isFirstSlide}
            sizes="100vw"
            className="object-cover"
          />

          {/* Subtle Gradient Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
        </div>


        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full max-w-6xl px-4">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="text-center space-y-8"
            >

              {currentSlide.linkUrl && currentSlide.linkText && (
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.45, ease: 'easeOut' }}
                >
                  <Link href={currentSlide.linkUrl}>
                    <Button
                      size="lg"
                      className="group bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 text-white hover:from-blue-700 hover:via-cyan-700 hover:to-teal-700 font-bold px-8 py-6 text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 rounded-full border border-white/30 backdrop-blur-sm"
                    >
                      <span className="flex items-center gap-3">
                        <span className="drop-shadow-sm">{currentSlide.linkText}</span>
                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                    </Button>
                  </Link>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

