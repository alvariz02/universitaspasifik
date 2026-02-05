import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const statistics = await db.statistic.findMany({
      where: {
        isActive: true
      },
      orderBy: {
        orderPosition: 'asc'
      }
    })

    return NextResponse.json(statistics)
  } catch (error) {
    console.error('Error fetching statistics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const statistic = await db.statistic.create({
      data: {
        label: body.label,
        value: body.value,
        icon: body.icon,
        orderPosition: body.orderPosition || 0,
        isActive: body.isActive !== undefined ? body.isActive : true,
      }
    })

    return NextResponse.json(statistic, { status: 201 })
  } catch (error) {
    console.error('Error creating statistic:', error)
    return NextResponse.json(
      { error: 'Failed to create statistic' },
      { status: 500 }
    )
  }
}
