import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET /api/videos/[id] - Ambil video by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params
    const id = parseInt(idParam)
    const video = await prisma.video.findUnique({
      where: { id }
    })

    if (!video) {
      return NextResponse.json(
        { error: 'Video not found' },
        { status: 404 }
      )
    }

    // Increment view count
    await prisma.video.update({
      where: { id },
      data: { viewCount: { increment: 1 } }
    })

    return NextResponse.json(video)
  } catch (error) {
    console.error('Error fetching video:', error)
    return NextResponse.json(
      { error: 'Failed to fetch video' },
      { status: 500 }
    )
  }
}

// PUT /api/videos/[id] - Update video
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params
    const id = parseInt(idParam)
    const body = await request.json()
    const { title, description, youtubeUrl, category, isFeatured, isActive } = body

    let updateData: any = {
      title,
      description,
      category,
      isFeatured,
      isActive
    }

    // If YouTube URL changed, update ID and thumbnail
    if (youtubeUrl) {
      const youtubeId = extractYouTubeId(youtubeUrl)
      if (!youtubeId) {
        return NextResponse.json(
          { error: 'Invalid YouTube URL' },
          { status: 400 }
        )
      }
      updateData.youtubeUrl = youtubeUrl
      updateData.youtubeId = youtubeId
      updateData.thumbnail = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
    }

    const video = await prisma.video.update({
      where: { id },
      data: updateData
    })

    return NextResponse.json(video)
  } catch (error) {
    console.error('Error updating video:', error)
    return NextResponse.json(
      { error: 'Failed to update video' },
      { status: 500 }
    )
  }
}

// DELETE /api/videos/[id] - Hapus video
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params
    const id = parseInt(idParam)
    await prisma.video.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Video deleted successfully' })
  } catch (error) {
    console.error('Error deleting video:', error)
    return NextResponse.json(
      { error: 'Failed to delete video' },
      { status: 500 }
    )
  }
}

// Helper function to extract YouTube ID from URL
function extractYouTubeId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return (match && match[2].length === 11) ? match[2] : null
}