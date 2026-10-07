import { currentStaff } from '@/lib/staff-auth'
import { redirect } from 'next/navigation'

export default async function AdminSessionLayout({ children }: { children: React.ReactNode }) {
  const user = await currentStaff()
  if (!user) redirect('/login')
  return children
}
