export default {
	async scheduled(_event, env, _ctx): Promise<void> {
		try {
			const url = `${env.SUPABASE_URL}/rest/v1/?apikey=${env.SUPABASE_ANON_KEY}`;

			const res = await fetch(url, {
				method: 'GET',
				headers: {
					apikey: env.SUPABASE_ANON_KEY,
					Authorization: `Bearer ${env.SUPABASE_ANON_KEY}`,
				},
			});

			if (res.ok) {
				console.log(`Supabase ping OK`);
			} else {
				console.error(
					`Supabase ping failed: ${res.status} - ${await res.text()}`
				);
			}
		} catch (err) {
			console.error('Ping error:', err);
		}
	},
} satisfies ExportedHandler<{
	SUPABASE_URL: string;
	SUPABASE_ANON_KEY: string;
}>;
