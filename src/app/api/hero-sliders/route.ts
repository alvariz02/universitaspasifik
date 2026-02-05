import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = parseInt(searchParams.get('offset') || '0')

    const sliders = await db.heroSlider.findMany({
      where: {
        isActive: true
      },
      orderBy: {
        orderPosition: 'asc'
      },
      take: limit,
      skip: offset
    })

    const total = await db.heroSlider.count({
      where: {
        isActive: true
      }
    })

    return NextResponse.json({
      sliders,
      total,
      limit,
      offset
    })
  } catch (error) {
    console.error('Error fetching hero sliders:', error)
    return NextResponse.json(
      { error: 'Failed to fetch hero sliders' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, subtitle, imageUrl, linkUrl, linkText, orderPosition, isActive } = body

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'Image URL is required' },
        { status: 400 }
      )
    }

    const slider = await db.heroSlider.create({
      data: {
        title,
        subtitle,
        imageUrl,
        linkUrl,
        linkText,
        orderPosition: orderPosition || 0,
        isActive: isActive !== false
      }
    })

    return NextResponse.json(slider, { status: 201 })
  } catch (error) {
    console.error('Error creating hero slider:', error)
    return NextResponse.json(
      { error: 'Failed to create hero slider' },
      { status: 500 }
    )
  }
}
