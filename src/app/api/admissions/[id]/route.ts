import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const admission = await db.admission.update({
      where: { id: parseInt(id) },
      data: {
        title: body.title,
        slug: body.slug,
        image1Url: body.image1Url || null,
        image2Url: body.image2Url || null,
        image3Url: body.image3Url || null,
        displayStart: body.displayStart ? new Date(body.displayStart) : new Date(),
        displayEnd: body.displayEnd ? new Date(body.displayEnd) : new Date(),
        isActive: body.isActive,
      }
    })

    return NextResponse.json(admission)
  } catch (error) {
    console.error('Error updating admission:', error)
    return NextResponse.json(
      { error: 'Failed to update admission' },
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

    await db.admission.delete({
      where: { id: parseInt(id) }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting admission:', error)
    return NextResponse.json(
      { error: 'Failed to delete admission' },
      { status: 500 }
    )
  }
}
