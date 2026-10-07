import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { applicantSchema } from '@/lib/admin-resources'

export async function POST(request: Request) {
  const parsed = applicantSchema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) return NextResponse.json({ error: 'Periksa kembali data pendaftaran Anda' }, { status: 400 })
  try {
    const recent = await db.applicant.findFirst({ where: { email: parsed.data.email, createdAt: { gte: new Date(Date.now() - 5 * 60 * 1000) } } })
    if (recent) return NextResponse.json({ error: 'Pendaftaran Anda baru saja diterima. Tunggu sebelum mengirim kembali.' }, { status: 429 })
    const applicant = await db.applicant.create({ data: parsed.data })
    return NextResponse.json({ id: applicant.id, message: 'Pendaftaran diterima' }, { status: 201 })
  } catch { return NextResponse.json({ error: 'Pendaftaran belum dapat disimpan. Silakan coba lagi.' }, { status: 503 }) }
}
