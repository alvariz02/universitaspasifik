import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const sliderId = parseInt(slug)

    let slider

    if (!isNaN(sliderId)) {
      slider = await db.heroSlider.findUnique({
        where: {
          id: sliderId
        }
      })
    } else {
      return NextResponse.json(
        { error: 'Invalid slider ID' },
        { status: 400 }
      )
    }

    if (!slider) {
      return NextResponse.json(
        { error: 'Slider not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(slider)
  } catch (error) {
    console.error('Error fetching hero slider:', error)
    return NextResponse.json(
      { error: 'Failed to fetch hero slider' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const sliderId = parseInt(slug)

    if (isNaN(sliderId)) {
      return NextResponse.json(
        { error: 'Invalid slider ID' },
        { status: 400 }
      )
    }

    const body = await request.json()
    const { title, subtitle, imageUrl, linkUrl, linkText, orderPosition, isActive } = body

    const slider = await db.heroSlider.update({
      where: {
        id: sliderId
      },
      data: {
        title,
        subtitle,
        imageUrl,
        linkUrl,
        linkText,
        orderPosition,
        isActive
      }
    })

    return NextResponse.json(slider)
  } catch (error) {
    console.error('Error updating hero slider:', error)
    return NextResponse.json(
      { error: 'Failed to update hero slider' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const sliderId = parseInt(slug)

    if (isNaN(sliderId)) {
      return NextResponse.json(
        { error: 'Invalid slider ID' },
        { status: 400 }
      )
    }

    await db.heroSlider.delete({
      where: {
        id: sliderId
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting hero slider:', error)
    return NextResponse.json(
      { error: 'Failed to delete hero slider' },
      { status: 500 }
    )
  }
}
