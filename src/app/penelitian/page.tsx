import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { FlaskConical, BookOpen, TrendingUp, Award, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

async function getResearch() {
  try {
    const research = await db.research.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      take: 20
    })

    return research
  } catch (error) {
    console.error('Error fetching research:', error)
    return []
  }
}

export default async function PenelitianPage() {
  const research = await getResearch()

  const researchAreas = [
    {
      icon: <FlaskConical className="h-8 w-8" />,
      title: 'Sains & Teknologi',
      description: 'Riset inovatif dalam bidang sains alam, teknologi, dan rekayasa'
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: 'Ilmu Sosial & Humaniora',
      description: 'Studi mendalam tentang masyarakat, budaya, dan humaniora'
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: 'Ekonomi & Bisnis',
      description: 'Riset untuk pengembangan ekonomi dan dunia bisnis'
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: 'Kesehatan & Kedokteran',
      description: 'Penelitian medis untuk kesehatan masyarakat'
    }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-ui-navy py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-ui-yellow/10 rounded-lg w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <FlaskConical className="h-10 w-10 text-ui-yellow" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Penelitian & Inovasi UP
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Universitas Pasifik berkomitmen menghasilkan penelitian berkualitas yang bermanfaat bagi masyarakat
              </p>
            </div>
          </div>
        </section>

        {/* Research Areas */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-ui-navy text-center mb-12">
                Bidang Penelitian
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {researchAreas.map((area, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-lg shadow-lg border-2 hover:border-ui-yellow transition-all p-6 text-center"
                  >
                    <div className="bg-ui-yellow/10 rounded-lg w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <div className="text-ui-yellow">
                        {area.icon}
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-ui-navy mb-2">
                      {area.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {area.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Latest Research */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-ui-navy text-center mb-12">
                Penelitian Terbaru
              </h2>
              {research.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg">
                  <FlaskConical className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground text-lg">Belum ada penelitian tersedia</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {research.map((item: any) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-lg shadow-sm border-2 hover:border-ui-yellow transition-all overflow-hidden"
                    >
                      {item.imageUrl && (
                        <div className="aspect-video overflow-hidden">
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-ui-navy mb-2 line-clamp-2">
                          {item.title}
                        </h3>
                        {item.researcher && (
                          <p className="text-sm text-muted-foreground mb-3">
                            {item.researcher}
                          </p>
                        )}
                        {item.publicationDate && (
                          <p className="text-sm text-muted-foreground">
                            {new Date(item.publicationDate).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-ui-navy text-center mb-12">
                Statistik Penelitian
              </h2>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center p-6 bg-ui-yellow/5 rounded-lg border-2 border-ui-yellow/10">
                  <div className="text-4xl font-bold text-ui-navy mb-2">
                    500+
                  </div>
                  <div className="text-muted-foreground text-sm">
                    Proyek Riset
                  </div>
                </div>
                <div className="text-center p-6 bg-ui-yellow/5 rounded-lg border-2 border-ui-yellow/10">
                  <div className="text-4xl font-bold text-ui-navy mb-2">
                    100+
                  </div>
                  <div className="text-muted-foreground text-sm">
                    Paten
                  </div>
                </div>
                <div className="text-center p-6 bg-ui-yellow/5 rounded-lg border-2 border-ui-yellow/10">
                  <div className="text-4xl font-bold text-ui-navy mb-2">
                    2000+
                  </div>
                  <div className="text-muted-foreground text-sm">
                    Publikasi
                  </div>
                </div>
                <div className="text-center p-6 bg-ui-yellow/5 rounded-lg border-2 border-ui-yellow/10">
                  <div className="text-4xl font-bold text-ui-navy mb-2">
                    50+
                  </div>
                  <div className="text-muted-foreground text-sm">
                    Penghargaan
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-ui-navy">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ingin Berkolaborasi?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                UI terbuka untuk kolaborasi penelitian dengan berbagai institusi dan industri
              </p>
              <Link href="/kontak">
                <Button
                  size="lg"
                  className="bg-ui-yellow text-ui-navy hover:bg-yellow-400 px-8 py-6 text-lg font-bold"
                >
                  Hubungi Kami
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
