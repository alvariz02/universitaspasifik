import { withStaffAccess } from '@/lib/api-access'
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

async function handlePUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const announcement = await db.announcement.update({
      where: { id: parseInt(id) },
      data: {
        title: body.title,
        content: body.content,
        category: body.category,
        priority: body.priority,
        startDate: body.startDate ? new Date(body.startDate) : null,
        endDate: body.endDate ? new Date(body.endDate) : null,
        isActive: body.isActive,
      }
    })

    return NextResponse.json(announcement)
  } catch (error) {
    console.error('Error updating announcement:', error)
    return NextResponse.json(
      { error: 'Failed to update announcement' },
      { status: 500 }
    )
  }
}

async function handleDELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    await db.announcement.delete({
      where: { id: parseInt(id) }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting announcement:', error)
    return NextResponse.json(
      { error: 'Failed to delete announcement' },
      { status: 500 }
    )
  }
}

export const PUT = withStaffAccess('announcements', handlePUT)
export const DELETE = withStaffAccess('announcements', handleDELETE)
