import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '10')
    const category = searchParams.get('category')

    const where: any = {}

    if (category) {
      where.category = category
    }

    const galleries = await db.gallery.findMany({
      where,
      orderBy: {
        uploadDate: 'desc'
      },
      take: limit
    })

    return NextResponse.json(galleries)
  } catch (error) {
    console.error('Error fetching galleries:', error)
    return NextResponse.json(
      { error: 'Failed to fetch galleries' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const gallery = await db.gallery.create({
      data: {
        title: body.title,
        description: body.description,
        imageUrl: body.imageUrl,
        category: body.category,
        uploadDate: body.uploadDate ? new Date(body.uploadDate) : new Date(),
      }
    })

    return NextResponse.json(gallery, { status: 201 })
  } catch (error) {
    console.error('Error creating gallery:', error)
    return NextResponse.json(
      { error: 'Failed to create gallery' },
      { status: 500 }
    )
  }
}
