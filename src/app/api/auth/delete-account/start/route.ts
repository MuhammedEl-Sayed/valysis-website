export const runtime = 'edge';

import { DELETE_NONCE_COOKIE, riotAuthorizeUrl } from '@/lib/riot/rso';

// Starts web data deletion: sends the visitor to Riot to sign in, so only the
// account's owner can delete it. Riot returns them to /auth-callback, which
// sees `action: 'delete'` in the state and finishes the deletion.
export async function GET() {
	const nonce = crypto.randomUUID();
	const state = btoa(JSON.stringify({ action: 'delete', nonce }))
		.replace(/\+/g, '-')
		.replace(/\//g, '_');

	return new Response(null, {
		status: 302,
		headers: {
			Location: riotAuthorizeUrl(state),
			// Ties the returning request to this browser.
			'Set-Cookie': `${DELETE_NONCE_COOKIE}=${nonce}; Path=/api/auth/delete-account; Max-Age=600; HttpOnly; Secure; SameSite=Lax`,
		},
	});
}
