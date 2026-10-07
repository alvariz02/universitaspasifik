import type { Prisma } from '@prisma/client'

export function publishedNews(): Prisma.NewsWhereInput {
  return { status: 'published', deletedAt: null, AND: [{ OR: [{ publishedDate: null }, { publishedDate: { lte: new Date() } }] }] }
}
export function plainText(content: string) {
  return content.replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim()
}
