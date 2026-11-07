import { checkRateLimits, isRateLimited } from "@/utils/rate-limiter";

export const runtime = "edge";

const VALID_SHARDS = new Set(["na", "eu", "ap", "kr", "latam", "br"]); // adjust to Riot's actual set

export async function GET(req: Request) {
	const ip = req.headers.get("x-forwarded-for") ?? "anon";
	const rateLimitResponse = await checkRateLimits(ip);
	if (rateLimitResponse) return rateLimitResponse;

	const { searchParams } = new URL(req.url);
	const internalKey = req.headers.get("x-internal-token");
	const matchID = searchParams.get("matchID");
	const shard = searchParams.get("shard");

	if (internalKey !== process.env.INTERNAL_TOKEN) {
		return new Response(JSON.stringify({ error: "Forbidden" }), {
			status: 403,
			headers: { "Content-Type": "application/json" },
		});
	}
	if (!matchID) {
		return new Response(JSON.stringify({ error: "Missing matchID" }), {
			status: 400,
			headers: { "Content-Type": "application/json" },
		});
	}
	if (!shard) {
		return new Response(JSON.stringify({ error: "Missing shard" }), {
			status: 400,
			headers: { "Content-Type": "application/json" },
		});
	}
	if (!VALID_SHARDS.has(shard)) {
		return new Response(JSON.stringify({ error: "Invalid shard" }), {
			status: 400,
			headers: { "Content-Type": "application/json" },
		});
	}

	try {
		const riotRes = await fetch(
			`https://${shard}.api.riotgames.com/val/match/v1/matches/${matchID}`,
			{
				headers: {
					"X-Riot-Token": process.env.RIOT_API_KEY!,
				},
			}
		);

		if (!riotRes.ok) {
			return new Response(
				JSON.stringify({ error: "Failed to fetch match from Riot" }),
				{
					status: riotRes.status,
					headers: { "Content-Type": "application/json" },
				}
			);
		}

		const data = await riotRes.json();
		return new Response(JSON.stringify(data), {
			headers: { "Content-Type": "application/json" },
		});
	} catch (err) {
		console.error("Error fetching match details:", err);
		return new Response(JSON.stringify({ error: "Failed to fetch match" }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
}
