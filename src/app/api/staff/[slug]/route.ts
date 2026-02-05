import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const staffId = parseInt(slug)

    if (isNaN(staffId)) {
      return NextResponse.json(
        { error: 'Invalid staff ID' },
        { status: 400 }
      )
    }

    const staff = await db.staff.findUnique({
      where: {
        id: staffId
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

    if (!staff) {
      return NextResponse.json(
        { error: 'Staff not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(staff)
  } catch (error) {
    console.error('Error fetching staff:', error)
    return NextResponse.json(
      { error: 'Failed to fetch staff' },
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
    const staffId = parseInt(slug)

    if (isNaN(staffId)) {
      return NextResponse.json(
        { error: 'Invalid staff ID' },
        { status: 400 }
      )
    }

    const body = await request.json()

    // fetch existing to handle leader links
    const existing = await db.staff.findUnique({ where: { id: staffId } })

    const newFacultyId = body.facultyId ? parseInt(body.facultyId) : null
    const newDepartmentId = body.departmentId ? parseInt(body.departmentId) : null
    const newRole = body.role

    // role-specific validation
    if (newRole === 'dean' && !newFacultyId) {
      return NextResponse.json({ error: 'Dean must be assigned to a faculty' }, { status: 400 })
    }

    if (newRole === 'department_head' && !newDepartmentId) {
      return NextResponse.json({ error: 'Department head must be assigned to a department' }, { status: 400 })
    }

    const staff = await db.staff.update({
      where: { id: staffId },
      data: {
        name: body.name || undefined,
        slug: body.slug || undefined,
        position: body.position || undefined,
        role: newRole || undefined,
        facultyId: newFacultyId ?? undefined,
        departmentId: newDepartmentId ?? undefined,
        email: body.email || undefined,
        phone: body.phone || undefined,
        photoUrl: body.photoUrl || undefined,
        bio: body.bio || undefined,
        researchInterest: body.researchInterest || undefined,
        googleScholarUrl: body.googleScholarUrl || undefined,
        isActive: body.isActive !== undefined ? body.isActive : undefined,
      }
    ,
      include: {
        faculty: {
          select: { id: true, name: true }
        },
        department: {
          select: { id: true, name: true }
        }
      }
    })

    // Update leadership relations
    try {
      // Faculties: if role is dean, set faculty.deanId -> staffId; unset other faculties where deanId == staffId
      if (newRole === 'dean') {
        if (newFacultyId) {
          await db.faculty.updateMany({ where: { deanId: staffId, id: { not: newFacultyId } }, data: { deanId: null } })
          await db.faculty.update({ where: { id: newFacultyId }, data: { deanId: staffId } })
        }
      } else {
        // role is not dean -> remove dean links pointing to this staff
        await db.faculty.updateMany({ where: { deanId: staffId }, data: { deanId: null } })
      }

      // Departments: if role is department_head, set department.headId -> staffId; unset other depts
      if (newRole === 'department_head') {
        if (newDepartmentId) {
          await db.department.updateMany({ where: { headId: staffId, id: { not: newDepartmentId } }, data: { headId: null } })
          await db.department.update({ where: { id: newDepartmentId }, data: { headId: staffId } })
        }
      } else {
        // role is not department_head -> remove head links pointing to this staff
        await db.department.updateMany({ where: { headId: staffId }, data: { headId: null } })
      }
    } catch (e) {
      console.error('Warning: failed to update faculty/department leadership links', e)
    }

    return NextResponse.json(staff)
  } catch (error) {
    console.error('Error updating staff:', error)
    return NextResponse.json(
      { error: 'Failed to update staff' },
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
    const staffId = parseInt(slug)

    if (isNaN(staffId)) {
      return NextResponse.json(
        { error: 'Invalid staff ID' },
        { status: 400 }
      )
    }

    // remove leadership links before deleting
    try {
      await db.faculty.updateMany({ where: { deanId: staffId }, data: { deanId: null } })
      await db.department.updateMany({ where: { headId: staffId }, data: { headId: null } })
    } catch (e) {
      console.error('Warning: failed to clear leadership links before delete', e)
    }

    await db.staff.delete({ where: { id: staffId } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting staff:', error)
    return NextResponse.json(
      { error: 'Failed to delete staff' },
      { status: 500 }
    )
  }
}
