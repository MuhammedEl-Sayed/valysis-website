export const runtime = 'edge';

import { getRiotPUUID } from '@/lib/riot/getRiotPUUID';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const internalKey = req.headers.get('x-internal-token');

  if (internalKey !== process.env.INTERNAL_TOKEN) {
    return new Response(JSON.stringify({ error: 'Forbidden' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const name = searchParams.get('name');
  const region = searchParams.get('region');

  if (!name || !region || !name.includes('#')) {
    return new Response(JSON.stringify({ error: 'Missing or invalid name/region' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const [gameName, tagLine] = name.split('#');

  try {
    const puuid = await getRiotPUUID(gameName, tagLine, region);
    return new Response(JSON.stringify({ puuid }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Error fetching PUUID:', err);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
