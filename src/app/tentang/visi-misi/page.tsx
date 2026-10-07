import { db } from '@/lib/db'
import ManagedPage from '@/components/ManagedPage'
import LegacyPage from './LegacyPage'
export const dynamic = 'force-dynamic'
export default async function Page() {
  const page = await db.page.findFirst({ where: { slug: 'visi-misi', deletedAt: null, isPublished: true } })
  return page ? <ManagedPage page={page} /> : <LegacyPage />
}
