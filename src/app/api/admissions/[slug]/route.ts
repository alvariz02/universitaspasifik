import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const body = await request.json()

    const admission = await db.admission.update({
      where: {
        slug
      },
      data: {
        name: body.name,
        slug: body.slug,
        description: body.description,
        registrationStart: body.registrationStart ? new Date(body.registrationStart) : null,
        registrationEnd: body.registrationEnd ? new Date(body.registrationEnd) : null,
        examDate: body.examDate ? new Date(body.examDate) : null,
        announcementDate: body.announcementDate ? new Date(body.announcementDate) : null,
        requirements: body.requirements,
        documentsNeeded: body.documentsNeeded,
        fee: body.fee,
        quota: body.quota,
        infoUrl: body.infoUrl,
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
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    await db.admission.delete({
      where: {
        slug
      }
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
