import { checkRateLimits, isRateLimited } from "@/utils/rate-limiter";

export const runtime = "edge";

const DEFAULT_PAGE_SIZE = 10;
const MAX_PAGE_SIZE = 50;

export async function GET(req: Request) {
	const ip = req.headers.get("x-forwarded-for") ?? "anon";
	const rateLimitResponse = await checkRateLimits(ip);
	if (rateLimitResponse) return rateLimitResponse;

	const { searchParams } = new URL(req.url);
	const internalKey = req.headers.get("x-internal-token");
	const puuid = searchParams.get("puuid");
	const shard = searchParams.get("shard");

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
	if (!shard) {
		return new Response(JSON.stringify({ error: "Missing shard" }), {
			status: 400,
			headers: { "Content-Type": "application/json" },
		});
	}

	// --- parse & validate pagination params ---
	const pageParam = Number(searchParams.get("page") ?? "1");
	const pageSizeParam = Number(
		searchParams.get("pageSize") ?? DEFAULT_PAGE_SIZE
	);

	const page =
		Number.isInteger(pageParam) && pageParam > 0 ? pageParam : 1;
	const pageSize =
		Number.isInteger(pageSizeParam) && pageSizeParam > 0
			? Math.min(pageSizeParam, MAX_PAGE_SIZE)
			: DEFAULT_PAGE_SIZE;

	try {
		// --- 1. Fetch the matchlist (summaries only) ---
		const riotRes = await fetch(
			`https://${shard}.api.riotgames.com/val/match/v1/matchlists/by-puuid/${puuid}`,
			{
				headers: {
					"X-Riot-Token": process.env.RIOT_API_KEY!,
				},
			}
		);

		if (!riotRes.ok) {
			return new Response(
				JSON.stringify({ error: "Failed to fetch history from Riot" }),
				{
					status: riotRes.status,
					headers: { "Content-Type": "application/json" },
				}
			);
		}

		const data = await riotRes.json();
		const history: { matchId: string }[] = Array.isArray(data.history)
			? data.history
			: [];

		const total = history.length;
		const totalPages = Math.max(1, Math.ceil(total / pageSize));
		const start = (page - 1) * pageSize;
		const end = start + pageSize;
		const pagedHistory = history.slice(start, end);

		// --- 2. Fetch full match details for each matchId on this page ---
		const matchDetailResults = await Promise.allSettled(
			pagedHistory.map(async (match) => {
				const matchRes = await fetch(
					`https://${shard}.api.riotgames.com/val/match/v1/matches/${match.matchId}`,
					{
						headers: {
							"X-Riot-Token": process.env.RIOT_API_KEY!,
						},
					}
				);

				if (!matchRes.ok) {
					throw new Error(
						`Failed to fetch match ${match.matchId}: ${matchRes.status}`
					);
				}

				return matchRes.json();
			})
		);

		const matches = matchDetailResults
			.filter(
				(result): result is PromiseFulfilledResult<unknown> =>
					result.status === "fulfilled"
			)
			.map((result) => result.value);

		const failedCount = matchDetailResults.length - matches.length;
		if (failedCount > 0) {
			console.error(
				`${failedCount} of ${pagedHistory.length} match detail fetches failed`
			);
		}

		return new Response(
			JSON.stringify({
				matches,
				pagination: {
					page,
					pageSize,
					total,
					totalPages,
					hasNextPage: page < totalPages,
					hasPrevPage: page > 1,
				},
			}),
			{
				headers: { "Content-Type": "application/json" },
			}
		);
	} catch (err) {
		console.error("Error fetching match list:", err);
		return new Response(JSON.stringify({ error: "Failed to fetch history" }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
}
