import { withStaffAccess } from '@/lib/api-access'
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { z } from 'zod'

const submissionSchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().max(50).optional(),
  subject: z.string().trim().min(1).max(300),
  message: z.string().trim().min(1).max(10000),
})

async function handleGET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '50')
    const status = searchParams.get('status')

    const where: any = {}

    if (status) {
      where.status = status
    }

    const submissions = await db.contactSubmission.findMany({
      where,
      orderBy: {
        createdAt: 'desc'
      },
      take: limit
    })

    return NextResponse.json(submissions)
  } catch (error) {
    console.error('Error fetching contact submissions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch contact submissions' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const parsed = submissionSchema.safeParse(await request.json().catch(() => null))
    if (!parsed.success) {
      return NextResponse.json({ error: 'Data formulir tidak valid. Periksa nama, email, subjek, dan pesan.' }, { status: 400 })
    }
    const { name, email, phone, subject, message } = parsed.data

    const submission = await db.contactSubmission.create({
      data: {
        name,
        email,
        phone,
        subject,
        message,
        status: 'pending'
      }
    })

    return NextResponse.json(submission, { status: 201 })
  } catch (error) {
    console.error('Error creating contact submission:', error)
    return NextResponse.json(
      { error: 'Failed to create contact submission' },
      { status: 500 }
    )
  }
}

export const GET = withStaffAccess('contact', handleGET)
