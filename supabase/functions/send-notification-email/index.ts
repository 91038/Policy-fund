import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const NOTIFICATION_EMAIL = Deno.env.get('NOTIFICATION_EMAIL') || 'qkrtmdska2642@gmail.com'

serve(async (req) => {
  // CORS 헤더 설정
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  }

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { data, timestamp } = await req.json()

    if (!data || !timestamp) {
      return new Response(
        JSON.stringify({ error: 'Missing required data or timestamp' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Resend를 사용하여 이메일 전송
    const emailData = {
      from: 'Policy Fund <onboarding@resend.dev>',
      to: [NOTIFICATION_EMAIL],
      subject: `[정책자금 신청] ${data.name}님의 신규 상담 신청`,
      html: `
        <h2>정책자금 상담 신청이 접수되었습니다.</h2>
        <hr>
        <p><strong>신청 시간:</strong> ${timestamp}</p>
        <p><strong>성함:</strong> ${data.name}</p>
        <p><strong>연락처:</strong> ${data.phone}</p>
        <p><strong>직군:</strong> ${data.jobType}</p>
        <p><strong>희망금액:</strong> ${data.desiredAmount}</p>
        ${data.businessNumber ? `<p><strong>사업자등록번호:</strong> ${data.businessNumber}</p>` : ''}
        <hr>
        <p>빠른 시일 내에 연락 부탁드립니다.</p>
      `,
      text: `정책자금 상담 신청이 접수되었습니다.\n\n신청 시간: ${timestamp}\n성함: ${data.name}\n연락처: ${data.phone}\n직군: ${data.jobType}\n희망금액: ${data.desiredAmount}\n${data.businessNumber ? `사업자등록번호: ${data.businessNumber}` : ''}\n\n빠른 시일 내에 연락 부탁드립니다.`
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify(emailData),
    })

    if (!res.ok) {
      const error = await res.text()
      throw new Error(`Resend API error: ${error}`)
    }

    const result = await res.json()
    
    return new Response(
      JSON.stringify({ success: true, data: result }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})