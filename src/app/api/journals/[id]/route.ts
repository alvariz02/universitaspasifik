import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET /api/journals/[id] - Ambil jurnal by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params
    const id = parseInt(idParam)
    const journal = await prisma.journal.findUnique({
      where: { id },
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

    if (!journal) {
      return NextResponse.json(
        { error: 'Journal not found' },
        { status: 404 }
      )
    }

    // Increment view count
    await prisma.journal.update({
      where: { id },
      data: { viewCount: { increment: 1 } }
    })

    return NextResponse.json(journal)
  } catch (error) {
    console.error('Error fetching journal:', error)
    return NextResponse.json(
      { error: 'Failed to fetch journal' },
      { status: 500 }
    )
  }
}

// PUT /api/journals/[id] - Update jurnal
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params
    const id = parseInt(idParam)
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
      isActive,
      facultyId
    } = body

    // Generate new slug if title changed
    let slug = undefined
    if (title) {
      slug = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()
    }

    const journal = await prisma.journal.update({
      where: { id },
      data: {
        title,
        slug,
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
        year: year ? parseInt(year) : null,
        publishedDate: publishedDate ? new Date(publishedDate) : null,
        doi,
        issn,
        pdfUrl,
        pdfSize: pdfSize ? parseInt(pdfSize) : null,
        isOpenAccess,
        isPeerReviewed,
        isFeatured,
        isActive,
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

    return NextResponse.json(journal)
  } catch (error) {
    console.error('Error updating journal:', error)
    return NextResponse.json(
      { error: 'Failed to update journal' },
      { status: 500 }
    )
  }
}

// DELETE /api/journals/[id] - Hapus jurnal
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params
    const id = parseInt(idParam)
    await prisma.journal.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Journal deleted successfully' })
  } catch (error) {
    console.error('Error deleting journal:', error)
    return NextResponse.json(
      { error: 'Failed to delete journal' },
      { status: 500 }
    )
  }
}