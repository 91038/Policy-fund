import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { to, subject, message, applicationData } = await request.json()
    
    console.log('Sending admin email via Supabase:', { to, subject })
    
    const { data: result, error } = await supabase.functions.invoke('send-admin-email', {
      body: { to, subject, message, applicationData }
    })
    
    if (error) throw error
    
    console.log('Admin email sent successfully via Supabase:', result)
    
    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    console.error('Admin email sending error:', error)
    return NextResponse.json(
      { success: false, message: '이메일 전송 중 오류가 발생했습니다.', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}