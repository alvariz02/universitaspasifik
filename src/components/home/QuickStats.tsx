'use client'

import { motion } from 'framer-motion'
import { Users, Building2, BookOpen, GraduationCap } from 'lucide-react'

interface Statistic {
  id: number
  label: string
  value: string
  icon?: string
}

interface QuickStatsProps {
  statistics: Statistic[]
}

export default function QuickStats({ statistics }: QuickStatsProps) {
  const getIcon = (iconName?: string) => {
    const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
      Users,
      Building2,
      BookOpen,
      GraduationCap,
    }
    const IconComponent = iconName ? iconMap[iconName] || Users : Users
    return <IconComponent className="h-8 w-8" />
  }

  return (
    <section className="py-8 bg-unipas-secondary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {statistics.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="bg-linear-to-br from-unipas-primary/20 via-unipas-accent/15 to-unipas-primary/10 rounded-xl p-6 inline-block mb-4 group-hover:from-unipas-primary/30 group-hover:via-unipas-accent/25 group-hover:to-unipas-primary/20 transition-all duration-500 shadow-lg group-hover:shadow-xl transform group-hover:scale-105 border border-unipas-primary/20">
                <div className="text-unipas-primary drop-shadow-lg">
                  {getIcon(stat.icon)}
                </div>
              </div>
              <div className="text-4xl md:text-5xl font-bold text-unipas-primary mb-2">
                {stat.value}
              </div>
              <div className="text-sm md:text-base text-unipas-text font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
