import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HomeAchievementCard from '@/components/cards/HomeAchievementCard'
import { Trophy, Medal, Award } from 'lucide-react'
import { db } from '@/lib/db'


export const dynamic = 'force-dynamic'

async function getAchievements() {

  try {
    const achievements = await db.achievement.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      take: 50
    })

    return achievements
  } catch (error) {
    console.error('Error fetching achievements:', error)
    return []
  }
}

export default async function PrestasiPage() {
  const achievements = await getAchievements()





  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-unipas-primary via-unipas-accent to-unipas-primary text-white">
          <div className="container mx-auto px-4">
            <div className="py-16">
              <div className="max-w-4xl mx-auto text-center">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                    <Trophy className="h-10 w-10 text-white" />
                  </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-blue-100 mb-4">
                  Prestasi Universitas Pasifik
                </h1>
                <p className="text-xl text-white/90 max-w-2xl mx-auto">
                  Pencapaian membanggakan dari mahasiswa, dosen, dan alumni UP di berbagai bidang
                </p>
              </div>
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
                    <HomeAchievementCard
                      key={achievement.id}
                      id={achievement.id}

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
