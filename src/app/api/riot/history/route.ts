import { checkRateLimits, isRateLimited } from "@/utils/rate-limiter";

export const runtime = "edge";

export async function GET(req: Request) {
	const ip = req.headers.get("x-forwarded-for") ?? "anon";
	const rateLimitResponse = await checkRateLimits(ip);
	if (rateLimitResponse) return rateLimitResponse;
	const { searchParams } = new URL(req.url);
	const internalKey = req.headers.get("x-internal-token");
	const puuid = searchParams.get("puuid");

	if (internalKey !== process.env.INTERNAL_TOKEN) {
		return new Response(JSON.stringify({ error: "Forbidden" }), {
			status: 403,
			headers: { "Content-Type": "application/json" },
		});
	}

	if (!puuid) {
		return new Response(JSON.stringify({ error: "Missing puuid" }), {
			status: 400,
			headers: { "Content-Type": "application/json" },
		});
	}

	try {
		const riotRes = await fetch(
			`https://na.api.riotgames.com/val/match/v1/matchlists/by-puuid/${puuid}`,
			{
				headers: {
					"X-Riot-Token": process.env.RIOT_API_KEY!,
				},
			}
		);

		const data = await riotRes.json();
		return new Response(JSON.stringify({ history: data.history }), {
			headers: { "Content-Type": "application/json" },
		});
	} catch (err) {
		console.error("Error fetching match list:", err);
		return new Response(JSON.stringify({ error: "Failed to fetch history" }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
}
