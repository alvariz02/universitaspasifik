import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Trophy, Award, Medal, ArrowLeft, Calendar, User, Star } from 'lucide-react'
import Link from 'next/link'
import { format } from 'date-fns'
import { db } from '@/lib/db'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ShareButton from '@/components/ShareButton'

interface PageProps {
  params: Promise<{ id: string }>
}

async function getAchievementById(id: string) {
  try {
    const achievementId = parseInt(id)
    if (isNaN(achievementId)) return null

    const achievement = await db.achievement.findUnique({
      where: { id: achievementId }
    })

    return achievement
  } catch (error) {
    console.error('Error fetching achievement:', error)
    return null
  }
}

async function getRelatedAchievements(excludeId: number, limit = 3) {
  try {
    const achievements = await db.achievement.findMany({
      where: {
        id: { not: excludeId }
      },
      orderBy: { achievementDate: 'desc' },
      take: limit
    })
    return achievements
  } catch (error) {
    console.error('Error fetching related achievements:', error)
    return []
  }
}

// ✅ Metadata dengan fallback logo seperti di berita
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const achievement = await getAchievementById(id)

  if (!achievement) {
    return {
      title: 'Prestasi tidak ditemukan | Universitas Pasifik'
    }
  }

  // Default image (logo website) sebagai fallback
  const defaultImage = {
    url: 'https://www.univpasifik.ac.id/logounipasreal.jpeg',
    width: 1200,
    height: 630,
    alt: 'Universitas Pasifik - Kampus Unggul',
  }

  // Gunakan foto prestasi jika tersedia, fallback ke logo
  const ogImage = achievement.imageUrl
    ? {
        url: achievement.imageUrl,
        width: 1200,
        height: 630,
        alt: achievement.title || 'Prestasi Universitas Pasifik',
      }
    : defaultImage

  return {
    title: `${achievement.title} | Universitas Pasifik`,
    description: achievement.description || `Prestasi ${achievement.achieverName || ''} di Universitas Pasifik`,
    openGraph: {
      title: achievement.title,
      description: achievement.description || '',
      url: `https://www.univpasifik.ac.id/prestasi/${achievement.id}`,
      siteName: 'Universitas Pasifik',
      locale: 'id_ID',
      type: 'article',
      publishedTime: achievement.achievementDate?.toISOString(),
      authors: achievement.achieverName ? [achievement.achieverName] : undefined,
      images: [ogImage], // ✅ pakai foto prestasi atau fallback
    },
    twitter: {
      card: 'summary_large_image',
      title: achievement.title,
      description: achievement.description || '',
      images: [ogImage.url], // ✅ pakai foto prestasi atau fallback
    },
  }
}

const getLevelIcon = (level?: string) => {
  switch (level?.toLowerCase()) {
    case 'internasional':
      return <Trophy className="h-6 w-6" />
    case 'nasional':
      return <Award className="h-6 w-6" />
    case 'regional':
      return <Medal className="h-6 w-6" />
    default:
      return <Star className="h-6 w-6" />
  }
}

const getLevelColor = (level?: string) => {
  switch (level?.toLowerCase()) {
    case 'internasional':
      return 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white'
    case 'nasional':
      return 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
    case 'regional':
      return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
    default:
      return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
  }
}

export default async function PrestasiDetailPage({ params }: PageProps) {
  const { id } = await params
  const achievement = await getAchievementById(id)

  if (!achievement) {
    notFound()
  }

  const relatedAchievements = await getRelatedAchievements(achievement.id)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Back Button */}
        <div className="bg-gray-50 border-b">
          <div className="container mx-auto px-4 py-4">
            <Link href="/prestasi">
              <Button variant="ghost" className="gap-2 text-ui-navy hover:text-ui-navy/80">
                <ArrowLeft className="h-4 w-4" />
                Kembali ke Prestasi
              </Button>
            </Link>
          </div>
        </div>

        {/* Achievement Detail */}
        <article className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <div className="mb-8 text-center">
                {achievement.level && (
                  <div className="inline-flex items-center gap-2 mb-6">
                    <div className={`${getLevelColor(achievement.level)} p-3 rounded-full`}>
                      {getLevelIcon(achievement.level)}
                    </div>
                    <Badge className={`${getLevelColor(achievement.level)} px-4 py-1 text-sm font-bold`}>
                      Tingkat {achievement.level}
                    </Badge>
                  </div>
                )}

                <h1 className="text-3xl md:text-5xl font-bold text-ui-navy mb-6">
                  {achievement.title}
                </h1>

                {/* Achievement Info */}
                <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground">
                  {achievement.achievementDate && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <time dateTime={new Date(achievement.achievementDate).toISOString()}>
                        {format(new Date(achievement.achievementDate), 'dd MMMM yyyy')}
                      </time>
                    </div>
                  )}
                  {achievement.category && (
                    <Badge variant="outline" className="text-sm">
                      {achievement.category}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Image */}
              {achievement.imageUrl && (
                <div className="mb-8 rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src={achievement.imageUrl}
                    alt={achievement.title}
                    className="w-full h-auto object-cover max-h-[500px]"
                  />
                </div>
              )}

              {/* Content */}
              <div className="prose prose-lg max-w-none">
                {/* Achiever Info */}
                {achievement.achieverName && (
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl mb-6 border border-yellow-200">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Pencapaian oleh</p>
                        <p className="text-lg font-bold text-ui-navy">{achievement.achieverName}</p>
                        {achievement.achieverType && (
                          <Badge className="mt-1 bg-ui-yellow text-ui-navy">
                            {achievement.achieverType}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Description */}
                {achievement.description && (
                  <div
                    className="prose prose-lg max-w-none text-gray-800 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: achievement.description }}
                  />
                )}
              </div>

              {/* Share & Actions */}
              <div className="flex flex-wrap items-center justify-between mt-12 pt-8 border-t gap-4">
                <div className="flex items-center gap-2">
                  <ShareButton
                    title={achievement.title}
                    url={`/prestasi/${achievement.id}`}
                    description={achievement.description || undefined}
                    imageUrl={achievement.imageUrl || undefined}
                  />
                </div>

                <Link href="/prestasi">
                  <Button variant="ghost" className="gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Lihat Prestasi Lainnya
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </article>

        {/* Related Achievements */}
        {relatedAchievements.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold text-ui-navy mb-8 text-center">
                Prestasi Lainnya
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {relatedAchievements.map((item) => (
                  <Link
                    key={item.id}
                    href={`/prestasi/${item.id}`}
                    className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border hover:border-yellow-400 group"
                  >
                    {item.imageUrl && (
                      <div className="aspect-video overflow-hidden relative">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {item.level && (
                          <div className="absolute top-3 right-3">
                            <Badge className={`${getLevelColor(item.level)} text-xs`}>
                              {item.level}
                            </Badge>
                          </div>
                        )}
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="font-bold text-ui-navy mb-2 line-clamp-2 group-hover:text-yellow-600 transition-colors">
                        {item.title}
                      </h3>
                      {item.achieverName && (
                        <p className="text-sm text-muted-foreground mb-2">
                          {item.achieverName}
                        </p>
                      )}
                      {item.achievementDate && (
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(item.achievementDate), 'dd MMM yyyy')}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  )
}