import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const department = await db.department.findUnique({
      where: { id: parseInt(id) },
      include: {
        faculty: {
          select: {
            name: true,
            slug: true
          }
        }
      }
    })

    if (!department) {
      return NextResponse.json(
        { error: 'Department not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(department)
  } catch (error) {
    console.error('Error fetching department:', error)
    return NextResponse.json(
      { error: 'Failed to fetch department' },
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
    const body = await request.json()

    const department = await db.department.update({
      where: { id: parseInt(id) },
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

    return NextResponse.json(department)
  } catch (error) {
    console.error('Error updating department:', error)
    return NextResponse.json(
      { error: 'Failed to update department' },
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

    await db.department.delete({
      where: { id: parseInt(id) }
    })

    return NextResponse.json({ message: 'Department deleted successfully' })
  } catch (error) {
    console.error('Error deleting department:', error)
    return NextResponse.json(
      { error: 'Failed to delete department' },
      { status: 500 }
    )
  }
}
