import AdminLayout from '@/components/admin/AdminLayout'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Newspaper, Calendar, Bell, Building2, Trophy, Image as ImageIcon, Users, Plus, TrendingUp, Activity, FileText } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

// Static dashboard untuk prevent database issues
export default async function AdminDashboard() {
  const stats = {
    newsCount: 0,
    eventsCount: 0,
    announcementsCount: 0,
    facultiesCount: 0,
    achievementsCount: 0
  }

  const cards = [
    {
      title: 'Total Berita',
      value: stats.newsCount,
      icon: Newspaper,
      color: 'bg-blue-500',
      href: '/admin/news'
    },
    {
      title: 'Total Event',
      value: stats.eventsCount,
      icon: Calendar,
      color: 'bg-green-500',
      href: '/admin/events'
    },
    {
      title: 'Total Pengumuman',
      value: stats.announcementsCount,
      icon: Bell,
      color: 'bg-yellow-500',
      href: '/admin/announcements'
    },
    {
      title: 'Total Fakultas',
      value: stats.facultiesCount,
      icon: Building2,
      color: 'bg-purple-500',
      href: '/admin/faculties'
    },
    {
      title: 'Total Prestasi',
      value: stats.achievementsCount,
      icon: Trophy,
      color: 'bg-orange-500',
      href: '/admin/achievements'
    },
    {
      title: 'Total Galeri',
      value: 0,
      icon: ImageIcon,
      color: 'bg-pink-500',
      href: '/admin/galleries'
    }
  ]

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-unipas-primary">
              Dashboard Admin
            </h1>
            <p className="text-muted-foreground">
              Selamat datang di Admin Panel Universitas Pasifik
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/admin/news/new">
              <Button className="bg-unipas-primary text-white hover:bg-unipas-accent">
                <Plus className="mr-2 h-4 w-4" />
                Tambah Berita
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <Link key={index} href={card.href}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {card.title}
                  </CardTitle>
                  <div className={`p-2 rounded-full ${card.color}`}>
                    <card.icon className="h-4 w-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{card.value}</div>
                  <p className="text-xs text-muted-foreground">
                    Kelola {card.title.toLowerCase()}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Aktivitas Terbaru
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Dashboard sedang dalam mode maintenance. Data statistik akan muncul setelah database connection stabil.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/admin/news/new">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Tambah Berita Baru
                </Button>
              </Link>
              <Link href="/admin/events/create">
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="mr-2 h-4 w-4" />
                  Tambah Event Baru
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
