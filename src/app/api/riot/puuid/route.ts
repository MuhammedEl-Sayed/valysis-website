import { getRiotPUUID } from '@/lib/riot/getRiotPUUID';
import type { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end('Method Not Allowed');

  const internalKey = req.headers['x-internal-token'];
  if (internalKey !== process.env.INTERNAL_TOKEN) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const name = req.query.name as string;
  const region = req.query.region as string;
  const [gameName, tagLine] = name.split('#');

  if (!gameName || !tagLine) {
    return res.status(400).json({ error: 'Missing name or tag' });
  }

  try {
    const puuid = await getRiotPUUID(gameName, tagLine, region);
    return res.status(200).json({ puuid });
  } catch (err) {
    console.error('Error fetching PUUID:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
