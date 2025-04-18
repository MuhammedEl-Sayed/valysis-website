// src/app/api/user/check/route.ts

export const runtime = "edge"; // ✅ Use Edge Runtime

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
	process.env.SUPABASE_URL!,
	process.env.SUPABASE_ANON_KEY!
);

export async function GET(request: Request) {
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
			.select("id")
			.eq("gameName", gameName)
			.eq("tagLine", tagLine)
			.maybeSingle(); // ✅ won't throw if not found

		if (error) {
			console.error("Database error:", error.message);
			return new Response("Error checking user", { status: 500 });
		}

		const exists = !!data;
		return new Response(JSON.stringify({ exists }), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (err: any) {
		console.error("Unexpected error:", err.message);
		return new Response("Unexpected error", { status: 500 });
	}
}
