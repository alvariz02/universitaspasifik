import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured')
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = parseInt(searchParams.get('offset') || '0')

    let news
    let total

    if (featured === 'true') {
      news = await db.news.findMany({
        where: {
          isFeatured: true
        },
        orderBy: {
          publishedDate: 'desc'
        },
        take: limit,
        skip: offset
      })
      total = await db.news.count({
        where: {
          isFeatured: true
        }
      })
    } else {
      news = await db.news.findMany({
        orderBy: {
          publishedDate: 'desc'
        },
        take: limit,
        skip: offset
      })
      total = await db.news.count()
    }

    return NextResponse.json({
      news,
      total,
      limit,
      offset
    })
  } catch (error) {
    console.error('Error fetching news:', error)
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const news = await db.news.create({
      data: {
        title: body.title,
        slug: body.slug,
        excerpt: body.excerpt,
        content: body.content,
        imageUrl: body.imageUrl,
        category: body.category,
        authorName: body.authorName,
        publishedDate: body.publishedDate ? new Date(body.publishedDate) : new Date(),
        isFeatured: body.isFeatured || false,
        viewCount: 0,
      }
    })

    return NextResponse.json(news, { status: 201 })
  } catch (error) {
    console.error('Error creating news:', error)
    return NextResponse.json(
      { error: 'Failed to create news' },
      { status: 500 }
    )
  }
}
