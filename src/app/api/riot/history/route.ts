import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
  const internalKey = req.headers.get('x-internal-token');
  if (internalKey !== process.env.INTERNAL_TOKEN) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const puuid = req.nextUrl.searchParams.get('puuid');
  if (!puuid) {
    return NextResponse.json({ error: 'Missing puuid' }, { status: 400 });
  }

  try {
    const riotRes = await axios.get(
      `https://na.api.riotgames.com/val/match/v1/matchlists/by-puuid/${puuid}`,
      {
        headers: {
          'X-Riot-Token': process.env.RIOT_API_KEY!,
        },
      }
    );

    return NextResponse.json({ history: riotRes.data.history });
  } catch (err) {
    console.error('Error fetching match list:', err);
    return NextResponse.json({ error: 'Failed to fetch history' }, { status: 500 });
  }
}
