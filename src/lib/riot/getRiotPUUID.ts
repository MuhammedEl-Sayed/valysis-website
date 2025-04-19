// lib/riot/getRiotPUUID.ts
import { createClient } from '@supabase/supabase-js';


const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export async function getRiotPUUID(gameName: string, tagLine: string, region: string) 

{
  const { data, error } = await supabase
    .from('User')
    .select('puuid')
    .eq('gameName', gameName)
    .eq('tagLine', tagLine)
    // TODO: Add region filtering if needed
    .eq('region', null)
    .single();

  if (error || !data) {
    throw new Error(`User not found for ${gameName}#${tagLine}`);
  }

  return data.puuid;
}
