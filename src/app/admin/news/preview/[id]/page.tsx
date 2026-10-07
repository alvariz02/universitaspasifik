import { db } from '@/lib/db'
import { requireStaff } from '@/lib/staff-auth'
import AdminLayout from '@/components/admin/AdminLayout'
import { SafeContent } from '@/components/SafeContent'
import { notFound } from 'next/navigation'
import Link from 'next/link'
export const dynamic = 'force-dynamic'
export const metadata = { title: 'Preview Berita', robots: { index: false, follow: false } }
export default async function PreviewPage({ params }: { params: Promise<{ id: string }> }) {
  await requireStaff('news')
  const { id } = await params
  const item = await db.news.findFirst({ where: { id: Number(id), deletedAt: null } })
  if (!item) notFound()
  return <AdminLayout><main className="admin-page max-w-4xl mx-auto px-4 py-8 space-y-6"><div className="rounded-xl bg-amber-50 border border-amber-200 p-4">Preview internal · {item.status}. Konten ini hanya tampil publik setelah dipublikasikan dan tanggal tayangnya tiba.</div><Link href="/admin/news" className="text-unipas-accent">← Kembali ke daftar berita</Link><article className="site-card bg-white border p-6 sm:p-10 space-y-5"><p className="text-muted-foreground">{item.category} · {item.authorName}</p><h1 className="admin-title ">{item.title}</h1>{item.excerpt && <p className="text-lg text-muted-foreground">{item.excerpt}</p>}{item.imageUrl && <img src={item.imageUrl} alt={item.title} className="w-full rounded-lg" />}<SafeContent content={item.content} /></article></main></AdminLayout>
}
