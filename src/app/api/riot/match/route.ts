import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
  const internalKey = req.headers.get('x-internal-token');
  if (internalKey !== process.env.INTERNAL_TOKEN) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const matchID = req.nextUrl.searchParams.get('matchID');
  if (!matchID) {
    return NextResponse.json({ error: 'Missing matchID' }, { status: 400 });
  }

  try {
    // TODO: Implement regions
    const riotRes = await axios.get(
      `https://na.api.riotgames.com/val/match/v1/matches/${matchID}`,
      {
        headers: {
          'X-Riot-Token': process.env.RIOT_API_KEY!,
        },
      }
    );

    return NextResponse.json(riotRes.data);
  } catch (err) {
    console.error('Error fetching match details:', err);
    return NextResponse.json({ error: 'Failed to fetch match' }, { status: 500 });
  }
}
