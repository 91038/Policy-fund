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
    const { to, subject, message, applicationData } = await req.json()

    if (!subject || !message || !applicationData) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Resend를 사용하여 이메일 전송
    const emailData = {
      from: 'Policy Fund Admin <onboarding@resend.dev>',
      to: [NOTIFICATION_EMAIL],
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">${subject}</h2>
          <hr>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #666; margin-top: 0;">고객 정보</h3>
            <p><strong>성함:</strong> ${applicationData.name}</p>
            <p><strong>연락처:</strong> ${applicationData.phone}</p>
            <p><strong>직군:</strong> ${applicationData.job_type}</p>
            <p><strong>희망금액:</strong> ${applicationData.desired_amount}</p>
            ${applicationData.business_number ? `<p><strong>사업자등록번호:</strong> ${applicationData.business_number}</p>` : ''}
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #666;">메시지</h3>
            <div style="background-color: white; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <hr>
          <p style="color: #888; font-size: 12px;">
            이 이메일은 정책자금 관리 시스템에서 발송되었습니다.
          </p>
        </div>
      `,
      text: `${subject}\n\n고객 정보:\n성함: ${applicationData.name}\n연락처: ${applicationData.phone}\n직군: ${applicationData.job_type}\n희망금액: ${applicationData.desired_amount}\n${applicationData.business_number ? `사업자등록번호: ${applicationData.business_number}\n` : ''}\n메시지:\n${message}`
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