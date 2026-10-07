import { NextResponse } from 'next/server'
import { currentStaff } from '@/lib/staff-auth'
export async function GET() {
  try {
    const user = await currentStaff()
    return NextResponse.json({ user }, { status: user ? 200 : 401, headers: { 'Cache-Control': 'no-store' } })
  } catch { return NextResponse.json({ user: null }, { status: 503 }) }
}
