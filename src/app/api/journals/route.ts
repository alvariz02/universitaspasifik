import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET /api/journals - Ambil semua jurnal
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '10')
    const category = searchParams.get('category')
    const facultyId = searchParams.get('facultyId')
    const featured = searchParams.get('featured')
    const year = searchParams.get('year')
    const search = searchParams.get('search')

    const where: any = {
      isActive: true
    }

    if (category) {
      where.category = category
    }

    if (facultyId) {
      where.facultyId = parseInt(facultyId)
    }

    if (featured === 'true') {
      where.isFeatured = true
    }

    if (year) {
      where.year = parseInt(year)
    }

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { authors: { contains: search } },
        { keywords: { contains: search } }
      ]
    }

    const journals = await prisma.journal.findMany({
      where,
      include: {
        faculty: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        }
      },
      orderBy: [
        { isFeatured: 'desc' },
        { publishedDate: 'desc' },
        { createdAt: 'desc' }
      ],
      take: limit
    })

    return NextResponse.json(journals)
  } catch (error) {
    console.error('Error fetching journals:', error)
    return NextResponse.json(
      { error: 'Failed to fetch journals' },
      { status: 500 }
    )
  }
}

// POST /api/journals - Tambah jurnal baru
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      title,
      abstract,
      authors,
      authorAffiliation,
      keywords,
      category,
      subject,
      language,
      pages,
      volume,
      issue,
      year,
      publishedDate,
      doi,
      issn,
      pdfUrl,
      pdfSize,
      isOpenAccess,
      isPeerReviewed,
      isFeatured,
      facultyId
    } = body

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()

    const journal = await prisma.journal.create({
      data: {
        title,
        slug,
        abstract,
        authors,
        authorAffiliation,
        keywords,
        category,
        subject,
        language: language || 'id',
        pages,
        volume,
        issue,
        year: year ? parseInt(year) : null,
        publishedDate: publishedDate ? new Date(publishedDate) : null,
        doi,
        issn,
        pdfUrl,
        pdfSize: pdfSize ? parseInt(pdfSize) : null,
        isOpenAccess: isOpenAccess ?? true,
        isPeerReviewed: isPeerReviewed ?? false,
        isFeatured: isFeatured ?? false,
        facultyId: facultyId ? parseInt(facultyId) : null
      },
      include: {
        faculty: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        }
      }
    })

    return NextResponse.json(journal, { status: 201 })
  } catch (error) {
    console.error('Error creating journal:', error)
    return NextResponse.json(
      { error: 'Failed to create journal' },
      { status: 500 }
    )
  }
}