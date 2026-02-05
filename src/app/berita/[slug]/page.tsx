import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, User, ArrowLeft, Share2, Clock } from 'lucide-react'
import Link from 'next/link'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'

async function getNewsBySlug(slug: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/news?limit=100`, {
      cache: 'no-store'
    })

    if (!res.ok) {
      throw new Error('Failed to fetch news')
    }

    const data = await res.json()
    let news = data.news?.find((n: any) => n.slug === slug)
    // If not found by slug, allow numeric id access
    if (!news && !isNaN(Number(slug))) {
      const id = Number(slug)
      news = data.news?.find((n: any) => n.id === id)
    }
    return news
  } catch (error) {
    console.error('Error fetching news:', error)
    return null
  }
}

async function getRelatedNews(excludeId: number) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/news?limit=4`, {
      cache: 'no-store'
    })

    if (!res.ok) {
      throw new Error('Failed to fetch related news')
    }

    const data = await res.json()
    return data.news?.filter((n: any) => n.id !== excludeId).slice(0, 3) || []
  } catch (error) {
    console.error('Error fetching related news:', error)
    return []
  }
}

export default async function BeritaDetailPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const news = await getNewsBySlug(slug)
  const relatedNews = news ? await getRelatedNews(news.id) : []

  if (!news) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Berita tidak ditemukan</h1>
            <Link href="/berita">
              <Button className="bg-ui-yellow text-ui-navy hover:bg-yellow-400">
                Kembali ke Berita
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const publishedDate = news.publishedDate ? new Date(news.publishedDate) : new Date()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Back Button */}
        <div className="bg-gray-50 border-b">
          <div className="container mx-auto px-4 py-4">
            <Link href="/berita">
              <Button variant="ghost" className="gap-2 text-ui-navy hover:text-ui-navy/80">
                <ArrowLeft className="h-4 w-4" />
                Kembali ke Berita
              </Button>
            </Link>
          </div>
        </div>

        {/* News Content */}
        <article className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <div className="mb-8">
                {news.category && (
                  <Badge className="bg-ui-yellow text-ui-navy mb-4 text-sm font-medium">
                    {news.category}
                  </Badge>
                )}
                <h1 className="text-3xl md:text-5xl font-bold text-ui-navy mb-6">
                  {news.title}
                </h1>

                <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-6">
                  {publishedDate && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <time dateTime={publishedDate.toISOString()}>
                        {format(publishedDate, 'dd MMMM yyyy', { locale: id })}
                      </time>
                    </div>
                  )}
                  {news.authorName && (
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{news.authorName}</span>
                    </div>
                  )}
                  {news.viewCount !== undefined && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{news.viewCount} dilihat</span>
                    </div>
                  )}
                </div>

                {news.isFeatured && (
                  <Badge variant="outline" className="border-ui-yellow text-ui-yellow">
                    Berita Unggulan
                  </Badge>
                )}
              </div>

              {/* Featured Image */}
              {news.imageUrl && (
                <div className="mb-8 rounded-lg overflow-hidden">
                  <img
                    src={news.imageUrl}
                    alt={news.title}
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}

              {/* Content */}
              <div className="prose prose-lg max-w-none">
                {news.excerpt && (
                  <p className="text-xl text-muted-foreground mb-6 italic">
                    {news.excerpt}
                  </p>
                )}

                <div
                  className="text-gray-800 leading-relaxed space-y-4"
                  dangerouslySetInnerHTML={{ __html: news.content }}
                />
              </div>

              {/* Share & Actions */}
              <div className="flex flex-wrap items-center justify-between mt-12 pt-8 border-t gap-4">
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="gap-2">
                    <Share2 className="h-4 w-4" />
                    Bagikan
                  </Button>
                </div>

                <Link href="/berita">
                  <Button variant="ghost" className="gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Lihat Berita Lainnya
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </article>

        {/* Related News */}
        {relatedNews.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold text-ui-navy mb-8">
                Berita Terkait
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedNews.map((item: any) => (
                  <Link
                    key={item.id}
                    href={`/berita/${item.slug}`}
                    className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow border-2 hover:border-ui-yellow"
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
                    <div className="p-4">
                      <h3 className="font-bold text-ui-navy mb-2 line-clamp-2 hover:text-ui-navy/80">
                        {item.title}
                      </h3>
                      {item.publishedDate && (
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(item.publishedDate), 'dd MMM yyyy', { locale: id })}
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
