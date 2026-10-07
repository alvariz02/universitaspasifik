import { Prisma } from '@prisma/client'
import { db } from '@/lib/db'
import { plainText } from '@/lib/content'

export const searchTypes = { news: 'Berita', announcements: 'Pengumuman', departments: 'Program studi', faculties: 'Fakultas', journals: 'Jurnal', research: 'Penelitian', events: 'Event', pages: 'Halaman' }
export type SearchType = keyof typeof searchTypes

// All identifiers below are fixed source constants, never user input.
const sources: Record<SearchType, { table: string; title: string; excerpt: string; fields: string[]; visible: string; url: (row: any) => string }> = {
  news: { table: 'News', title: 'title', excerpt: 'excerpt', fields: ['title', 'excerpt', 'content'], visible: `"status" = 'published' AND "deletedAt" IS NULL AND ("publishedDate" IS NULL OR "publishedDate" <= statement_timestamp())`, url: r => `/berita/${r.slug}` },
  announcements: { table: 'Announcement', title: 'title', excerpt: 'content', fields: ['title', 'content'], visible: `"isActive" = true AND ("startDate" IS NULL OR "startDate" <= statement_timestamp()) AND ("endDate" IS NULL OR "endDate" >= statement_timestamp())`, url: r => `/pengumuman/${r.id}` },
  departments: { table: 'Department', title: 'name', excerpt: 'description', fields: ['name', 'description'], visible: 'true', url: r => `/program-studi#prodi-${r.id}` },
  faculties: { table: 'Faculty', title: 'name', excerpt: 'description', fields: ['name', 'description'], visible: 'true', url: r => `/fakultas/${r.slug}` },
  journals: { table: 'Journal', title: 'title', excerpt: 'abstract', fields: ['title', 'abstract', 'authors', 'keywords'], visible: '"isActive" = true', url: r => `/jurnal/${r.slug}` },
  research: { table: 'Research', title: 'title', excerpt: 'abstract', fields: ['title', 'abstract', 'researchers', 'keywords'], visible: '"deletedAt" IS NULL', url: r => `/penelitian/${r.slug}` },
  events: { table: 'Event', title: 'title', excerpt: 'description', fields: ['title', 'description'], visible: 'true', url: r => `/event/${r.slug}` },
  pages: { table: 'Page', title: 'title', excerpt: 'content', fields: ['title', 'content'], visible: '"deletedAt" IS NULL AND "isPublished" = true', url: r => ['profil', 'sejarah', 'visi-misi'].includes(r.slug) ? `/tentang/${r.slug}` : `/halaman/${r.slug}` },
}
export async function searchSite(query: string, type = 'all', page = 1) {
  const q = query.trim().slice(0, 100)
  if (q.length < 2) return { groups: [], total: 0 }
  const types = Object.keys(searchTypes).filter(key => type === 'all' || key === type) as SearchType[]
  if (!types.length) return { groups: [], total: 0 }
  const fragments = types.map(key => {
    const source = sources[key]
    const matches = source.fields.map(field => Prisma.sql`strpos(lower(COALESCE(${Prisma.raw('"' + field + '"')}, '')), lower(${q})) > 0`)
    const slug = key === 'announcements' ? Prisma.raw('"id"::text') : Prisma.raw('"slug"')
    return Prisma.sql`SELECT ${key}::text AS kind, "id", ${Prisma.raw('"' + source.title + '"')}::text AS title,
      ${Prisma.raw('"' + source.excerpt + '"')}::text AS excerpt, ${slug}::text AS slug, "updatedAt"
      FROM ${Prisma.raw('"' + source.table + '"')}
      WHERE (${Prisma.raw(source.visible)}) AND (${Prisma.join(matches, ' OR ')})`
  })
  const take = type === 'all' ? 5 : 20
  const offset = type === 'all' ? 0 : (Math.max(1, page) - 1) * take
  // One database round trip also works with connection_limit=1.
  const rows = await db.$queryRaw<Array<{ kind: SearchType; id: number | null; title: string; excerpt: string | null; slug: string; total: bigint }>>(Prisma.sql`
    WITH matches AS (${Prisma.join(fragments, ' UNION ALL ')}),
    ranked AS (SELECT *, count(*) OVER (PARTITION BY kind) AS total,
      row_number() OVER (PARTITION BY kind ORDER BY "updatedAt" DESC, "id" DESC) AS rownum FROM matches)
    SELECT counts.kind, selected."id", selected.title, selected.excerpt, selected.slug, counts.total
    FROM (SELECT kind, max(total) AS total FROM ranked GROUP BY kind) counts
    LEFT JOIN LATERAL (SELECT * FROM ranked WHERE kind = counts.kind
      AND rownum > ${offset} AND rownum <= ${offset + take} ORDER BY rownum) selected ON true
    ORDER BY counts.kind, selected.rownum
  `)
  const groups = types.map(key => {
    const records = rows.filter(row => row.kind === key && row.id !== null)
    return { type: key, label: searchTypes[key], total: Number(rows.find(row => row.kind === key)?.total || 0), items: records.map(row => ({ id: row.id, title: row.title, excerpt: plainText(row.excerpt || '').slice(0, 240), url: sources[key].url(row) })) }
  })
  return { groups, total: groups.reduce((sum, group) => sum + group.total, 0) }
}
