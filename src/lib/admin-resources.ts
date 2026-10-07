import { z } from 'zod'

const text = z.string().trim()
const slug = text.min(1).max(150).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug harus berupa huruf kecil, angka, dan tanda hubung')
const url = z.union([z.literal(''), z.string().url().regex(/^https?:\/\//)]).nullish()
const date = z.union([z.literal(''), z.string().datetime({ offset: true }), z.string().regex(/^\d{4}-\d{2}-\d{2}$/)]).nullish()
export const applicantSchema = z.object({
  fullName: text.min(1).max(200), email: text.email().max(254), phone: text.min(6).max(50),
  admissionPath: z.enum(['snbp', 'snbt', 'simak']), highSchool: text.min(1).max(250),
  major: text.min(1).max(250), gpa: z.coerce.number().min(0).max(100), address: text.min(1).max(2000), motivation: text.min(1).max(5000),
})
export const resourceSchemas = {
  news: z.object({ title: text.min(1).max(300), slug, excerpt: text.max(3000).nullish(), content: text.min(1).max(200000), imageUrl: url, category: text.max(100).nullish(), authorName: text.max(200).nullish(), publishedDate: date, isFeatured: z.boolean().optional(), status: z.enum(['draft', 'review', 'published']).default('draft') }),
  research: z.object({ title: text.min(1).max(300), slug, abstract: text.max(30000).nullish(), researchers: text.max(3000).nullish(), publicationDate: date, category: text.max(100).nullish(), keywords: text.max(1000).nullish(), imageUrl: url, pdfUrl: url, facultyId: z.coerce.number().int().positive().nullable().nullish() }),
  pages: z.object({ title: text.min(1).max(300), slug, content: text.min(1).max(200000), metaDescription: text.max(500).nullish(), metaKeywords: text.max(1000).nullish(), isPublished: z.boolean().default(true) }),
  applicants: applicantSchema.extend({ status: z.enum(['new', 'contacted', 'verified', 'accepted', 'rejected']).default('new'), notes: text.max(10000).default('') }),
  media: z.object({ name: text.min(1).max(300), url: z.string().url().regex(/^https?:\/\//), altText: text.max(500).default('') }),
  users: z.object({ name: text.min(1).max(200), email: text.email().max(254).transform(v => v.toLowerCase()), password: z.union([z.literal(''), z.string().min(12).max(256)]).nullish(), role: z.enum(['admin', 'humas', 'editor']), isActive: z.boolean().default(true) }),
}
export type AdminResource = keyof typeof resourceSchemas
export const delegates = { news: 'news', research: 'research', pages: 'page', applicants: 'applicant', media: 'mediaAsset', users: 'adminUser' } as const

export function isResource(value: string): value is AdminResource { return Object.hasOwn(delegates, value) }
export function editableData(resource: AdminResource, input: unknown) {
  const parsed = resourceSchemas[resource].safeParse(input)
  if (!parsed.success) return { error: parsed.error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join('; ') }
  const data: Record<string, any> = { ...parsed.data }
  for (const key of ['publishedDate', 'publicationDate']) if (key in data) data[key] = data[key] ? new Date(data[key]) : null
  if (resource === 'news' && data.status === 'published' && !data.publishedDate) data.publishedDate = new Date()
  return { data }
}
export function safeRecord(record: any) {
  if (!record) return record
  const { passwordHash, ...safe } = record
  return safe
}
