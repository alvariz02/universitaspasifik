import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    // Cek apakah slug adalah ID (angka) atau string
    const isId = /^\d+$/.test(slug)
    
    let faculty
    
    if (isId) {
      // Query by ID
      const facultyId = parseInt(slug)
      faculty = await db.faculty.findUnique({
        where: {
          id: facultyId
        },
        include: {
          departments: {
            orderBy: {
              name: 'asc'
            }
          }
        }
      })
    } else {
      // Query by slug
      faculty = await db.faculty.findUnique({
        where: {
          slug
        },
        include: {
          departments: {
            orderBy: {
              name: 'asc'
            }
          },
          staff: {
            where: {
              position: 'Dekan'
            },
            orderBy: {
              name: 'asc'
            }
          }
        }
      })
    }

    if (!faculty) {
      return NextResponse.json(
        { error: 'Faculty not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(faculty)
  } catch (error) {
    console.error('Error fetching faculty:', error)
    return NextResponse.json(
      { error: 'Failed to fetch faculty' },
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
    const body = await request.json()

    // Cek apakah slug adalah ID (angka) atau string
    const isId = /^\d+$/.test(slug)
    
    let faculty
    
    if (isId) {
      // Update by ID
      const facultyId = parseInt(slug)
      faculty = await db.faculty.update({
        where: {
          id: facultyId
        },
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
          establishedYear: body.establishedYear ? parseInt(body.establishedYear) : undefined
        },
        include: {
          departments: true
        }
      })
    } else {
      // Update by slug
      faculty = await db.faculty.update({
        where: {
          slug
        },
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
          establishedYear: body.establishedYear ? parseInt(body.establishedYear) : undefined
        },
        include: {
          departments: true,
          staff: {
            where: {
              position: 'Dekan'
            }
          }
        }
      })
    }

    return NextResponse.json(faculty)
  } catch (error) {
    console.error('Error updating faculty:', error)
    return NextResponse.json(
      { error: 'Failed to update faculty' },
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

    // Cek apakah slug adalah ID (angka) atau string
    const isId = /^\d+$/.test(slug)
    
    if (isId) {
      // Delete by ID
      const facultyId = parseInt(slug)

      // Check if faculty has departments
      const departmentsCount = await db.department.count({
        where: {
          facultyId: facultyId
        }
      })

      if (departmentsCount > 0) {
        return NextResponse.json(
          { error: 'Cannot delete faculty with existing departments' },
          { status: 400 }
        )
      }

      await db.faculty.delete({
        where: {
          id: facultyId
        }
      })
    } else {
      // Delete by slug
      // First get the faculty to check departments
      const faculty = await db.faculty.findUnique({
        where: { slug }
      })

      if (!faculty) {
        return NextResponse.json(
          { error: 'Faculty not found' },
          { status: 404 }
        )
      }

      // Check if faculty has departments
      const departmentsCount = await db.department.count({
        where: {
          facultyId: faculty.id
        }
      })

      if (departmentsCount > 0) {
        return NextResponse.json(
          { error: 'Cannot delete faculty with existing departments' },
          { status: 400 }
        )
      }

      await db.faculty.delete({
        where: {
          slug
        }
      })
    }

    return NextResponse.json({ message: 'Faculty deleted successfully' })
  } catch (error) {
    console.error('Error deleting faculty:', error)
    return NextResponse.json(
      { error: 'Failed to delete faculty' },
      { status: 500 }
    )
  }
}
