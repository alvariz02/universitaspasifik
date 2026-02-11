import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const facultyId = searchParams.get('facultyId')
    const limit = parseInt(searchParams.get('limit') || '50')

    const departments = await db.department.findMany({
      where: facultyId ? { facultyId: parseInt(facultyId) } : {},
      include: {
        faculty: {
          select: {
            name: true,
            slug: true
          }
        },
        head: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            position: true
          }
        }
      },
      orderBy: {
        name: 'asc'
      },
      take: limit
    })

    return NextResponse.json(departments)
  } catch (error) {
    console.error('Error fetching departments:', error)
    return NextResponse.json(
      { error: 'Failed to fetch departments' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const department = await db.department.create({
      data: {
        name: body.name,
        slug: body.slug,
        degreeLevel: body.degreeLevel,
        description: body.description,
        accreditation: body.accreditation,
        quota: body.quota,
        imageUrl: body.imageUrl,
        facultyId: body.facultyId
      },
      include: {
        faculty: {
          select: {
            name: true,
            slug: true
          }
        }
      }
    })

    return NextResponse.json(department, { status: 201 })
  } catch (error) {
    console.error('Error creating department:', error)
    return NextResponse.json(
      { error: 'Failed to create department' },
      { status: 500 }
    )
  }
}
