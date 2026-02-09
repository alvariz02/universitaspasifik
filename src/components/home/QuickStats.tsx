'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  Users,
  Building2,
  BookOpen,
  GraduationCap,
  TrendingUp,
  Award,
  Globe,
  ArrowUpRight,
} from 'lucide-react'

interface Statistic {
  id: number
  label: string
  value: string
  icon?: string
  trend?: string
  description?: string
}

interface QuickStatsProps {
  statistics: Statistic[]
}

export default function QuickStats({ statistics }: QuickStatsProps) {
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Users,
    Building2,
    BookOpen,
    GraduationCap,
    TrendingUp,
    Award,
    Globe,
  }

  const getIcon = (iconName?: string) => {
    const Icon = iconName ? iconMap[iconName] || Users : Users
    return <Icon className="h-7 w-7" />
  }

  return (
    <section className="relative py-5 bg-black text-white overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(79,70,229,0.25),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(14,165,233,0.25),transparent_40%)]"></div>

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Header
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Prestasi dalam Angka
          </h2>
          <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto">
            Representasi visual kekuatan dan pertumbuhan Universitas Pasifik Morotai.
          </p>
        </motion.div> */}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

          {statistics.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.7 }}
              whileHover={{ y: -15 }}
              className="group relative"
            >

              {/* Card */}
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 text-center overflow-hidden transition-all duration-500 hover:border-indigo-500/40 hover:shadow-[0_0_40px_rgba(99,102,241,0.3)]">

                {/* Animated Glow Orb */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-16 -right-16 w-40 h-40 bg-gradient-to-br from-indigo-500 to-cyan-500 opacity-20 blur-3xl rounded-full"
                />

                {/* Icon Orb */}
                <div className="relative flex justify-center mb-8">

                  {/* Outer Glow Ring */}
                  <div className="absolute w-24 h-24 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 blur-xl opacity-50 group-hover:opacity-80 transition-all duration-500"></div>

                  {/* Glass Circle */}
                  <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-indigo-600 to-cyan-500 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500">
                    <div className="absolute inset-0 bg-white/20 rounded-full blur-md"></div>
                    <div className="relative text-white">
                      {getIcon(stat.icon)}
                    </div>
                  </div>
                </div>

                {/* Value */}
                <div className="flex justify-center items-end gap-2 mb-3">
                  <span className="text-4xl md:text-5xl font-bold tracking-tight">
                    {stat.value}
                  </span>
                  {stat.trend && (
                    <span className="text-sm text-green-400 flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      {stat.trend}
                    </span>
                  )}
                </div>

                {/* Label */}
                <h3 className="text-lg font-medium text-gray-300 group-hover:text-white transition-colors duration-300">
                  {stat.label}
                </h3>

                {/* Description */}
                {stat.description && (
                  <p className="mt-3 text-sm text-gray-500">
                    {stat.description}
                  </p>
                )}

              </div>
            </motion.div>
          ))}

        </div>

        {/* CTA
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="mt-24 text-center"
        >
          <button className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white rounded-full font-semibold shadow-lg hover:shadow-[0_0_30px_rgba(99,102,241,0.6)] hover:scale-105 transition-all duration-300">
            Jelajahi Lebih Banyak
            <ArrowUpRight className="h-5 w-5" />
          </button>
        </motion.div> */}

      </div>
    </section>
  )
}
