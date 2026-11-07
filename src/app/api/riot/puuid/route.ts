export const runtime = "edge";

import { getRiotPUUID } from "@/lib/riot/getRiotPUUID";
import { normalizeString } from "@/utils/functions/normalizeString";
import { checkRateLimits, isRateLimited } from "@/utils/rate-limiter";

export async function GET(req: Request) {
	const ip = req.headers.get("x-forwarded-for") ?? "anon";
	const rateLimitResponse = await checkRateLimits(ip);
	if (rateLimitResponse) return rateLimitResponse;
	const { searchParams } = new URL(req.url);
	const internalKey = req.headers.get("x-internal-token");

	if (internalKey !== process.env.INTERNAL_TOKEN) {
		return new Response(JSON.stringify({ error: "Forbidden" }), {
			status: 403,
			headers: { "Content-Type": "application/json" },
		});
	}

	const name = searchParams.get("name");
	const shard = searchParams.get("shard");

	if (!name || !shard || !name.includes("#")) {
		return new Response(
			JSON.stringify({ error: "Missing or invalid name/shard" }),
			{
				status: 400,
				headers: { "Content-Type": "application/json" },
			}
		);
	}

	const [gameName, tagLine] = name.split("#");
	const normalizedGameName = normalizeString(gameName);
	const normalizedTagLine = normalizeString(tagLine);

	try {
		const puuid = await getRiotPUUID(normalizedGameName, normalizedTagLine, shard);
		return new Response(JSON.stringify({ puuid }), {
			headers: { "Content-Type": "application/json" },
		});
	} catch (err) {``
		console.error("Error fetching PUUID:", err);
		return new Response(JSON.stringify({ error: "Internal Server Error" }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
}
