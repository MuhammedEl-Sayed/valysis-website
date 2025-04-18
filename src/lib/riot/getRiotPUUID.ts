// lib/riot/getRiotPUUID.ts
import axios from 'axios';

export async function getRiotPUUID(gameName: string, tagLine: string, region: string) {
  const riotApiKey = process.env.RIOT_API_KEY;
  const url = `https://${region}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`;

  const response = await axios.get(url, {
    headers: {
      'X-Riot-Token': riotApiKey!,
    },
  });

  return response.data.puuid;
}
