import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req) {
  try {
    const { code } = await req.json()
    if (!code) return NextResponse.json({ valid: false })

    const { data } = await supabase
      .from('coupons')
      .select('discount')
      .eq('code', code.trim().toUpperCase())
      .eq('used', false)
      .maybeSingle()

    return NextResponse.json(data
      ? { valid: true, discount: data.discount }
      : { valid: false }
    )
  } catch {
    return NextResponse.json({ valid: false })
  }
}
