import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// Supabase Edge Function을 사용한 이메일 전송 함수
async function sendNotificationEmail(data: any, timestamp: string) {
  console.log('Starting email send with Supabase Edge Function...')
  
  try {
    const { data: result, error } = await supabase.functions.invoke('send-notification-email', {
      body: { data, timestamp }
    })
    
    if (error) throw error
    
    console.log('Email sent successfully via Supabase:', result)
    return result
  } catch (error) {
    console.error('Email function error:', error)
    throw error
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    console.log('Received data:', data)
    
    // Supabase에 데이터 저장
    const { data: savedData, error } = await supabase
      .from('applications')
      .insert([
        {
          name: data.name,
          phone: data.phone,
          job_type: data.jobType,
          desired_amount: data.desiredAmount,
          business_number: data.businessNumber || null,
          status: 'pending'
        }
      ])
      .select()
    
    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { success: false, message: '데이터 저장 중 오류가 발생했습니다.', error: error.message },
        { status: 500 }
      )
    }
    
    console.log('Data saved to Supabase:', savedData)
    
    // 백그라운드에서 이메일 전송
    const now = new Date()
    const koreanTime = new Date(now.getTime() + (9 * 60 * 60 * 1000))
    const timestamp = koreanTime.toISOString().replace('T', ' ').substring(0, 19)
    
    Promise.resolve().then(() => {
      sendNotificationEmail(data, timestamp).catch(error => {
        console.error('Email sending error:', error)
      })
    })
    
    // 즉시 성공 응답 반환
    return NextResponse.json({ success: true, message: '신청이 완료되었습니다.' })
  } catch (error) {
    console.error('Detailed error:', error)
    return NextResponse.json(
      { success: false, message: '신청 중 오류가 발생했습니다.', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}