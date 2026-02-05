import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AchievementCard from '@/components/cards/AchievementCard'
import { Trophy, Medal, Award } from 'lucide-react'

async function getAchievements() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/achievements`, {
      cache: 'no-store'
    })

    if (!res.ok) {
      throw new Error('Failed to fetch achievements')
    }

    return await res.json()
  } catch (error) {
    console.error('Error fetching achievements:', error)
    return []
  }
}

export default async function PrestasiPage() {
  const achievements = await getAchievements()

  const getLevelColor = (level: string) => {
    switch (level?.toLowerCase()) {
      case 'internasional':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'nasional':
        return 'bg-blue-100 text-blue-800 border-blue-300'
      case 'regional':
        return 'bg-green-100 text-green-800 border-green-300'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category?.toLowerCase()) {
      case 'akademik':
        return <Trophy className="h-6 w-6" />
      case 'olahraga':
        return <Medal className="h-6 w-6" />
      default:
        return <Award className="h-6 w-6" />
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-ui-navy py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-ui-yellow/10 rounded-lg w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Trophy className="h-10 w-10 text-ui-yellow" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Prestasi Universitas Pasifik
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Pencapaian membanggakan dari mahasiswa, dosen, dan alumni UP di berbagai bidang
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center p-6 bg-white rounded-lg shadow-sm border-2">
                  <Trophy className="h-8 w-8 text-ui-yellow mx-auto mb-3" />
                  <div className="text-3xl font-bold text-ui-navy mb-2">
                    {achievements.length}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Total Prestasi
                  </div>
                </div>
                <div className="text-center p-6 bg-white rounded-lg shadow-sm border-2">
                  <Trophy className="h-8 w-8 text-ui-yellow mx-auto mb-3" />
                  <div className="text-3xl font-bold text-ui-navy mb-2">
                    {achievements.filter((a: any) => a.level?.toLowerCase() === 'internasional').length}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Internasional
                  </div>
                </div>
                <div className="text-center p-6 bg-white rounded-lg shadow-sm border-2">
                  <Medal className="h-8 w-8 text-ui-yellow mx-auto mb-3" />
                  <div className="text-3xl font-bold text-ui-navy mb-2">
                    {achievements.filter((a: any) => a.level?.toLowerCase() === 'nasional').length}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Nasional
                  </div>
                </div>
                <div className="text-center p-6 bg-white rounded-lg shadow-sm border-2">
                  <Award className="h-8 w-8 text-ui-yellow mx-auto mb-3" />
                  <div className="text-3xl font-bold text-ui-navy mb-2">
                    {achievements.filter((a: any) => a.category?.toLowerCase() === 'akademik').length}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Akademik
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Achievements Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {achievements.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <Trophy className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground text-lg">Belum ada prestasi tersedia</p>
              </div>
            ) : (
              <div className="max-w-6xl mx-auto">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {achievements.map((achievement: any) => (
                    <AchievementCard
                      key={achievement.id}
                      title={achievement.title}
                      description={achievement.description}
                      achieverName={achievement.achieverName}
                      achieverType={achievement.achieverType}
                      achievementDate={achievement.achievementDate ? new Date(achievement.achievementDate) : undefined}
                      category={achievement.category}
                      level={achievement.level}
                      imageUrl={achievement.imageUrl}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Info Box */}
        <section className="py-16 bg-ui-navy">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ingin Melaporkan Prestasi?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Jika Anda atau tim Anda meraih prestasi, laporkan melalui fasilitas masing-masing
              </p>
              <p className="text-gray-400 text-sm">
                Prestasi akan diupdate secara berkala di halaman ini
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
