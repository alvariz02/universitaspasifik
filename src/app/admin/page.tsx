import AdminLayout from '@/components/admin/AdminLayout'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Newspaper, Calendar, Bell, Building2, Trophy, Image as ImageIcon, Users, Plus, TrendingUp, Activity, FileText } from 'lucide-react'
import Link from 'next/link'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

async function getDashboardStats() {
  try {
    // Add timeout untuk database queries
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Database timeout')), 5000)
    )

    const queriesPromise = Promise.all([
      db.news.count(),
      db.event.count(),
      db.announcement.count(),
      db.faculty.count(),
      db.achievement.count()
    ])

    const [newsCount, eventsCount, announcementsCount, facultiesCount, achievementsCount] = 
      await Promise.race([queriesPromise, timeoutPromise]) as any

    return {
      newsCount: newsCount || 0,
      eventsCount: eventsCount || 0,
      announcementsCount: announcementsCount || 0,
      facultiesCount: facultiesCount || 0,
      achievementsCount: achievementsCount || 0
    }
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    // Return default values untuk prevent loading lama
    return {
      newsCount: 0,
      eventsCount: 0,
      announcementsCount: 0,
      facultiesCount: 0,
      achievementsCount: 0
    }
  }
}

export default async function AdminDashboard() {
  const stats = await getDashboardStats()

  const cards = [
    {
      title: 'Total Berita',
      value: stats.newsCount,
      icon: Newspaper,
      color: 'from-unipas-primary to-unipas-accent',
      bgColor: 'bg-linear-to-br from-unipas-primary/10 to-unipas-accent/5',
      borderColor: 'border-unipas-primary/20',
      href: '/admin/news',
    },
    {
      title: 'Total Event',
      value: stats.eventsCount,
      icon: Calendar,
      color: 'from-unipas-accent to-unipas-primary',
      bgColor: 'bg-linear-to-br from-unipas-accent/10 to-unipas-primary/5',
      borderColor: 'border-unipas-accent/20',
      href: '/admin/events',
    },
    {
      title: 'Pengumuman',
      value: stats.announcementsCount,
      icon: Bell,
      color: 'from-unipas-primary to-unipas-accent',
      bgColor: 'bg-linear-to-br from-unipas-primary/10 to-unipas-accent/5',
      borderColor: 'border-unipas-primary/20',
      href: '/admin/announcements',
    },
    {
      title: 'Fakultas',
      value: stats.facultiesCount,
      icon: Building2,
      color: 'from-unipas-accent to-unipas-primary',
      bgColor: 'bg-linear-to-br from-unipas-accent/10 to-unipas-primary/5',
      borderColor: 'border-unipas-accent/20',
      href: '/admin/faculties',
    },
    {
      title: 'Prestasi',
      value: stats.achievementsCount,
      icon: Trophy,
      color: 'from-unipas-primary to-unipas-accent',
      bgColor: 'bg-linear-to-br from-unipas-primary/10 to-unipas-accent/5',
      borderColor: 'border-unipas-primary/20',
      href: '/admin/achievements',
    },
    {
      title: 'Staff',
      value: '0',
      icon: Users,
      color: 'from-unipas-accent to-unipas-primary',
      bgColor: 'bg-linear-to-br from-unipas-accent/10 to-unipas-primary/5',
      borderColor: 'border-unipas-accent/20',
      href: '/admin/staff',
    },
  ]

  return (
    <AdminLayout>
      <div className="min-h-screen bg-unipas-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="bg-linear-to-r from-unipas-primary to-unipas-accent rounded-2xl p-8 text-white shadow-xl">
              <h1 className="text-4xl font-bold mb-2">
                Dashboard Admin
              </h1>
              <p className="text-white/90 text-lg">
              Selamat datang di panel administrasi Universitas Pasifik Morotai
            </p>
            <div className="mt-6 flex items-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  <span className="font-medium">Sistem Aktif</span>
                </div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <div className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  <span className="font-medium">Real-time</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {cards.map((card) => (
            <Link key={card.title} href={card.href}>
              <Card className={`${card.bgColor} ${card.borderColor} border hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group`}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                  <CardTitle className="text-sm font-medium text-unipas-text">
                    {card.title}
                  </CardTitle>
                  <div className={`bg-linear-to-br ${card.color} p-3 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                    <card.icon className="h-6 w-6 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-unipas-primary">{card.value}</div>
                  <div className="text-xs text-unipas-text mt-1">Total keseluruhan</div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-unipas-primary mb-6 flex items-center gap-2">
            <Plus className="h-6 w-6" />
            Aksi Cepat
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/admin/news?action=create"
              className="group bg-linear-to-br from-unipas-primary to-unipas-accent rounded-xl p-6 text-white font-medium hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg group-hover:bg-white/30 transition-colors">
                  <Newspaper className="h-8 w-8" />
                </div>
                <div>
                  <div className="font-bold">Tambah Berita</div>
                  <div className="text-sm text-white/80">Buat artikel baru</div>
                </div>
              </div>
            </Link>
            <Link
              href="/admin/events?action=create"
              className="group bg-linear-to-br from-unipas-accent to-unipas-primary rounded-xl p-6 text-white font-medium hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg group-hover:bg-white/30 transition-colors">
                  <Calendar className="h-8 w-8" />
                </div>
                <div>
                  <div className="font-bold">Tambah Event</div>
                  <div className="text-sm text-white/80">Jadwalkan acara</div>
                </div>
              </div>
            </Link>
            <Link
              href="/admin/announcements?action=create"
              className="group bg-white border-2 border-unipas-primary rounded-xl p-6 text-unipas-primary font-medium hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-unipas-primary/5"
            >
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="bg-unipas-primary/10 p-3 rounded-lg group-hover:bg-unipas-primary/20 transition-colors">
                  <Bell className="h-8 w-8" />
                </div>
                <div>
                  <div className="font-bold">Buat Pengumuman</div>
                  <div className="text-sm text-unipas-text">Informasi penting</div>
                </div>
              </div>
            </Link>
            <Link
              href="/admin/faculties?action=create"
              className="group bg-white border-2 border-unipas-accent rounded-xl p-6 text-unipas-accent font-medium hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-unipas-accent/5"
            >
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="bg-unipas-accent/10 p-3 rounded-lg group-hover:bg-unipas-accent/20 transition-colors">
                  <Building2 className="h-8 w-8" />
                </div>
                <div>
                  <div className="font-bold">Tambah Fakultas</div>
                  <div className="text-sm text-unipas-text">Unit akademik</div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white border-unipas-primary/20 shadow-lg">
            <CardHeader>
              <CardTitle className="text-unipas-primary flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Aktivitas Terbaru
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-unipas-muted rounded-lg">
                  <div className="bg-unipas-primary/20 p-2 rounded-lg">
                    <Newspaper className="h-4 w-4 text-unipas-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-unipas-primary">Berita baru ditambahkan</div>
                    <div className="text-sm text-unipas-text">2 jam yang lalu</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-unipas-muted rounded-lg">
                  <div className="bg-unipas-accent/20 p-2 rounded-lg">
                    <Calendar className="h-4 w-4 text-unipas-accent" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-unipas-primary">Event dibuat</div>
                    <div className="text-sm text-unipas-text">5 jam yang lalu</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-unipas-muted rounded-lg">
                  <div className="bg-unipas-primary/20 p-2 rounded-lg">
                    <Bell className="h-4 w-4 text-unipas-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-unipas-primary">Pengumuman diperbarui</div>
                    <div className="text-sm text-unipas-text">1 hari yang lalu</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-unipas-accent/20 shadow-lg">
            <CardHeader>
              <CardTitle className="text-unipas-primary flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Statistik Cepat
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-unipas-muted rounded-lg">
                  <span className="text-unipas-text">Total Konten</span>
                  <span className="font-bold text-unipas-primary">{stats.newsCount + stats.eventsCount + stats.announcementsCount}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-unipas-muted rounded-lg">
                  <span className="text-unipas-text">Unit Akademik</span>
                  <span className="font-bold text-unipas-primary">{stats.facultiesCount}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-unipas-muted rounded-lg">
                  <span className="text-unipas-text">Prestasi</span>
                  <span className="font-bold text-unipas-primary">{stats.achievementsCount}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        </div>
      </div>
    </AdminLayout>
  )
}
