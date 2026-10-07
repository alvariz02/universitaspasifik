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
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const [summary] = await db.$queryRaw<Array<{
    newsCount: number; eventsCount: number; announcementsCount: number; facultiesCount: number;
    achievementsCount: number; galleriesCount: number;
    recentNews: Array<{ id: number; title: string; createdAt: string }>;
    recentEvents: Array<{ id: number; title: string; createdAt: string }>;
  }>>`
    SELECT
      (SELECT count(*)::int FROM "News" WHERE "deletedAt" IS NULL) AS "newsCount",
      (SELECT count(*)::int FROM "Event") AS "eventsCount",
      (SELECT count(*)::int FROM "Announcement") AS "announcementsCount",
      (SELECT count(*)::int FROM "Faculty") AS "facultiesCount",
      (SELECT count(*)::int FROM "Achievement") AS "achievementsCount",
      (SELECT count(*)::int FROM "Gallery") AS "galleriesCount",
      (SELECT COALESCE(json_agg(row_to_json(item)), '[]'::json) FROM
        (SELECT "id", "title", to_char("createdAt", 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"') AS "createdAt"
         FROM "News" WHERE "deletedAt" IS NULL ORDER BY "createdAt" DESC LIMIT 3) item) AS "recentNews",
      (SELECT COALESCE(json_agg(row_to_json(item)), '[]'::json) FROM
        (SELECT "id", "title", to_char("createdAt", 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"') AS "createdAt"
         FROM "Event" ORDER BY "createdAt" DESC LIMIT 3) item) AS "recentEvents"
  `
  const { newsCount, eventsCount, announcementsCount, facultiesCount, achievementsCount, galleriesCount, recentNews, recentEvents } = summary

  const stats = {
    newsCount,
    eventsCount,
    announcementsCount,
    facultiesCount,
    achievementsCount,
    galleriesCount,
  }

  const recentActivities = [
    ...recentNews.map((item) => ({
      id: `news-${item.id}`,
      type: 'Berita',
      title: item.title,
      createdAt: new Date(item.createdAt),
      href: '/admin/news',
    })),
    ...recentEvents.map((item) => ({
      id: `event-${item.id}`,
      type: 'Event',
      title: item.title,
      createdAt: new Date(item.createdAt),
      href: '/admin/events',
    })),
  ]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 5)

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
      value: stats.galleriesCount,
      icon: ImageIcon,
      color: 'bg-pink-500',
      href: '/admin/galleries'
    }
  ]

  return (
    <AdminLayout>
      <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="admin-page-header mb-6 flex sm:items-center justify-between flex-col sm:flex-row gap-4">
          <div>
            <h1 className="admin-title text-unipas-primary">
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
            <CardContent className="space-y-3">
              {recentActivities.length === 0 ? (
                <p className="text-muted-foreground">
                  Belum ada aktivitas terbaru di database.
                </p>
              ) : (
                recentActivities.map((activity) => (
                  <Link key={activity.id} href={activity.href} className="block">
                    <div className="rounded-lg border p-3 hover:bg-muted/50 transition-colors">
                      <div className="text-xs text-muted-foreground">{activity.type}</div>
                      <div className="font-medium line-clamp-1">{activity.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {activity.createdAt.toLocaleString('id-ID')}
                      </div>
                    </div>
                  </Link>
                ))
              )}
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
