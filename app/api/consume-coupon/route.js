import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req) {
  try {
    const { code } = await req.json()
    if (!code) return NextResponse.json({ success: false })

    const { data } = await supabase
      .from('coupons')
      .update({ used: true, used_at: new Date().toISOString() })
      .eq('code', code.trim().toUpperCase())
      .eq('used', false)
      .select('discount')
      .maybeSingle()

    return NextResponse.json(data
      ? { success: true, discount: data.discount }
      : { success: false }
    )
  } catch {
    return NextResponse.json({ success: false })
  }
}
