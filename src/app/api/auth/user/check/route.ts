// src/app/api/user/check/route.ts

export const runtime = "edge"; // ✅ Use Edge Runtime

import { checkRateLimits, isRateLimited } from "@/utils/rate-limiter";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
	process.env.SUPABASE_URL!,
	process.env.SUPABASE_ANON_KEY!
);

export async function GET(request: Request) {
	const ip = request.headers.get("x-forwarded-for") ?? "anon";
	const rateLimitResponse = await checkRateLimits(ip);
	if (rateLimitResponse) return rateLimitResponse;
	const internalKey = request.headers.get("x-internal-token");

	if (internalKey !== process.env.INTERNAL_TOKEN) {
		return new Response(JSON.stringify({ error: "Forbidden" }), {
			status: 403,
			headers: { "Content-Type": "application/json" },
		});
	}
	const { searchParams } = new URL(request.url);
	const gameName = searchParams.get("gameName");
	const tagLine = searchParams.get("tagLine");
	//update to one field
	if (!gameName || !tagLine) {
		return new Response("Missing gameName or tagLine", { status: 400 });
	}

	try {
		const { data, error } = await supabase
			.from("User")
			.select("hasConsented")
			.ilike("gameName", gameName)
			.eq("tagLine", tagLine)
			.maybeSingle();

		if (error) {
			console.error("Database error:", error.message);
			return new Response("Error checking user", { status: 500 });
		}

		return new Response(JSON.stringify({ data }), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (err: any) {
		console.error("Unexpected error:", err.message);
		return new Response("Unexpected error", { status: 500 });
	}
}
