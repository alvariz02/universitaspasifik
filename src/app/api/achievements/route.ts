import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '6')
    const category = searchParams.get('category')
    const level = searchParams.get('level')

    const where: any = {}

    if (category) {
      where.category = category
    }

    if (level) {
      where.level = level
    }

    const achievements = await db.achievement.findMany({
      where,
      orderBy: {
        achievementDate: 'desc'
      },
      take: limit
    })

    return NextResponse.json(achievements)
  } catch (error) {
    console.error('Error fetching achievements:', error)
    return NextResponse.json(
      { error: 'Failed to fetch achievements' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const achievement = await db.achievement.create({
      data: {
        title: body.title,
        description: body.description,
        achieverName: body.achieverName,
        achieverType: body.achieverType,
        achievementDate: body.achievementDate ? new Date(body.achievementDate) : null,
        category: body.category,
        level: body.level,
        imageUrl: body.imageUrl,
      }
    })

    return NextResponse.json(achievement, { status: 201 })
  } catch (error) {
    console.error('Error creating achievement:', error)
    return NextResponse.json(
      { error: 'Failed to create achievement' },
      { status: 500 }
    )
  }
}
