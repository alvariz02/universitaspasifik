import { db } from '@/lib/db'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { SafeContent } from '@/components/SafeContent'
export const dynamic = 'force-dynamic'
export default async function ResearchPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const item = await db.research.findFirst({ where: { slug, deletedAt: null } })
  if (!item) notFound()
  return <div className="min-h-screen flex flex-col"><Header /><main className="public-page flex-1 max-w-4xl w-full mx-auto px-4 py-12 space-y-6"><Link href="/penelitian" className="text-unipas-accent">← Daftar penelitian</Link><h1 className="page-title text-unipas-primary">{item.title}</h1>{item.researchers && <p>Peneliti: {item.researchers}</p>}{item.publicationDate && <p className="text-muted-foreground">{item.publicationDate.toLocaleDateString('id-ID')}</p>}{item.imageUrl && <img src={item.imageUrl} alt={item.title} className="w-full rounded-xl" />}<SafeContent content={item.abstract || ''} />{item.pdfUrl && <a href={item.pdfUrl} target="_blank" rel="noopener noreferrer" className="inline-flex rounded-lg bg-unipas-primary text-white px-5 py-3">Buka publikasi/PDF</a>}</main><Footer /></div>
}
