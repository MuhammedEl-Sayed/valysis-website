// src/app/api/user/check/route.ts

export const runtime = "edge"; // ✅ Use Edge Runtime

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
	process.env.SUPABASE_URL!,
	process.env.SUPABASE_ANON_KEY!
);

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const gameNameAndTag = searchParams.get("gameNameAndTag");
	//update to one field
	if (!gameNameAndTag) {
		return new Response("Missing gameName or tagLine", { status: 400 });
	}

	try {
		const { data, error } = await supabase
			.from("User")
			.select("hasConsented")
			.eq("gameNameAndTag", gameNameAndTag)
			.maybeSingle(); // ✅ won't throw if not found

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
