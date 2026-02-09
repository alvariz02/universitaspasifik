'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
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

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isPaused, slides.length])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  if (slides.length === 0) {
    return (
      <div className="relative w-full h-[600px] md:h-[600px] lg:h-[600px] flex items-center justify-center bg-gradient-to-br from-unipas-primary/10 to-unipas-accent/10">
        <div className="text-center">
          <Globe className="h-8 w-8 text-white" />
          <p className="text-gray-500 text-lg">Tidak ada slide tersedia</p>
        </div>
      </div>
    )
  }

  const currentSlide = slides[currentIndex]

  return (
    <section className="relative w-full h-[400px] md:h-[500px] lg:h-[400px] overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
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
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute w-2 h-2 bg-unipas-primary/20 rounded-full"
            style={{
              left: `${5 + i * 12}%`,
              top: `${10 + (i % 4) * 20}%`,
              animationDelay: `${i * 0.3}s`
            }}
          />
        ))}
      </div>

      <div
        className="relative w-full h-full"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <div className="relative w-full h-full">
            <img
              src={currentSlide.imageUrl}
              alt={currentSlide.title || 'Hero Slide'}
              className="w-full h-full object-cover"
            />
            
            {/* Modern Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            
            {/* Glass Morphism Effect */}
            <div className="absolute inset-0 backdrop-blur-sm bg-white/5"></div>
          </div>
        </motion.div>

        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full max-w-6xl px-4">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
              className="text-center space-y-8"
            >
              {currentSlide.title && (
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-4xl md:text-5xl lg:text-7xl font-black leading-tight"
                >
                  <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent drop-shadow-2xl">
                    {currentSlide.title}
                  </span>
                </motion.h1>
              )}
              
              {currentSlide.subtitle && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="text-lg md:text-xl lg:text-2xl leading-relaxed"
                >
                  <span className="bg-gradient-to-r from-white/95 via-blue-50 to-cyan-100/90 bg-clip-text text-transparent drop-shadow-lg">
                    {currentSlide.subtitle}
                  </span>
                </motion.p>
              )}
              
              {currentSlide.linkUrl && currentSlide.linkText && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
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

        {/* Modern Dots - REMOVED */}
        {/* Auto-play only - no manual controls */}

      </div>
    </section>
  )
}
