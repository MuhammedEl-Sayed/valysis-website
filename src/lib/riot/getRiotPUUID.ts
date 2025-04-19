// lib/riot/getRiotPUUID.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.INTERNAL_TOKEN!; // stored securely in .env
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function getRiotPUUID(gameName: string, tagLine: string, region: string) {
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
