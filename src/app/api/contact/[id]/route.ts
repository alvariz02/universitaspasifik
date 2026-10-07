import { withStaffAccess } from '@/lib/api-access'
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

async function handlePUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params
    const contactId = Number(id)
    if (Number.isNaN(contactId)) {
      return NextResponse.json({ error: 'Invalid contact ID' }, { status: 400 })
    }

    const body = await request.json()
    const { status } = body

    if (!status || !['pending', 'replied', 'closed'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status value' }, { status: 400 })
    }

    const updatedSubmission = await db.contactSubmission.update({
      where: { id: contactId },
      data: { status },
    })

    return NextResponse.json(updatedSubmission)
  } catch (error) {
    console.error('Error updating contact submission:', error)
    return NextResponse.json({ error: 'Failed to update contact submission' }, { status: 500 })
  }
}

async function handleDELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params
    const contactId = Number(id)
    if (Number.isNaN(contactId)) {
      return NextResponse.json({ error: 'Invalid contact ID' }, { status: 400 })
    }

    await db.contactSubmission.delete({ where: { id: contactId } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting contact submission:', error)
    return NextResponse.json({ error: 'Failed to delete contact submission' }, { status: 500 })
  }
}

export const PUT = withStaffAccess('contact', handlePUT)
export const DELETE = withStaffAccess('contact', handleDELETE)
