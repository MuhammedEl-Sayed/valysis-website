export const runtime = "edge";
import { checkRateLimits } from "@/utils/rate-limiter";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
	process.env.SUPABASE_URL!,
	process.env.SUPABASE_ANON_KEY!
);

export async function DELETE(req: Request) {
	const ip = req.headers.get("x-forwarded-for") ?? "anon";
	const rateLimitResponse = await checkRateLimits(ip);
	if (rateLimitResponse) return rateLimitResponse;
	const internalToken = req.headers.get("x-internal-token");
	if (internalToken !== process.env.INTERNAL_SECRET) {
		return new Response("Unauthorized", { status: 401 });
	}

	const { puuid } = await req.json();

	if (!puuid) {
		return new Response("Missing puuid", { status: 400 });
	}

	const { error } = await supabase.from("User").delete().eq("puuid", puuid);

	if (error) {
		console.error("Supabase delete error:", error);
		return Response.json({ status: "error", message: "db_failed" });
	}

	return Response.json({ status: "success" });
}
