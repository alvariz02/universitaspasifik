import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import NewsCard from '@/components/cards/NewsCard'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

async function getNews(page: number = 1) {
  try {
    const limit = 12
    const offset = (page - 1) * limit
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/news?limit=${limit}&offset=${offset}`, {
      cache: 'no-store'
    })

    if (!res.ok) {
      throw new Error('Failed to fetch news')
    }

    const data = await res.json()
    return {
      news: data.news || [],
      total: data.total || 0,
      totalPages: Math.ceil((data.total || 0) / limit)
    }
  } catch (error) {
    console.error('Error fetching news:', error)
    return {
      news: [],
      total: 0,
      totalPages: 0
    }
  }
}

export default async function BeritaPage({
  searchParams
}: {
  searchParams: { page?: string }
}) {
  const page = parseInt(searchParams.page || '1')
  const { news, total, totalPages } = await getNews(page)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-ui-navy py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Berita Universitas Pasifik
            </h1>
            <p className="text-xl text-gray-300">
              Ikuti berita terkini dan update terbaru dari Universitas Pasifik
            </p>
          </div>
        </section>

        {/* News Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {news.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-muted-foreground text-lg">Belum ada berita tersedia</p>
              </div>
            ) : (
              <>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                  {news.map((item: any) => (
                    <NewsCard
                      key={item.id}
                      slug={item.slug}
                      title={item.title}
                      excerpt={item.excerpt}
                      imageUrl={item.imageUrl}
                      category={item.category}
                      authorName={item.authorName}
                      publishedDate={item.publishedDate ? new Date(item.publishedDate) : undefined}
                      isFeatured={item.isFeatured}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 flex-wrap">
                    <Link href={`/berita?page=${page - 1}`}>
                      <Button
                        variant="outline"
                        disabled={page === 1}
                        className="border-ui-navy text-ui-navy hover:bg-ui-navy hover:text-white"
                      >
                        <ChevronLeft className="h-4 w-4" />
                        Sebelumnya
                      </Button>
                    </Link>

                    <div className="flex items-center gap-2">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                        <Link key={pageNum} href={`/berita?page=${pageNum}`}>
                          <Button
                            variant={page === pageNum ? "default" : "outline"}
                            className={
                              page === pageNum
                                ? "bg-ui-yellow text-ui-navy hover:bg-yellow-400"
                                : "border-ui-navy text-ui-navy hover:bg-ui-navy hover:text-white"
                            }
                          >
                            {pageNum}
                          </Button>
                        </Link>
                      ))}
                    </div>

                    <Link href={`/berita?page=${page + 1}`}>
                      <Button
                        variant="outline"
                        disabled={page === totalPages}
                        className="border-ui-navy text-ui-navy hover:bg-ui-navy hover:text-white"
                      >
                        Selanjutnya
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                )}

                <p className="text-center text-muted-foreground mt-4">
                  Menampilkan {news.length} dari {total} berita
                </p>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
