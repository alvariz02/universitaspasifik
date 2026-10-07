import { db } from '@/lib/db'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { SafeContent } from '@/components/SafeContent'
import { notFound } from 'next/navigation'
import Link from 'next/link'
export const dynamic = 'force-dynamic'
export default async function JournalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const journal = await db.journal.findFirst({ where: { slug, isActive: true } })
  if (!journal) notFound()
  return <div className="min-h-screen flex flex-col"><Header /><main className="public-page max-w-4xl w-full mx-auto px-4 py-12 flex-1 space-y-6"><Link href="/jurnal" className="text-unipas-accent">← Daftar jurnal</Link><h1 className="page-title text-unipas-primary">{journal.title}</h1><p>{journal.authors}</p><p className="text-muted-foreground">{journal.year} · {journal.category}</p><SafeContent content={journal.abstract || ''} />{journal.keywords && <p>Kata kunci: {journal.keywords}</p>}{journal.pdfUrl && <a href={journal.pdfUrl} target="_blank" rel="noopener noreferrer" className="inline-flex rounded-lg bg-unipas-primary text-white px-5 py-3">Buka PDF</a>}</main><Footer /></div>
}
