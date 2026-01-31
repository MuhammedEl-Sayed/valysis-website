export const runtime = 'edge';

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
	process.env.SUPABASE_URL!,
	process.env.SUPABASE_SERVICE_ACC_KEY!
);

function toBase64(str: string) {
	return Buffer.from(str).toString('base64');
}
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
		const tokenRes = await fetch('https://auth.riotgames.com/token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: `Basic ${toBase64(
					`${process.env.RIOT_CLIENT_ID!}:${process.env.RIOT_CLIENT_SECRET!}`
				)}`,
			},
			body: new URLSearchParams({
				grant_type: 'authorization_code',
				code,
				redirect_uri: process.env.RIOT_REDIRECT_URI!,
			}),
		});

		if (!tokenRes.ok) {
			const error = await tokenRes.text();
			console.error('Token exchange failed:', error);
			return Response.json({ status: 'error', message: 'token_failed' });
		}

		const tokenData = await tokenRes.json();
		const accessToken = tokenData.access_token;

		const accountRes = await fetch(
		`https://${region}.api.riotgames.com/riot/account/v1/accounts/me`,
			{
				headers: { Authorization: `Bearer ${accessToken}` },
			}
		);

		if (!accountRes.ok) {
			const error = await accountRes.text();
			console.error('Account fetch failed:', error);
			return Response.json({ status: 'error', message: 'account_failed' });
		}

		const { puuid, gameName, tagLine } = await accountRes.json();

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
