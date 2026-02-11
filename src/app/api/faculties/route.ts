import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '10')

    const faculties = await db.faculty.findMany({
      include: {
        departments: {
          include: {
            head: {
              select: {
                id: true,
                name: true,
                email: true,
                phone: true
              }
            }
          },
          orderBy: {
            name: 'asc'
          }
        }
      },
      orderBy: {
        name: 'asc'
      },
      take: limit
    })

    return NextResponse.json(faculties)
  } catch (error) {
    console.error('Error fetching faculties:', error)
    return NextResponse.json(
      { error: 'Failed to fetch faculties' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const faculty = await db.faculty.create({
      data: {
        name: body.name,
        slug: body.slug,
        description: body.description,
        deanName: body.deanName,
        imageUrl: body.imageUrl,
        location: body.location,
        contactEmail: body.contactEmail,
        contactPhone: body.contactPhone,
        websiteUrl: body.websiteUrl,
        establishedYear: body.establishedYear,
      }
    })

    return NextResponse.json(faculty, { status: 201 })
  } catch (error) {
    console.error('Error creating faculty:', error)
    return NextResponse.json(
      { error: 'Failed to create faculty' },
      { status: 500 }
    )
  }
}
