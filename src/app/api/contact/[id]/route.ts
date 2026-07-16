import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function PUT(request: Request, context: { params: any }) {
  try {
    const params = await context.params
    const id = Number(params.id)
    if (Number.isNaN(id)) {
      return NextResponse.json({ error: 'Invalid contact ID' }, { status: 400 })
    }

    const body = await request.json()
    const { status } = body

    if (!status || !['pending', 'replied', 'closed'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status value' }, { status: 400 })
    }

    const updatedSubmission = await db.contactSubmission.update({
      where: { id },
      data: { status }
    })

    return NextResponse.json(updatedSubmission)
  } catch (error) {
    console.error('Error updating contact submission:', error)
    return NextResponse.json({ error: 'Failed to update contact submission' }, { status: 500 })
  }
}

export async function DELETE(request: Request, context: { params: any }) {
  try {
    const params = await context.params
    const id = Number(params.id)
    if (Number.isNaN(id)) {
      return NextResponse.json({ error: 'Invalid contact ID' }, { status: 400 })
    }

    await db.contactSubmission.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting contact submission:', error)
    return NextResponse.json({ error: 'Failed to delete contact submission' }, { status: 500 })
  }
}
