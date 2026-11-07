// Riot Sign On (RSO) helpers shared by the app sign-in callback and the
// web data deletion flow.

const RIOT_AUTHORIZE_URL = 'https://auth.riotgames.com/authorize';
const RIOT_TOKEN_URL = 'https://auth.riotgames.com/token';

/** Ties a web deletion request to the browser that started it. */
export const DELETE_NONCE_COOKIE = 'valysis_delete_nonce';

export interface RiotAccount {
	puuid: string;
	gameName: string;
	tagLine: string;
}

/** Riot's authorize page. Returns to RIOT_REDIRECT_URI (/auth-callback). */
export function riotAuthorizeUrl(state: string, scope = 'openid') {
	const params = new URLSearchParams({
		client_id: process.env.RIOT_CLIENT_ID!,
		redirect_uri: process.env.RIOT_REDIRECT_URI!,
		response_type: 'code',
		scope,
		state,
	});
	return `${RIOT_AUTHORIZE_URL}?${params}`;
}

/**
 * Trades an authorization code for the signed-in Riot account. Throws with a
 * short reason ('token_failed', 'account_failed') that callers can return.
 */
export async function riotAccountFromCode(
	code: string,
	region = 'americas'
): Promise<RiotAccount> {
	const tokenRes = await fetch(RIOT_TOKEN_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization: `Basic ${Buffer.from(
				`${process.env.RIOT_CLIENT_ID!}:${process.env.RIOT_CLIENT_SECRET!}`
			).toString('base64')}`,
		},
		body: new URLSearchParams({
			grant_type: 'authorization_code',
			code,
			redirect_uri: process.env.RIOT_REDIRECT_URI!,
		}),
	});
	if (!tokenRes.ok) {
		console.error('Token exchange failed:', await tokenRes.text());
		throw new Error('token_failed');
	}
	const { access_token } = await tokenRes.json();

	const accountRes = await fetch(
		`https://${region}.api.riotgames.com/riot/account/v1/accounts/me`,
		{ headers: { Authorization: `Bearer ${access_token}` } }
	);
	if (!accountRes.ok) {
		console.error('Account fetch failed:', await accountRes.text());
		throw new Error('account_failed');
	}
	return accountRes.json();
}
