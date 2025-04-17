// src/app/api/auth/callback/route.ts

export const runtime = 'edge' // ✅ Use Edge Runtime

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
)

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const state = searchParams.get('state')
  const redirect = searchParams.get('redirect') || 'valysis://auth/callback'

  if (!code) {
    return new Response('Missing code', { status: 400 })
  }

  try {
    // Exchange code for access token
    const tokenRes = await fetch('https://auth.riotgames.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.RIOT_REDIRECT_URI!,
        client_id: process.env.RIOT_CLIENT_ID!,
        client_secret: process.env.RIOT_CLIENT_SECRET!,
      }),
    })

    if (!tokenRes.ok) {
      const error = await tokenRes.text()
      console.error('Token exchange failed:', error)
      return Response.redirect(`${redirect}?status=error`)
    }

    const tokenData = await tokenRes.json()
    const accessToken = tokenData.access_token

    // Get user info
    const userInfoRes = await fetch('https://auth.riotgames.com/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    const userInfo = await userInfoRes.json()
    const { sub } = userInfo

    // Upsert user into Supabase
    const { data, error } = await supabase
      .from('users')
      .upsert(
        { riotSub: sub, hasConsented: true },
        { onConflict: 'riotSub' }
      )

    if (error) {
      console.error('Supabase upsert error:', error)
      return Response.redirect(`${redirect}?status=error`)
    }

    return Response.redirect(`${redirect}?status=success`)
  } catch (err: any) {
    console.error('OAuth Error:', err.message)
    return Response.redirect(`${redirect}?status=error`)
  }
}
