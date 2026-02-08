import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const upcoming = searchParams.get('upcoming')
    const limit = parseInt(searchParams.get('limit') || '10')

    let events

    if (upcoming === 'true') {
      const now = new Date()
      events = await db.event.findMany({
        where: {
          eventDate: {
            gte: now
          }
        },
        orderBy: {
          eventDate: 'asc'
        },
        take: limit
      })
    } else {
      events = await db.event.findMany({
        orderBy: {
          eventDate: 'desc'
        },
        take: limit
      })
    }

    return NextResponse.json(events)
  } catch (error) {
    console.error('Error fetching events:', error)
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const event = await db.event.create({
      data: {
        title: body.title,
        slug: body.slug,
        description: body.description,
        eventDate: new Date(body.eventDate),
        endDate: body.endDate ? new Date(body.endDate) : null,
        location: body.location,
        imageUrl: body.imageUrl,
        // Optional fields with defaults
        organizer: body.organizer || 'Universitas Pasifik Morotai',
        contactEmail: body.contactEmail || 'info@unipas.ac.id',
        registrationUrl: body.registrationUrl || null,
        isFeatured: body.isFeatured || false,
      }
    })

    console.log('✅ Event created:', event.title)
    return NextResponse.json(event, { status: 201 })
  } catch (error) {
    console.error('Error creating event:', error)
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    )
  }
}
