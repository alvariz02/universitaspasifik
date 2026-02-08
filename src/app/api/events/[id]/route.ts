import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const eventId = parseInt(id)
    
    if (isNaN(eventId)) {
      return NextResponse.json(
        { error: 'Invalid event ID' },
        { status: 400 }
      )
    }

    console.log('🔍 Fetching single event:', eventId)
    
    const event = await db.event.findUnique({
      where: {
        id: eventId
      }
    })

    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      )
    }

    console.log('✅ Event found:', event.title)
    return NextResponse.json(event)
  } catch (error) {
    console.error('❌ Error fetching event:', error)
    return NextResponse.json(
      { error: 'Failed to fetch event' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const eventId = parseInt(id)
    const body = await request.json()
    
    if (isNaN(eventId)) {
      return NextResponse.json(
        { error: 'Invalid event ID' },
        { status: 400 }
      )
    }

    console.log('📝 Updating event:', eventId, body.title)
    
    // Check if event exists
    const existingEvent = await db.event.findUnique({
      where: { id: eventId }
    })

    if (!existingEvent) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      )
    }

    const updatedEvent = await db.event.update({
      where: {
        id: eventId
      },
      data: {
        title: body.title,
        slug: body.slug,
        description: body.description,
        eventDate: body.eventDate ? new Date(body.eventDate) : existingEvent.eventDate,
        endDate: body.endDate ? new Date(body.endDate) : existingEvent.endDate,
        location: body.location || existingEvent.location,
        imageUrl: body.imageUrl || existingEvent.imageUrl,
      }
    })

    console.log('✅ Event updated:', updatedEvent.title)
    return NextResponse.json(updatedEvent)
  } catch (error) {
    console.error('❌ Error updating event:', error)
    return NextResponse.json(
      { error: 'Failed to update event' },
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
    const eventId = parseInt(id)
    
    if (isNaN(eventId)) {
      return NextResponse.json(
        { error: 'Invalid event ID' },
        { status: 400 }
      )
    }

    console.log('🗑️ Deleting event:', eventId)
    
    // Check if event exists
    const existingEvent = await db.event.findUnique({
      where: { id: eventId }
    })

    if (!existingEvent) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      )
    }

    await db.event.delete({
      where: {
        id: eventId
      }
    })

    console.log('✅ Event deleted:', existingEvent.title)
    return NextResponse.json(
      { message: 'Event deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('❌ Error deleting event:', error)
    return NextResponse.json(
      { error: 'Failed to delete event' },
      { status: 500 }
    )
  }
}
