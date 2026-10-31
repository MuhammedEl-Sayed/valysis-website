export const runtime = 'edge';

import { DELETE_NONCE_COOKIE, riotAccountFromCode } from '@/lib/riot/rso';
import { checkRateLimits } from '@/utils/rate-limiter';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
	process.env.SUPABASE_URL!,
	process.env.SUPABASE_SERVICE_ACC_KEY!
);

const clearNonce = `${DELETE_NONCE_COOKIE}=; Path=/api/auth/delete-account; Max-Age=0; HttpOnly; Secure; SameSite=Lax`;

function reply(body: Record<string, unknown>, status = 200) {
	return Response.json(body, { status, headers: { 'Set-Cookie': clearNonce } });
}

// Finishes web data deletion. The Riot sign-in proves who's asking, so this
// deletes the signed-in account and nothing else.
export async function POST(req: Request) {
	const ip = req.headers.get('x-forwarded-for') ?? 'anon';
	const rateLimitResponse = await checkRateLimits(ip);
	if (rateLimitResponse) return rateLimitResponse;

	const { code, nonce } = await req.json().catch(() => ({}));
	const cookieNonce = req.headers
		.get('cookie')
		?.split(';')
		.map((c) => c.trim().split('='))
		.find(([name]) => name === DELETE_NONCE_COOKIE)?.[1];

	if (!code || !nonce || nonce !== cookieNonce) {
		return reply({ status: 'error', message: 'expired' }, 400);
	}

	let account;
	try {
		account = await riotAccountFromCode(code);
	} catch (err: any) {
		return reply({ status: 'error', message: err.message }, 502);
	}

	const { error, count } = await supabase
		.from('User')
		.delete({ count: 'exact' })
		.eq('puuid', account.puuid);

	if (error) {
		console.error('Supabase delete error:', error);
		return reply({ status: 'error', message: 'db_failed' }, 500);
	}

	return reply({
		status: 'success',
		deleted: (count ?? 0) > 0,
		riotId: `${account.gameName}#${account.tagLine}`,
	});
}
