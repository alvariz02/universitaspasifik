import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const now = new Date()

    const announcements = await db.announcement.findMany({
      where: {
        isActive: true,
        OR: [
          {
            startDate: null,
            endDate: null
          },
          {
            startDate: {
              lte: now
            },
            endDate: null
          },
          {
            startDate: null,
            endDate: {
              gte: now
            }
          },
          {
            startDate: {
              lte: now
            },
            endDate: {
              gte: now
            }
          }
        ]
      },
      orderBy: [
        { priority: 'desc' },
        { createdAt: 'desc' }
      ],
      take: 10
    })

    return NextResponse.json(announcements)
  } catch (error) {
    console.error('Error fetching announcements:', error)
    return NextResponse.json(
      { error: 'Failed to fetch announcements' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const announcement = await db.announcement.create({
      data: {
        title: body.title,
        content: body.content,
        category: body.category,
        priority: body.priority,
        startDate: body.startDate ? new Date(body.startDate) : null,
        endDate: body.endDate ? new Date(body.endDate) : null,
        isActive: body.isActive !== undefined ? body.isActive : true,
      }
    })

    return NextResponse.json(announcement, { status: 201 })
  } catch (error) {
    console.error('Error creating announcement:', error)
    return NextResponse.json(
      { error: 'Failed to create announcement' },
      { status: 500 }
    )
  }
}
