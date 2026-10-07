import ResourceManager from '@/components/admin/ResourceManager'
import { notFound } from 'next/navigation'

export default async function ManagePage({ params }: { params: Promise<{ resource: string }> }) {
  const { resource } = await params
  if (!['news', 'research', 'pages', 'applicants', 'media', 'users', 'history'].includes(resource)) notFound()
  return <ResourceManager resource={resource} />
}
