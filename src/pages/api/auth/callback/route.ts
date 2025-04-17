//src/app/api/auth/callback/route.ts
import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import axios from 'axios'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code, state, redirect } = req.query

  if (!code || typeof code !== 'string') {
    return res.status(400).send('Missing code')
  }

  try {
    // Exchange code for access token
    const tokenRes = await axios.post('https://auth.riotgames.com/token', {
      grant_type: 'authorization_code',
      code,
      redirect_uri: process.env.RIOT_REDIRECT_URI,
      client_id: process.env.RIOT_CLIENT_ID,
      client_secret: process.env.RIOT_CLIENT_SECRET,
    }, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })

    const accessToken = tokenRes.data.access_token

    // Get user info (sub = unique user ID from Riot)
    const userInfoRes = await axios.get('https://auth.riotgames.com/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    const { sub } = userInfoRes.data

    // 🔧 Update Neon via Prisma
    await prisma.user.upsert({
      where: { riotSub: sub },
      update: { hasConsented: true },
      create: {
        riotSub: sub,
        hasConsented: true,
      },
    })

    // ✅ Redirect back to Flutter via deep link
    const redirectUri = typeof redirect === 'string' ? redirect : 'valysis://auth/callback'
    res.redirect(`${redirectUri}?status=success`)
  } catch (err: any) {
    console.error('OAuth Error:', err.response?.data || err.message)
    res.redirect(`${req.query.redirect || 'valysis://auth/callback'}?status=error`)
  }
}
