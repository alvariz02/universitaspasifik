import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '10')
    const active = searchParams.get('active')

    const where: any = {}
    
    if (active === 'true') {
      const now = new Date()
      where.isActive = true
      where.displayStart = { lte: now }
      where.displayEnd = { gte: now }
    }

    const admissions = await db.admission.findMany({
      where,
      orderBy: {
        displayStart: 'desc'
      },
      take: limit
    })

    return NextResponse.json(admissions)
  } catch (error) {
    console.error('Error fetching admissions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch admissions' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const admission = await db.admission.create({
      data: {
        title: body.title,
        slug: body.slug,
        image1Url: body.image1Url || null,
        image2Url: body.image2Url || null,
        image3Url: body.image3Url || null,
        displayStart: body.displayStart ? new Date(body.displayStart) : new Date(),
        displayEnd: body.displayEnd ? new Date(body.displayEnd) : new Date(),
        isActive: body.isActive !== undefined ? body.isActive : true,
      }
    })

    return NextResponse.json(admission, { status: 201 })
  } catch (error) {
    console.error('Error creating admission:', error)
    return NextResponse.json(
      { error: 'Failed to create admission' },
      { status: 500 }
    )
  }
}
