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

    const facilities = await db.facility.findMany({
      where,
      orderBy: {
        name: 'asc'
      },
      take: limit
    })

    return NextResponse.json(facilities)
  } catch (error) {
    console.error('Error fetching facilities:', error)
    return NextResponse.json(
      { error: 'Failed to fetch facilities' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const facility = await db.facility.create({
      data: {
        name: body.name,
        slug: body.slug,
        description: body.description,
        category: body.category,
        location: body.location,
        imageUrl: body.imageUrl,
        galleryUrls: body.galleryUrls,
        operatingHours: body.operatingHours,
        contactInfo: body.contactInfo,
      }
    })

    return NextResponse.json(facility, { status: 201 })
  } catch (error) {
    console.error('Error creating facility:', error)
    return NextResponse.json(
      { error: 'Failed to create facility' },
      { status: 500 }
    )
  }
}
