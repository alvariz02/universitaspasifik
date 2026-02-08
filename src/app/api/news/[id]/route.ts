import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const newsId = parseInt(id)
    
    if (isNaN(newsId)) {
      return NextResponse.json(
        { error: 'Invalid news ID' },
        { status: 400 }
      )
    }

    console.log('🔍 Fetching single news:', newsId)
    
    const news = await db.news.findUnique({
      where: {
        id: newsId
      }
    })

    if (!news) {
      return NextResponse.json(
        { error: 'News not found' },
        { status: 404 }
      )
    }

    console.log('✅ News found:', news.title)
    return NextResponse.json(news)
  } catch (error) {
    console.error('❌ Error fetching news:', error)
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const newsId = parseInt(id)
    const body = await request.json()
    
    if (isNaN(newsId)) {
      return NextResponse.json(
        { error: 'Invalid news ID' },
        { status: 400 }
      )
    }

    console.log('📝 Updating news:', newsId, body.title)
    
    // Check if news exists
    const existingNews = await db.news.findUnique({
      where: { id: newsId }
    })

    if (!existingNews) {
      return NextResponse.json(
        { error: 'News not found' },
        { status: 404 }
      )
    }

    const updatedNews = await db.news.update({
      where: {
        id: newsId
      },
      data: {
        title: body.title,
        slug: body.slug,
        excerpt: body.excerpt,
        content: body.content,
        imageUrl: body.imageUrl,
        category: body.category,
        authorName: body.authorName,
        publishedDate: body.publishedDate ? new Date(body.publishedDate) : existingNews.publishedDate,
        isFeatured: body.isFeatured !== undefined ? body.isFeatured : existingNews.isFeatured,
      }
    })

    console.log('✅ News updated:', updatedNews.title)
    return NextResponse.json(updatedNews)
  } catch (error) {
    console.error('❌ Error updating news:', error)
    return NextResponse.json(
      { error: 'Failed to update news' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const newsId = parseInt(id)
    
    if (isNaN(newsId)) {
      return NextResponse.json(
        { error: 'Invalid news ID' },
        { status: 400 }
      )
    }

    console.log('🗑️ Deleting news:', newsId)
    
    // Check if news exists
    const existingNews = await db.news.findUnique({
      where: { id: newsId }
    })

    if (!existingNews) {
      return NextResponse.json(
        { error: 'News not found' },
        { status: 404 }
      )
    }

    await db.news.delete({
      where: {
        id: newsId
      }
    })

    console.log('✅ News deleted:', existingNews.title)
    return NextResponse.json(
      { message: 'News deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('❌ Error deleting news:', error)
    return NextResponse.json(
      { error: 'Failed to delete news' },
      { status: 500 }
    )
  }
}
