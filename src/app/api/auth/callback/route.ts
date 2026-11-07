export const runtime = 'edge';

import { riotAccountFromCode } from '@/lib/riot/rso';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
	process.env.SUPABASE_URL!,
	process.env.SUPABASE_SERVICE_ACC_KEY!
);

const shardToRegion: Record<string, string> = {
	na: 'americas',
	br: 'americas',
	latam: 'americas',
	eu: 'europe',
	ap: 'asia',
	kr: 'asia',
};
export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const code = searchParams.get('code');
	const shard = searchParams.get('shard');

	if (!code) {
		return Response.json(
			{ status: 'error', message: 'Missing code' },
			{ status: 400 }
		);
	}
	if (!shard || !(shard in shardToRegion)) {
		return Response.json({ status: 'error', message: 'invalid_shard' }, { status: 400 });
	}
	const region = shardToRegion[shard];
	try {
		let account;
		try {
			account = await riotAccountFromCode(code, region);
		} catch (err: any) {
			return Response.json({ status: 'error', message: err.message });
		}
		const { puuid, gameName, tagLine } = account;

		// Normalize gameName and tagLine
		const normalize = (str: string) => str.replace(/\s+/g, '').toLowerCase();
		const normalizedGameName = normalize(gameName);
		const normalizedTagLine = normalize(tagLine);

		// Store in Supabase
		const { error } = await supabase.from('User').upsert(
			{
				puuid,
				gameName,
				tagLine,
				shard,
				hasConsented: true,
				normalizedGameName,
				normalizedTagLine,
			},
			{ onConflict: 'puuid' }
		);
		if (error) {
			console.error('Supabase upsert error:', error);
			return Response.json({ status: 'error', message: 'db_failed' });
		}

		return Response.json({ status: 'success' });
	} catch (err: any) {
		console.error('OAuth Error:', err.message);
		return Response.json({ status: 'error', message: 'exception' });
	}
}
