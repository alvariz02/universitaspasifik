import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '10')
    const facultyId = searchParams.get('facultyId')
    const departmentId = searchParams.get('departmentId')

    const where: any = {}

    if (facultyId) {
      where.facultyId = parseInt(facultyId)
    }

    if (departmentId) {
      where.departmentId = parseInt(departmentId)
    }

    const staff = await db.staff.findMany({
      where,
      orderBy: {
        name: 'asc'
      },
      take: limit,
      include: {
        faculty: {
          select: {
            name: true,
          }
        },
        department: {
          select: {
            name: true,
          }
        }
      }
    })

    return NextResponse.json(staff)
  } catch (error) {
    console.error('Error fetching staff:', error)
    return NextResponse.json(
      { error: 'Failed to fetch staff' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validasi field yang diperlukan
    if (!body.name || !body.slug) {
      return NextResponse.json(
        { error: 'Name and slug are required' },
        { status: 400 }
      )
    }
    // Role-specific validation
    const role = body.role
    const facultyId = body.facultyId ? parseInt(body.facultyId) : undefined
    const departmentId = body.departmentId ? parseInt(body.departmentId) : undefined

    if (role === 'dean' && !facultyId) {
      return NextResponse.json({ error: 'Dean must be assigned to a faculty' }, { status: 400 })
    }

    if (role === 'department_head' && !departmentId) {
      return NextResponse.json({ error: 'Department head must be assigned to a department' }, { status: 400 })
    }

    const staff = await db.staff.create({
      data: {
        name: body.name,
        slug: body.slug,
        position: body.position,
        role: role,
        facultyId: facultyId ?? null,
        departmentId: departmentId ?? null,
        email: body.email,
        phone: body.phone,
        photoUrl: body.photoUrl,
        bio: body.bio,
        researchInterest: body.researchInterest,
        googleScholarUrl: body.googleScholarUrl,
        isActive: body.isActive !== undefined ? body.isActive : true,
      },
      include: {
        faculty: {
          select: {
            id: true,
            name: true,
          }
        },
        department: {
          select: {
            id: true,
            name: true,
          }
        }
      }
    })

    // Maintain Faculty.deanId and Department.headId relations when relevant
    try {
      if (role === 'dean' && staff.facultyId) {
        await db.faculty.update({ where: { id: staff.facultyId }, data: { deanId: staff.id } })
      }

      if (role === 'department_head' && staff.departmentId) {
        await db.department.update({ where: { id: staff.departmentId }, data: { headId: staff.id } })
      }
    } catch (e) {
      console.error('Warning: failed to update faculty/department leadership links', e)
    }

    return NextResponse.json(staff, { status: 201 })
  } catch (error) {
    console.error('Error creating staff:', error)
    return NextResponse.json(
      { error: 'Failed to create staff' },
      { status: 500 }
    )
  }
}
