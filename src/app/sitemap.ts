// app/sitemap.ts

import { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'

export const revalidate = 3600 // re-generate sitemap tiap 1 jam (ISR)

// Supabase client (server side only)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.univpasifik.ac.id'
  const staticDate = new Date('2025-01-01')

  // ======================
  // STATIC PAGES
  // ======================

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/tentang`,
      lastModified: staticDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tentang/visi-misi`,
      lastModified: staticDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/fakultas`,
      lastModified: staticDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/program-studi`,
      lastModified: staticDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/berita`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pengumuman`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/event`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/jurnal`,
      lastModified: staticDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kontak`,
      lastModified: staticDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privasi`,
      lastModified: staticDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // ======================
  // DYNAMIC DATA
  // ======================

  const { data: berita } = await supabase
    .from('berita')
    .select('slug, updated_at')
    .eq('status', 'published')

  const { data: pengumuman } = await supabase
    .from('pengumuman')
    .select('slug, updated_at')
    .eq('status', 'published')

  const { data: event } = await supabase
    .from('event')
    .select('slug, updated_at')
    .eq('status', 'published')

  const { data: jurnal } = await supabase
    .from('jurnal')
    .select('slug, updated_at')
    .eq('status', 'published')

  // ======================
  // MAP DYNAMIC ROUTES
  // ======================

  const beritaUrls =
    berita?.map((item) => ({
      url: `${baseUrl}/berita/${item.slug}`,
      lastModified: new Date(item.updated_at),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })) ?? []

  const pengumumanUrls =
    pengumuman?.map((item) => ({
      url: `${baseUrl}/pengumuman/${item.slug}`,
      lastModified: new Date(item.updated_at),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })) ?? []

  const eventUrls =
    event?.map((item) => ({
      url: `${baseUrl}/event/${item.slug}`,
      lastModified: new Date(item.updated_at),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })) ?? []

  const jurnalUrls =
    jurnal?.map((item) => ({
      url: `${baseUrl}/jurnal/${item.slug}`,
      lastModified: new Date(item.updated_at),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })) ?? []

  // ======================
  // RETURN ALL
  // ======================

  return [
    ...staticPages,
    ...beritaUrls,
    ...pengumumanUrls,
    ...eventUrls,
    ...jurnalUrls,
  ]
}
