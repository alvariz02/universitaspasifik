import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '10')

    const admissions = await db.admission.findMany({
      orderBy: {
        name: 'asc'
      },
      take: limit
    })

    return NextResponse.json(admissions)
  } catch (error) {
    console.error('Error fetching admissions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch admissions' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const admission = await db.admission.create({
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
        isActive: body.isActive !== undefined ? body.isActive : true,
      }
    })

    return NextResponse.json(admission, { status: 201 })
  } catch (error) {
    console.error('Error creating admission:', error)
    return NextResponse.json(
      { error: 'Failed to create admission' },
      { status: 500 }
    )
  }
}
