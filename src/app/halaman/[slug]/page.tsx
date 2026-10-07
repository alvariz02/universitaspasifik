import { db } from '@/lib/db'
import ManagedPage from '@/components/ManagedPage'
import { notFound } from 'next/navigation'
export const dynamic = 'force-dynamic'
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = await db.page.findFirst({ where: { slug, deletedAt: null, isPublished: true } })
  return { title: page?.title || 'Halaman tidak ditemukan', description: page?.metaDescription || undefined }
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = await db.page.findFirst({ where: { slug, deletedAt: null, isPublished: true } })
  if (!page) notFound()
  return <ManagedPage page={page} />
}
