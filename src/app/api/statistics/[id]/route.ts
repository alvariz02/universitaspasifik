import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json()
    const { id } = await params
    const statisticId = parseInt(id)

    const statistic = await db.statistic.update({
      where: { id: statisticId },
      data: {
        label: body.label,
        value: body.value,
        icon: body.icon,
        orderPosition: body.orderPosition || 0,
        isActive: body.isActive !== undefined ? body.isActive : true,
      }
    })

    return NextResponse.json(statistic)
  } catch (error) {
    console.error('Error updating statistic:', error)
    return NextResponse.json(
      { error: 'Failed to update statistic' },
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
    const statisticId = parseInt(id)

    if (!statisticId || isNaN(statisticId)) {
      return NextResponse.json(
        { error: 'Invalid ID' },
        { status: 400 }
      )
    }

    await db.statistic.delete({
      where: { id: statisticId }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting statistic:', error)
    return NextResponse.json(
      { error: 'Failed to delete statistic' },
      { status: 500 }
    )
  }
}
